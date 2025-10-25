import React from 'react';
import { 
  Home, 
  Trophy, 
  BookOpen, 
  MessageCircle, 
  Crown, 
  Settings, 
  User,
  X,
  Zap, // Added for a more dynamic premium button
  LogOut // Added for a more complete menu
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentPage, onNavigate }) => {
  // NOTE: Assuming useAuth provides a logout function for the new menu item
  const { userProfile, logout } = useAuth(); // Destructuring logout (assuming it exists)

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, color: 'text-blue-500', activeGradient: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    { id: 'profile', label: 'Profile', icon: User, color: 'text-purple-500', activeGradient: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, color: 'text-amber-500', activeGradient: 'bg-gradient-to-r from-amber-500 to-orange-500' },
    { id: 'notes', label: 'Notes', icon: BookOpen, color: 'text-green-500', activeGradient: 'bg-gradient-to-r from-green-500 to-emerald-500' },
    { id: 'chat', label: 'Chat', icon: MessageCircle, color: 'text-indigo-500', activeGradient: 'bg-gradient-to-r from-indigo-500 to-violet-500' },
  ];
  
  const utilityItems = [
    { id: 'premium', label: 'Get Premium', icon: Crown, color: 'text-yellow-500', activeGradient: 'bg-gradient-to-r from-yellow-500 to-amber-500' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'text-gray-500', activeGradient: 'bg-gray-200' },
  ];

  const handleItemClick = (itemId: string) => {
    onNavigate(itemId);
    onClose();
  };

  const handleLogout = () => {
    // NOTE: Replace this with your actual logout logic
    console.log('User logging out...');
    // logout(); 
    onClose();
  };

  return (
    <>
      {/* Overlay - Darker and smoother transition */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar - Sleek design, rounded top corner on the right */}
      <div className={`
        fixed top-0 right-0 h-full w-80 bg-white backdrop-blur-sm shadow-2xl safe-area-bottom 
        transform transition-transform duration-300 ease-out z-50 rounded-l-2xl
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {/* Close Button - Moved to top-right corner for better visibility */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-full transition-colors z-50"
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Header - Vibrant Profile Card */}
        <div className="p-6 pt-10 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-tl-xl">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 border-2 border-white rounded-full flex items-center justify-center shadow-lg">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{userProfile?.name || 'Guest User'}</h3>
                <p className="text-sm text-blue-200 font-medium">
                    {userProfile?.field ? `${userProfile.field} Student` : 'Welcome'}
                </p>
              </div>
            </div>
        </div>

        {/* Menu Items Section */}
        <div className="h-[calc(100%-190px)] overflow-y-auto pb-4">
            <nav className="mt-6 px-4">
                <h4 className="text-xs font-semibold uppercase text-gray-400 mb-3 px-2">Navigation</h4>
                <ul className="space-y-1.5">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentPage === item.id;
                        
                        return (
                            <li key={item.id}>
                                <button
                                    onClick={() => handleItemClick(item.id)}
                                    className={`
                                        w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 ease-in-out
                                        ${isActive 
                                            ? `${item.activeGradient} text-white shadow-lg shadow-blue-500/30 font-semibold scale-[1.01]` 
                                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 group'
                                        }
                                    `}
                                >
                                    <Icon className={`h-5 w-5 transition-colors duration-200 ${isActive ? 'text-white' : item.color}`} />
                                    <span className="text-sm">{item.label}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="border-t border-gray-100 mt-6 pt-4 mx-4">
                <h4 className="text-xs font-semibold uppercase text-gray-400 mb-3 px-2">Utilities</h4>
                <ul className="space-y-1.5">
                    {utilityItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentPage === item.id;
                        
                        return (
                            <li key={item.id}>
                                <button
                                    onClick={() => handleItemClick(item.id)}
                                    className={`
                                        w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200 ease-in-out
                                        ${isActive 
                                            ? `bg-gray-200 text-gray-800 font-semibold` 
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }
                                        ${item.id === 'premium' ? 'bg-yellow-50 hover:bg-yellow-100 font-bold text-yellow-800' : ''}
                                    `}
                                >
                                    <Icon className={`h-5 w-5 ${item.color}`} />
                                    <span className="text-sm">{item.label}</span>
                                    {item.id === 'premium' && <Zap className="h-4 w-4 ml-auto fill-yellow-400 text-yellow-400" />}
                                </button>
                            </li>
                        );
                    })}
                    {/* Logout Button */}
                    <li>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-colors text-red-500 hover:bg-red-50 hover:text-red-700 mt-2"
                        >
                            <LogOut className="h-5 w-5" />
                            <span className="text-sm font-medium">Logout</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>

        {/* Footer - Minimal and Clean */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center">
            Fresh-Hub v1.0 | Your Ultimate Exam Platform
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;