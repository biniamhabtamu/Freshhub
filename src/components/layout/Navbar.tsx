import React, { useState, useRef, useEffect } from 'react';
import { 
    Menu, LogOut, User, Zap, Bell, ChevronDown, 
    Rocket, Settings, LifeBuoy, HeartHandshake, XCircle, FileText
} from 'lucide-react';

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
        // In a real app, you would handle token clearing, state reset, and redirection here.
    };

    return {
        logout,
        userProfile: mockUserProfile,
    };
};

// --- END MOCK DEPENDENCIES ---

interface NavbarProps {
    // These props are expected from the parent component.
    onMenuToggle: () => void;
    onProfileClick: () => void; // A placeholder for an action when clicking the profile area
}

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle, onProfileClick }) => {
    const { logout, userProfile } = useAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const notificationsRef = useRef<HTMLDivElement>(null);

    // Mock notifications data with 'type' for custom icons
    const notifications = [
        { id: 1, text: "New Quiz on Module 3: Introduction to React!", time: "5 min ago", read: false, type: 'quiz' },
        { id: 2, text: "Your badge 'Master Learner' unlocked!", time: "1 hour ago", read: false, type: 'badge' },
        { id: 3, text: "Your submission was graded (A+)", time: "2 hours ago", read: true, type: 'grade' },
        { id: 4, text: "Special Offer: 50% off Annual Premium", time: "1 day ago", read: true, type: 'promo' },
    ];

    const handleLogout = async () => {
        try {
            await logout();
            // Optional: Add state redirection or alert here
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const getInitials = (name: string | undefined) => {
        if (!name) return 'U';
        // Gets first two initials
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    // Helper to get thematic icons for notifications
    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'quiz':
                return <FileText className="h-4 w-4 text-purple-500" />;
            case 'badge':
                return <Zap className="h-4 w-4 text-yellow-500" />;
            case 'grade':
                return <HeartHandshake className="h-4 w-4 text-green-500" />;
            default:
                return <Bell className="h-4 w-4 text-gray-500" />;
        }
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
        // Main Navbar: White background with blur, vibrant shadow
        <nav className="bg-white/95 backdrop-blur-md shadow-2xl shadow-red-500/10 sticky top-0 z-50 border-b border-red-100/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* LEFT SIDE: Menu Button and Logo */}
                    <div className="flex items-center space-x-3 sm:space-x-4">
                        
                        {/* Animated Menu Button (Mobile) */}
                        <button 
                            onClick={onMenuToggle}
                            className="p-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 lg:hidden group relative overflow-hidden active:scale-95"
                            aria-label="Toggle Menu"
                        >
                            <Menu className="h-6 w-6 relative z-10 transform group-hover:scale-110 transition-transform" />
                        </button>
                        
                        {/* Enhanced Logo Section */}
                        <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}> 
                            
                            {/* Animated Logo Icon (Rocket) */}
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-red-500 via-orange-600 to-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/50 group-hover:shadow-xl group-hover:shadow-orange-500/60 transition-all duration-300 group-hover:rotate-6">
                                    <Rocket className="text-white h-6 w-6 transform group-hover:scale-110" />
                                </div>
                                {/* Premium Zap Badge */}
                                {userProfile?.isPremium && (
                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                        <Zap className="h-3 w-3 text-white" fill="currentColor" />
                                    </div>
                                )}
                            </div>
                            
                            {/* Company Name/Title */}
                            <div className="flex flex-col">
                                <h1 className="text-3xl font-extrabold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent leading-tight tracking-tight">
                                    Elevate Hub
                                </h1>
                                <p className="text-xs text-gray-500 hidden sm:block tracking-wider font-medium">
                                    Your Learning Launchpad
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
                                className="p-3 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 relative group active:scale-95"
                                aria-label="Notifications"
                            >
                                <Bell className="h-6 w-6 transform group-hover:scale-110 transition-transform" />
                                {unreadNotifications > 0 && (
                                    // Custom Unread Count Badge
                                    <span className="absolute top-1.5 right-1.5 block h-4 w-4 rounded-full ring-2 ring-white bg-red-500 text-white text-xs font-bold flex items-center justify-center p-1 animate-pulse">
                                        {unreadNotifications}
                                    </span>
                                )}
                            </button>

                            {/* Notifications Dropdown Menu */}
                            {isNotificationsOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                                        <h3 className="text-lg font-bold text-gray-900">Activity Center</h3>
                                        <p className="text-sm font-semibold text-red-600">{unreadNotifications} New</p>
                                    </div>
                                    
                                    <div className="max-h-96 overflow-y-auto">
                                        {notifications.map((notification) => (
                                            <div 
                                                key={notification.id}
                                                className={`flex items-start space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors border-l-4 ${
                                                    notification.read ? 'border-transparent' : 'border-red-500 bg-red-50/50'
                                                } cursor-pointer`}
                                            >
                                                <div className="pt-1 flex-shrink-0">
                                                    {getNotificationIcon(notification.type)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className={`text-sm ${notification.read ? 'text-gray-700 font-normal' : 'font-semibold text-gray-900'}`}>{notification.text}</p>
                                                    <p className="text-xs text-gray-500 mt-0.5">{notification.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="px-4 py-2 border-t border-gray-100">
                                        <button className="w-full text-center text-sm font-bold text-red-600 hover:text-red-700 py-1 transition-colors">
                                            Mark All as Read
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Enhanced User Profile Dropdown Button */}
                        <div className="relative" ref={profileRef}>
                            <button 
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center space-x-2 py-2 pl-2 pr-4 bg-white border-2 border-gray-100 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-red-500/15 hover:border-orange-200 focus:outline-none focus:ring-4 focus:ring-red-200/50 active:scale-[0.98] group"
                                aria-label="User Profile Menu"
                            >
                                {/* Enhanced Avatar with Status */}
                                <div className="relative">
                                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                        <span className="text-white text-sm font-extrabold">
                                            {getInitials(userProfile?.name)}
                                        </span>
                                    </div>
                                    {/* Online Status Indicator with subtle animation */}
                                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white animate-pulse-slow"></div>
                                </div>

                                {/* User Info (Desktop) */}
                                <div className="hidden sm:flex items-center space-x-3">
                                    <div className="text-left">
                                        <span className="text-sm font-extrabold text-gray-900 block leading-none">
                                            {userProfile?.name?.split(' ')[0] || 'Learner'}
                                        </span>
                                        <div className="flex items-center space-x-1 mt-1">
                                            {userProfile?.isPremium ? (
                                                <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-white text-xs px-2 py-0.5 rounded-full font-bold flex items-center space-x-1 shadow-md">
                                                    <Zap className="h-3 w-3 fill-current" />
                                                    <span>PRO</span>
                                                </span>
                                            ) : (
                                                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium">
                                                    BASIC
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    {/* Chevron icon for dropdown status */}
                                    <ChevronDown className={`h-5 w-5 text-red-500 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                                </div>

                                {/* Mobile Chevron only */}
                                <div className="sm:hidden">
                                    <ChevronDown className={`h-5 w-5 text-red-500 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                                </div>
                            </button>

                            {/* Profile Dropdown Menu Content */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-3xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                                    {/* User Header */}
                                    <div className="px-4 py-3 border-b border-gray-100">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                                                <span className="text-white font-extrabold">
                                                    {getInitials(userProfile?.name)}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-base font-bold text-gray-900 truncate">
                                                    {userProfile?.name}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    {userProfile?.email}
                                                </p>
                                                {userProfile?.isPremium && (
                                                    <div className="flex items-center space-x-1 mt-1">
                                                        <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-white text-xs px-2 py-0.5 rounded-full font-bold flex items-center space-x-1 shadow-md">
                                                            <Zap className="h-3 w-3 fill-current" />
                                                            <span>PRO MEMBER</span>
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="py-2">
                                        <button 
                                            onClick={onProfileClick} // Use prop for navigation action
                                            className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                                        >
                                            <User className="h-4 w-4 text-red-500" />
                                            <span>Profile & Progress</span>
                                        </button>
                                        <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                                            <Settings className="h-4 w-4 text-red-500" />
                                            <span>Account Settings</span>
                                        </button>
                                        <button className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                                            <LifeBuoy className="h-4 w-4 text-red-500" />
                                            <span>Help Center</span>
                                        </button>
                                    </div>

                                    {/* Logout Section */}
                                    <div className="border-t border-gray-100 pt-2">
                                        <button 
                                            onClick={handleLogout}
                                            className="w-[calc(100%-1rem)] flex items-center space-x-3 px-4 py-3 text-sm font-bold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all duration-200 shadow-lg shadow-red-500/25 mx-2 active:scale-95"
                                        >
                                            <XCircle className="h-4 w-4" />
                                            <span>End Session</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Enhanced Logout Button (Desktop-only, uses full sunset gradient) */}
                        <button 
                            onClick={handleLogout}
                            className="hidden lg:flex items-center space-x-2 px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-red-600 to-orange-500 rounded-full hover:from-red-700 hover:to-orange-600 transition-all duration-300 shadow-xl shadow-red-500/30 active:scale-[0.98] group"
                            title="Sign Out"
                        >
                            <XCircle className="h-5 w-5 transform group-hover:rotate-12 transition-transform" />
                            <span>Sign Out</span>
                        </button>
                        
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

// Note: For this component to work in a React project, you'll need to 
// ensure you have Tailwind CSS (including its JIT mode or equivalent) and 
// the 'lucide-react' icon library installed.