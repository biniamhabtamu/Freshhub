import React, { useState, useRef, useEffect } from 'react';
import { 
    Menu, LogOut, User, Bell, ChevronDown, 
    Rocket, Settings, HelpCircle, X
} from 'lucide-react';

// Mock data
interface UserProfile {
    name: string;
    isPremium: boolean;
    email: string;
}

interface AuthContextType {
    logout: () => Promise<void>;
    userProfile?: UserProfile;
}

const useAuth = (): AuthContextType => {
    const mockUserProfile: UserProfile = {
        name: "Alex Johnson",
        isPremium: true,
        email: "alex.johnson@example.com"
    };

    const logout = async () => {
        console.log("Logging out...");
    };

    return {
        logout,
        userProfile: mockUserProfile,
    };
};

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

    // Simplified notifications data
    const notifications = [
        { id: 1, text: "New Quiz: Module 3", time: "5 min ago", read: false },
        { id: 2, text: "Badge unlocked!", time: "1 hour ago", read: false },
        { id: 3, text: "Submission graded (A+)", time: "2 hours ago", read: true },
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
        <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200 sticky top-0 z-50">
            <div className="px-4 sm:px-6">
                <div className="flex justify-between items-center h-16">

                    {/* LEFT SIDE: Menu and Logo */}
                    <div className="flex items-center space-x-3">
                        
                        {/* Mobile Menu Button */}
                        <button 
                            onClick={onMenuToggle}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors lg:hidden"
                            aria-label="Toggle Menu"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                        
                        {/* Logo Section */}
                        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}> 
                            
                            {/* Logo Icon */}
                            <div className="relative">
                                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center shadow-md">
                                    <Rocket className="text-white h-5 w-5" />
                                </div>
                            </div>
                            
                            {/* App Name */}
                            <div className="flex flex-col">
                                <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent leading-tight">
                                    Elevate
                                </h1>
                                <p className="text-xs text-gray-500 hidden sm:block font-medium">
                                    Learning Platform
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE: Actions and Profile */}
                    <div className="flex items-center space-x-2">
                        
                        {/* Notifications */}
                        <div className="relative" ref={notificationsRef}>
                            <button 
                                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors relative"
                                aria-label="Notifications"
                            >
                                <Bell className="h-5 w-5" />
                                {unreadNotifications > 0 && (
                                    <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                                )}
                            </button>

                            {/* Notifications Dropdown */}
                            {isNotificationsOpen && (
                                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50">
                                    <div className="px-4 py-2 border-b border-gray-200">
                                        <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                                        {unreadNotifications > 0 && (
                                            <p className="text-xs text-red-600 font-medium">{unreadNotifications} unread</p>
                                        )}
                                    </div>
                                    
                                    <div className="max-h-64 overflow-y-auto">
                                        {notifications.map((notification) => (
                                            <div 
                                                key={notification.id}
                                                className={`flex items-start space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors ${
                                                    !notification.read ? 'bg-blue-50' : ''
                                                }`}
                                            >
                                                <div className="flex-1 min-w-0">
                                                    <p className={`text-sm ${notification.read ? 'text-gray-600' : 'font-medium text-gray-900'}`}>
                                                        {notification.text}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-0.5">{notification.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* User Profile */}
                        <div className="relative" ref={profileRef}>
                            <button 
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center space-x-2 p-1 bg-white border border-gray-200 rounded-lg transition-colors hover:border-red-200 hover:bg-red-50 group"
                                aria-label="User Profile Menu"
                            >
                                {/* Avatar */}
                                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-sm">
                                    <span className="text-white text-xs font-bold">
                                        {getInitials(userProfile?.name)}
                                    </span>
                                </div>

                                {/* Desktop User Info */}
                                <div className="hidden sm:flex items-center space-x-2">
                                    <div className="text-left">
                                        <span className="text-sm font-medium text-gray-900 block">
                                            {userProfile?.name?.split(' ')[0]}
                                        </span>
                                        {userProfile?.isPremium && (
                                            <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                                                PRO
                                            </span>
                                        )}
                                    </div>
                                    <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                                </div>

                                {/* Mobile Chevron */}
                                <div className="sm:hidden">
                                    <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                                </div>
                            </button>

                            {/* Profile Dropdown */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50">
                                    {/* User Header */}
                                    <div className="px-3 py-2 border-b border-gray-200">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                                                <span className="text-white text-xs font-bold">
                                                    {getInitials(userProfile?.name)}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {userProfile?.name}
                                                </p>
                                                <p className="text-xs text-gray-500 truncate">
                                                    {userProfile?.email}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="py-1">
                                        <button 
                                            onClick={onProfileClick}
                                            className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                        >
                                            <User className="h-4 w-4 text-gray-500" />
                                            <span>Profile</span>
                                        </button>
                                        <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                                            <Settings className="h-4 w-4 text-gray-500" />
                                            <span>Settings</span>
                                        </button>
                                        <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                                            <HelpCircle className="h-4 w-4 text-gray-500" />
                                            <span>Help</span>
                                        </button>
                                    </div>

                                    {/* Logout Section */}
                                    <div className="border-t border-gray-200 pt-1">
                                        <button 
                                            onClick={handleLogout}
                                            className="w-full flex items-center space-x-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                                        >
                                            <X className="h-4 w-4" />
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Desktop Logout Button */}
                        <button 
                            onClick={handleLogout}
                            className="hidden lg:flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                            title="Sign Out"
                        >
                            <X className="h-4 w-4" />
                            <span>Sign Out</span>
                        </button>
                        
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;