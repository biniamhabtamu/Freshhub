import React, { useState, useRef, useEffect } from 'react';
import { Menu, LogOut, User, Bell, ChevronDown, BookOpen, Settings } from 'lucide-react';

// --- START MOCK DEPENDENCIES for Single-File Environment ---
// No changes were made to your mock auth setup.

interface UserProfile {
  name: string;
  isPremium: boolean;
  email?: string; // Added email for the dropdown
}

interface AuthContextType {
    logout: () => Promise<void>;
    userProfile?: UserProfile;
}

// Mock implementation of useAuth for single-file environment
const useAuth = (): AuthContextType => {
    const mockUserProfile: UserProfile = {
        name: "Alex Johnson",
        isPremium: true,
        email: "alex.johnson@example.com"
    };

    const logout = async () => {
        console.log("Mock Logout: Simulating user sign out.");
        // In a real app, this would redirect or update app state
    };

    return {
        logout,
        userProfile: mockUserProfile,
    };
};

// --- END MOCK DEPENDENCIES ---

/**
 * A custom hook to detect clicks outside of a specified element.
 * @param {React.RefObject<HTMLElement>} ref - The ref of the element to track.
 * @param {Function} handler - The function to call when a click outside is detected.
 */
const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]); // Re-run if ref or handler changes
};


interface NavbarProps {
  /** Function to toggle the main mobile sidebar */
  onMenuToggle: () => void;
  /** Function to handle clicks on the "View Profile" item */
  onProfileClick: () => void;
}

/**
 * A responsive and attractive navbar component.
 * On mobile, it features a clean layout with a consolidated profile menu.
 * On desktop, it displays top-level actions for notifications and logout.
 */
const Navbar: React.FC<NavbarProps> = ({ onMenuToggle, onProfileClick }) => {
  const { logout, userProfile } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown container

  // Use the custom hook to close the dropdown when clicking outside
  useClickOutside(dropdownRef, () => setIsProfileOpen(false));

  const handleLogout = async () => {
    try {
      setIsProfileOpen(false); // Close dropdown on logout
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
      // Handle logout error (e.g., show a notification)
    }
  };

  const getInitials = (name: string | undefined) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };
  
  const handleProfileItemClick = () => {
    setIsProfileOpen(false); // Close dropdown
    onProfileClick(); // Call parent handler
  }

  return (
    // Main navbar: glassmorphism effect, sticky, with a subtle bottom border
    <nav className="bg-white/90 backdrop-blur-lg shadow-md shadow-gray-200/40 sticky top-0 z-50 border-b border-gray-200/75">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* LEFT SIDE: Menu Button (Mobile) and Logo/Title */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Mobile Menu Button (Hamburger) */}
            <button
              onClick={onMenuToggle}
              className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-colors duration-200 lg:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="Toggle Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            {/* Logo and Title */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => {/* Navigate to home? */}}> 
              <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30">
                <BookOpen className="text-white h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-serif font-bold text-gray-900">Remedial Hub</h1>
                {/* <p className="text-xs text-gray-500 hidden sm:block">Your learning partner</p> */}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Actions and Profile */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Desktop-Only Notifications Button */}
            <button 
              className="hidden sm:inline-flex p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors duration-200 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              aria-label="Notifications"
            >
              <Bell className="h-6 w-6" />
              {/* Notification dot */}
              <span className="absolute top-2.5 right-2.5 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500" />
            </button>

            {/* Desktop-Only Logout Button */}
            <button 
              onClick={handleLogout}
              className="hidden sm:flex items-center space-x-2 px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 shadow-sm"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden lg:inline">Sign Out</span>
            </button>

            {/* Profile Dropdown (Visible on ALL screen sizes) */}
            <div className="relative" ref={dropdownRef}>
              
              {/* Profile Button (Avatar) - Toggles the dropdown */}
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50"
                aria-label="User Profile Menu"
                aria-expanded={isProfileOpen}
                aria-haspopup="true"
              >
                <div className={`w-11 h-11 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${isProfileOpen ? 'border-white' : 'border-transparent'} shadow-md transition-all`}>
                  <span className="text-white text-base font-medium">
                    {getInitials(userProfile?.name)}
                  </span>
                </div>
                
                {/* Desktop-only Name and Chevron */}
                <div className="hidden sm:flex items-center space-x-1">
                  <span className="text-sm font-medium text-gray-800 truncate max-w-[100px]">
                    {userProfile?.name?.split(' ')[0] || 'Learner'}
                  </span>
                  <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute right-0 mt-3 w-72 origin-top-right bg-white rounded-2xl shadow-2xl shadow-gray-400/30 ring-1 ring-gray-200/75 focus:outline-none transition-all duration-200 ease-out
                  ${isProfileOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
              >
                {/* User Info Header */}
                <div className="p-4 border-b border-gray-200/75" role="none">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-base font-medium">
                        {getInitials(userProfile?.name)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate" role="none">
                        {userProfile?.name || 'Guest User'}
                      </p>
                      <p className="text-sm text-gray-500 truncate" role="none">
                        {userProfile?.email || 'No email provided'}
                      </p>
                    </div>
                  </div>
                  {userProfile?.isPremium && (
                    <span className="mt-3 block bg-yellow-100 text-yellow-800 text-xs px-2.5 py-1 rounded-full font-bold text-center">
                      PREMIUM MEMBER
                    </span>
                  )}
                </div>

                {/* Dropdown Items */}
                <div className="p-2" role="none">
                  {/* Mobile-Only Notifications Item */}
                  <a
                    href="#"
                    className="flex sm:hidden items-center justify-between px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150"
                    role="menuitem"
                  >
                    <div className="flex items-center space-x-3">
                      <Bell className="w-5 h-5 text-gray-500" />
                      <span>Notifications</span>
                    </div>
                    <span className="block h-2 w-2 rounded-full ring-2 ring-gray-100 bg-red-500" />
                  </a>

                  {/* Profile Item (All Screens) */}
                  <button
                    onClick={handleProfileItemClick}
                    className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150"
                    role="menuitem"
                  >
                    <User className="w-5 h-5 text-gray-500" />
                    <span>View Profile</span>
                  </button>

                  {/* Settings Item (Example) */}
                  <a
                    href="#"
                    className="flex items-center space-x-3 px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150"
                    role="menuitem"
                  >
                    <Settings className="w-5 h-5 text-gray-500" />
                    <span>Settings</span>
                  </a>
                </div>
                
                {/* Mobile-Only Logout */}
                <div className="p-2 border-t border-gray-200/75 sm:hidden" role="none">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 hover:text-red-700 transition-colors duration-150"
                    role="menuitem"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </nav>
  );
};

// You would typically have a main App component to render this
// For single-file, we just export it.
export default Navbar;
