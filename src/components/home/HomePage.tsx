import React from 'react';
import { Lock, Play, BookOpen, Trophy, TrendingUp, Clock, Zap } from 'lucide-react';
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
    if (percentage === 0) return 'bg-gray-300'; // Neutral for 0%
    if (percentage < 50) return 'bg-red-500';
    if (percentage < 85) return 'bg-yellow-500'; // Add a mid-range color
    return 'bg-green-500';
  };

  const getProgressTextColor = (percentage: number) => {
    if (percentage === 0) return 'text-gray-500';
    if (percentage < 50) return 'text-red-600';
    if (percentage < 85) return 'text-yellow-600';
    return 'text-green-600';
  };

  const totalProgressPercentage = Math.round(userSubjects.reduce((acc, subject) => {
    const progress = getSubjectProgress(subject.name);
    return acc + progress.percentage;
  }, 0) / (userSubjects.length || 1));


  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-16 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Quick Stats - Mobile-friendly stacking */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <StatCard
            title="Total Subjects"
            value={userSubjects.length.toString()}
            icon={<BookOpen className="h-5 w-5 text-blue-600" />}
            bgColor="bg-blue-50"
          />
          <StatCard
            title="Premium Status"
            value={userProfile.isPremium ? 'Active' : 'Free'}
            icon={<Trophy className="h-5 w-5 text-yellow-600" />}
            bgColor="bg-yellow-50"
          />
          <StatCard
            title="Overall Progress"
            value={`${totalProgressPercentage}%`}
            icon={<TrendingUp className="h-5 w-5 text-green-600" />}
            bgColor="bg-green-50"
          />
        </div>

        {/* Subjects Grid - The core content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Study Subjects</h2>
            <Legend />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {userSubjects.map((subject) => {
              const progress = getSubjectProgress(subject.name);
              const isAccessible = !subject.isPremium || userProfile.isPremium;
              const questionsCount = getQuestionsBySubject(subject.name, userProfile.field).length;

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
                />
              );
            })}
          </div>
        </div>

        {/* Quick Actions - Enhanced mobile layout */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <ActionButton
              title="Leaderboard"
              subtitle="Check rankings"
              icon={<Trophy className="h-6 w-6 text-yellow-600" />}
              bgColor="bg-yellow-50"
              onClick={() => onNavigate('leaderboard')}
            />
            <ActionButton
              title="Notes"
              subtitle="Study materials"
              icon={<BookOpen className="h-6 w-6 text-blue-600" />}
              bgColor="bg-blue-50"
              onClick={() => onNavigate('notes')}
            />
            <ActionButton
              title="Chat"
              subtitle="Join discussions"
              icon={<Play className="h-6 w-6 text-green-600" />}
              bgColor="bg-green-50"
              onClick={() => onNavigate('chat')}
            />
            {!userProfile.isPremium && (
              <ActionButton
                title="Go Premium"
                subtitle="Unlock everything"
                icon={<Zap className="h-6 w-6 text-white" />}
                bgColor="bg-gradient-to-r from-yellow-500 to-orange-600"
                textColor="text-white"
                onClick={() => onNavigate('premium')}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;


// --- Helper Components for better readability and maintainability ---

// Component for the Quick Stats
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
}
const StatCard: React.FC<StatCardProps> = ({ title, value, icon, bgColor }) => (
  <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 flex items-center justify-between transition-transform duration-200 hover:scale-[1.02]">
    <div>
      <p className="text-xs font-medium text-gray-500 truncate">{title}</p>
      <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
        {value}
      </p>
    </div>
    <div className={`p-2 ${bgColor} rounded-lg`}>
      {icon}
    </div>
  </div>
);

// Component for the Subject Card
interface SubjectCardProps {
  subject: any; // Ideally, use a proper Subject interface
  progress: { completed: number; total: number; percentage: number };
  isAccessible: boolean;
  questionsCount: number;
  userProfile: any; // Ideally, use a proper UserProfile interface
  onNavigate: (page: string, subject?: string) => void;
  getProgressColor: (percentage: number) => string;
  getProgressTextColor: (percentage: number) => string;
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
}) => (
  <div
    key={subject.id}
    className={`
      relative bg-white border-2 rounded-xl p-5 sm:p-6 transition-all duration-300 shadow-md h-full flex flex-col
      ${isAccessible
        ? 'border-gray-200 hover:border-blue-500 cursor-pointer hover:shadow-lg'
        : 'border-gray-200 bg-gray-50 opacity-80'
      }
    `}
    onClick={() => isAccessible && onNavigate('subject', subject.name)}
  >
    {/* Top Right Badges/Icons */}
    <div className="absolute top-4 right-4 flex space-x-2">
      {!isAccessible && (
        <div className="p-1.5 bg-gray-200 rounded-full shadow-sm">
          <Lock className="h-4 w-4 text-gray-500" />
        </div>
      )}
      {!subject.isPremium && (
        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
          FREE
        </span>
      )}
    </div>

    {/* Subject Icon & Title */}
    <div className="text-4xl mb-3 mt-1">{subject.icon}</div>
    <h3 className={`font-extrabold text-xl mb-1 ${isAccessible ? 'text-gray-900' : 'text-gray-500'}`}>
      {subject.name}
    </h3>
    <p className={`text-sm mb-4 flex-grow ${isAccessible ? 'text-gray-600' : 'text-gray-400'}`}>
      {subject.description}
    </p>

    {/* Metadata */}
    <div className="flex items-center space-x-1 mb-4">
      <Clock className="h-4 w-4 text-gray-400" />
      <span className="text-sm text-gray-600">{questionsCount} questions</span>
    </div>

    {/* Progress Bar (Visible when accessible) */}
    {isAccessible && (
      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className={`text-sm font-bold ${getProgressTextColor(progress.percentage)}`}>
            {progress.percentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(progress.percentage)}`}
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>{progress.completed} done</span>
          <span>{progress.total} total</span>
        </div>
      </div>
    )}

    {/* Action Button - Always at the bottom */}
    {isAccessible ? (
      <button className="w-full mt-auto bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 font-semibold shadow-md">
        <Play className="h-4 w-4" />
        <span>Start Learning</span>
      </button>
    ) : (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate('premium');
        }}
        className="w-full mt-auto bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center space-x-2 font-semibold shadow-md"
      >
        <Lock className="h-4 w-4" />
        <span>Upgrade to Access</span>
      </button>
    )}
  </div>
);

// Component for the Quick Action Buttons
interface ActionButtonProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor?: string;
  onClick: () => void;
}
const ActionButton: React.FC<ActionButtonProps> = ({ title, subtitle, icon, bgColor, textColor = 'text-gray-900', onClick }) => (
  <button
    onClick={onClick}
    className={`
      ${bgColor} p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200 text-left group flex items-center space-x-3
      ${textColor === 'text-white' ? 'border-none' : 'bg-white'}
    `}
  >
    <div className={`p-3 rounded-lg group-hover:opacity-90 transition-colors ${textColor === 'text-white' ? 'bg-white bg-opacity-20' : bgColor}`}>
      {icon}
    </div>
    <div>
      <h3 className={`font-semibold ${textColor}`}>{title}</h3>
      <p className={`text-sm ${textColor === 'text-white' ? 'text-yellow-100' : 'text-gray-600'} hidden sm:block`}>{subtitle}</p>
    </div>
  </button>
);

// Component for the Legend
const Legend: React.FC = () => (
    <div className="flex items-center space-x-3 text-xs sm:text-sm text-gray-600">
      <div className="flex items-center space-x-1">
        <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
        <span>Free</span>
      </div>
      <div className="flex items-center space-x-1">
        <Lock className="h-3 w-3 text-gray-500" />
        <span>Premium</span>
      </div>
    </div>
);