import React from 'react';
import { Lock, Play, BookOpen, Trophy, TrendingUp, Clock, Zap, Star, Crown, Target, Award, ChevronRight, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { subjects, getSubjectsByField } from '../../data/subjects';
import { getQuestionsBySubject } from '../../data/questions';

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
    const progress = localStorage.getItem(progressKey);
    return progress ? JSON.parse(progress) : { completed: 0, total: 0, percentage: 0 };
  };

  const getProgressColor = (percentage: number) => {
    if (percentage === 0) return 'from-gray-300 to-gray-400';
    if (percentage < 30) return 'from-red-400 to-red-500';
    if (percentage < 60) return 'from-yellow-400 to-yellow-500';
    if (percentage < 85) return 'from-blue-400 to-blue-500';
    return 'from-green-400 to-green-500';
  };

  const getProgressTextColor = (percentage: number) => {
    if (percentage === 0) return 'text-gray-600';
    if (percentage < 30) return 'text-red-600';
    if (percentage < 60) return 'text-yellow-600';
    if (percentage < 85) return 'text-blue-600';
    return 'text-green-600';
  };

  const getSubjectTheme = (subjectName: string) => {
    const themes = {
      math: { gradient: 'from-purple-500 to-indigo-600', light: 'bg-purple-50', text: 'text-purple-600' },
      physics: { gradient: 'from-cyan-500 to-blue-600', light: 'bg-cyan-50', text: 'text-cyan-600' },
      chemistry: { gradient: 'from-emerald-500 to-green-600', light: 'bg-emerald-50', text: 'text-emerald-600' },
      biology: { gradient: 'from-lime-500 to-green-500', light: 'bg-lime-50', text: 'text-lime-600' },
      default: { gradient: 'from-amber-500 to-orange-600', light: 'bg-amber-50', text: 'text-amber-600' }
    };
    
    const subjectKey = subjectName.toLowerCase();
    return themes[subjectKey as keyof typeof themes] || themes.default;
  };

  const totalProgressPercentage = Math.round(userSubjects.reduce((acc, subject) => {
    const progress = getSubjectProgress(subject.name);
    return acc + progress.percentage;
  }, 0) / (userSubjects.length || 1));

  // Calculate streak from localStorage
  const getStudyStreak = () => {
    const streakKey = `study_streak_${userProfile.id}`;
    return parseInt(localStorage.getItem(streakKey) || '0');
  };

  const studyStreak = getStudyStreak();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 pb-20 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Welcome back, {userProfile.name}! 👋
                </h1>
                <p className="text-gray-600 mt-2">Continue your learning journey</p>
              </div>
              {studyStreak > 0 && (
                <div className="flex items-center space-x-2 mt-4 sm:mt-0 px-4 py-2 bg-orange-50 rounded-full border border-orange-200">
                  <Sparkles className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-semibold text-orange-700">{studyStreak} day streak</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats - Enhanced Design */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <StatCard
            title="Total Subjects"
            value={userSubjects.length.toString()}
            icon={<BookOpen className="h-6 w-6 text-white" />}
            gradient="from-blue-500 to-cyan-500"
            onClick={() => onNavigate('subjects')}
          />
          <StatCard
            title="Premium Status"
            value={userProfile.isPremium ? 'Active' : 'Free'}
            icon={<Crown className="h-6 w-6 text-white" />}
            gradient={userProfile.isPremium ? "from-yellow-500 to-amber-500" : "from-gray-500 to-slate-500"}
          />
          <StatCard
            title="Overall Progress"
            value={`${totalProgressPercentage}%`}
            icon={<TrendingUp className="h-6 w-6 text-white" />}
            gradient="from-green-500 to-emerald-500"
          />
          <StatCard
            title="Questions"
            value={userSubjects.reduce((acc, subject) => 
              acc + getQuestionsBySubject(subject.name, userProfile.field).length, 0
            ).toString()}
            icon={<Target className="h-6 w-6 text-white" />}
            gradient="from-purple-500 to-pink-500"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Subjects Grid - 2/3 width */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
                    <BookOpen className="h-6 w-6 text-blue-600 mr-3" />
                    Study Subjects
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">Choose a subject to start learning</p>
                </div>
                <Legend />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userSubjects.map((subject) => {
                  const progress = getSubjectProgress(subject.name);
                  const isAccessible = !subject.isPremium || userProfile.isPremium;
                  const questionsCount = getQuestionsBySubject(subject.name, userProfile.field).length;
                  const theme = getSubjectTheme(subject.name);

                  return (
                    <SubjectCard
                      key={subject.id}
                      subject={subject}
                      progress={progress}
                      isAccessible={isAccessible}
                      questionsCount={questionsCount}
                      userProfile={userProfile}
                      onNavigate={onNavigate}
                      getProgressColor={getProgressColor}
                      getProgressTextColor={getProgressTextColor}
                      theme={theme}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Zap className="h-5 w-5 text-yellow-500 mr-2" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <ActionButton
                  title="Leaderboard"
                  subtitle="Check rankings"
                  icon={<Trophy className="h-5 w-5 text-yellow-600" />}
                  bgColor="bg-yellow-50"
                  borderColor="border-yellow-200"
                  onClick={() => onNavigate('leaderboard')}
                />
                <ActionButton
                  title="Study Notes"
                  subtitle="Review materials"
                  icon={<BookOpen className="h-5 w-5 text-blue-600" />}
                  bgColor="bg-blue-50"
                  borderColor="border-blue-200"
                  onClick={() => onNavigate('notes')}
                />
                <ActionButton
                  title="Practice Tests"
                  subtitle="Take mock exams"
                  icon={<Target className="h-5 w-5 text-green-600" />}
                  bgColor="bg-green-50"
                  borderColor="border-green-200"
                  onClick={() => onNavigate('tests')}
                />
                {!userProfile.isPremium && (
                  <ActionButton
                    title="Go Premium"
                    subtitle="Unlock all features"
                    icon={<Crown className="h-5 w-5 text-white" />}
                    bgColor="bg-gradient-to-r from-yellow-500 to-amber-600"
                    borderColor="border-yellow-500"
                    textColor="text-white"
                    onClick={() => onNavigate('premium')}
                  />
                )}
              </div>
            </div>

            {/* Progress Overview */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Progress Overview
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Overall Completion</span>
                  <span className="font-bold text-lg">{totalProgressPercentage}%</span>
                </div>
                <div className="w-full bg-blue-400/30 rounded-full h-3">
                  <div 
                    className="h-3 rounded-full bg-white transition-all duration-1000 ease-out"
                    style={{ width: `${totalProgressPercentage}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold">{userSubjects.length}</div>
                    <div className="text-blue-100 text-sm">Subjects</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{studyStreak}</div>
                    <div className="text-blue-100 text-sm">Day Streak</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Motivational Section */}
        {totalProgressPercentage < 50 && (
          <div className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl shadow-xl p-6 text-white text-center">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <Sparkles className="h-6 w-6" />
              <h3 className="text-lg font-bold">Start your learning journey today!</h3>
              <Sparkles className="h-6 w-6" />
            </div>
            <p className="text-orange-100">
              Complete your first subject to unlock achievements and track your progress.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;

// --- Enhanced Helper Components ---

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  gradient: string;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, gradient, onClick }) => (
  <div 
    onClick={onClick}
    className={`
      bg-gradient-to-r ${gradient} rounded-2xl p-4 shadow-lg transition-all duration-300 cursor-pointer
      ${onClick ? 'hover:scale-105 hover:shadow-xl active:scale-95' : ''}
    `}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-white/90 text-sm font-medium">{title}</p>
        <p className="text-white text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
        {icon}
      </div>
    </div>
  </div>
);

interface SubjectCardProps {
  subject: any;
  progress: { completed: number; total: number; percentage: number };
  isAccessible: boolean;
  questionsCount: number;
  userProfile: any;
  onNavigate: (page: string, subject?: string) => void;
  getProgressColor: (percentage: number) => string;
  getProgressTextColor: (percentage: number) => string;
  theme: any;
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  progress,
  isAccessible,
  questionsCount,
  userProfile,
  onNavigate,
  getProgressColor,
  getProgressTextColor,
  theme,
}) => (
  <div
    key={subject.id}
    className={`
      relative bg-white border-2 rounded-2xl p-5 transition-all duration-300 shadow-lg h-full flex flex-col group
      ${isAccessible
        ? 'border-gray-100 hover:border-blue-300 cursor-pointer hover:shadow-xl hover:scale-105'
        : 'border-gray-100 bg-gray-50/80'
      }
    `}
    onClick={() => isAccessible && onNavigate('subject', subject.name)}
  >
    {/* Premium Badge */}
    {subject.isPremium && (
      <div className="absolute -top-2 -right-2">
        <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg flex items-center space-x-1">
          <Crown className="h-3 w-3" />
          <span>PREMIUM</span>
        </div>
      </div>
    )}

    {/* Subject Header */}
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-xl ${theme.light}`}>
        <div className="text-2xl">{subject.icon}</div>
      </div>
      {!isAccessible && (
        <div className="p-2 bg-gray-200 rounded-full shadow-sm">
          <Lock className="h-4 w-4 text-gray-500" />
        </div>
      )}
    </div>

    {/* Subject Info */}
    <h3 className={`font-bold text-xl mb-2 ${isAccessible ? 'text-gray-900' : 'text-gray-500'}`}>
      {subject.name}
    </h3>
    <p className={`text-sm mb-4 flex-grow ${isAccessible ? 'text-gray-600' : 'text-gray-400'}`}>
      {subject.description}
    </p>

    {/* Metadata */}
    <div className="flex items-center space-x-2 mb-4 text-sm text-gray-500">
      <Clock className="h-4 w-4" />
      <span>{questionsCount} questions</span>
      {progress.percentage > 0 && (
        <>
          <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          <span className={getProgressTextColor(progress.percentage)}>
            {progress.percentage}% complete
          </span>
        </>
      )}
    </div>

    {/* Progress Bar */}
    {isAccessible && progress.total > 0 && (
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full bg-gradient-to-r ${getProgressColor(progress.percentage)} transition-all duration-1000 ease-out`}
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
      </div>
    )}

    {/* Action Button */}
    {isAccessible ? (
      <button className="w-full mt-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 font-semibold shadow-lg group-hover:shadow-xl">
        <Play className="h-4 w-4" />
        <span>Start Learning</span>
        <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
      </button>
    ) : (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate('premium');
        }}
        className="w-full mt-auto bg-gradient-to-r from-yellow-500 to-amber-600 text-white py-3 px-4 rounded-xl hover:from-yellow-600 hover:to-amber-700 transition-all duration-300 flex items-center justify-center space-x-2 font-semibold shadow-lg"
      >
        <Lock className="h-4 w-4" />
        <span>Upgrade to Access</span>
      </button>
    )}
  </div>
);

interface ActionButtonProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  bgColor: string;
  borderColor: string;
  textColor?: string;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ 
  title, 
  subtitle, 
  icon, 
  bgColor, 
  borderColor, 
  textColor = 'text-gray-900', 
  onClick 
}) => (
  <button
    onClick={onClick}
    className={`
      w-full ${bgColor} border ${borderColor} p-4 rounded-xl transition-all duration-300 text-left group
      hover:shadow-lg hover:scale-105 active:scale-95 flex items-center space-x-4
    `}
  >
    <div className={`p-2 rounded-lg ${textColor === 'text-white' ? 'bg-white/20' : 'bg-white'}`}>
      {icon}
    </div>
    <div className="flex-1">
      <h3 className={`font-semibold ${textColor}`}>{title}</h3>
      <p className={`text-sm ${textColor === 'text-white' ? 'text-white/80' : 'text-gray-600'}`}>{subtitle}</p>
    </div>
    <ChevronRight className={`h-4 w-4 ${textColor === 'text-white' ? 'text-white/60' : 'text-gray-400'} group-hover:translate-x-1 transition-transform`} />
  </button>
);

const Legend: React.FC = () => (
  <div className="flex items-center space-x-4 text-xs text-gray-600">
    <div className="flex items-center space-x-1">
      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      <span>Free</span>
    </div>
    <div className="flex items-center space-x-1">
      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
      <span>Premium</span>
    </div>
    <div className="flex items-center space-x-1">
      <Lock className="h-3 w-3 text-gray-500" />
      <span>Locked</span>
    </div>
  </div>
);