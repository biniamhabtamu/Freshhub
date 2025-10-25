import React from 'react';
import { 
    Lock, PlayCircle, BookOpen, Trophy, 
    Zap, Crown, ChevronRight, User, 
    Star, Menu, LayoutGrid, NotebookText, 
    Dumbbell, Clock, Gift, Users, Gauge,
    Target, TrendingUp, Award, Calendar,
    Sparkles, Brain, Rocket
} from 'lucide-react';

// Mock Data/Context for standalone functionality
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
    { id: 1, name: 'Physics', icon: '⚛️', isPremium: false, color: 'from-purple-500 to-indigo-600' },
    { id: 2, name: 'Chemistry', icon: '🧪', isPremium: true, color: 'from-green-500 to-emerald-600' },
    { id: 3, name: 'Biology', icon: '🧬', isPremium: false, color: 'from-blue-500 to-cyan-600' },
    { id: 4, name: 'Mathematics', icon: '📊', isPremium: true, color: 'from-orange-500 to-red-500' },
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
    if (subjectName === 'Chemistry') return { completed: 50, total: 80, percentage: 62 };
    if (subjectName === 'Biology') return { completed: 10, total: 80, percentage: 12 };
    if (subjectName === 'Mathematics') return { completed: 25, total: 60, percentage: 42 };
    return { completed: 0, total: 0, percentage: 0 };
  };

  const getProgressColor = (percentage: number) => {
    if (percentage === 0) return 'bg-gray-300';
    if (percentage < 50) return 'bg-gradient-to-r from-red-500 to-orange-500';
    if (percentage < 85) return 'bg-gradient-to-r from-amber-500 to-yellow-500';
    return 'bg-gradient-to-r from-emerald-500 to-green-500';
  };

  const totalProgressPercentage = Math.round(userSubjects.reduce((acc, subject) => {
    const progress = getSubjectProgress(subject.name);
    return acc + progress.percentage;
  }, 0) / (userSubjects.length || 1));

  // Custom Card Component for Quick Actions
  const ActionCard = ({ title, icon: Icon, color, gradient, onClick, description }: { 
    title: string, 
    icon: React.FC<any>, 
    color: string, 
    gradient: string,
    onClick: () => void,
    description?: string 
  }) => (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-5 bg-white rounded-3xl shadow-lg hover:shadow-xl border border-gray-100/80 active:scale-[0.98] transition-all duration-300 group hover:translate-y-[-2px] ${gradient}`}
    >
        <div className={`p-4 rounded-2xl ${color} mb-3 transform group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="h-7 w-7 text-white" />
        </div>
        <span className="font-bold text-gray-900 text-sm mb-1">{title}</span>
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
    <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100/80">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-xl ${color}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="font-bold text-gray-900 text-lg">{value}</div>
          <div className="text-xs text-gray-500">{label}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 pb-24">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 px-6 py-4 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <User className="h-6 w-6 text-white" />
              </div>
              {userProfile.isPremium && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                  <Crown className="h-3 w-3 text-yellow-800" fill="currentColor" />
                </div>
              )}
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-xl">Welcome back, {userProfile.name.split(' ')[0]}! 👋</h1>
              <p className="text-gray-500 text-sm flex items-center">
                <Sparkles className="h-3 w-3 mr-1 text-yellow-500" />
                {userProfile.field} Learner • {userProfile.streak} day streak
              </p>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('settings')} 
            className="p-3 bg-white/80 hover:bg-gray-100 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md border border-gray-200/50"
          >
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-8 max-w-6xl mx-auto">
        
        {/* Enhanced Progress Overview - Hero Card */}
        <div className="bg-gradient-to-br from-white to-gray-50/80 rounded-3xl p-8 shadow-2xl border border-gray-200/50 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-500/10 to-indigo-500/10 rounded-full transform translate-x-1/4 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full transform -translate-x-1/4 translate-y-1/4" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-extrabold text-3xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Learning Journey
                </h2>
                <p className="text-gray-500 mt-1">Your overall mastery progress</p>
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl px-6 py-3 shadow-lg">
                <span className="text-2xl font-bold">{totalProgressPercentage}%</span>
              </div>
            </div>
            
            {/* Enhanced Progress Bar */}
            <div className="space-y-4">
              <div className="w-full bg-gray-200/80 rounded-full h-4 shadow-inner">
                <div 
                  className="h-4 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 transition-all duration-1000 shadow-lg relative overflow-hidden"
                  style={{ width: `${totalProgressPercentage}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse-slow" />
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-gray-600 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                  Keep up the great work!
                </span>
                <span className="font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                  {userSubjects.length} Courses
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard 
            icon={Target} 
            value="4" 
            label="Active Courses" 
            color="bg-gradient-to-r from-blue-500 to-cyan-500" 
          />
          <StatsCard 
            icon={Clock} 
            value="12h" 
            label="Study Time" 
            color="bg-gradient-to-r from-purple-500 to-pink-500" 
          />
          <StatsCard 
            icon={Trophy} 
            value="85%" 
            label="Avg. Score" 
            color="bg-gradient-to-r from-amber-500 to-orange-500" 
          />
          <StatsCard 
            icon={Calendar} 
            value={`${userProfile.streak}d`} 
            label="Current Streak" 
            color="bg-gradient-to-r from-green-500 to-emerald-500" 
          />
        </div>

        {/* Quick Actions */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800 text-2xl flex items-center">
              <Zap className="h-6 w-6 mr-3 text-yellow-500" fill="currentColor" />
              Quick Actions
            </h3>
            <span className="text-sm text-gray-500 font-medium">Jump right in</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <ActionCard 
              title="Practice" 
              icon={Dumbbell} 
              color="bg-gradient-to-r from-red-500 to-pink-500" 
              gradient="hover:border-red-200"
              description="Test your skills"
              onClick={() => onNavigate('practice')}
            />
            <ActionCard 
              title="Tutorials" 
              icon={PlayCircle} 
              color="bg-gradient-to-r from-blue-500 to-cyan-500" 
              gradient="hover:border-blue-200"
              description="Learn concepts"
              onClick={() => onNavigate('chat')}
            />
            <ActionCard 
              title="Notes" 
              icon={NotebookText} 
              color="bg-gradient-to-r from-purple-500 to-indigo-500" 
              gradient="hover:border-purple-200"
              description="Review materials"
              onClick={() => onNavigate('notes')}
            />
            <ActionCard 
              title="Challenges" 
              icon={Award} 
              color="bg-gradient-to-r from-orange-500 to-amber-500" 
              gradient="hover:border-orange-200"
              description="Compete & win"
              onClick={() => onNavigate('challenges')}
            />
          </div>
        </div>

        {/* Enhanced Subjects Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800 text-2xl flex items-center">
              <BookOpen className="h-6 w-6 mr-3 text-indigo-500" />
              Your Courses
            </h3>
            <span className="text-sm text-gray-500 font-medium">{userSubjects.length} total</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {userSubjects.map((subject) => {
              const progress = getSubjectProgress(subject.name);
              const isAccessible = !subject.isPremium || userProfile.isPremium;
              const questionsCount = getQuestionsBySubject(subject.name, userProfile.field).length;

              return (
                <button
                  key={subject.id}
                  onClick={() => isAccessible && onNavigate('subject', subject.name)}
                  className={`
                    w-full text-left bg-white rounded-3xl p-6 shadow-lg border-2 border-transparent 
                    transition-all duration-300 group
                    ${isAccessible 
                      ? 'hover:shadow-xl hover:border-blue-200/50 active:scale-[0.99] hover:translate-y-[-2px]' 
                      : 'opacity-80 cursor-default'
                    }
                  `}
                >
                  <div className="flex items-center space-x-5">
                    {/* Enhanced Subject Icon */}
                    <div className={`flex-shrink-0 p-4 rounded-2xl bg-gradient-to-br ${subject.color} shadow-lg transform group-hover:scale-105 transition-transform duration-300`}>
                      <span className="text-2xl">{subject.icon}</span>
                    </div>

                    {/* Subject Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className={`font-extrabold text-xl truncate ${isAccessible ? 'text-gray-900' : 'text-gray-500'}`}>
                          {subject.name}
                        </h4>
                        {!isAccessible && (
                          <div className="flex items-center space-x-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full text-xs font-bold">
                            <Lock className="h-3 w-3" />
                            <span>PREMIUM</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center space-x-1">
                          <Gauge className="h-4 w-4" />
                          <span>{questionsCount} exercises</span>
                        </div>
                        {progress.percentage > 0 && (
                          <div className="flex items-center space-x-1">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            <span>{progress.completed} completed</span>
                          </div>
                        )}
                      </div>

                      {/* Enhanced Progress Bar */}
                      {isAccessible && progress.total > 0 && (
                        <div className="space-y-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full ${getProgressColor(progress.percentage)} transition-all duration-1000 shadow-md`}
                              style={{ width: `${progress.percentage}%` }}
                            />
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-semibold text-gray-600">Progress</span>
                            <span className="font-bold text-blue-600">{progress.percentage}%</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Side: Arrow */}
                    {isAccessible && (
                      <div className="flex-shrink-0">
                        <div className="p-2 bg-gray-100 rounded-xl group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors duration-300">
                          <ChevronRight className="h-5 w-5 transform group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Enhanced Premium CTA */}
        {!userProfile.isPremium && (
          <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full transform -translate-x-1/2 translate-y-1/2" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                    <Rocket className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-extrabold text-2xl mb-1">Unlock Everything! 🚀</h4>
                    <p className="text-white/90 text-sm max-w-md">
                      Get full access to all subjects, premium features, and advanced learning tools.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => onNavigate('premium')}
                  className="bg-white text-orange-600 px-6 py-3 rounded-2xl font-bold text-sm hover:scale-105 active:scale-95 transition-transform shadow-lg flex-shrink-0 hover:shadow-xl flex items-center space-x-2"
                >
                  <Crown className="h-4 w-4" />
                  <span>Upgrade Now</span>
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Enhanced Community Card */}
        <div className="bg-gradient-to-r from-white to-gray-50/80 rounded-3xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 group cursor-pointer hover:translate-y-[-2px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                <Users className="h-7 w-7 text-white" />
              </div>
              <div>
                <p className="font-extrabold text-gray-900 text-xl mb-1">Join Study Groups</p>
                <p className="text-gray-500">Collaborate with peers and conquer tough topics together</p>
              </div>
            </div>
            <div className="p-3 bg-gray-100 rounded-2xl group-hover:bg-pink-100 group-hover:text-pink-600 transition-colors duration-300">
              <ChevronRight className="h-6 w-6 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomePage;