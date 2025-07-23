import React, { useState } from 'react';
import { Download, FileText, Lock, Search, Filter } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Note } from '../../types';

const NotesPage: React.FC = () => {
  const { userProfile } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Mock notes data - in a real app, this would come from Firebase
  const notes: Note[] = [
    {
      id: '1',
      title: 'Geography Physical Features',
      description: 'Comprehensive guide to physical geography features including mountains, rivers, and climate patterns.',
      fileUrl: '#',
      fileType: 'pdf',
      fileSize: '2.5 MB',
      subject: 'Geography',
      isPremium: true
    },
    {
      id: '2',
      title: 'Logic and Critical Thinking',
      description: 'Essential concepts in logical reasoning and critical thinking skills.',
      fileUrl: '#',
      fileType: 'ppt',
      fileSize: '3.2 MB',
      subject: 'Logic',
      isPremium: true
    },
    {
      id: '3',
      title: 'Anthropology Cultural Studies',
      description: 'Introduction to cultural anthropology and human societies.',
      fileUrl: '#',
      fileType: 'pdf',
      fileSize: '1.8 MB',
      subject: 'Anthropology',
      isPremium: false
    },
    {
      id: '4',
      title: 'English Grammar Rules',
      description: 'Complete reference for English grammar rules and usage.',
      fileUrl: '#',
      fileType: 'doc',
      fileSize: '1.2 MB',
      subject: 'English',
      isPremium: true
    },
    {
      id: '5',
      title: 'Psychology Fundamentals',
      description: 'Basic principles of psychology and human behavior.',
      fileUrl: '#',
      fileType: 'pdf',
      fileSize: '4.1 MB',
      subject: 'Psychology',
      isPremium: true
    },
    {
      id: '6',
      title: 'Economics Market Systems',
      description: 'Understanding different economic systems and market structures.',
      fileUrl: '#',
      fileType: 'ppt',
      fileSize: '2.9 MB',
      subject: 'Economics',
      isPremium: true
    }
  ];

  const subjects = ['all', 'Geography', 'Logic', 'Anthropology', 'English', 'Psychology', 'Economics', 'Civic', 'C++'];
  const fileTypes = ['all', 'pdf', 'ppt', 'doc'];

  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || note.subject === selectedSubject;
    const matchesType = selectedType === 'all' || note.fileType === selectedType;
    
    return matchesSearch && matchesSubject && matchesType;
  });

  const handleDownload = (note: Note) => {
    if (note.isPremium && !userProfile?.isPremium) {
      alert('This note requires a Premium subscription. Please upgrade to access.');
      return;
    }
    
    // In a real app, this would initiate the download
    alert(`Downloading ${note.title}...`);
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return '📄';
      case 'ppt':
        return '📊';
      case 'doc':
        return '📝';
      default:
        return '📄';
    }
  };

  const getFileTypeColor = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return 'bg-red-100 text-red-800';
      case 'ppt':
        return 'bg-orange-100 text-orange-800';
      case 'doc':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Study Notes</h1>
          <p className="text-xl text-gray-600">Download comprehensive study materials and handouts</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Subject Filter */}
            <div>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject === 'all' ? 'All Subjects' : subject}
                  </option>
                ))}
              </select>
            </div>

            {/* File Type Filter */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {fileTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Premium Notice for Free Users */}
        {!userProfile?.isPremium && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">Unlock Premium Notes</h2>
                <p className="text-yellow-100">
                  Get access to all study materials and handouts with a Premium subscription
                </p>
              </div>
              <div className="hidden lg:block">
                <Lock className="h-16 w-16 text-white opacity-75" />
              </div>
            </div>
          </div>
        )}

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => {
            const isAccessible = !note.isPremium || userProfile?.isPremium;
            
            return (
              <div
                key={note.id}
                className={`bg-white rounded-2xl shadow-lg border border-gray-200 p-6 transition-all duration-200 hover:shadow-xl ${
                  !isAccessible ? 'opacity-75' : ''
                }`}
              >
                {/* File Icon and Type */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{getFileIcon(note.fileType)}</div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFileTypeColor(note.fileType)}`}>
                      {note.fileType.toUpperCase()}
                    </span>
                    {note.isPremium && (
                      <div className="p-1 bg-yellow-100 rounded-full">
                        <Lock className="h-3 w-3 text-yellow-600" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Title and Description */}
                <h3 className="font-bold text-lg text-gray-900 mb-2">{note.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{note.description}</p>

                {/* Subject and Size */}
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                    {note.subject}
                  </span>
                  <span className="text-sm text-gray-500">{note.fileSize}</span>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => handleDownload(note)}
                  disabled={!isAccessible}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                    isAccessible
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Download className="h-4 w-4" />
                  <span>{isAccessible ? 'Download' : 'Premium Required'}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No notes found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or browse different subjects
            </p>
          </div>
        )}

        {/* Statistics */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Study Materials Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{notes.length}</div>
              <div className="text-sm text-gray-600">Total Notes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {notes.filter(n => !n.isPremium).length}
              </div>
              <div className="text-sm text-gray-600">Free Notes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">
                {notes.filter(n => n.isPremium).length}
              </div>
              <div className="text-sm text-gray-600">Premium Notes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {[...new Set(notes.map(n => n.subject))].length}
              </div>
              <div className="text-sm text-gray-600">Subjects</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesPage;