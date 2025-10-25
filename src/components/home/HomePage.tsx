import React from 'react';
import { 
    Lock, PlayCircle, BookOpen, Trophy, 
    Zap, Crown, ChevronRight, User, 
    Star, Menu, LayoutGrid, NotebookText, 
    Dumbbell, Clock, Gift, Users, Gauge
} from 'lucide-react';
// Assuming useAuth, subjects, getSubjectsByField, and getQuestionsBySubject are correctly defined
// NOTE: I've added a mock implementation for the imported data/context for completeness.

// Mock Data/Context for standalone functionality (REMOVE if you have actual imports)
interface UserProfile { id: string; name: string; field: string; isPremium: boolean; }
const useAuth = () => ({ userProfile: { id: 'u1', name: 'Alex Doe', field: 'Science', isPremium: true } as UserProfile });
const subjects = [
    { id: 1, name: 'Physics', icon: '⚛️', isPremium: false },
    { id: 2, name: 'Chemistry', icon: '🧪', isPremium: true },
    { id: 3, name: 'Biology', icon: '🧬', isPremium: false },
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

  // Get progress data from localStorage
  const getSubjectProgress = (subjectName: string) => {
    const progressKey = `progress_${userProfile.id}_${subjectName.toLowerCase()}`;
    // Mocking progress data for UI demonstration
    if (subjectName === 'Physics') return { completed: 30, total: 50, percentage: 60 };
    if (subjectName === 'Chemistry') return { completed: 50, total: 80, percentage: 62 };
    if (subjectName === 'Biology') return { completed: 10, total: 80, percentage: 12 };
    return { completed: 0, total: 0, percentage: 0 };
  };

  const getProgressColor = (percentage: number) => {
    if (percentage === 0) return 'bg-gray-300';
    if (percentage < 50) return 'bg-red-500';
    if (percentage < 85) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const totalProgressPercentage = Math.round(userSubjects.reduce((acc, subject) => {
    const progress = getSubjectProgress(subject.name);
    return acc + progress.percentage;
  }, 0) / (userSubjects.length || 1));
  
  // Custom Card Component for Quick Actions
  const ActionCard = ({ title, icon: Icon, color, onClick }: { title: string, icon: React.FC<any>, color: string, onClick: () => void }) => (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-md border-t-2 ${color.replace('-500', '-300')} border-opacity-70 active:scale-[0.98] transition-all duration-200`}
    >
        <div className={`p-3 rounded-full ${color.replace('-500', '-100')}`}>
            <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <span className="mt-2 font-semibold text-gray-800 text-sm">{title}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20"> 
      {/* Dynamic Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-lg">Hi, {userProfile.name.split(' ')[0]}!</h1>
              <p className="text-gray-500 text-sm">{userProfile.field} Learner</p>
            </div>
          </div>
          <button onClick={() => onNavigate('settings')} className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-8 max-w-lg mx-auto">
        
        {/* Progress Overview - Hero Card */}
        <div className="bg-white rounded-3xl p-5 pt-7 shadow-xl ring-2 ring-indigo-50/50 relative overflow-hidden">
            {/* Background Shape */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full transform translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-blue-500/10 rounded-full transform -translate-x-1/4 translate-y-1/4" />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-extrabold text-2xl text-gray-900">Overall Mastery</h2>
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full px-4 py-2 shadow-md">
                        <span className="text-lg font-bold">{totalProgressPercentage}%</span>
                    </div>
                </div>
                
                <div className="space-y-3">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                            className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-1000 shadow-md"
                            style={{ width: `${totalProgressPercentage}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span className="font-medium">Keep up the great work!</span>
                        <span className="font-bold">{userSubjects.length} Modules</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="font-bold text-gray-800 text-xl mb-4">Jump In</h3>
          <div className="grid grid-cols-3 gap-3">
            <ActionCard 
                title="Practice" 
                icon={Dumbbell} 
                color="text-red-500" 
                onClick={() => onNavigate('practice')}
            />
            <ActionCard 
                title="Tutorials" 
                icon={PlayCircle} 
                color="text-blue-500" 
                onClick={() => onNavigate('chat')} // Using 'chat' as per your bottom bar item ID
            />
            <ActionCard 
                title="Notes" 
                icon={NotebookText} 
                color="text-purple-500" 
                onClick={() => onNavigate('notes')}
            />
          </div>
        </div>

        {/* Subjects Section */}
        <div>
          <h3 className="font-bold text-gray-800 text-xl mb-4">Your Courses</h3>

          <div className="space-y-4">
            {userSubjects.map((subject) => {
              const progress = getSubjectProgress(subject.name);
              const isAccessible = !subject.isPremium || userProfile.isPremium;
              const questionsCount = getQuestionsBySubject(subject.name, userProfile.field).length;

              return (
                <button
                  key={subject.id}
                  onClick={() => isAccessible && onNavigate('subject', subject.name)}
                  className={`
                        w-full text-left bg-white rounded-2xl p-4 shadow-lg border-2 border-transparent transition-all duration-200
                        ${isAccessible ? 'hover:border-blue-400/50 active:scale-[0.99]' : 'opacity-70 cursor-default'}
                    `}
                >
                  <div className="flex items-center space-x-4">
                    {/* Subject Icon */}
                    <div className="flex-shrink-0 p-3 bg-indigo-50 rounded-xl shadow-inner">
                      <span className="text-xl">{subject.icon}</span>
                    </div>

                    {/* Subject Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h4 className={`font-extrabold text-lg truncate ${isAccessible ? 'text-gray-900' : 'text-gray-500'}`}>
                          {subject.name}
                        </h4>
                        {!isAccessible && <Lock className="h-4 w-4 text-gray-400" />}
                      </div>
                      
                      <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
                        <Gauge className="h-3 w-3" />
                        <span>{questionsCount} exercises</span>
                      </div>
                    </div>

                    {/* Right Side: Progress & Arrow */}
                    <div className="flex-shrink-0 text-right">
                        {isAccessible && progress.total > 0 && (
                            <>
                            <span className="font-bold text-sm text-blue-600 block mb-1">
                                {progress.percentage}%
                            </span>
                            <div className="w-16 bg-gray-200 rounded-full h-2 inline-block">
                                <div
                                    className={`h-2 rounded-full ${getProgressColor(progress.percentage)}`}
                                    style={{ width: `${progress.percentage}%` }}
                                />
                            </div>
                            </>
                        )}
                        {!isAccessible && (
                            <div className="flex items-center text-sm font-semibold text-yellow-600">
                                Premium <Crown className="h-4 w-4 ml-1" />
                            </div>
                        )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Premium CTA */}
        {!userProfile.isPremium && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-4 text-white shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <Gift className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-extrabold text-lg">Unlock Everything!</h4>
                <p className="text-white/90 text-sm">Get full access to all subjects and premium features.</p>
              </div>
              <button 
                onClick={() => onNavigate('premium')}
                className="bg-white text-orange-600 px-4 py-2 rounded-xl font-bold text-sm active:scale-95 transition-transform shadow-md flex-shrink-0"
              >
                Upgrade
              </button>
            </div>
          </div>
        )}
        
        {/* Weekly Streak/Social Card */}
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-pink-100 rounded-xl">
                        <Users className="h-6 w-6 text-pink-600" />
                    </div>
                    <div>
                        <p className="font-extrabold text-gray-900 text-lg">Join a Study Group</p>
                        <p className="text-gray-500 text-sm">Collaborate and conquer tough topics.</p>
                    </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
        </div>

      </div>

    </div>
  );
};

export default HomePage;