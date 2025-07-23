import React, { useState, useEffect, useRef } from 'react';
import { Send, Plus, Users, Hash, ArrowLeft, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { collection, addDoc, query, orderBy, onSnapshot, where, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { ChatMessage, ChatGroup } from '../../types';

const ChatPage: React.FC = () => {
  const { userProfile, currentUser } = useAuth();
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [groups, setGroups] = useState<ChatGroup[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createType, setCreateType] = useState<'group' | 'channel'>('group');
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleShowCreateModal = () => {
    if (!currentUser) {
      setError('You must be logged in to create a group/channel');
      return;
    }
    setShowCreateModal(true);
    setError(null);
  };

  // Load groups and channels
  useEffect(() => {
    if (!userProfile?.id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const groupsQuery = query(
      collection(db, 'chatGroups'),
      where('members', 'array-contains', userProfile.id)
    );

    const unsubscribe = onSnapshot(groupsQuery, 
      (snapshot) => {
        const groupsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ChatGroup[];
        
        setGroups(groupsData);
        setLoading(false);
        localStorage.setItem('chatGroups', JSON.stringify(groupsData));
      }, 
      (error) => {
        setError('Failed to load groups. Trying offline data...');
        const cached = localStorage.getItem('chatGroups');
        if (cached) {
          setGroups(JSON.parse(cached));
        }
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [userProfile?.id]);

  // Load messages for active chat
  useEffect(() => {
    if (!activeChat) {
      setMessages([]);
      return;
    }

    setLoading(true);
    setError(null);

    const fieldName = activeChat.startsWith('group_') ? 'groupId' : 'channelId';
    const chatId = activeChat.replace('group_', '').replace('channel_', '');

    const messagesQuery = query(
      collection(db, 'chatMessages'),
      where(fieldName, '==', chatId),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(messagesQuery, 
      (snapshot) => {
        const messagesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date()
        })) as ChatMessage[];
        
        setMessages(messagesData);
        setLoading(false);
        localStorage.setItem(`messages_${activeChat}`, JSON.stringify(messagesData));
      }, 
      (error) => {
        setError('Failed to load messages. Trying offline data...');
        const cached = localStorage.getItem(`messages_${activeChat}`);
        if (cached) {
          setMessages(JSON.parse(cached));
        }
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [activeChat]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !activeChat || !userProfile?.id) return;

    const messageData: Partial<ChatMessage> = {
      senderId: userProfile.id,
      senderName: userProfile.name || 'Anonymous',
      text: newMessage.trim(),
      timestamp: new Date()
    };

    if (activeChat.startsWith('group_')) {
      messageData.groupId = activeChat.replace('group_', '');
    } else {
      messageData.channelId = activeChat.replace('channel_', '');
    }

    try {
      await addDoc(collection(db, 'chatMessages'), messageData);
      setNewMessage('');
    } catch (error) {
      const offlineMessages = JSON.parse(localStorage.getItem(`offline_messages_${activeChat}`) || '[]');
      offlineMessages.push({
        ...messageData,
        id: `temp_${Date.now()}`,
        offline: true
      });
      localStorage.setItem(`offline_messages_${activeChat}`, JSON.stringify(offlineMessages));
      setNewMessage('');
    }
  };

  const handleCreateGroupOrChannel = async () => {
    if (!currentUser) {
      setError('You must be logged in to create a group/channel');
      return;
    }

    if (!newGroupName.trim()) {
      setError('Name is required');
      return;
    }

    if (newGroupName.trim().length < 3) {
      setError('Name must be at least 3 characters');
      return;
    }

    if (!userProfile?.id) {
      setError('User profile not loaded yet');
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      const groupData = {
        name: newGroupName.trim(),
        description: newGroupDescription.trim(),
        creatorId: userProfile.id,
        creatorEmail: currentUser.email,
        members: [userProfile.id],
        createdAt: new Date(),
        isChannel: createType === 'channel'
      };

      const docRef = await addDoc(collection(db, 'chatGroups'), groupData);
      
      const newGroup = {
        id: docRef.id,
        ...groupData
      };

      setGroups(prev => [...prev, newGroup]);
      setNewGroupName('');
      setNewGroupDescription('');
      setShowCreateModal(false);
      
      const prefix = createType === 'group' ? 'group_' : 'channel_';
      setActiveChat(`${prefix}${docRef.id}`);
    } catch (error) {
      console.error('Creation error:', error);
      setError('Failed to create. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleJoinGroup = async (groupId: string) => {
    if (!userProfile?.id) return;

    try {
      await updateDoc(doc(db, 'chatGroups', groupId), {
        members: arrayUnion(userProfile.id)
      });
    } catch (error) {
      console.error('Error joining group:', error);
      setError('Failed to join group');
    }
  };

  const activeGroup = groups.find(g => 
    (activeChat?.startsWith('group_') && g.id === activeChat.replace('group_', '')) ||
    (activeChat?.startsWith('channel_') && g.id === activeChat.replace('channel_', ''))
  );

  if (loading && groups.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading chats...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Toggle Button */}
      <button 
        onClick={() => setShowSidebar(true)}
        className="fixed lg:hidden bottom-4 right-4 z-30 p-3 bg-blue-600 text-white rounded-full shadow-lg"
      >
        <Users className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <div className={`w-80 bg-white border-r border-gray-200 flex flex-col fixed lg:static inset-0 z-20 transform transition-transform duration-200 ease-in-out ${showSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Chat</h1>
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleShowCreateModal}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              aria-label="Create new group or channel"
            >
              <Plus className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setShowSidebar(false)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {groups.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No groups or channels yet</p>
                <button 
                  onClick={handleShowCreateModal}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create your first {createType}
                </button>
              </div>
            ) : (
              groups.map((group) => {
                const chatId = group.isChannel ? `channel_${group.id}` : `group_${group.id}`;
                const isActive = activeChat === chatId;
                const isMember = group.members.includes(userProfile?.id || '');
                
                return (
                  <div key={group.id} className="relative">
                    <button
                      onClick={() => {
                        if (isMember) {
                          setActiveChat(chatId);
                          setShowSidebar(false);
                        }
                      }}
                      className={`
                        w-full p-3 rounded-lg text-left transition-colors
                        ${isActive ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'}
                        ${!isMember ? 'opacity-75' : ''}
                      `}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${group.isChannel ? 'bg-purple-100' : 'bg-green-100'}`}>
                          {group.isChannel ? (
                            <Hash className="h-4 w-4 text-purple-600" />
                          ) : (
                            <Users className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{group.name}</p>
                          <p className="text-sm text-gray-500 truncate">{group.description}</p>
                          <p className="text-xs text-gray-400">{group.members.length} members</p>
                        </div>
                      </div>
                    </button>
                    
                    {!isMember && (
                      <button
                        onClick={() => handleJoinGroup(group.id)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                      >
                        Join
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col lg:ml-80">
        {activeChat && activeGroup ? (
          <>
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setActiveChat(null)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div className={`p-2 rounded-lg ${activeGroup.isChannel ? 'bg-purple-100' : 'bg-green-100'}`}>
                  {activeGroup.isChannel ? (
                    <Hash className="h-5 w-5 text-purple-600" />
                  ) : (
                    <Users className="h-5 w-5 text-green-600" />
                  )}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">{activeGroup.name}</h2>
                  <p className="text-sm text-gray-500">{activeGroup.members.length} members</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {loading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <>
                  {messages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-gray-500">
                        <p>No messages yet</p>
                        <p>Send the first message to start the conversation</p>
                      </div>
                    </div>
                  ) : (
                    messages.map((message) => {
                      const isOwn = message.senderId === userProfile?.id;
                      
                      return (
                        <div key={message.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            isOwn 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-white border border-gray-200 text-gray-900'
                          }`}>
                            {!isOwn && (
                              <p className="text-xs font-medium mb-1 text-blue-600">{message.senderName}</p>
                            )}
                            <p className="text-sm">{message.text}</p>
                            <p className={`text-xs mt-1 ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {(activeGroup.isChannel ? activeGroup.creatorId === userProfile?.id : true) && (
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={activeGroup.isChannel ? "Only channel creator can post" : "Type a message..."}
                    disabled={activeGroup.isChannel && activeGroup.creatorId !== userProfile?.id}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() || (activeGroup.isChannel && activeGroup.creatorId !== userProfile?.id)}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a chat to start messaging</h3>
              <p className="text-gray-600">Choose a group or channel from the sidebar to begin</p>
              <button
                onClick={handleShowCreateModal}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create New {createType === 'group' ? 'Group' : 'Channel'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create Group/Channel Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  Create {createType === 'group' ? 'Group' : 'Channel'}
                </h2>
                <button 
                  onClick={() => {
                    setShowCreateModal(false);
                    setError(null);
                  }}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCreateType('group')}
                    className={`flex-1 p-3 rounded-lg text-sm font-medium transition-colors ${
                      createType === 'group' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Users className="h-4 w-4 mx-auto mb-1" />
                    Group
                  </button>
                  <button
                    onClick={() => setCreateType('channel')}
                    className={`flex-1 p-3 rounded-lg text-sm font-medium transition-colors ${
                      createType === 'channel' 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Hash className="h-4 w-4 mx-auto mb-1" />
                    Channel
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {createType === 'group' ? 'Group' : 'Channel'} Name *
                  </label>
                  <input
                    type="text"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={`Enter ${createType} name`}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newGroupDescription}
                    onChange={(e) => setNewGroupDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={`Describe this ${createType}`}
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    <strong>{createType === 'group' ? 'Group' : 'Channel'}:</strong>{' '}
                    {createType === 'group' 
                      ? 'All members can send messages and participate in discussions.'
                      : 'Only the creator can post messages. Other members can only read.'
                    }
                  </p>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setError(null);
                  }}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateGroupOrChannel}
                  disabled={!newGroupName.trim() || isCreating}
                  className={`flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${isCreating ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isCreating ? 'Creating...' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;