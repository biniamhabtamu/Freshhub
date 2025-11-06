import React, { useState, useEffect } from 'react';
import { Lock, Play, BookOpen, Trophy, TrendingUp, Clock, Zap, Star, ChevronRight, Users, Award, Target, Crown, Sparkles, BookMarked, Activity, Calendar } from 'lucide-react';
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
  const [activeFilter, setActiveFilter] = useState('all');

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

  const getProgressStatus = (percentage: number) => {
    if (percentage === 0) return 'Not Started';
    if (percentage < 30) return 'Beginner';
    if (percentage < 60) return 'Intermediate';
    if (percentage < 85) return 'Advanced';
    return 'Master';
  };

  const totalProgressPercentage = Math.round(userSubjects.reduce((acc, subject) => {
    const progress = getSubjectProgress(subject.name);
    return acc + progress.percentage;
  }, 0) / (userSubjects.length || 1));

  const getDailyStreak = () => {
    return Math.floor(Math.random() * 7) + 1;
  };

  const dailyStreak = getDailyStreak();

  // Filter subjects based on active filter
  const filteredSubjects = userSubjects.filter(subject => {
    const progress = getSubjectProgress(subject.name);
    switch (activeFilter) {
      case 'in-progress':
        return progress.percentage > 0 && progress.percentage < 100;
      case 'completed':
        return progress.percentage === 100;
      case 'not-started':
        return progress.percentage === 0;
      default:
        return true;
    }
  });

  // Get today's recommended subject
  const getTodaysRecommendation = () => {
    const subjectsWithProgress = userSubjects.map(subject => ({
      ...subject,
      progress: getSubjectProgress(subject.name)
    }));
    
    // Recommend a subject with lowest progress that's not completed
    const recommended = subjectsWithProgress
      .filter(s => s.progress.percentage < 100)
      .sort((a, b) => a.progress.percentage - b.progress.percentage)[0];
    
    return recommended || subjectsWithProgress[0];
  };

  const todaysRecommendation = getTodaysRecommendation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 pb-20 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Enhanced Welcome Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white rounded-2xl shadow-lg border border-white/60">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Welcome back, {userProfile.name}! 👋
                  </h1>
                  <p className="text-gray-600 mt-2 flex items-center">
                    Continue your learning journey in {userProfile.field}
                    <span className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center space-x-3 bg-white rounded-2xl px-4 py-3 shadow-lg border border-yellow-200 min-w-[160px]"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{dailyStreak}</p>
                  <p className="text-xs text-gray-500">Day streak</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-3 bg-white rounded-2xl px-4 py-3 shadow-lg border border-blue-200 min-w-[160px]"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{totalProgressPercentage}%</p>
                  <p className="text-xs text-gray-500">Overall progress</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Today's Recommendation */}
        {todaysRecommendation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl shadow-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="h-5 w-5 text-white/90" />
                      <span className="text-sm font-medium text-white/90">Today's Recommendation</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{todaysRecommendation.name}</h2>
                    <p className="text-white/80 mb-4 max-w-2xl">
                      Based on your learning pattern, we recommend continuing with {todaysRecommendation.name.toLowerCase()} to maximize your progress.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onNavigate('subject', todaysRecommendation.name)}
                      className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
                    >
                      <Play className="h-4 w-4" />
                      Continue Learning
                    </motion.button>
                  </div>
                  <div className="mt-6 lg:mt-0 lg:ml-6">
                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                      <div className="text-center">
                        <p className="text-sm text-white/80 mb-1">Current Progress</p>
                        <div className="relative w-20 h-20 mx-auto mb-2">
                          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.3)" strokeWidth="8" fill="none" />
                            <circle 
                              cx="50" cy="50" r="40" 
                              stroke="white" 
                              strokeWidth="8" 
                              fill="none"
                              strokeLinecap="round"
                              strokeDasharray="251.2"
                              strokeDashoffset={251.2 * (1 - todaysRecommendation.progress.percentage / 100)}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-bold">{todaysRecommendation.progress.percentage}%</span>
                          </div>
                        </div>
                        <p className="text-xs text-white/80">{getProgressStatus(todaysRecommendation.progress.percentage)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Subjects Grid - Main Content */}
          <div className="flex-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent flex items-center gap-3">
                    <BookMarked className="h-8 w-8 text-purple-600" />
                    Study Subjects
                  </h2>
                  <p className="text-gray-600 mt-2">Select a subject to start learning</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Filter Buttons */}
                  <div className="flex bg-gray-100 rounded-2xl p-1">
                    {[
                      { key: 'all', label: 'All' },
                      { key: 'in-progress', label: 'In Progress' },
                      { key: 'completed', label: 'Completed' },
                      { key: 'not-started', label: 'Not Started' }
                    ].map((filter) => (
                      <button
                        key={filter.key}
                        onClick={() => setActiveFilter(filter.key)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                          activeFilter === filter.key
                            ? 'bg-white text-purple-600 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                  
                  <Legend />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                <AnimatePresence>
                  {filteredSubjects.map((subject, index) => {
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
                        getProgressStatus={getProgressStatus}
                        index={index}
                        mounted={mounted}
                      />
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="lg:w-80 xl:w-96 flex flex-col gap-6">
            {/* Enhanced Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <EnhancedActionButton
                  title="Leaderboard"
                  subtitle="Check rankings & compete"
                  icon={<Trophy className="h-5 w-5 text-yellow-600" />}
                  bgColor="bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200"
                  onClick={() => onNavigate('leaderboard')}
                />
                <EnhancedActionButton
                  title="Study Notes"
                  subtitle="Access study materials"
                  icon={<BookOpen className="h-5 w-5 text-blue-600" />}
                  bgColor="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200"
                  onClick={() => onNavigate('notes')}
                />
                <EnhancedActionButton
                  title="Community"
                  subtitle="Join discussions"
                  icon={<Users className="h-5 w-5 text-green-600" />}
                  bgColor="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
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

            {/* Enhanced Progress Overview */}
            <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl shadow-xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Learning Analytics
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
                  
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{userSubjects.filter(s => getSubjectProgress(s.name).percentage > 0).length}</p>
                      <p className="text-xs text-blue-100">In Progress</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{userSubjects.filter(s => getSubjectProgress(s.name).percentage === 100).length}</p>
                      <p className="text-xs text-blue-100">Completed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-600" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {userSubjects
                  .filter(s => getSubjectProgress(s.name).percentage > 0)
                  .slice(0, 3)
                  .map((subject, index) => {
                    const progress = getSubjectProgress(subject.name);
                    return (
                      <div key={subject.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${getProgressColor(progress.percentage)} flex items-center justify-center`}>
                          <span className="text-white text-lg">{subject.icon}</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm text-gray-900">{subject.name}</p>
                          <p className="text-xs text-gray-500">{progress.percentage}% completed</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

// Enhanced Subject Card Component
interface EnhancedSubjectCardProps {
  subject: any;
  progress: { completed: number; total: number; percentage: number };
  isAccessible: boolean;
  questionsCount: number;
  userProfile: any;
  onNavigate: (page: string, subject?: string) => void;
  getProgressColor: (percentage: number) => string;
  getProgressStatus: (percentage: number) => string;
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
  getProgressStatus,
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
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        duration: 0.4, 
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.05 
      }}
      className={`
        relative rounded-3xl shadow-lg border-2 overflow-hidden cursor-pointer group
        transition-all duration-500 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-400/30
        ${!isAccessible ? 
          'bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300' : 
          'bg-gradient-to-br from-white to-gray-50 border-gray-200/60 hover:border-purple-200'
        }
      `}
      onClick={handleClick}
      tabIndex={0}
      aria-label={`Select ${subject.name} ${!isAccessible ? '(locked)' : ''}`}
    >
      {/* Background Gradient Effect */}
      <div className={`
        absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
        ${!isAccessible ? 
          'bg-gradient-to-br from-gray-200 to-gray-300' : 
          'bg-gradient-to-br from-purple-50 to-pink-50'
        }
      `}></div>

      <div className="relative p-6 flex flex-col items-center text-center h-full z-10">
        {/* Subject Icon with Enhanced Design */}
        <div className={`
          p-5 rounded-2xl flex items-center justify-center shrink-0 mb-4 
          transition-all duration-500 group-hover:scale-110 group-hover:rotate-3
          ${!isAccessible ? 
            'bg-gray-300/50' : 
            'bg-gradient-to-br from-purple-100 to-indigo-100 shadow-lg'
          }
        `}>
          <span className={`text-4xl ${!isAccessible ? 'text-gray-500' : 'text-purple-600'}`}>
            {!isAccessible ? '🔒' : subject.icon}
          </span>
        </div>

        {/* Subject Info */}
        <div className="flex-1 flex flex-col justify-center w-full mb-4">
          <h3 className={`text-lg font-bold truncate mb-2 ${!isAccessible ? 'text-gray-500' : 'text-gray-800'}`}>
            {subject.name}
          </h3>
          <p className={`text-sm ${!isAccessible ? 'text-gray-400' : 'text-gray-500'}`}>
            {!isAccessible ? 'Upgrade to access' : `${questionsCount} questions`}
          </p>
        </div>

        {/* Enhanced Progress Indicator */}
        {isAccessible && (
          <div className="w-full space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-gray-600">{getProgressStatus(progress.percentage)}</span>
              <span className="font-bold text-gray-800">{progress.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-2.5 rounded-full bg-gradient-to-r ${getProgressColor(progress.percentage)} transition-all duration-1000 ease-out`}
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
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            w-full mt-4 py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300
            flex items-center justify-center gap-2
            ${!isAccessible ? 
              'bg-gray-400 text-white cursor-not-allowed' : 
              'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl'
            }
          `}
          disabled={!isAccessible}
        >
          {!isAccessible ? (
            <>
              <Lock className="h-4 w-4" />
              Locked
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              {progress.percentage > 0 ? 'Continue' : 'Start'}
            </>
          )}
        </motion.button>

        {/* Premium Badge */}
        {!isAccessible && !subject.isFree && (
          <div className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-lg">
            <Crown className="w-4 h-4 text-white" aria-hidden="true" />
          </div>
        )}

        {/* Free/Premium Tag */}
        <div className="absolute top-4 left-4">
          {subject.isPremium ? (
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-1.5 rounded-xl font-semibold shadow-md">
              PREMIUM
            </span>
          ) : (
            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs px-3 py-1.5 rounded-xl font-semibold shadow-md">
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
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`
      w-full ${bgColor} p-4 rounded-2xl shadow-sm border-2 transition-all duration-300 
      text-left group flex items-center space-x-4 hover:shadow-lg
      ${textColor === 'text-white' ? 'border-transparent' : 'border-white/60'}
    `}
  >
    <div className={`p-2 rounded-xl transition-all duration-300 group-hover:scale-110 ${textColor === 'text-white' ? 'bg-white/20' : 'bg-white shadow-sm'}`}>
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
  <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600">
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded shadow-sm"></div>
          <span className="text-xs font-medium">Free</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded shadow-sm"></div>
          <span className="text-xs font-medium">Premium</span>
        </div>
      </div>
      <div className="h-4 w-px bg-gray-300"></div>
      <div className="flex items-center space-x-1">
        <Lock className="h-3 w-3 text-gray-500" />
        <span className="text-xs font-medium">Locked</span>
      </div>
    </div>
  </div>
);