import React, { useState, useEffect } from 'react';
import { Lock, Play, BookOpen, Trophy, TrendingUp, Clock, Zap, Star, ChevronRight, Users, Award, Target, Crown, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { subjects, getSubjectsByField } from '../../data/subjects';
import { getQuestionsBySubject } from '../../data/questions';
import { motion, AnimatePresence } from 'framer-motion';

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
    if (percentage === 0) return 'from-slate-300 to-slate-400';
    if (percentage < 30) return 'from-rose-400 to-pink-500';
    if (percentage < 60) return 'from-amber-400 to-orange-500';
    if (percentage < 85) return 'from-lime-400 to-green-500';
    return 'from-emerald-400 to-teal-500';
  };

  const totalProgressPercentage = Math.round(userSubjects.reduce((acc, subject) => {
    const progress = getSubjectProgress(subject.name);
    return acc + progress.percentage;
  }, 0) / (userSubjects.length || 1));

  const getDailyStreak = () => {
    return Math.floor(Math.random() * 7) + 1;
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
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 sm:mt-0 flex items-center space-x-2 bg-white rounded-xl px-4 py-3 shadow-lg border border-yellow-200"
              >
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700">{dailyStreak} day streak</p>
                  <p className="text-xs text-gray-500">Keep it going!</p>
                </div>
              </motion.div>
            )}
          </div>
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

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                <AnimatePresence>
                  {userSubjects.map((subject, index) => {
                    const progress = getSubjectProgress(subject.name);
                    const isAccessible = !subject.isPremium || userProfile.isPremium;
                    const questionsCount = getQuestionsBySubject(subject.name, userProfile.field).length;

                    return (
                      <MinimizedSubjectCard
                        key={subject.id}
                        subject={subject}
                        progress={progress}
                        isAccessible={isAccessible}
                        questionsCount={questionsCount}
                        userProfile={userProfile}
                        onNavigate={onNavigate}
                        getProgressColor={getProgressColor}
                        index={index}
                        mounted={mounted}
                      />
                    );
                  })}
                </AnimatePresence>
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
                    bgColor="bg-gradient-to-r from-purple-500 to-pink-600 border-purple-500"
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

// Minimized Subject Card inspired by HandoutPage design
interface MinimizedSubjectCardProps {
  subject: any;
  progress: { completed: number; total: number; percentage: number };
  isAccessible: boolean;
  questionsCount: number;
  userProfile: any;
  onNavigate: (page: string, subject?: string) => void;
  getProgressColor: (percentage: number) => string;
  index: number;
  mounted: boolean;
}

const MinimizedSubjectCard: React.FC<MinimizedSubjectCardProps> = ({
  subject,
  progress,
  isAccessible,
  questionsCount,
  userProfile,
  onNavigate,
  getProgressColor,
  index,
  mounted,
}) => {
  const handleClick = () => {
    if (isAccessible) {
      onNavigate('subject', subject.name);
    } else {
      onNavigate('premium');
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.05 }}
      className={`
        relative rounded-2xl shadow-lg border overflow-hidden cursor-pointer group
        transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-400/30
        ${!isAccessible ? 'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300' : 
          'bg-gradient-to-br from-white to-gray-50 border-gray-200'}
      `}
      onClick={handleClick}
      tabIndex={0}
      aria-label={`Select ${subject.name} ${!isAccessible ? '(locked)' : ''}`}
    >
      <div className="p-5 flex flex-col items-center text-center h-full">
        {/* Subject Icon */}
        <div className={`
          p-4 rounded-2xl flex items-center justify-center shrink-0 mb-3 transition-all duration-300 group-hover:scale-110
          ${!isAccessible ? 'bg-gray-300/50' : 'bg-gradient-to-br from-purple-100 to-indigo-100'}
        `}>
          <span className={`text-3xl ${!isAccessible ? 'text-gray-500' : 'text-purple-600'}`}>
            {!isAccessible ? '🔒' : subject.icon}
          </span>
        </div>

        {/* Subject Info */}
        <div className="flex-1 flex flex-col justify-center w-full">
          <h3 className={`text-base font-bold truncate mb-1 ${!isAccessible ? 'text-gray-500' : 'text-gray-800'}`}>
            {subject.name}
          </h3>
          <p className={`text-xs ${!isAccessible ? 'text-gray-400' : 'text-gray-500'}`}>
            {!isAccessible ? 'Upgrade to access' : `${questionsCount} questions`}
          </p>
        </div>

        {/* Progress Indicator */}
        {isAccessible && progress.percentage > 0 && (
          <div className="w-full mt-3 space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-gray-600">Progress</span>
              <span className="font-bold text-gray-800">{progress.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-1.5 rounded-full bg-gradient-to-r ${getProgressColor(progress.percentage)} transition-all duration-1000 ease-out`}
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Premium Badge */}
        {!isAccessible && !subject.isFree && (
          <div className="absolute top-3 right-3 flex items-center justify-center w-6 h-6 bg-amber-500 rounded-full shadow-md">
            <Crown className="w-3 h-3 text-white" aria-hidden="true" />
          </div>
        )}

        {/* Free/Premium Tag */}
        <div className="absolute top-3 left-3">
          {subject.isPremium ? (
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-lg font-semibold shadow-sm">
              PREM
            </span>
          ) : (
            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs px-2 py-1 rounded-lg font-semibold shadow-sm">
              FREE
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
};

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
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`
      w-full ${bgColor} p-3 rounded-xl shadow-sm border transition-all duration-300 
      text-left group flex items-center space-x-3 hover:shadow-md
      ${textColor === 'text-white' ? 'border-transparent' : ''}
    `}
  >
    <div className={`p-1.5 rounded-lg transition-transform duration-300 group-hover:scale-110 ${textColor === 'text-white' ? 'bg-white/20' : 'bg-white shadow-sm'}`}>
      {icon}
    </div>
    <div className="flex-1">
      <h3 className={`font-semibold text-sm ${textColor}`}>{title}</h3>
      <p className={`text-xs ${textColor === 'text-white' ? 'text-white/90' : 'text-gray-600'}`}>{subtitle}</p>
    </div>
    <ChevronRight className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${textColor === 'text-white' ? 'text-white/80' : 'text-gray-400'}`} />
  </motion.button>
);

// Enhanced Legend Component
const Legend: React.FC = () => (
  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-4 sm:mt-0">
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-1">
        <div className="w-2.5 h-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded shadow-sm"></div>
        <span className="text-xs">Free</span>
      </div>
      <div className="flex items-center space-x-1">
        <div className="w-2.5 h-2.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded shadow-sm"></div>
        <span className="text-xs">Premium</span>
      </div>
    </div>
    <div className="h-3 w-px bg-gray-300"></div>
    <div className="flex items-center space-x-1">
      <Lock className="h-3 w-3 text-gray-500" />
      <span className="text-xs">Locked</span>
    </div>
  </div>
);