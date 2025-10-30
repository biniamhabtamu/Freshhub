import React from 'react';
import { PlayCircle, Zap, BookOpen, Video, Users, Clock, ChevronRight, Crown, Star, Target, TrendingUp, Bookmark, Calendar, Award, Rocket, Sparkles } from 'lucide-react';

// Mock useAuth for standalone functionality
interface UserProfile { 
  id: string; 
  name: string; 
  field: string; 
  isPremium: boolean;
  streak?: number;
}
const useAuth = () => ({ 
  userProfile: { 
    id: 'u1', 
    name: 'Alex Johnson', 
    field: 'Science', 
    isPremium: false,
    streak: 7
  } as UserProfile 
});

interface TutorialPageProps {
  onNavigate: (page: string, subject?: string) => void;
}

const TutorialPage: React.FC<TutorialPageProps> = ({ onNavigate }) => {
  const { userProfile } = useAuth();

  const primaryActions = [
    {
      id: 'live',
      title: 'Live Tutorials',
      description: 'Interactive sessions with expert instructors',
      icon: Zap,
      gradient: 'from-red-500 to-pink-600',
      bgGradient: 'from-red-50 to-pink-50',
      borderColor: 'border-red-200',
      targetPage: 'live-tutorials',
      stats: '12 sessions this week',
      featured: true
    },
    {
      id: 'video',
      title: 'Video Library',
      description: 'On-demand recorded video lessons',
      icon: PlayCircle,
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200',
      targetPage: 'video-tutorials',
      stats: '1,500+ videos',
      featured: false
    },
  ];

  const featuredCourses = [
    {
      id: 'physics',
      title: 'Thermodynamics Basics',
      subject: 'Physics',
      duration: '45 min',
      progress: 65,
      instructor: 'Dr. Sarah Chen',
      rating: 4.8,
      thumbnail: '🔥',
      isPremium: false
    },
    {
      id: 'math',
      title: 'Calculus Fundamentals',
      subject: 'Mathematics',
      duration: '1h 20min',
      progress: 30,
      instructor: 'Prof. Michael Torres',
      rating: 4.9,
      thumbnail: '📊',
      isPremium: true
    },
    {
      id: 'chemistry',
      title: 'Organic Chemistry',
      subject: 'Chemistry',
      duration: '55 min',
      progress: 0,
      instructor: 'Dr. Emily Watson',
      rating: 4.7,
      thumbnail: '🧪',
      isPremium: false
    }
  ];

  const upcomingLiveSessions = [
    {
      id: 'live1',
      title: 'Quantum Mechanics Intro',
      time: 'Today, 3:00 PM',
      instructor: 'Dr. James Wilson',
      subject: 'Physics',
    },
    {
      id: 'live2',
      title: 'Statistical Analysis',
      time: 'Tomorrow, 10:00 AM',
      instructor: 'Prof. Lisa Park',
      subject: 'Mathematics',
    }
  ];

  // Enhanced QuickStatsCard Component
  const QuickStatsCard = ({ title, value, icon: Icon, color, gradient, trend }: { 
    title: string, 
    value: string, 
    icon: React.FC<any>, 
    color: string,
    gradient: string,
    trend?: string 
  }) => (
    <div className={`flex-shrink-0 w-32 bg-gradient-to-br ${gradient} p-3 rounded-xl shadow-lg border border-gray-100/50 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 cursor-pointer`}>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <div className={`p-1.5 rounded-lg bg-white/20 backdrop-blur-sm`}>
            <Icon className={`h-4 w-4 ${color}`} />
          </div>
          {trend && (
            <div className="flex items-center space-x-1 bg-white/30 rounded-full px-1.5 py-0.5">
              <TrendingUp className="h-2.5 w-2.5 text-green-600" />
              <span className="text-xs font-bold text-green-700">{trend}</span>
            </div>
          )}
        </div>
        <p className="text-xs font-semibold text-gray-700">{title}</p>
        <p className="text-lg font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );

  const CourseCard = ({ course }: { course: typeof featuredCourses[0] }) => (
    <div className="bg-white rounded-xl p-3 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group">
      <div className="flex items-start space-x-3">
        <div className="text-2xl bg-gradient-to-br from-blue-100 to-indigo-100 p-2 rounded-xl">
          {course.thumbnail}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2">{course.title}</h3>
            {course.isPremium && (
              <Crown className="h-3 w-3 text-yellow-500 fill-current flex-shrink-0 ml-1" />
            )}
          </div>
          <p className="text-xs text-gray-600 mb-1">{course.subject} • {course.duration}</p>
          <div className="flex items-center space-x-1 text-xs text-gray-500 mb-2">
            <Star className="h-3 w-3 text-yellow-500 fill-current" />
            <span>{course.rating}</span>
          </div>
          {course.progress > 0 ? (
            <div className="space-y-1">
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="h-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-1000"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Progress</span>
                <span className="font-semibold">{course.progress}%</span>
              </div>
            </div>
          ) : (
            <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold py-1.5 rounded-lg hover:shadow-lg transition-all duration-200">
              Start Learning
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 pb-20">
      
      {/* Enhanced Mobile-First Header */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-lg p-4 border-b border-gray-200/50 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
              Welcome, {userProfile?.name?.split(' ')[0] || 'Learner'}! 👋
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Continue your learning journey
            </p>
          </div>
          {userProfile?.streak && (
            <div className="flex items-center space-x-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-1.5 rounded-xl shadow-lg">
              <Sparkles className="h-3 w-3" />
              <span className="font-bold text-sm">{userProfile.streak}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 pt-4">

        {/* Enhanced Primary Action Tiles - Mobile Optimized */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          {primaryActions.map((action) => (
            <button
              key={action.id}
              onClick={() => onNavigate(action.targetPage)}
              className={`
                w-full text-left bg-gradient-to-br ${action.bgGradient} rounded-2xl p-4 shadow-lg overflow-hidden relative 
                transform transition-all duration-300 hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-opacity-50
                hover:shadow-xl group border ${action.borderColor}
                ${action.featured ? 'ring-1 ring-yellow-400/30' : ''}
              `}
            >
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-xl bg-white shadow border border-gray-100 transform group-hover:scale-105 transition-transform duration-300`}>
                    <action.icon className={`h-5 w-5 bg-gradient-to-r ${action.gradient} bg-clip-text text-transparent`} />
                  </div>
                  {action.featured && (
                    <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-bold">
                      <Zap className="h-2.5 w-2.5 fill-current" />
                      <span>FEATURED</span>
                    </div>
                  )}
                </div>
                
                <h2 className="text-lg font-bold text-gray-900 mb-1">{action.title}</h2>
                <p className="text-sm text-gray-600 mb-2 leading-relaxed">{action.description}</p>
                <p className="text-xs font-semibold text-gray-700 mb-3">{action.stats}</p>
              </div>

              {/* Enhanced Call to Action */}
              <div className={`
                relative z-10 py-2 px-3 
                bg-gradient-to-r ${action.gradient} text-white font-bold 
                flex items-center justify-between rounded-xl
                transition-all duration-300 group-hover:shadow-lg
                shadow-md text-sm
              `}>
                <span>Explore Now</span>
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </div>
            </button>
          ))}
        </div>

        {/* Enhanced Quick Stats Section - Horizontal Scroll */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center">
              <Target className="h-4 w-4 mr-2 text-blue-500" />
              Learning Dashboard
            </h2>
          </div>
          <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
            <QuickStatsCard 
              title="Total Videos" 
              value="1,500+" 
              icon={Video} 
              color="text-teal-600"
              gradient="from-teal-50 to-cyan-100"
              trend="+12%"
            />
            <QuickStatsCard 
              title="Upcoming Live" 
              value="8" 
              icon={Clock} 
              color="text-amber-600"
              gradient="from-amber-50 to-orange-100"
            />
            <QuickStatsCard 
              title="Courses" 
              value="12" 
              icon={BookOpen} 
              color="text-purple-600"
              gradient="from-purple-50 to-violet-100"
              trend="+3"
            />
            <QuickStatsCard 
              title="Hours" 
              value="47.5" 
              icon={PlayCircle} 
              color="text-blue-600"
              gradient="from-blue-50 to-indigo-100"
              trend="+5.2h"
            />
          </div>
        </div>

        {/* Enhanced Featured Courses Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center">
              <Bookmark className="h-4 w-4 mr-2 text-green-500" />
              Continue Learning
            </h2>
            <button className="text-blue-600 font-semibold text-xs hover:text-blue-700 transition-colors">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* Upcoming Live Sessions - Simplified */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-red-500" />
              Upcoming Live
            </h2>
            <button className="text-red-600 font-semibold text-xs hover:text-red-700 transition-colors">
              View Schedule
            </button>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {upcomingLiveSessions.map((session) => (
              <div key={session.id} className="bg-white rounded-xl p-3 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{session.title}</h3>
                    <p className="text-xs text-gray-600">{session.subject}</p>
                  </div>
                  <div className="text-right ml-2">
                    <p className="text-xs font-semibold text-red-600">{session.time}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {session.instructor.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="text-xs text-gray-700">{session.instructor.split(' ')[0]}</span>
                  </div>
                  <button className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1.5 rounded-lg font-semibold text-xs hover:shadow-lg transition-all duration-200">
                    Remind
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Upgrade CTA - Mobile Optimized */}
        {!userProfile?.isPremium && (
          <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 rounded-2xl p-4 text-white shadow-xl transform hover:scale-[1.005] transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm mr-3">
                  <Rocket className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold mb-1">Go Premium! 🚀</h3>
                  <p className="text-amber-100 text-xs">
                    Unlock all features
                  </p>
                </div>
              </div>
              <button className="bg-white text-orange-600 font-bold py-2 px-3 rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl flex items-center space-x-1 text-xs">
                <Crown className="h-3 w-3" />
                <span>Upgrade</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default TutorialPage;