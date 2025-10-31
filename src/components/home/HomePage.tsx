import React from 'react';
import { 
    Lock, PlayCircle, BookOpen, Trophy, 
    Zap, Crown, ChevronRight, User, 
    Star, Menu, Dumbbell, Clock, 
    Gift, Users, Gauge, Target, 
    TrendingUp, Award, Calendar,
    Sparkles, Brain, Rocket, Activity,
    Flame, GraduationCap, ArrowRight
} from 'lucide-react';

// Mock data
interface UserProfile { id: string; name: string; field: string; isPremium: boolean; streak: number; }
const useAuth = () => ({ 
    userProfile: { 
        id: 'u1', 
        name: 'Alex Johnson', 
        field: 'Science', 
        isPremium: true,
        streak: 7
    } as UserProfile 
});

const subjects = [
    { id: 1, name: 'Physics', icon: '⚛️', isPremium: false, color: 'from-blue-500 to-indigo-600', bgColor: 'bg-gradient-to-br from-blue-500/10 to-indigo-600/10' },
    { id: 2, name: 'Chemistry', icon: '🧪', isPremium: true, color: 'from-emerald-500 to-green-500', bgColor: 'bg-gradient-to-br from-emerald-500/10 to-green-500/10' },
    { id: 3, name: 'Biology', icon: '🧬', isPremium: false, color: 'from-purple-500 to-fuchsia-500', bgColor: 'bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10' },
    { id: 4, name: 'Mathematics', icon: '📐', isPremium: true, color: 'from-orange-500 to-amber-500', bgColor: 'bg-gradient-to-br from-orange-500/10 to-amber-500/10' },
];

const getSubjectsByField = (field: string) => subjects;

interface HomePageProps {
    onNavigate: (page: string, subject?: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    const { userProfile } = useAuth();
    const userSubjects = getSubjectsByField(userProfile.field);

    // Progress data
    const getSubjectProgress = (subjectName: string) => {
        if (subjectName === 'Physics') return { completed: 30, total: 50, percentage: 60 };
        if (subjectName === 'Chemistry') return { completed: 72, total: 80, percentage: 90 };
        if (subjectName === 'Biology') return { completed: 10, total: 80, percentage: 12 };
        if (subjectName === 'Mathematics') return { completed: 35, total: 60, percentage: 58 };
        return { completed: 0, total: 0, percentage: 0 };
    };

    const getProgressColor = (percentage: number) => {
        if (percentage === 0) return 'bg-gray-300';
        if (percentage < 30) return 'bg-gradient-to-r from-red-500 to-orange-500';
        if (percentage < 70) return 'bg-gradient-to-r from-yellow-500 to-amber-500';
        return 'bg-gradient-to-r from-teal-500 to-green-500';
    };

    // Quick Actions
    const quickActions = [
        { title: 'Practice', icon: Brain, gradient: 'bg-gradient-to-r from-purple-500 to-fuchsia-600', action: () => onNavigate('practice') },
        { title: 'Quiz', icon: Zap, gradient: 'bg-gradient-to-r from-yellow-500 to-amber-600', action: () => onNavigate('quiz') },
        { title: 'Goals', icon: Target, gradient: 'bg-gradient-to-r from-blue-500 to-cyan-600', action: () => onNavigate('goals') },
        { title: 'Achievements', icon: Trophy, gradient: 'bg-gradient-to-r from-green-500 to-emerald-600', action: () => onNavigate('achievements') },
    ];

    // Stats data
    const stats = [
        { icon: Clock, value: '12h', label: 'Study Time', color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
        { icon: Trophy, value: '8', label: 'Badges', color: 'bg-gradient-to-r from-amber-500 to-yellow-500' },
        { icon: TrendingUp, value: '85%', label: 'Accuracy', color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
        { icon: Calendar, value: '7d', label: 'Streak', color: 'bg-gradient-to-r from-orange-500 to-red-500' },
    ];

    // Mobile-optimized Action Card
    const ActionCard = ({ title, icon: Icon, gradient, onClick }: { 
        title: string, 
        icon: React.FC<any>, 
        gradient: string,
        onClick: () => void,
    }) => (
        <button 
            onClick={onClick}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl active:scale-95 transition-all duration-300 group w-full hover:-translate-y-1"
        >
            <div className={`p-3 rounded-xl ${gradient} mb-3 transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <Icon className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-sm text-center">{title}</span>
        </button>
    );

    // Enhanced Stats Card
    const StatsCard = ({ icon: Icon, value, label, color }: { 
        icon: React.FC<any>, 
        value: string, 
        label: string, 
        color: string 
    }) => (
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-xl ${color} shadow-lg`}>
                    <Icon className="h-4 w-4 text-white" />
                </div>
                <div>
                    <div className="font-bold text-gray-900 text-lg">{value}</div>
                    <div className="text-xs text-gray-500 font-medium">{label}</div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 pb-20">
            
            {/* Enhanced Header */}
            <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/60 px-6 py-4 sticky top-0 z-50 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <User className="h-6 w-6 text-white" />
                            </div>
                            {userProfile.isPremium && (
                                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                                    <Crown className="h-2.5 w-2.5 text-amber-800" fill="currentColor" />
                                </div>
                            )}
                        </div>
                        <div>
                            <h1 className="font-bold text-gray-900 text-xl">
                                Welcome back, {userProfile.name.split(' ')[0]}! 👋
                            </h1>
                            <p className="text-gray-600 text-sm flex items-center font-medium">
                                <Flame className="h-4 w-4 mr-2 text-orange-500" />
                                {userProfile.streak} day streak • Keep going!
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={() => onNavigate('settings')} 
                        className="p-3 bg-white/80 hover:bg-gray-100 rounded-2xl transition-all duration-300 hover:shadow-lg active:scale-95 border border-gray-200/60"
                    >
                        <Menu className="h-5 w-5 text-gray-700" />
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-6 space-y-8">
                
                {/* Quick Actions Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {quickActions.map((action, index) => (
                        <ActionCard
                            key={index}
                            title={action.title}
                            icon={action.icon}
                            gradient={action.gradient}
                            onClick={action.action}
                        />
                    ))}
                </div>

                {/* Stats Overview */}
                <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center">
                        <Activity className="h-5 w-5 mr-2 text-indigo-600" />
                        Learning Stats
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        {stats.map((stat, index) => (
                            <StatsCard
                                key={index}
                                icon={stat.icon}
                                value={stat.value}
                                label={stat.label}
                                color={stat.color}
                            />
                        ))}
                    </div>
                </div>

                {/* Courses Section */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-gray-900 text-xl flex items-center">
                            <BookOpen className="h-6 w-6 mr-3 text-indigo-600" />
                            My Courses
                        </h3>
                        <button 
                            className="text-sm font-semibold text-indigo-600 flex items-center hover:text-indigo-700 transition-colors duration-200 group"
                            onClick={() => onNavigate('catalog')}
                        >
                            Browse All
                            <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {userSubjects.map((subject) => {
                            const progress = getSubjectProgress(subject.name);
                            const isAccessible = !subject.isPremium || userProfile.isPremium;

                            return (
                                <button
                                    key={subject.id}
                                    onClick={() => isAccessible && onNavigate('subject', subject.name)}
                                    className={`
                                        w-full text-left bg-white rounded-3xl p-5 shadow-lg border border-gray-100 
                                        transition-all duration-300 hover:shadow-xl active:scale-95
                                        ${isAccessible ? 'hover:border-indigo-200' : 'opacity-70'}
                                        group
                                    `}
                                >
                                    <div className="flex items-center space-x-4">
                                        {/* Enhanced Subject Icon */}
                                        <div className={`flex-shrink-0 p-4 rounded-2xl ${subject.bgColor} shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center shadow-md`}>
                                                <span className="text-xl">{subject.icon}</span>
                                            </div>
                                        </div>

                                        {/* Subject Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <h4 className={`font-bold text-lg truncate ${isAccessible ? 'text-gray-900' : 'text-gray-500'}`}>
                                                    {subject.name}
                                                </h4>
                                                {!isAccessible && (
                                                    <Lock className="h-4 w-4 text-red-500" />
                                                )}
                                                {subject.isPremium && isAccessible && (
                                                    <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-amber-500 px-2 py-1 rounded-full">
                                                        <Crown className="h-3 w-3 text-amber-800" fill="currentColor" />
                                                        <span className="text-xs font-bold text-amber-900">PRO</span>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            {/* Enhanced Progress Display */}
                                            {isAccessible && progress.total > 0 && (
                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-center text-sm">
                                                        <span className="text-gray-600 font-medium">Progress</span>
                                                        <span className="font-bold text-indigo-600">{progress.percentage}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                                                        <div
                                                            className={`h-2.5 rounded-full ${getProgressColor(progress.percentage)} transition-all duration-700 ease-out group-hover:shadow-lg`}
                                                            style={{ width: `${progress.percentage}%` }}
                                                        />
                                                    </div>
                                                    <div className="text-xs text-gray-500 font-medium">
                                                        {progress.completed} of {progress.total} lessons completed
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Navigation Arrow */}
                                        {isAccessible && (
                                            <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0 transform group-hover:translate-x-1 transition-transform duration-200" />
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Enhanced Premium CTA */}
                {!userProfile.isPremium && (
                    <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 rounded-3xl p-6 text-white shadow-2xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                        
                        <div className="relative z-10 flex items-center space-x-4">
                            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                                <Rocket className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-lg mb-1">Unlock Premium 🚀</h4>
                                <p className="text-white/90 text-sm font-medium">
                                    Access all subjects, AI-powered insights, and advanced features
                                </p>
                            </div>
                            <button 
                                onClick={() => onNavigate('premium')}
                                className="bg-white text-purple-600 px-4 py-2.5 rounded-2xl font-bold text-sm hover:scale-105 active:scale-95 transition-transform duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                            >
                                <Crown className="h-4 w-4" />
                                <span>Upgrade Now</span>
                            </button>
                        </div>
                    </div>
                )}
                
                {/* Enhanced Community Card */}
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                            <Users className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-white text-lg">Join Study Groups</p>
                            <p className="text-white/90 text-sm font-medium">Collaborate and learn with peers worldwide</p>
                        </div>
                        <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                            <ArrowRight className="h-5 w-5 text-white" />
                        </div>
                    </div>
                </div>

                {/* Daily Motivation */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-5 text-white text-center shadow-lg">
                    <Sparkles className="h-6 w-6 mx-auto mb-2" />
                    <p className="font-bold text-lg mb-1">Today's Goal: 30 minutes</p>
                    <p className="text-white/90 text-sm">You're doing amazing! Keep the momentum going! 💪</p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;