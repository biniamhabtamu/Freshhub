// components/layout/BottomBar.tsx
import React from 'react';
import { 
  Sparkles, 
  Crown,
    // NEW ICONS
  LayoutGrid, // For Home/Dashboard
  NotebookText, // For Inactive Notes
  NotebookPen, // For Active Notes
  MonitorPlay, // For Tutorial/Video
  Trophy, // For Inactive Rank
  CircleUser, // For Profile
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
      icon: LayoutGrid, // Dashboard/Grid View
      activeIcon: Sparkles, // Keep Sparkles for active Home/Featured
      color: 'from-blue-500 to-cyan-500',
      gradient: 'bg-gradient-to-r from-blue-600 to-cyan-400'
    },
    {
      id: 'notes',
      label: 'Notes',
      icon: NotebookText, // Clear Notebook icon
      activeIcon: NotebookPen, // Notebook with a Pen for Active
      color: 'from-purple-500 to-pink-500',
      gradient: 'bg-gradient-to-r from-purple-600 to-pink-400'
    },
    {
      id: 'chat', // Corresponds to the Tutorial Page
      label: 'Tutorial',
      icon: MonitorPlay, // Monitor with a Play button for Video Lessons
      activeIcon: MonitorPlay, 
      color: 'from-green-500 to-emerald-500',
      gradient: 'bg-gradient-to-r from-green-500 to-emerald-400'
    },
    {
      id: 'leaderboard',
      label: 'Rank',
      icon: Trophy, // Trophy icon for Rank/Leaderboard
      activeIcon: Crown, // Crown for the top rank
      color: 'from-yellow-500 to-orange-500',
      gradient: 'bg-gradient-to-r from-amber-500 to-orange-500'
    },
    {
      id: 'profile',
      label: 'Me',
      icon: CircleUser, // Cleaner, contained user icon
      activeIcon: CircleUser,
      color: 'from-orange-500 to-red-500',
      gradient: 'bg-gradient-to-r from-red-500 to-pink-500'
    }
  ];

  const handleItemClick = (itemId: string) => {
    onNavigate(itemId);
  };

  return (
    // Floating container with backdrop blur and strong shadow
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-2xl safe-area-bottom">
      
      <div className="relative max-w-lg mx-auto px-2 pb-safe pt-2">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = currentPage === item.id ? item.activeIcon : item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="relative flex flex-col items-center justify-center h-full flex-1 p-1 transition-all duration-300 group focus:outline-none"
              >
                
                {/* Active Indicator Pill (Subtle Background Glow) */}
                <div
                  className={`absolute inset-0 mx-auto w-14 rounded-full transition-all duration-300 ease-in-out ${
                    isActive ? `${item.gradient} opacity-20 scale-y-100` : 'opacity-0 scale-y-0'
                  }`}
                />
                
                {/* Icon Container (The floating active icon) */}
                <div
                  className={`relative z-10 p-2 transition-all duration-300 ${
                    isActive
                      ? `${item.gradient} rounded-full shadow-lg shadow-gray-500/20 scale-110` 
                      : 'bg-transparent'
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
                    }`}
                  />
                </div>

                {/* Label (Only visible when inactive for a cleaner look) */}
                <span
                  className={`
                    text-xs font-semibold mt-0.5 transition-all duration-300 absolute bottom-1.5
                    ${
                      isActive
                        ? 'opacity-0 translate-y-2' 
                        : 'text-gray-500 group-hover:text-gray-700 opacity-100 translate-y-0'
                    }
                  `}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomBar;