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
      description: 'Join scheduled, interactive learning sessions with expert instructors and real-time Q&A.',
      icon: Zap,
      gradient: 'from-red-500 to-pink-600',
      bgGradient: 'from-red-50 to-pink-50',
      borderColor: 'border-red-200',
      actionLabel: 'View Schedule',
      targetPage: 'live-tutorials',
      stats: '12 sessions this week',
      featured: true
    },
    {
      id: 'video',
      title: 'Video Library',
      description: 'Access a vast collection of on-demand recorded video lessons across all subjects.',
      icon: PlayCircle,
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200',
      actionLabel: 'Browse Videos',
      targetPage: 'video-tutorials',
      stats: '1,500+ videos available',
      featured: false
    },
  ];

  const featuredCourses = [
    {
      id: 'physics',
      title: 'Thermodynamics Basics',
      subject: 'Physics',
      duration: '45 min',
      level: 'Beginner',
      progress: 65,
      instructor: 'Dr. Sarah Chen',
      rating: 4.8,
      students: 1247,
      thumbnail: '🔥',
      isPremium: false
    },
    {
      id: 'math',
      title: 'Calculus Fundamentals',
      subject: 'Mathematics',
      duration: '1h 20min',
      level: 'Intermediate',
      progress: 30,
      instructor: 'Prof. Michael Torres',
      rating: 4.9,
      students: 892,
      thumbnail: '📊',
      isPremium: true
    },
    {
      id: 'chemistry',
      title: 'Organic Chemistry',
      subject: 'Chemistry',
      duration: '55 min',
      level: 'Advanced',
      progress: 0,
      instructor: 'Dr. Emily Watson',
      rating: 4.7,
      students: 567,
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
      attendees: 47,
      subject: 'Physics',
      duration: '60 min'
    },
    {
      id: 'live2',
      title: 'Statistical Analysis',
      time: 'Tomorrow, 10:00 AM',
      instructor: 'Prof. Lisa Park',
      attendees: 23,
      subject: 'Mathematics',
      duration: '45 min'
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
    <div className={`flex-shrink-0 w-36 sm:w-44 bg-gradient-to-br ${gradient} p-4 rounded-2xl shadow-lg border border-gray-100/50 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 cursor-pointer`}>
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className={`p-2 rounded-xl bg-white/20 backdrop-blur-sm shadow-inner`}>
            <Icon className={`h-5 w-5 ${color}`} />
          </div>
          {trend && (
            <div className="flex items-center space-x-1 bg-white/30 rounded-full px-2 py-1">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-xs font-bold text-green-700">{trend}</span>
            </div>
          )}
        </div>
        <p className="text-sm font-semibold text-gray-700">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );

  const CourseCard = ({ course }: { course: typeof featuredCourses[0] }) => (
    <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group">
      <div className="flex items-start space-x-4">
        <div className="text-3xl bg-gradient-to-br from-blue-100 to-indigo-100 p-3 rounded-2xl">
          {course.thumbnail}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-gray-900 text-sm leading-tight">{course.title}</h3>
            {course.isPremium && (
              <Crown className="h-4 w-4 text-yellow-500 fill-current" />
            )}
          </div>
          <p className="text-xs text-gray-600 mb-2">{course.subject} • {course.duration}</p>
          <div className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
            <Star className="h-3 w-3 text-yellow-500 fill-current" />
            <span>{course.rating}</span>
            <Users className="h-3 w-3 text-blue-500" />
            <span>{course.students.toLocaleString()}</span>
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
            <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold py-2 rounded-xl hover:shadow-lg transition-all duration-200">
              Start Learning
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 pb-24">
      
      {/* Enhanced Sticky Header */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg p-6 border-b border-gray-200/50 shadow-sm lg:static lg:bg-transparent lg:shadow-none lg:border-none lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
                Welcome back, {userProfile?.name?.split(' ')[0] || 'Learner'}! 👋
              </h1>
              <p className="text-lg text-gray-600 mt-2 hidden sm:block">
                Continue your learning journey with <span className="font-semibold text-blue-600">live sessions</span> and <span className="font-semibold text-purple-600">video tutorials</span>
              </p>
            </div>
            {userProfile?.streak && (
              <div className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-2xl shadow-lg">
                <Sparkles className="h-4 w-4" />
                <span className="font-bold">{userProfile.streak} day streak</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">

        {/* Enhanced Primary Action Tiles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {primaryActions.map((action) => (
            <button
              key={action.id}
              onClick={() => onNavigate(action.targetPage)}
              className={`
                w-full text-left bg-gradient-to-br ${action.bgGradient} rounded-3xl p-6 shadow-xl overflow-hidden relative 
                transform transition-all duration-500 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-opacity-50
                hover:shadow-2xl group border-2 ${action.borderColor}
                ${action.featured ? 'ring-2 ring-yellow-400/30' : ''}
              `}
            >
              {/* Animated Background Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full transform -translate-x-1/2 translate-y-1/2" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-white shadow-lg border border-gray-100 transform group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className={`h-7 w-7 bg-gradient-to-r ${action.gradient} bg-clip-text text-transparent`} />
                  </div>
                  {action.featured && (
                    <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">
                      <Zap className="h-3 w-3 fill-current" />
                      <span>FEATURED</span>
                    </div>
                  )}
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{action.title}</h2>
                <p className="text-gray-600 mb-3 leading-relaxed">{action.description}</p>
                <p className="text-sm font-semibold text-gray-700 mb-6">{action.stats}</p>
              </div>

              {/* Enhanced Call to Action */}
              <div className={`
                relative z-10 py-4 px-6 
                bg-gradient-to-r ${action.gradient} text-white font-bold 
                flex items-center justify-between rounded-2xl
                transition-all duration-300 group-hover:shadow-2xl transform group-hover:translate-y-[-2px]
                shadow-lg
              `}>
                <span className="text-sm">{action.actionLabel}</span>
                <div className="flex items-center space-x-1">
                  <span className="text-xs opacity-90">Explore</span>
                  <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Enhanced Quick Stats Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Target className="h-6 w-6 mr-3 text-blue-500" />
              Learning Dashboard
            </h2>
            <span className="text-sm text-gray-500 font-medium">Updated just now</span>
          </div>
          <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide snap-x">
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
              title="Courses Enrolled" 
              value="12" 
              icon={BookOpen} 
              color="text-purple-600"
              gradient="from-purple-50 to-violet-100"
              trend="+3"
            />
            <QuickStatsCard 
              title="Study Groups" 
              value="24" 
              icon={Users} 
              color="text-orange-600"
              gradient="from-orange-50 to-red-100"
            />
            <QuickStatsCard 
              title="Hours Watched" 
              value="47.5" 
              icon={PlayCircle} 
              color="text-blue-600"
              gradient="from-blue-50 to-indigo-100"
              trend="+5.2h"
            />
          </div>
        </div>

        {/* Enhanced Featured Courses Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Bookmark className="h-6 w-6 mr-3 text-green-500" />
              Continue Learning
            </h2>
            <button className="text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors">
              View All Courses
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* Upcoming Live Sessions */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Calendar className="h-6 w-6 mr-3 text-red-500" />
              Upcoming Live Sessions
            </h2>
            <button className="text-red-600 font-semibold text-sm hover:text-red-700 transition-colors">
              View Full Schedule
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingLiveSessions.map((session) => (
              <div key={session.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{session.title}</h3>
                    <p className="text-sm text-gray-600">{session.subject} • {session.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-red-600">{session.time}</p>
                    <p className="text-xs text-gray-500">{session.attendees} attending</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {session.instructor.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="text-sm text-gray-700">{session.instructor}</span>
                  </div>
                  <button className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-xl font-semibold text-sm hover:shadow-lg transition-all duration-200">
                    Set Reminder
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Upgrade CTA */}
        {!userProfile?.isPremium && (
          <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 rounded-3xl p-8 text-white shadow-2xl transform hover:scale-[1.005] transition-all duration-300">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="flex items-center mb-6 lg:mb-0">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm mr-6">
                  <Rocket className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Unlock Premium Features! 🚀</h3>
                  <p className="text-amber-100">
                    Get access to all premium courses, live sessions, and exclusive content
                  </p>
                </div>
              </div>
              <button className="bg-white text-orange-600 font-bold py-3 px-6 rounded-2xl hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2">
                <Crown className="h-5 w-5" />
                <span>Upgrade Now</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default TutorialPage;