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
  Zap,
  LogOut,
  Sparkles,
  Star,
  BookMarked,
  Target,
  ChevronRight,
  Shield,
  HelpCircle,
  CreditCard
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
      color: 'text-blue-500', 
      activeGradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      description: 'Your learning hub'
    },
    { 
      id: 'profile', 
      label: 'My Profile', 
      icon: User, 
      color: 'text-purple-500', 
      activeGradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      description: 'Personal settings'
    },
    { 
      id: 'leaderboard', 
      label: 'Leaderboard', 
      icon: Trophy, 
      color: 'text-amber-500', 
      activeGradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-50 to-orange-50',
      description: 'Compete with peers'
    },
    { 
      id: 'notes', 
      label: 'Study Notes', 
      icon: BookOpen, 
      color: 'text-green-500', 
      activeGradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      description: 'Access resources'
    },
    { 
      id: 'chat', 
      label: 'AI Tutor', 
      icon: MessageCircle, 
      color: 'text-indigo-500', 
      activeGradient: 'from-indigo-500 to-violet-500',
      bgGradient: 'from-indigo-50 to-violet-50',
      description: 'Get help instantly'
    },
  ];
  
  const utilityItems = [
    { 
      id: 'premium', 
      label: 'Go Premium', 
      icon: Crown, 
      color: 'text-yellow-600', 
      activeGradient: 'from-yellow-500 to-amber-500',
      bgGradient: 'from-yellow-50 to-amber-50',
      isHighlighted: true
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings, 
      color: 'text-gray-600', 
      activeGradient: 'from-gray-500 to-gray-600',
      bgGradient: 'from-gray-50 to-gray-100'
    },
    { 
      id: 'help', 
      label: 'Help & Support', 
      icon: HelpCircle, 
      color: 'text-blue-600', 
      activeGradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50'
    },
  ];

  const handleItemClick = (itemId: string) => {
    onNavigate(itemId);
    onClose();
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <>
      {/* Enhanced Overlay with Blur Effect */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-all duration-300 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Enhanced Sidebar */}
      <div className={`
        fixed top-0 right-0 h-full w-80 lg:w-72 xl:w-80 bg-white/95 backdrop-blur-xl shadow-2xl shadow-black/20 safe-area-bottom 
        transform transition-all duration-300 ease-out z-50 rounded-l-3xl border-l border-gray-200/50
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        
        {/* Enhanced Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100/80 rounded-2xl transition-all duration-200 z-50 group"
          aria-label="Close menu"
        >
          <X className="h-5 w-5 transform group-hover:rotate-90 transition-transform" />
        </button>

        {/* Enhanced Header with User Profile */}
        <div className="p-6 pt-8 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white rounded-tl-3xl relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full transform -translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10">
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative">
                <div className="w-14 h-14 bg-white/20 border-2 border-white/30 rounded-2xl flex items-center justify-center shadow-2xl">
                  <User className="h-7 w-7 text-white" />
                </div>
                {/* Level Badge */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg border border-white">
                  <span className="text-xs font-bold text-white">{userProfile?.level}</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold truncate">{userProfile?.name || 'Guest User'}</h3>
                <p className="text-blue-200 text-sm font-medium truncate">
                  {userProfile?.field ? `${userProfile.field} Student` : 'Welcome Learner'}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center space-x-1 text-yellow-200">
                    <Sparkles className="h-3 w-3" />
                    <span className="text-xs font-semibold">{userProfile?.streak} day streak</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Status Badge */}
            {!userProfile?.isPremium && (
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 border border-white/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Crown className="h-4 w-4 text-yellow-300" />
                    <span className="text-sm font-semibold">Free Plan</span>
                  </div>
                  <button 
                    onClick={() => handleItemClick('premium')}
                    className="bg-gradient-to-r from-yellow-400 to-amber-500 text-yellow-900 text-xs font-bold px-3 py-1.5 rounded-full hover:shadow-lg transition-all duration-200"
                  >
                    Upgrade
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Navigation Sections */}
        <div className="h-[calc(100%-220px)] overflow-y-auto pb-4 custom-scrollbar">
          {/* Main Navigation */}
          <nav className="mt-6 px-4">
            <h4 className="text-xs font-bold uppercase text-gray-400 mb-4 px-3 tracking-wider flex items-center">
              <BookMarked className="h-3 w-3 mr-2" />
              Navigation
            </h4>
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleItemClick(item.id)}
                      className={`
                        w-full flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 ease-out group
                        ${isActive 
                          ? `bg-gradient-to-r ${item.activeGradient} text-white shadow-lg shadow-${item.color.split('-')[1]}-500/30 font-bold scale-[1.02]` 
                          : `text-gray-700 hover:bg-gradient-to-r ${item.bgGradient} hover:text-gray-900 hover:shadow-md border border-transparent hover:border-${item.color.split('-')[1]}-200/50`
                        }
                      `}
                    >
                      <div className={`p-2 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? 'bg-white/20' 
                          : `bg-${item.color.split('-')[1]}-100 group-hover:bg-${item.color.split('-')[1]}-200`
                      }`}>
                        <Icon className={`h-5 w-5 transition-colors duration-300 ${
                          isActive ? 'text-white' : item.color
                        }`} />
                      </div>
                      <div className="flex-1 text-left">
                        <span className="text-sm font-semibold block">{item.label}</span>
                        <span className={`text-xs transition-colors duration-300 ${
                          isActive ? 'text-white/80' : 'text-gray-500 group-hover:text-gray-600'
                        }`}>
                          {item.description}
                        </span>
                      </div>
                      <ChevronRight className={`h-4 w-4 transition-all duration-300 ${
                        isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'
                      } ${isActive ? 'translate-x-0' : 'translate-x-1 group-hover:translate-x-0'}`} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Utilities Section */}
          <div className="border-t border-gray-200/50 mt-6 pt-6 mx-4">
            <h4 className="text-xs font-bold uppercase text-gray-400 mb-4 px-3 tracking-wider flex items-center">
              <Settings className="h-3 w-3 mr-2" />
              Utilities
            </h4>
            <ul className="space-y-2">
              {utilityItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleItemClick(item.id)}
                      className={`
                        w-full flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 ease-out group
                        ${isActive 
                          ? `bg-gradient-to-r ${item.activeGradient} text-white shadow-lg font-bold` 
                          : `text-gray-700 hover:bg-gradient-to-r ${item.bgGradient} hover:text-gray-900 hover:shadow-md`
                        }
                        ${item.isHighlighted && !isActive ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 hover:from-yellow-100 hover:to-amber-100' : ''}
                      `}
                    >
                      <div className={`p-2 rounded-xl transition-all duration-300 ${
                        isActive 
                          ? 'bg-white/20' 
                          : item.isHighlighted 
                            ? 'bg-yellow-100 group-hover:bg-yellow-200' 
                            : `bg-${item.color.split('-')[1]}-100 group-hover:bg-${item.color.split('-')[1]}-200`
                      }`}>
                        <Icon className={`h-5 w-5 transition-colors duration-300 ${
                          isActive ? 'text-white' : item.color
                        }`} />
                      </div>
                      <span className="flex-1 text-sm font-semibold text-left">{item.label}</span>
                      {item.isHighlighted && !isActive && (
                        <Zap className="h-4 w-4 text-yellow-500 fill-yellow-400 animate-pulse" />
                      )}
                      {item.id === 'premium' && userProfile?.isPremium && (
                        <div className="px-2 py-1 bg-white/20 rounded-full">
                          <Star className="h-3 w-3 text-white fill-current" />
                        </div>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Enhanced Logout Section */}
          <div className="mt-6 px-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 text-red-600 hover:bg-red-50 hover:text-red-700 hover:shadow-md border border-transparent hover:border-red-200 group"
            >
              <div className="p-2 rounded-xl bg-red-100 group-hover:bg-red-200 transition-colors duration-300">
                <LogOut className="h-5 w-5" />
              </div>
              <span className="flex-1 text-sm font-semibold text-left">Sign Out</span>
              <ChevronRight className="h-4 w-4 text-red-400 group-hover:text-red-600 transition-colors duration-300" />
            </button>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200/50 bg-white/80 backdrop-blur-sm">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Target className="h-4 w-4 text-blue-500" />
              <span className="text-xs font-bold text-gray-600">Fresh-Hub v2.0</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Your Ultimate Learning Platform
              <br />
              <span className="text-[10px]">Elevate your study experience</span>
            </p>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
      `}</style>
    </>
  );
};

export default Sidebar;