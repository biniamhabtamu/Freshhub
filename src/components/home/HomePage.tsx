import React from 'react';
import { 
    Lock, PlayCircle, BookOpen, Trophy, 
    Zap, Crown, ChevronRight, User, 
    Star, Menu, Dumbbell, Clock, 
    Gift, Users, Gauge, Target, 
    TrendingUp, Award, Calendar,
    Sparkles, Brain, Rocket, Activity,
    Flame, GraduationCap
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
    { id: 1, name: 'Physics', icon: '⚛️', isPremium: false, color: 'from-blue-600 to-indigo-700' },
    { id: 2, name: 'Chemistry', icon: '🧪', isPremium: true, color: 'from-emerald-500 to-green-600' },
    { id: 3, name: 'Biology', icon: '🧬', isPremium: false, color: 'from-purple-500 to-fuchsia-600' },
    { id: 4, name: 'Mathematics', icon: '📐', isPremium: true, color: 'from-orange-500 to-amber-600' },
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
        return 'bg-gradient-to-r from-teal-500 to-green-600';
    };

    // Calculate total progress
    const totalProgress = userSubjects.reduce((acc, subject) => {
        const progress = getSubjectProgress(subject.name);
        return acc + progress.percentage;
    }, 0);
    const totalProgressPercentage = Math.round(totalProgress / (userSubjects.length || 1));

    // Mobile-optimized Action Card
    const ActionCard = ({ title, icon: Icon, gradient, onClick }: { 
        title: string, 
        icon: React.FC<any>, 
        gradient: string,
        onClick: () => void,
    }) => (
        <button 
            onClick={onClick}
            className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-lg border border-gray-100 active:scale-95 transition-all duration-200 group w-full"
        >
            <div className={`p-3 rounded-xl ${gradient} mb-2 transform group-active:scale-110 transition-transform duration-200 shadow-md`}>
                <Icon className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-sm text-center">{title}</span>
        </button>
    );

    // Simplified Stats Card
    const StatsCard = ({ icon: Icon, value, label, color }: { 
        icon: React.FC<any>, 
        value: string, 
        label: string, 
        color: string 
    }) => (
        <div className="bg-white rounded-xl p-3 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-lg ${color} shadow-sm`}>
                    <Icon className="h-4 w-4 text-white" />
                </div>
                <div>
                    <div className="font-bold text-gray-900 text-base">{value}</div>
                    <div className="text-xs text-gray-500">{label}</div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/50 pb-20">
            
            {/* Mobile-optimized Header */}
            <div className="bg-white/95 backdrop-blur-lg border-b border-gray-200/50 px-4 py-3 sticky top-0 z-20 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                <User className="h-5 w-5 text-white" />
                            </div>
                            {userProfile.isPremium && (
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center shadow border border-white">
                                    <Crown className="h-2 w-2 text-yellow-800" fill="currentColor" />
                                </div>
                            )}
                        </div>
                        <div>
                            <h1 className="font-bold text-gray-900 text-lg">
                                Hello, {userProfile.name.split(' ')[0]}!
                            </h1>
                            <p className="text-gray-500 text-xs flex items-center">
                                <Flame className="h-3 w-3 mr-1 text-orange-500" />
                                {userProfile.streak} day streak
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={() => onNavigate('settings')} 
                        className="p-2 bg-gray-100 rounded-full transition-all duration-200 active:scale-95"
                    >
                        <Menu className="h-4 w-4 text-gray-700" />
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-4 space-y-6">
                
                {/* Progress Overview */}
                <div className="bg-white rounded-2xl p-5 shadow-lg border border-indigo-100 relative overflow-hidden">
                    <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    Mastery Score
                                </h2>
                                <p className="text-gray-500 text-sm mt-1">
                                    Overall progress
                                </p>
                            </div>
                            <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-red-400 to-orange-500 text-white rounded-full shadow-lg">
                                <span className="text-xl font-bold">{totalProgressPercentage}%</span>
                            </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="space-y-2">
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div 
                                    className="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 transition-all duration-1000"
                                    style={{ width: `${totalProgressPercentage}%` }}
                                />
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="font-semibold text-gray-600 flex items-center">
                                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                                    Next: 75%
                                </span>
                                <button className="font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full text-xs">
                                    View Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <StatsCard icon={Gauge} value="85%" label="Average Score" color="bg-gradient-to-r from-red-500 to-pink-600" />
                    <StatsCard icon={Activity} value="3.4h" label="Focus Time" color="bg-gradient-to-r from-blue-500 to-cyan-600" />
                    <StatsCard icon={Award} value="12" label="Badges" color="bg-gradient-to-r from-yellow-500 to-amber-600" />
                    <StatsCard icon={GraduationCap} value="Lvl 4" label="Level" color="bg-gradient-to-r from-purple-500 to-indigo-600" />
                </div>

                {/* Quick Actions */}
                <div>
                    <h3 className="font-bold text-gray-900 text-xl flex items-center mb-4">
                        <Rocket className="h-5 w-5 mr-2 text-red-500" />
                        Quick Actions
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <ActionCard 
                            title="Daily Practice" 
                            icon={Dumbbell} 
                            gradient="bg-gradient-to-r from-red-500 to-pink-500" 
                            onClick={() => onNavigate('practice')}
                        />
                        <ActionCard 
                            title="AI Tutor" 
                            icon={Brain} 
                            gradient="bg-gradient-to-r from-blue-500 to-indigo-500" 
                            onClick={() => onNavigate('chat')}
                        />
                        <ActionCard 
                            title="Quizzes" 
                            icon={Calendar} 
                            gradient="bg-gradient-to-r from-green-500 to-teal-500" 
                            onClick={() => onNavigate('quizzes')}
                        />
                        <ActionCard 
                            title="Rewards" 
                            icon={Gift} 
                            gradient="bg-gradient-to-r from-amber-500 to-orange-500" 
                            onClick={() => onNavigate('rewards')}
                        />
                    </div>
                </div>

                {/* Courses Section */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900 text-xl flex items-center">
                            <BookOpen className="h-5 w-5 mr-2 text-indigo-600" />
                            My Courses
                        </h3>
                        <button className="text-xs font-semibold text-indigo-600 flex items-center" onClick={() => onNavigate('catalog')}>
                            Browse
                            <ChevronRight className="h-3 w-3 ml-1" />
                        </button>
                    </div>

                    <div className="space-y-3">
                        {userSubjects.map((subject) => {
                            const progress = getSubjectProgress(subject.name);
                            const isAccessible = !subject.isPremium || userProfile.isPremium;

                            return (
                                <button
                                    key={subject.id}
                                    onClick={() => isAccessible && onNavigate('subject', subject.name)}
                                    className={`
                                        w-full text-left bg-white rounded-2xl p-4 shadow-lg border border-gray-100 
                                        transition-all duration-200 active:scale-95
                                        ${isAccessible ? 'active:bg-gray-50' : 'opacity-70'}
                                    `}
                                >
                                    <div className="flex items-center space-x-3">
                                        {/* Subject Icon */}
                                        <div className={`flex-shrink-0 p-3 rounded-lg bg-gradient-to-br ${subject.color} shadow-md`}>
                                            <span className="text-2xl">{subject.icon}</span>
                                        </div>

                                        {/* Subject Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <h4 className={`font-bold text-base truncate ${isAccessible ? 'text-gray-900' : 'text-gray-500'}`}>
                                                    {subject.name}
                                                </h4>
                                                {!isAccessible && (
                                                    <Lock className="h-3 w-3 text-red-500" />
                                                )}
                                                {subject.isPremium && isAccessible && (
                                                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                                )}
                                            </div>
                                            
                                            {/* Progress Bar */}
                                            {isAccessible && progress.total > 0 && (
                                                <div className="space-y-1">
                                                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                        <div
                                                            className={`h-1.5 rounded-full ${getProgressColor(progress.percentage)} transition-all duration-500`}
                                                            style={{ width: `${progress.percentage}%` }}
                                                        />
                                                    </div>
                                                    <div className="flex justify-between items-center text-xs">
                                                        <span className="text-gray-600">Progress</span>
                                                        <span className="font-semibold text-indigo-600">{progress.percentage}%</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Navigation Arrow */}
                                        {isAccessible && (
                                            <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Premium CTA */}
                {!userProfile.isPremium && (
                    <div className="bg-gradient-to-r from-red-500 to-purple-600 rounded-2xl p-4 text-white shadow-lg">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <Zap className="h-4 w-4 text-white" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-base mb-1">Go Pro 💎</h4>
                                <p className="text-white/90 text-xs">
                                    Unlock premium subjects and AI insights
                                </p>
                            </div>
                            <button 
                                onClick={() => onNavigate('premium')}
                                className="bg-white text-purple-600 px-3 py-1.5 rounded-full font-bold text-xs active:scale-95 transition-transform flex items-center space-x-1"
                            >
                                <Crown className="h-3 w-3" />
                                <span>Upgrade</span>
                            </button>
                        </div>
                    </div>
                )}
                
                {/* Community Card */}
                <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 active:scale-95 transition-all duration-200">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg shadow-sm">
                            <Users className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="font-bold text-gray-900 text-sm">Study Groups</p>
                            <p className="text-gray-500 text-xs">Join challenges with peers</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;