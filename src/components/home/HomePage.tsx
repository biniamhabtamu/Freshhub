import React from 'react';
import { Lock, Play, BookOpen, Trophy, TrendingUp, Clock } from 'lucide-react';
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
    if (percentage === 0) return 'bg-gray-200';
    if (percentage < 50) return 'bg-red-500';
    return 'bg-green-500';
  };

  const getProgressTextColor = (percentage: number) => {
    if (percentage === 0) return 'text-gray-600';
    if (percentage < 50) return 'text-red-600';
    return 'text-green-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {userProfile.name}! 👋
              </h1>
              <p className="text-blue-100 text-lg">
                Ready to ace your {userProfile.field === 'natural' ? 'Natural Sciences' : 'Social Sciences'} exams?
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available Subjects</p>
                <p className="text-2xl font-bold text-gray-900">{userSubjects.length}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Premium Status</p>
                <p className="text-2xl font-bold text-gray-900">
                  {userProfile.isPremium ? 'Active' : 'Free'}
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <Trophy className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(userSubjects.reduce((acc, subject) => {
                    const progress = getSubjectProgress(subject.name);
                    return acc + progress.percentage;
                  }, 0) / userSubjects.length) || 0}%
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Subjects</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Free</span>
              </div>
              <div className="flex items-center space-x-1">
                <Lock className="h-3 w-3" />
                <span>Premium</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {userSubjects.map((subject) => {
              const progress = getSubjectProgress(subject.name);
              const isAccessible = !subject.isPremium || userProfile.isPremium;
              const questionsCount = getQuestionsBySubject(subject.name, userProfile.field).length;

              return (
                <div
                  key={subject.id}
                  className={`
                    relative bg-white border-2 rounded-xl p-6 transition-all duration-200 hover:shadow-lg
                    ${isAccessible 
                      ? 'border-gray-200 hover:border-blue-300 cursor-pointer' 
                      : 'border-gray-200 bg-gray-50'
                    }
                  `}
                  onClick={() => isAccessible && onNavigate('subject', subject.name)}
                >
                  {/* Premium Lock */}
                  {!isAccessible && (
                    <div className="absolute top-3 right-3">
                      <div className="p-1.5 bg-gray-200 rounded-full">
                        <Lock className="h-4 w-4 text-gray-500" />
                      </div>
                    </div>
                  )}

                  {/* Subject Icon */}
                  <div className="text-4xl mb-4">{subject.icon}</div>

                  {/* Subject Info */}
                  <h3 className={`font-bold text-lg mb-2 ${isAccessible ? 'text-gray-900' : 'text-gray-500'}`}>
                    {subject.name}
                  </h3>
                  <p className={`text-sm mb-4 ${isAccessible ? 'text-gray-600' : 'text-gray-400'}`}>
                    {subject.description}
                  </p>

                  {/* Questions Count */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{questionsCount} questions</span>
                    </div>
                    {!subject.isPremium && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                        FREE
                      </span>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {isAccessible && (
                    <div className="space-y-2">
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
                        <span>{progress.completed} completed</span>
                        <span>{progress.total} total</span>
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  {isAccessible ? (
                    <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                      <Play className="h-4 w-4" />
                      <span>Start Learning</span>
                    </button>
                  ) : (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('premium');
                      }}
                      className="w-full mt-4 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Lock className="h-4 w-4" />
                      <span>Upgrade to Access</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={() => onNavigate('leaderboard')}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow text-left group"
          >
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-yellow-50 rounded-lg group-hover:bg-yellow-100 transition-colors">
                <Trophy className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Leaderboard</h3>
                <p className="text-sm text-gray-600">Check rankings</p>
              </div>
            </div>
          </button>

          <button 
            onClick={() => onNavigate('notes')}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow text-left group"
          >
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Notes</h3>
                <p className="text-sm text-gray-600">Study materials</p>
              </div>
            </div>
          </button>

          <button 
            onClick={() => onNavigate('chat')}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow text-left group"
          >
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                <Play className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Chat</h3>
                <p className="text-sm text-gray-600">Join discussions</p>
              </div>
            </div>
          </button>

          <button 
            onClick={() => onNavigate('premium')}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-left group"
          >
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-white bg-opacity-20 rounded-lg group-hover:bg-opacity-30 transition-colors">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Go Premium</h3>
                <p className="text-sm text-yellow-100">Unlock everything</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;