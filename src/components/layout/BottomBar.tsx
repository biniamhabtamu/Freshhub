// components/layout/BottomBar.tsx
import React from 'react';
import { 
  Home, 
  FileText, 
  User, 
  MessageCircle, 
  Sparkles, 
  BookOpen, 
  Bot,
  Crown,
  TrendingUp,
  Settings
} from 'lucide-react';

interface BottomBarProps {
  currentPage: string;
  onNavigate: (page: string, subject?: string) => void;
}

const BottomBar: React.FC<BottomBarProps> = ({ currentPage, onNavigate }) => {
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      activeIcon: Sparkles,
      color: 'from-blue-500 to-cyan-500',
      gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500'
    },
    {
      id: 'notes',
      label: 'Notes',
      icon: FileText,
      activeIcon: BookOpen,
      color: 'from-purple-500 to-pink-500',
      gradient: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      id: 'chat',
      label: 'AI Chat',
      icon: MessageCircle,
      activeIcon: Bot,
      color: 'from-green-500 to-emerald-500',
      gradient: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
      id: 'leaderboard',
      label: 'Rank',
      icon: TrendingUp,
      activeIcon: TrendingUp,
      color: 'from-yellow-500 to-orange-500',
      gradient: 'bg-gradient-to-r from-yellow-500 to-orange-500'
    },
    {
      id: 'profile',
      label: 'Me',
      icon: User,
      activeIcon: User,
      color: 'from-orange-500 to-red-500',
      gradient: 'bg-gradient-to-r from-orange-500 to-red-500'
    }
  ];

  const handleItemClick = (itemId: string) => {
    onNavigate(itemId);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-200/80 shadow-2xl safe-area-bottom">
      {/* Floating Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-white/20 pointer-events-none" />
      
      <div className="relative max-w-md mx-auto px-4 pb-3 pt-2">
        <div className="flex justify-between items-center">
          {navItems.map((item) => {
            const Icon = currentPage === item.id ? item.activeIcon : item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="relative flex flex-col items-center justify-center min-w-16 transition-all duration-300 group flex-1"
              >
                {/* Active Indicator Bar */}
                <div
                  className={`absolute -top-3 w-10 h-1 rounded-full transition-all duration-500 ${
                    isActive ? item.gradient : 'bg-transparent'
                  } ${isActive ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
                />

                {/* Icon Container */}
                <div
                  className={`relative p-2 rounded-xl transition-all duration-500 group-hover:scale-110 ${
                    isActive
                      ? `${item.gradient} shadow-lg scale-110 ring-2 ring-white ring-opacity-50`
                      : 'bg-gray-100/80 text-gray-600 group-hover:bg-gray-200/80'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-all duration-300 ${
                      isActive ? 'text-white scale-110' : 'text-gray-600 group-hover:text-gray-800'
                    }`}
                  />

                  {/* Floating Particles Effect */}
                  {isActive && (
                    <>
                      <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                      <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-white rounded-full" />
                    </>
                  )}
                </div>

                {/* Label */}
                <span
                  className={`text-xs font-medium mt-1 transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${item.color} bg-clip-text text-transparent font-semibold scale-105`
                      : 'text-gray-500 group-hover:text-gray-700'
                  }`}
                >
                  {item.label}
                </span>

                {/* Premium Badge for Profile if user is premium */}
                {item.id === 'profile' && isActive && (
                  <div className="absolute -top-1 -right-1">
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold shadow-lg">
                      <Crown className="w-3 h-3" />
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Center Curved Background */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-4 bg-white/90 backdrop-blur-xl rounded-full border border-gray-200/80 shadow-lg" />
      </div>
    </div>
  );
};

export default BottomBar;