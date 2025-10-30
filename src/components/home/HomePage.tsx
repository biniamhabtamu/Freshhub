import React from 'react';
import { 
    Lock, PlayCircle, BookOpen, Trophy, 
    Zap, Crown, ChevronRight, User, 
    Star, Menu, LayoutGrid, NotebookText, 
    Dumbbell, Clock, Gift, Users, Gauge,
    Target, TrendingUp, Award, Calendar,
    Sparkles, Brain, Rocket, Activity,
    Flame, GraduationCap // Added new, thematic icons
} from 'lucide-react';

// --- START MOCK DATA/CONTEXT for Single-File Environment ---

interface UserProfile { id: string; name: string; field: string; isPremium: boolean; streak: number; }
const useAuth = () => ({ 
    userProfile: { 
        id: 'u1', 
        name: 'Alex Johnson', 
        field: 'Science', 
        isPremium: true, // Set to true for the premium styling to show up
        streak: 7
    } as UserProfile 
});

const subjects = [
    // Updated colors for a cooler, more vibrant palette
    { id: 1, name: 'Physics', icon: '⚛️', isPremium: false, color: 'from-blue-600 to-indigo-700' },
    { id: 2, name: 'Chemistry', icon: '🧪', isPremium: true, color: 'from-emerald-500 to-green-600' },
    { id: 3, name: 'Biology', icon: '🧬', isPremium: false, color: 'from-purple-500 to-fuchsia-600' },
    { id: 4, name: 'Mathematics', icon: '📐', isPremium: true, color: 'from-orange-500 to-amber-600' },
];

const getSubjectsByField = (field: string) => subjects;
const getQuestionsBySubject = (subjectName: string, field: string) => (subjectName === 'Physics' ? new Array(50) : new Array(80));

interface HomePageProps {
    onNavigate: (page: string, subject?: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    const { userProfile } = useAuth();

    if (!userProfile) return null;

    const userSubjects = getSubjectsByField(userProfile.field);

    // Get progress data
    const getSubjectProgress = (subjectName: string) => {
        if (subjectName === 'Physics') return { completed: 30, total: 50, percentage: 60 };
        if (subjectName === 'Chemistry') return { completed: 72, total: 80, percentage: 90 }; // High progress for visual effect
        if (subjectName === 'Biology') return { completed: 10, total: 80, percentage: 12 };
        if (subjectName === 'Mathematics') return { completed: 35, total: 60, percentage: 58 };
        return { completed: 0, total: 0, percentage: 0 };
    };

    const getProgressColor = (percentage: number) => {
        if (percentage === 0) return 'bg-gray-300';
        if (percentage < 30) return 'bg-gradient-to-r from-red-500 to-orange-500';
        if (percentage < 70) return 'bg-gradient-to-r from-yellow-500 to-amber-500';
        return 'bg-gradient-to-r from-teal-500 to-green-600'; // Darker green for high progress
    };

    // Calculate total progress using a weighted average for visual appeal
    const totalProgress = userSubjects.reduce((acc, subject) => {
        const progress = getSubjectProgress(subject.name);
        return acc + progress.percentage;
    }, 0);
    const totalProgressPercentage = Math.round(totalProgress / (userSubjects.length || 1));

    // Custom Card Component for Quick Actions
    const ActionCard = ({ title, icon: Icon, gradient, onClick, description }: { 
        title: string, 
        icon: React.FC<any>, 
        gradient: string, // Use gradient directly
        onClick: () => void,
        description?: string 
    }) => (
        <button 
            onClick={onClick}
            className="flex flex-col items-center justify-center p-5 bg-white rounded-3xl shadow-xl border border-gray-100/80 active:scale-[0.98] transition-all duration-300 group hover:translate-y-[-3px] hover:shadow-2xl"
        >
            <div className={`p-4 rounded-2xl ${gradient} mb-3 transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <Icon className="h-7 w-7 text-white" />
            </div>
            <span className="font-extrabold text-gray-900 text-base mb-1">{title}</span>
            {description && <span className="text-xs text-gray-500 text-center">{description}</span>}
        </button>
    );

    // Stats Card Component
    const StatsCard = ({ icon: Icon, value, label, color }: { 
        icon: React.FC<any>, 
        value: string, 
        label: string, 
        color: string 
    }) => (
        <div className="bg-white rounded-2xl p-5 shadow-xl border border-gray-100/80 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-xl ${color} shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                    <div className="font-extrabold text-gray-900 text-xl">{value}</div>
                    <div className="text-xs text-gray-500 font-medium">{label}</div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/50 pb-24">
            
            {/* --- User Header --- */}
            <div className="bg-white/95 backdrop-blur-lg border-b border-gray-200/50 px-6 py-4 sticky top-0 z-20 shadow-lg shadow-indigo-500/5">
                <div className="flex items-center justify-between max-w-6xl mx-auto">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
                                <User className="h-6 w-6 text-white" />
                            </div>
                            {userProfile.isPremium && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                    <Crown className="h-3 w-3 text-yellow-800" fill="currentColor" />
                                </div>
                            )}
                        </div>
                        <div>
                            <h1 className="font-extrabold text-gray-900 text-2xl">
                                Hello, {userProfile.name.split(' ')[0]}!
                            </h1>
                            <p className="text-gray-500 text-sm flex items-center mt-1">
                                <Flame className="h-4 w-4 mr-1 text-orange-500" />
                                **{userProfile.streak}** day streak active!
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={() => onNavigate('settings')} 
                        className="p-3 bg-gray-100/70 hover:bg-gray-200 rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                    >
                        <Menu className="h-5 w-5 text-gray-700" />
                    </button>
                </div>
            </div>

            {/* --- Main Content Area --- */}
            <div className="p-6 space-y-10 max-w-6xl mx-auto">
                
                {/* Enhanced Progress Overview - Hero Card */}
                <div className="bg-white rounded-3xl p-8 shadow-3xl border border-indigo-100/50 relative overflow-hidden">
                    {/* Animated Background Elements */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-indigo-500/15 to-purple-500/15 rounded-full transform translate-x-1/4 -translate-y-1/4 animate-pulse-slow" />
                    
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="font-extrabold text-4xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    Your Mastery Score
                                </h2>
                                <p className="text-gray-500 mt-2 text-lg font-medium">
                                    Overall progress across all your {userSubjects.length} courses.
                                </p>
                            </div>
                            <div className="w-24 h-24 flex items-center justify-center bg-gradient-to-r from-red-400 to-orange-500 text-white rounded-full shadow-2xl shadow-red-500/30 transform hover:scale-105 transition-transform duration-300">
                                <span className="text-3xl font-extrabold">{totalProgressPercentage}%</span>
                            </div>
                        </div>
                        
                        {/* Enhanced Progress Bar */}
                        <div className="space-y-3">
                            <div className="w-full bg-gray-200/80 rounded-full h-4 shadow-inner">
                                <div 
                                    className="h-4 rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 transition-all duration-1000 shadow-xl relative overflow-hidden"
                                    style={{ width: `${totalProgressPercentage}%` }}
                                >
                                    <div className={`absolute inset-0 bg-white/20 rounded-full ${totalProgressPercentage > 0 ? 'animate-pulse' : ''}`} />
                                </div>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="font-semibold text-gray-600 flex items-center">
                                    <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                                    Next milestone: 75% completion!
                                </span>
                                <button className="font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full text-xs hover:bg-indigo-100 transition-colors">
                                    View Detailed Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard icon={Gauge} value="85%" label="Average Score" color="bg-gradient-to-r from-red-500 to-pink-600" />
                    <StatsCard icon={Activity} value="3.4h" label="Weekly Focus Time" color="bg-gradient-to-r from-blue-500 to-cyan-600" />
                    <StatsCard icon={Award} value="12" label="Badges Unlocked" color="bg-gradient-to-r from-yellow-500 to-amber-600" />
                    <StatsCard icon={GraduationCap} value="Lvl 4" label="Mastery Level" color="bg-gradient-to-r from-purple-500 to-indigo-600" />
                </div>

                {/* Quick Actions */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-extrabold text-gray-900 text-3xl flex items-center">
                            <Rocket className="h-7 w-7 mr-3 text-red-500" />
                            Launch Pad
                        </h3>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        <ActionCard 
                            title="Daily Practice" 
                            icon={Dumbbell} 
                            gradient="bg-gradient-to-r from-red-500 to-pink-500" 
                            description="Maintain your streak"
                            onClick={() => onNavigate('practice')}
                        />
                        <ActionCard 
                            title="Interactive Chat" 
                            icon={Brain} 
                            gradient="bg-gradient-to-r from-blue-500 to-indigo-500" 
                            description="Ask the AI Tutor"
                            onClick={() => onNavigate('chat')}
                        />
                        <ActionCard 
                            title="Scheduled Quiz" 
                            icon={Calendar} 
                            gradient="bg-gradient-to-r from-green-500 to-teal-500" 
                            description="Upcoming assessments"
                            onClick={() => onNavigate('quizzes')}
                        />
                        <ActionCard 
                            title="Gift Rewards" 
                            icon={Gift} 
                            gradient="bg-gradient-to-r from-amber-500 to-orange-500" 
                            description="Claim your points"
                            onClick={() => onNavigate('rewards')}
                        />
                    </div>
                </div>

                {/* Enhanced Subjects Section */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-extrabold text-gray-900 text-3xl flex items-center">
                            <BookOpen className="h-7 w-7 mr-3 text-indigo-600" />
                            My Courses
                        </h3>
                        <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center" onClick={() => onNavigate('catalog')}>
                            Browse Catalog
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {userSubjects.map((subject) => {
                            const progress = getSubjectProgress(subject.name);
                            const isAccessible = !subject.isPremium || userProfile.isPremium;
                            const questionsCount = getQuestionsBySubject(subject.name, userProfile.field).length;

                            return (
                                <button
                                    key={subject.id}
                                    onClick={() => isAccessible && onNavigate('subject', subject.name)}
                                    className={`
                                        w-full text-left bg-white rounded-3xl p-6 shadow-xl border-2 border-gray-100 
                                        transition-all duration-300 group
                                        ${isAccessible 
                                            ? 'hover:shadow-2xl hover:border-indigo-200 active:scale-[0.99] hover:translate-y-[-3px]' 
                                            : 'opacity-70 cursor-not-allowed'
                                        }
                                    `}
                                >
                                    <div className="flex items-center space-x-5">
                                        {/* Enhanced Subject Icon */}
                                        <div className={`flex-shrink-0 p-4 rounded-xl bg-gradient-to-br ${subject.color} shadow-2xl transform group-hover:scale-105 transition-transform duration-300`}>
                                            <span className="text-3xl">{subject.icon}</span>
                                        </div>

                                        {/* Subject Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h4 className={`font-extrabold text-2xl truncate ${isAccessible ? 'text-gray-900' : 'text-gray-500'}`}>
                                                    {subject.name}
                                                </h4>
                                                {!isAccessible && (
                                                    <div className="flex items-center space-x-1 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold">
                                                        <Lock className="h-3 w-3" />
                                                        <span>LOCKED</span>
                                                    </div>
                                                )}
                                                {subject.isPremium && isAccessible && (
                                                    <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-bold">
                                                        <Star className="h-3 w-3 fill-current text-yellow-500" />
                                                        <span>PREMIUM</span>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                                                <div className="flex items-center space-x-1">
                                                    <Activity className="h-4 w-4" />
                                                    <span>**{questionsCount}** total modules</span>
                                                </div>
                                                {progress.percentage > 0 && (
                                                    <div className="flex items-center space-x-1 text-green-600 font-semibold">
                                                        <Trophy className="h-4 w-4" />
                                                        <span>**{progress.completed}** completed</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Enhanced Progress Bar */}
                                            {isAccessible && progress.total > 0 && (
                                                <div className="space-y-2">
                                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                        <div
                                                            className={`h-2.5 rounded-full ${getProgressColor(progress.percentage)} transition-all duration-1000 shadow-inner`}
                                                            style={{ width: `${progress.percentage}%` }}
                                                        />
                                                    </div>
                                                    <div className="flex justify-between items-center text-xs">
                                                        <span className="font-semibold text-gray-600">Mastery Progress</span>
                                                        <span className="font-extrabold text-indigo-600">{progress.percentage}%</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Right Side: Navigation Arrow */}
                                        {isAccessible && (
                                            <div className="flex-shrink-0">
                                                <div className="p-3 bg-gray-100 rounded-full group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors duration-300">
                                                    <ChevronRight className="h-6 w-6 transform group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Enhanced Premium CTA (Only visible if NOT Premium) */}
                {!userProfile.isPremium && (
                    <div className="bg-gradient-to-r from-red-500 via-pink-600 to-purple-600 rounded-3xl p-8 text-white shadow-3xl relative overflow-hidden">
                        
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10" />
                        
                        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
                            <div className="flex items-center space-x-5">
                                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm shadow-xl">
                                    <Zap className="h-8 w-8 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-extrabold text-3xl mb-1">Go Pro and Maximize Learning! 💎</h4>
                                    <p className="text-white/90 text-md max-w-lg">
                                        Unlock all **premium subjects**, **AI-driven insights**, and advanced learning tools to boost your mastery score faster.
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={() => onNavigate('premium')}
                                className="bg-white text-purple-600 px-8 py-3 rounded-full font-bold text-lg hover:scale-[1.05] active:scale-[0.98] transition-transform shadow-2xl flex-shrink-0 flex items-center space-x-2"
                            >
                                <Crown className="h-5 w-5 fill-current text-yellow-500" />
                                <span>Upgrade Now</span>
                            </button>
                        </div>
                    </div>
                )}
                
                {/* Enhanced Community Card */}
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100/80 hover:shadow-2xl transition-all duration-300 group cursor-pointer hover:translate-y-[-3px]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="p-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-300">
                                <Users className="h-7 w-7 text-white" />
                            </div>
                            <div>
                                <p className="font-extrabold text-gray-900 text-2xl mb-1">Peer Collaboration</p>
                                <p className="text-gray-500 text-md">Find study partners or join group challenges to solidify concepts.</p>
                            </div>
                        </div>
                        <div className="p-3 bg-gray-100 rounded-full group-hover:bg-teal-100 group-hover:text-teal-600 transition-colors duration-300">
                            <ChevronRight className="h-6 w-6 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;