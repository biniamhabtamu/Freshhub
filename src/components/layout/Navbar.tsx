import React, { useState, useRef, useEffect } from 'react';
import { Menu, LogOut, User, Bell, ChevronDown, BookOpen, Settings, HelpCircle, Star, Crown } from 'lucide-react';

// --- START MOCK DEPENDENCIES for Single-File Environment ---

interface UserProfile {
  name: string;
  isPremium: boolean;
  email: string;
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
  const { logout, userProfile } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Mock notifications data
  const notifications = [
    { id: 1, text: "New assignment available", time: "5 min ago", read: false },
    { id: 2, text: "Your submission was graded", time: "1 hour ago", read: false },
    { id: 3, text: "Weekly progress report", time: "2 hours ago", read: true },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getInitials = (name: string | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <nav className="bg-white/95 backdrop-blur-lg shadow-xl shadow-teal-500/5 sticky top-0 z-50 border-b border-teal-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* LEFT SIDE: Menu Button and Logo */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Animated Menu Button */}
            <button 
              onClick={onMenuToggle}
              className="p-3 text-gray-600 hover:text-teal-600 hover:bg-gradient-to-r from-teal-50 to-green-50 rounded-2xl transition-all duration-300 lg:hidden group relative overflow-hidden"
              aria-label="Toggle Menu"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Menu className="h-6 w-6 relative z-10 transform group-hover:scale-110 transition-transform" />
            </button>
            
            {/* Enhanced Logo Section */}
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}> 
              
              {/* Animated Logo Icon */}
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 via-teal-600 to-green-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-teal-500/30 group-hover:shadow-xl group-hover:shadow-teal-500/40 transition-all duration-300 group-hover:scale-105">
                  <BookOpen className="text-white h-6 w-6" />
                </div>
                {/* Premium Crown Badge */}
                {userProfile?.isPremium && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <Crown className="h-3 w-3 text-yellow-800" fill="currentColor" />
                  </div>
                )}
              </div>
              
              <div className="flex flex-col">
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent leading-tight">
                  Remedial Hub
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block tracking-wide">
                  Elevate Your Learning Journey
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Actions and Profile */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Enhanced Notifications with Dropdown */}
            <div className="relative" ref={notificationsRef}>
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-3 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-2xl transition-all duration-300 relative group"
                aria-label="Notifications"
              >
                <Bell className="h-6 w-6 transform group-hover:scale-110 transition-transform" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-2 right-2 block h-3 w-3 rounded-full ring-2 ring-white bg-red-500 animate-pulse" />
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                    <p className="text-sm text-gray-500">{unreadNotifications} unread</p>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 transition-colors border-l-2 ${
                          notification.read ? 'border-transparent' : 'border-orange-500 bg-orange-50/50'
                        }`}
                      >
                        <p className="text-sm font-medium text-gray-900">{notification.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="px-4 py-2 border-t border-gray-100">
                    <button className="w-full text-center text-sm text-teal-600 font-medium hover:text-teal-700 py-2">
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced User Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 py-2 pl-2 pr-3 bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10 hover:border-teal-200 focus:outline-none focus:ring-4 focus:ring-teal-200/50 active:scale-[0.98] group"
                aria-label="User Profile Menu"
              >
                {/* Enhanced Avatar with Status */}
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <span className="text-white text-sm font-bold">
                      {getInitials(userProfile?.name)}
                    </span>
                  </div>
                  {/* Online Status Indicator */}
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>

                {/* User Info */}
                <div className="hidden sm:flex items-center space-x-2">
                  <div className="text-left">
                    <span className="text-sm font-semibold text-gray-800 block leading-none">
                      {userProfile?.name?.split(' ')[0] || 'Learner'}
                    </span>
                    <div className="flex items-center space-x-1 mt-1">
                      {userProfile?.isPremium ? (
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 text-xs px-2 py-0.5 rounded-full font-bold flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-current" />
                          <span>PREMIUM</span>
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium">
                          FREE
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </div>

                {/* Mobile Chevron */}
                <div className="sm:hidden">
                  <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* User Header */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-green-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold">
                          {getInitials(userProfile?.name)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {userProfile?.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {userProfile?.email}
                        </p>
                        {userProfile?.isPremium && (
                          <div className="flex items-center space-x-1 mt-1">
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-yellow-900 text-xs px-2 py-0.5 rounded-full font-bold flex items-center space-x-1">
                              <Crown className="h-3 w-3 fill-current" />
                              <span>Premium Member</span>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors">
                      <User className="h-4 w-4" />
                      <span>My Profile</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 transition-colors">
                      <HelpCircle className="h-4 w-4" />
                      <span>Help & Support</span>
                    </button>
                  </div>

                  {/* Logout Section */}
                  <div className="border-t border-gray-100 pt-2">
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors rounded-lg mx-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Logout Button (Desktop) */}
            <button 
              onClick={handleLogout}
              className="hidden sm:flex items-center space-x-2 px-4 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-orange-500/25 active:scale-[0.98] group"
              title="Logout"
            >
              <LogOut className="h-4 w-4 transform group-hover:scale-110 transition-transform" />
              <span className="hidden lg:inline">Sign Out</span>
            </button>
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;