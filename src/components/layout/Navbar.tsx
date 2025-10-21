import React from 'react';
import { Menu, LogOut, User, Bell, ChevronDown } from 'lucide-react'; // Added ChevronDown for dropdown visual
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  onMenuToggle: () => void;
  onProfileClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle, onProfileClick }) => {
  const { logout, userProfile } = useAuth();

  const handleLogout = async () => {
    try {
      // In a real app, you might confirm with the user here
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Function to get initials for the avatar
  const getInitials = (name: string | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <nav className="bg-white shadow-xl border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LEFT SIDE: Menu Button (Mobile) and Logo/Title */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Menu Button (Visible on mobile, hidden on large screens if a permanent sidebar is used) */}
            <button 
              onClick={onMenuToggle}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors lg:hidden" // Hidden on large screens (lg)
              aria-label="Toggle Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            {/* Logo and Title */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onMenuToggle()}> {/* Optional: Add home navigation to logo click */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-extrabold text-sm sm:text-lg">FH</span>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">Remedial-Hub</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Exam Preparation</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Actions and Profile */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Notifications Button */}
            <button 
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {/* Optional: Add a notification dot */}
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500" />
            </button>

            {/* User Profile Dropdown Button (Enhanced) */}
            <button 
              onClick={onProfileClick}
              className="flex items-center space-x-2 py-1.5 px-2 bg-gray-100 rounded-full transition-all duration-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="User Profile Menu"
            >
              {/* Avatar */}
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-semibold">
                  {getInitials(userProfile?.name)}
                </span>
              </div>

              {/* Name and Status (Hidden on small mobile) */}
              <div className="hidden sm:flex items-center space-x-1.5">
                <span className="text-sm font-medium text-gray-800 truncate max-w-[100px]">
                  {userProfile?.name?.split(' ')[0] || 'User'}
                </span>
                {userProfile?.isPremium && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-bold hidden md:inline-block">
                    PRO
                  </span>
                )}
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>

              {/* Only ChevronDown on small mobile when name is hidden */}
              <div className="sm:hidden">
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </button>

            {/* Logout Button (Enhanced with text label on desktop) */}
            <button 
              onClick={handleLogout}
              className="hidden sm:flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-600 bg-red-50 rounded-lg hover:bg-red-100 hover:text-red-700 transition-colors"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden md:inline">Logout</span> {/* Hidden on tablet/mobile, shown on desktop */}
            </button>

            {/* Logout Button (Icon-only for small screens) */}
            <button 
              onClick={handleLogout}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors sm:hidden"
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;