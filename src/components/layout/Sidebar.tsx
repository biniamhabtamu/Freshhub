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
  LogOut,
  Star,
  Target
} from 'lucide-react';

// Mock useAuth for standalone functionality
interface UserProfile { 
  id: string; 
  name: string; 
  field: string; 
  isPremium: boolean;
  streak?: number;
  level?: number;
}
const useAuth = () => ({ 
  userProfile: { 
    id: 'u1', 
    name: 'Alex Johnson', 
    field: 'Science', 
    isPremium: false,
    streak: 7,
    level: 12
  } as UserProfile,
  logout: () => console.log('Logging out...')
});

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentPage, onNavigate }) => {
  const { userProfile, logout } = useAuth();

  const menuItems = [
    { 
      id: 'home', 
      label: 'Dashboard', 
      icon: Home, 
      color: 'text-blue-500'
    },
    { 
      id: 'profile', 
      label: 'Profile', 
      icon: User, 
      color: 'text-purple-500'
    },
    { 
      id: 'leaderboard', 
      label: 'Leaderboard', 
      icon: Trophy, 
      color: 'text-amber-500'
    },
    { 
      id: 'notes', 
      label: 'Study Notes', 
      icon: BookOpen, 
      color: 'text-green-500'
    },
    { 
      id: 'chat', 
      label: 'AI Tutor', 
      icon: MessageCircle, 
      color: 'text-indigo-500'
    },
  ];
  
  const utilityItems = [
    { 
      id: 'premium', 
      label: 'Go Premium', 
      icon: Crown, 
      color: 'text-yellow-600',
      isHighlighted: true
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings, 
      color: 'text-gray-600'
    },
  ];

  const handleItemClick = (itemId: string) => {
    onNavigate(itemId);
    // Only close on mobile
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const handleLogout = () => {
    logout();
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 right-0 h-full w-80 bg-white shadow-xl safe-area-bottom 
        transform transition-transform duration-300 ease-out z-50
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        lg:relative lg:translate-x-0 lg:w-64 lg:h-screen lg:shadow-lg lg:flex lg:flex-col
      `}>
        
        {/* Close Button - Mobile Only */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 lg:hidden"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>

        {/* User Profile Header */}
        <div className="p-4 bg-gradient-to-br from-blue-600 to-purple-600 text-white lg:pt-6">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-white/20 border border-white/30 rounded-xl flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              {/* Level Badge */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center border border-white">
                <span className="text-xs font-bold text-white">{userProfile?.level}</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold truncate">{userProfile?.name}</h3>
              <p className="text-blue-200 text-sm truncate">
                {userProfile?.field} Student
              </p>
              <div className="flex items-center space-x-1 mt-0.5">
                <span className="text-xs text-yellow-200 font-medium">{userProfile?.streak} day streak</span>
              </div>
            </div>
          </div>

          {/* Premium Upgrade Prompt */}
          {!userProfile?.isPremium && (
            <div className="mt-3 bg-white/20 rounded-lg p-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Crown className="h-3 w-3 text-yellow-300" />
                  <span className="text-xs font-semibold">Free Plan</span>
                </div>
                <button 
                  onClick={() => handleItemClick('premium')}
                  className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded hover:bg-yellow-300 transition-colors"
                >
                  Upgrade
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto pb-20 lg:pb-4">
          {/* Main Navigation */}
          <nav className="mt-4 px-3">
            <h4 className="text-xs font-semibold uppercase text-gray-500 mb-3 px-2">
              Navigation
            </h4>
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleItemClick(item.id)}
                      className={`
                        w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200
                        ${isActive 
                          ? 'bg-blue-500 text-white shadow-sm' 
                          : 'text-gray-700 hover:bg-gray-100 hover:shadow-sm'
                        }
                        lg:hover:scale-[1.02] lg:active:scale-[0.98]
                      `}
                    >
                      <Icon className={`h-5 w-5 ${isActive ? 'text-white' : item.color}`} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Utilities Section */}
          <div className="border-t border-gray-200 mt-4 pt-4 mx-3">
            <h4 className="text-xs font-semibold uppercase text-gray-500 mb-3 px-2">
              Utilities
            </h4>
            <ul className="space-y-1">
              {utilityItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleItemClick(item.id)}
                      className={`
                        w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200
                        ${isActive 
                          ? 'bg-blue-500 text-white shadow-sm' 
                          : item.isHighlighted 
                            ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border border-yellow-200 hover:shadow-sm' 
                            : 'text-gray-700 hover:bg-gray-100 hover:shadow-sm'
                        }
                        lg:hover:scale-[1.02] lg:active:scale-[0.98]
                      `}
                    >
                      <Icon className={`h-5 w-5 ${isActive ? 'text-white' : item.color}`} />
                      <span className="text-sm font-medium">{item.label}</span>
                      {item.isHighlighted && !userProfile?.isPremium && (
                        <Star className="h-4 w-4 text-yellow-500 ml-auto" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Logout Section */}
          <div className="mt-4 px-3">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 p-3 rounded-xl text-red-600 hover:bg-red-50 hover:shadow-sm transition-all duration-200 lg:hover:scale-[1.02]"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Target className="h-3 w-3 text-blue-500" />
              <span className="text-xs font-medium text-gray-600">Fresh-Hub</span>
            </div>
            <p className="text-xs text-gray-400">
              Learning Platform
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;