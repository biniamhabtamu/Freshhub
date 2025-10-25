import React from 'react';
import { 
  Sparkles, 
  Crown,
  LayoutGrid,
  NotebookText,
  NotebookPen,
  MonitorPlay,
  Trophy,
  CircleUser,
  Zap,
  Target,
  BookOpen,
  Video,
  User
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
      icon: LayoutGrid,
      activeIcon: Sparkles,
      color: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200',
      glowColor: 'shadow-blue-500/30'
    },
    {
      id: 'notes',
      label: 'Notes',
      icon: NotebookText,
      activeIcon: BookOpen,
      color: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      borderColor: 'border-purple-200',
      glowColor: 'shadow-purple-500/30'
    },
    {
      id: 'chat',
      label: 'Tutorial',
      icon: MonitorPlay,
      activeIcon: Video,
      color: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
      glowColor: 'shadow-green-500/30'
    },
    {
      id: 'leaderboard',
      label: 'Rank',
      icon: Trophy,
      activeIcon: Crown,
      color: 'from-yellow-500 to-amber-500',
      bgGradient: 'from-yellow-50 to-amber-50',
      borderColor: 'border-yellow-200',
      glowColor: 'shadow-yellow-500/30'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: CircleUser,
      activeIcon: User,
      color: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-50 to-red-50',
      borderColor: 'border-orange-200',
      glowColor: 'shadow-orange-500/30'
    }
  ];

  const handleItemClick = (itemId: string) => {
    onNavigate(itemId);
  };

  return (
    // Enhanced floating container with glassmorphism effect
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-2xl border-t border-gray-200/50 shadow-2xl shadow-black/10 safe-area-bottom">
      
      {/* Main Navigation Container */}
      <div className="relative max-w-lg mx-auto px-4 pb-safe pt-3">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = currentPage === item.id ? item.activeIcon : item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="relative flex flex-col items-center justify-center h-full flex-1 p-1 transition-all duration-500 group focus:outline-none"
              >
                
                {/* Enhanced Active Indicator with Gradient Glow */}
                <div
                  className={`absolute inset-0 mx-auto w-16 h-16 rounded-2xl transition-all duration-500 ease-out ${
                    isActive 
                      ? `bg-gradient-to-r ${item.color} opacity-15 scale-100 ${item.glowColor} shadow-xl` 
                      : 'opacity-0 scale-50'
                  }`}
                />
                
                {/* Enhanced Icon Container */}
                <div
                  className={`relative z-10 p-3 transition-all duration-500 ease-out group-active:scale-95 ${
                    isActive
                      ? `bg-gradient-to-r ${item.color} rounded-2xl shadow-2xl ${item.glowColor} scale-110 -translate-y-2 border-2 border-white/20` 
                      : `bg-white rounded-xl shadow-md border border-gray-100 group-hover:bg-gradient-to-br ${item.bgGradient} group-hover:border-${item.borderColor.split('-')[2]} group-hover:scale-105 group-hover:-translate-y-1`
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-all duration-300 ${
                      isActive 
                        ? 'text-white' 
                        : 'text-gray-500 group-hover:text-gray-700 group-hover:scale-110'
                    }`}
                  />
                </div>

                {/* Enhanced Label with Better Animation */}
                <span
                  className={`
                    text-xs font-bold transition-all duration-500 ease-out absolute
                    ${
                      isActive
                        ? 'opacity-100 translate-y-6 text-gray-700 scale-100' 
                        : 'opacity-0 translate-y-4 scale-90 text-gray-500'
                    }
                    group-hover:opacity-100 group-hover:translate-y-6 group-hover:scale-100
                  `}
                >
                  {item.label}
                </span>

                {/* Active Dot Indicator */}
                <div
                  className={`absolute bottom-0 w-1 h-1 rounded-full transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${item.color} scale-100 opacity-100`
                      : 'scale-0 opacity-0'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Enhanced Background Glow Effect */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* Floating Navigation Indicator */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-60 shadow-lg" />
      </div>
    </div>
  );
};

export default BottomBar;