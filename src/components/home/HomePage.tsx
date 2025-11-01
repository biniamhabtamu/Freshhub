import React, { useState, useEffect } from 'react';
import { Lock, Play, BookOpen, Trophy, TrendingUp, Clock, Zap, Star, ChevronRight, Users, Award, Target } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { subjects, getSubjectsByField } from '../../data/subjects';
import { getQuestionsBySubject } from '../../data/questions';

interface HomePageProps {
  onNavigate: (page: string, subject?: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { userProfile } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    if (percentage < 60) return 'from-orange-400 to-orange-500';
    if (percentage < 85) return 'from-yellow-400 to-yellow-500';
    return 'from-green-400 to-green-500';
  };

  const getProgressBgColor = (percentage: number) => {
    if (percentage === 0) return 'bg-gray-100';
    if (percentage < 30) return 'bg-red-50';
    if (percentage < 60) return 'bg-orange-50';
    if (percentage < 85) return 'bg-yellow-50';
    return 'bg-green-50';
  };

  const totalProgressPercentage = Math.round(userSubjects.reduce((acc, subject) => {
    const progress = getSubjectProgress(subject.name);
    return acc + progress.percentage;
  }, 0) / (userSubjects.length || 1));

  // Calculate streak or recent activity
  const getDailyStreak = () => {
    // This would typically come from your backend or localStorage
    return Math.floor(Math.random() * 7) + 1; // Mock data
  };

  const dailyStreak = getDailyStreak();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 pb-20 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome back, {userProfile.name}!
              </h1>
              <p className="text-gray-600 mt-2 flex items-center">
                Continue your learning journey in {userProfile.field}
                <span className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              </p>
            </div>
            {dailyStreak > 0 && (
              <div className="mt-4 sm:mt-0 flex items-center space-x-2 bg-white rounded-xl px-4 py-3 shadow-lg border border-yellow-200">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">{dailyStreak} day streak</p>
                  <p className="text-xs text-gray-500">Keep it going!</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <EnhancedStatCard
            title="Total Subjects"
            value={userSubjects.length.toString()}
            subtitle="Available to study"
            icon={<BookOpen className="h-6 w-6 text-white" />}
            gradient="from-blue-500 to-cyan-500"
            delay={0}
            mounted={mounted}
          />
          <EnhancedStatCard
            title="Premium Status"
            value={userProfile.isPremium ? 'Active' : 'Free'}
            subtitle={userProfile.isPremium ? 'All features unlocked' : 'Upgrade for more'}
            icon={<Trophy className="h-6 w-6 text-white" />}
            gradient={userProfile.isPremium ? "from-yellow-500 to-orange-500" : "from-gray-500 to-slate-600"}
            delay={100}
            mounted={mounted}
          />
          <EnhancedStatCard
            title="Overall Progress"
            value={`${totalProgressPercentage}%`}
            subtitle="Across all subjects"
            icon={<TrendingUp className="h-6 w-6 text-white" />}
            gradient="from-green-500 to-emerald-600"
            delay={200}
            mounted={mounted}
          />
          <EnhancedStatCard
            title="Daily Goal"
            value={userProfile.isPremium ? "5/5" : "3/5"}
            subtitle={userProfile.isPremium ? "Completed" : "Complete to unlock"}
            icon={<Star className="h-6 w-6 text-white" />}
            gradient="from-purple-500 to-pink-500"
            delay={300}
            mounted={mounted}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Subjects Grid - Main Content */}
          <div className="flex-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Study Subjects
                  </h2>
                  <p className="text-gray-600 mt-2">Select a subject to start learning</p>
                </div>
                <Legend />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                {userSubjects.map((subject, index) => {
                  const progress = getSubjectProgress(subject.name);
                  const isAccessible = !subject.isPremium || userProfile.isPremium;
                  const questionsCount = getQuestionsBySubject(subject.name, userProfile.field).length;

                  return (
                    <EnhancedSubjectCard
                      key={subject.id}
                      subject={subject}
                      progress={progress}
                      isAccessible={isAccessible}
                      questionsCount={questionsCount}
                      userProfile={userProfile}
                      onNavigate={onNavigate}
                      getProgressColor={getProgressColor}
                      getProgressBgColor={getProgressBgColor}
                      index={index}
                      mounted={mounted}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar with Quick Actions and Additional Info */}
          <div className="lg:w-80 xl:w-96 flex flex-col gap-6">
            {/* Enhanced Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Zap className="h-5 w-5 text-yellow-500 mr-2" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <EnhancedActionButton
                  title="Leaderboard"
                  subtitle="Check rankings & compete"
                  icon={<Trophy className="h-5 w-5 text-yellow-600" />}
                  bgColor="bg-yellow-50 border-yellow-200"
                  onClick={() => onNavigate('leaderboard')}
                />
                <EnhancedActionButton
                  title="Study Notes"
                  subtitle="Access study materials"
                  icon={<BookOpen className="h-5 w-5 text-blue-600" />}
                  bgColor="bg-blue-50 border-blue-200"
                  onClick={() => onNavigate('notes')}
                />
                <EnhancedActionButton
                  title="Community"
                  subtitle="Join discussions"
                  icon={<Users className="h-5 w-5 text-green-600" />}
                  bgColor="bg-green-50 border-green-200"
                  onClick={() => onNavigate('chat')}
                />
                {!userProfile.isPremium && (
                  <EnhancedActionButton
                    title="Go Premium"
                    subtitle="Unlock all features"
                    icon={<Award className="h-5 w-5 text-white" />}
                    bgColor="bg-gradient-to-r from-yellow-500 to-orange-600 border-orange-500"
                    textColor="text-white"
                    onClick={() => onNavigate('premium')}
                  />
                )}
              </div>
            </div>

            {/* Progress Overview */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-blue-100">Overall Completion</span>
                  <span className="font-bold text-lg">{totalProgressPercentage}%</span>
                </div>
                <div className="w-full bg-blue-400/30 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-white transition-all duration-1000 ease-out"
                    style={{ width: `${totalProgressPercentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-blue-100">
                  <span>{userSubjects.filter(s => getSubjectProgress(s.name).percentage > 0).length} subjects started</span>
                  <span>{userSubjects.filter(s => getSubjectProgress(s.name).percentage === 100).length} completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

// Enhanced Stat Card with animations
interface EnhancedStatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
  delay: number;
  mounted: boolean;
}

const EnhancedStatCard: React.FC<EnhancedStatCardProps> = ({ 
  title, value, subtitle, icon, gradient, delay, mounted 
}) => (
  <div 
    className={`
      bg-white rounded-2xl p-5 shadow-lg border border-gray-100 overflow-hidden relative
      transition-all duration-500 transform hover:scale-[1.02] hover:shadow-xl
      ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
    `}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
      <div className={`p-3 rounded-xl bg-gradient-to-r ${gradient} shadow-md`}>
        {icon}
      </div>
    </div>
    <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${gradient}`} />
  </div>
);

// Enhanced Subject Card
interface EnhancedSubjectCardProps {
  subject: any;
  progress: { completed: number; total: number; percentage: number };
  isAccessible: boolean;
  questionsCount: number;
  userProfile: any;
  onNavigate: (page: string, subject?: string) => void;
  getProgressColor: (percentage: number) => string;
  getProgressBgColor: (percentage: number) => string;
  index: number;
  mounted: boolean;
}

const EnhancedSubjectCard: React.FC<EnhancedSubjectCardProps> = ({
  subject,
  progress,
  isAccessible,
  questionsCount,
  userProfile,
  onNavigate,
  getProgressColor,
  getProgressBgColor,
  index,
  mounted,
}) => (
  <div
    className={`
      relative bg-white border border-gray-200 rounded-2xl p-5 transition-all duration-500 h-full flex flex-col
      group hover:shadow-xl hover:border-blue-300 overflow-hidden
      ${isAccessible ? 'cursor-pointer' : 'opacity-80'}
      ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
    `}
    style={{ transitionDelay: `${index * 100}ms` }}
    onClick={() => isAccessible && onNavigate('subject', subject.name)}
  >
    {/* Background gradient on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
    {/* Top Right Badges */}
    <div className="absolute top-4 right-4 flex space-x-2 z-10">
      {!isAccessible && (
        <div className="p-1.5 bg-gray-100 rounded-full shadow-sm border border-gray-200">
          <Lock className="h-3.5 w-3.5 text-gray-500" />
        </div>
      )}
      {subject.isPremium ? (
        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2.5 py-1 rounded-full font-bold shadow-sm">
          PREMIUM
        </span>
      ) : (
        <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs px-2.5 py-1 rounded-full font-bold shadow-sm">
          FREE
        </span>
      )}
    </div>

    {/* Subject Content */}
    <div className="relative z-1 flex flex-col h-full">
      {/* Icon and Title */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="text-3xl">{subject.icon}</div>
        <h3 className={`font-bold text-lg ${isAccessible ? 'text-gray-900' : 'text-gray-500'}`}>
          {subject.name}
        </h3>
      </div>

      {/* Description */}
      <p className={`text-sm mb-4 flex-grow ${isAccessible ? 'text-gray-600' : 'text-gray-400'}`}>
        {subject.description}
      </p>

      {/* Metadata */}
      <div className="flex items-center space-x-4 mb-4 text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <Clock className="h-3.5 w-3.5" />
          <span>{questionsCount} questions</span>
        </div>
        {progress.percentage > 0 && (
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>{progress.percentage}% complete</span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {isAccessible && progress.percentage > 0 && (
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center text-xs">
            <span className="font-medium text-gray-700">Your progress</span>
            <span className="font-bold text-gray-900">{progress.percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className={`h-2 rounded-full bg-gradient-to-r ${getProgressColor(progress.percentage)} transition-all duration-1000 ease-out`}
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{progress.completed} completed</span>
            <span>{progress.total} total</span>
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="mt-auto pt-4">
        {isAccessible ? (
          <button className="w-full group/btn bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            <Play className="h-4 w-4 transition-transform group-hover/btn:scale-110" />
            <span>Start Learning</span>
            <ChevronRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('premium');
            }}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 px-4 rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 flex items-center justify-center space-x-2 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Lock className="h-4 w-4" />
            <span>Upgrade to Access</span>
          </button>
        )}
      </div>
    </div>
  </div>
);

// Enhanced Action Button
interface EnhancedActionButtonProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor?: string;
  onClick: () => void;
}

const EnhancedActionButton: React.FC<EnhancedActionButtonProps> = ({ 
  title, subtitle, icon, bgColor, textColor = 'text-gray-900', onClick 
}) => (
  <button
    onClick={onClick}
    className={`
      w-full ${bgColor} p-4 rounded-xl shadow-sm border transition-all duration-300 
      text-left group flex items-center space-x-4 hover:shadow-lg hover:scale-[1.02]
      ${textColor === 'text-white' ? 'border-transparent' : ''}
    `}
  >
    <div className={`p-2 rounded-lg transition-transform duration-300 group-hover:scale-110 ${textColor === 'text-white' ? 'bg-white/20' : 'bg-white shadow-sm'}`}>
      {icon}
    </div>
    <div className="flex-1">
      <h3 className={`font-semibold ${textColor}`}>{title}</h3>
      <p className={`text-sm ${textColor === 'text-white' ? 'text-white/90' : 'text-gray-600'}`}>{subtitle}</p>
    </div>
    <ChevronRight className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${textColor === 'text-white' ? 'text-white/80' : 'text-gray-400'}`} />
  </button>
);

// Enhanced Legend Component
const Legend: React.FC = () => (
  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-4 sm:mt-0">
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-1">
        <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-sm"></div>
        <span>Free</span>
      </div>
      <div className="flex items-center space-x-1">
        <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-sm"></div>
        <span>Premium</span>
      </div>
    </div>
    <div className="h-4 w-px bg-gray-300"></div>
    <div className="flex items-center space-x-1">
      <Lock className="h-3.5 w-3.5 text-gray-500" />
      <span>Locked</span>
    </div>
  </div>
);