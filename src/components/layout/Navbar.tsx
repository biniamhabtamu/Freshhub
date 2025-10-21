import React from 'react';
import { Menu, LogOut, User, Bell, ChevronDown, BookOpen } from 'lucide-react'; 
// The import for useAuth has been removed and mocked below for single-file compilation.

// --- START MOCK DEPENDENCIES for Single-File Environment ---

interface UserProfile {
  name: string;
  isPremium: boolean;
}

interface AuthContextType {
    logout: () => Promise<void>;
    userProfile?: UserProfile;
}

// Mock implementation of useAuth for single-file environment
const useAuth = (): AuthContextType => {
    // Provide some default/mock user data for visual testing
    const mockUserProfile: UserProfile = {
        name: "Alex Johnson",
        isPremium: true,
    };

    const logout = async () => {
        // In a real application, this would handle sign-out logic
        console.log("Mock Logout: Simulating user sign out.");
    };

    return {
        logout,
        userProfile: mockUserProfile,
    };
};

// --- END MOCK DEPENDENCIES ---


interface NavbarProps {
  onMenuToggle: () => void;
  onProfileClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle, onProfileClick }) => {
  // Now using the locally defined mock useAuth
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
    // Simplified initial fetching
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    // Updated background for a subtle glassmorphism effect and softer shadow
    <nav className="bg-white/95 backdrop-blur-sm shadow-lg shadow-gray-100/50 sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20"> {/* Slightly taller navbar */}

          {/* LEFT SIDE: Menu Button (Mobile) and Logo/Title */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Menu Button (Visible on mobile) */}
            <button 
              onClick={onMenuToggle}
              // Teal hover and softer rounded shape
              className="p-3 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-colors lg:hidden"
              aria-label="Toggle Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            {/* Logo and Title */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onMenuToggle()}> 
              
              {/* Logo Icon - Warm Gradient and large rounded shape */}
              <div className="w-10 h-10 bg-gradient-to-tr from-teal-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md shadow-teal-500/30">
                <BookOpen className="text-white h-5 w-5" />
              </div>
              
              <div>
                {/* Font-serif for a more unique, non-standard look */}
                <h1 className="text-xl sm:text-2xl font-serif font-extrabold text-gray-900 leading-tight">The Study Almanac</h1>
                <p className="text-sm text-gray-500 hidden sm:block">Knowledge Hub</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Actions and Profile */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            
            {/* Notifications Button - Warmer orange hover */}
            <button 
              className="p-3 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="h-6 w-6" />
              {/* Notification dot */}
              <span className="absolute top-2 right-2 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500" />
            </button>

            {/* User Profile Dropdown Button (Softer, more pronounced button style) */}
            <button 
              onClick={onProfileClick}
              // Rounded-2xl and a subtle shadow on hover
              className="flex items-center space-x-2 py-2 px-3 bg-white border border-gray-200 rounded-2xl transition-all duration-200 hover:shadow-md hover:shadow-teal-500/10 focus:outline-none focus:ring-4 focus:ring-teal-200/50 active:scale-[0.99]"
              aria-label="User Profile Menu"
            >
              {/* Avatar - Teal background */}
              <div className="w-9 h-9 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-semibold">
                  {getInitials(userProfile?.name)}
                </span>
              </div>

              {/* Name and Status (Hidden on small mobile) */}
              <div className="hidden sm:flex items-center space-x-1.5">
                <span className="text-sm font-medium text-gray-800 truncate max-w-[100px]">
                  {userProfile?.name?.split(' ')[0] || 'Learner'}
                </span>
                {userProfile?.isPremium && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-bold hidden md:inline-block">
                    PREMIUM
                  </span>
                )}
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>

              {/* Only ChevronDown on small mobile when name is hidden */}
              <div className="sm:hidden">
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </button>

            {/* Logout Button (Enhanced with text label on desktop) - Warmer color palette */}
            <button 
              onClick={handleLogout}
              className="hidden sm:flex items-center space-x-1 px-4 py-2 text-sm font-bold text-orange-700 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors shadow-sm"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden lg:inline">Sign Out</span> {/* Hidden on tablet, shown on large desktop */}
            </button>

            {/* Logout Button (Icon-only for small screens) */}
            <button 
              onClick={handleLogout}
              className="p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors sm:hidden"
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
