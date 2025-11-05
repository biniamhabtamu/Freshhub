import React, { useState, useEffect } from 'react';
import { PlayCircle, Zap, BookOpen, Video, Users, Clock, ChevronRight, Crown, Star, Target, TrendingUp, Bookmark, Calendar, Award, Rocket, Sparkles, BookText, Mic2, BarChart3, Shield } from 'lucide-react';

// Mock useAuth for standalone functionality
interface UserProfile { 
  id: string; 
  name: string; 
  field: string; 
  isPremium: boolean;
  streak?: number;
  avatar?: string;
}
const useAuth = () => ({ 
  userProfile: { 
    id: 'u1', 
    name: 'Alex Johnson', 
    field: 'Science', 
    isPremium: false,
    streak: 7,
    avatar: '👨‍🎓'
  } as UserProfile 
});

interface TutorialPageProps {
  onNavigate: (page: string, subject?: string) => void;
}

const TutorialPage: React.FC<TutorialPageProps> = ({ onNavigate }) => {
  const { userProfile } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const primaryActions = [
    {
      id: 'live',
      title: 'Live Tutorials',
      description: 'Interactive sessions with expert instructors',
      icon: Zap,
      gradient: 'from-red-500 to-pink-600',
      bgGradient: 'from-red-50/80 to-pink-50/80',
      borderColor: 'border-red-200/50',
      targetPage: 'live-tutorials',
      stats: '12 sessions this week',
      featured: true,
      badge: '🔥 Live Now'
    },
    {
      id: 'video',
      title: 'Video Library',
      description: 'On-demand recorded video lessons',
      icon: PlayCircle,
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50/80 to-indigo-50/80',
      borderColor: 'border-blue-200/50',
      targetPage: 'video-tutorials',
      stats: '1,500+ videos',
      featured: false,
      badge: '📚 Updated Daily'
    },
    {
      id: 'practice',
      title: 'Practice Tests',
      description: 'Test your knowledge with interactive quizzes',
      icon: BookText,
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-50/80 to-emerald-50/80',
      borderColor: 'border-green-200/50',
      targetPage: 'practice-tests',
      stats: '300+ questions',
      featured: false,
      badge: '🎯 Smart Analytics'
    },
    {
      id: 'audio',
      title: 'Audio Lessons',
      description: 'Learn on the go with audio content',
      icon: Mic2,
      gradient: 'from-purple-500 to-fuchsia-600',
      bgGradient: 'from-purple-50/80 to-fuchsia-50/80',
      borderColor: 'border-purple-200/50',
      targetPage: 'audio-lessons',
      stats: '200+ lessons',
      featured: false,
      badge: '🎧 Listen Anywhere'
    }
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
      isPremium: false,
      students: 1247,
      color: 'from-orange-500 to-red-500'
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
      isPremium: true,
      students: 892,
      color: 'from-blue-500 to-indigo-500'
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
      isPremium: false,
      students: 567,
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'biology',
      title: 'Cell Biology',
      subject: 'Biology',
      duration: '1h 10min',
      progress: 85,
      instructor: 'Dr. Robert Kim',
      rating: 4.6,
      thumbnail: '🧬',
      isPremium: true,
      students: 723,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const upcomingLiveSessions = [
    {
      id: 'live1',
      title: 'Quantum Mechanics Intro',
      time: 'Today, 3:00 PM',
      instructor: 'Dr. James Wilson',
      subject: 'Physics',
      attendees: 234,
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'live2',
      title: 'Statistical Analysis',
      time: 'Tomorrow, 10:00 AM',
      instructor: 'Prof. Lisa Park',
      subject: 'Mathematics',
      attendees: 189,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      id: 'live3',
      title: 'Organic Reactions',
      time: 'Tomorrow, 2:00 PM',
      instructor: 'Dr. Emily Watson',
      subject: 'Chemistry',
      attendees: 156,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const learningStats = [
    {
      title: "Learning Streak",
      value: `${userProfile.streak} days`,
      icon: Sparkles,
      color: "text-amber-600",
      gradient: "from-amber-500 to-orange-500",
      bgGradient: "from-amber-50 to-orange-50",
      description: "Keep it up! 🔥"
    },
    {
      title: "Total Videos",
      value: "1,500+",
      icon: Video,
      color: "text-teal-600",
      gradient: "from-teal-500 to-cyan-500",
      bgGradient: "from-teal-50 to-cyan-50",
      description: "+12% this month"
    },
    {
      title: "Upcoming Live",
      value: "8",
      icon: Clock,
      color: "text-rose-600",
      gradient: "from-rose-500 to-pink-500",
      bgGradient: "from-rose-50 to-pink-50",
      description: "Next: Today 3 PM"
    },
    {
      title: "Hours Learned",
      value: "47.5",
      icon: PlayCircle,
      color: "text-blue-600",
      gradient: "from-blue-500 to-indigo-500",
      bgGradient: "from-blue-50 to-indigo-50",
      description: "+5.2h this week"
    }
  ];

  // Enhanced QuickStatsCard Component
  const QuickStatsCard = ({ stat, index }: { stat: typeof learningStats[0], index: number }) => (
    <div 
      className={`
        flex-shrink-0 w-36 bg-gradient-to-br ${stat.bgGradient} p-4 rounded-2xl 
        shadow-lg border border-white/50 backdrop-blur-sm transform hover:scale-105 
        transition-all duration-500 cursor-pointer relative overflow-hidden group
        hover:shadow-xl
      `}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className={`p-2 rounded-xl bg-white/80 shadow-sm backdrop-blur-sm`}>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </div>
          <div className="flex items-center space-x-1 bg-white/60 rounded-full px-2 py-1">
            <TrendingUp className="h-3 w-3 text-green-600" />
            <span className="text-xs font-bold text-green-700">+12%</span>
          </div>
        </div>
        
        <p className="text-xs font-semibold text-gray-700 mb-1">{stat.title}</p>
        <p className="text-xl font-bold text-gray-900 mb-1">{stat.value}</p>
        <p className="text-xs text-gray-600 font-medium">{stat.description}</p>
      </div>
    </div>
  );

  const CourseCard = ({ course, index }: { course: typeof featuredCourses[0], index: number }) => (
    <div 
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200/30 
                 hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] 
                 cursor-pointer group relative overflow-hidden"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      {/* Background gradient effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      
      <div className="relative z-10">
        <div className="flex items-start space-x-4">
          <div className={`text-2xl bg-gradient-to-br ${course.color} p-3 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300`}>
            {course.thumbnail}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2 group-hover:text-gray-800 transition-colors">
                {course.title}
              </h3>
              <div className="flex items-center space-x-1">
                {course.isPremium && (
                  <Crown className="h-4 w-4 text-yellow-500 fill-current flex-shrink-0" />
                )}
                <Users className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500">{course.students}</span>
              </div>
            </div>
            
            <p className="text-xs text-gray-600 mb-2">{course.subject} • {course.duration}</p>
            
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <span className="text-xs font-semibold text-gray-700">{course.rating}</span>
              </div>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-500">{course.instructor.split(' ')[0]}</span>
            </div>

            {course.progress > 0 ? (
              <div className="space-y-2">
                <div className="w-full bg-gray-200/50 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${course.color} transition-all duration-1000 ease-out`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-semibold text-gray-700">{course.progress}%</span>
                </div>
              </div>
            ) : (
              <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold py-2.5 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:scale-105 group-hover:from-blue-600 group-hover:to-indigo-700">
                Start Learning
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const LiveSessionCard = ({ session, index }: { session: typeof upcomingLiveSessions[0], index: number }) => (
    <div 
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200/30 
                 hover:shadow-xl transition-all duration-500 transform hover:scale-[1.02] 
                 cursor-pointer group"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-gray-800 transition-colors">
            {session.title}
          </h3>
          <div className="flex items-center space-x-3 text-xs text-gray-600">
            <span>{session.subject}</span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Users className="h-3 w-3" />
              <span>{session.attendees} attending</span>
            </span>
          </div>
        </div>
        <div className="text-right ml-3">
          <p className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-full">
            {session.time}
          </p>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 bg-gradient-to-r ${session.color} rounded-full flex items-center justify-center shadow-md`}>
            <span className="text-white text-xs font-bold">
              {session.instructor.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-700 block">{session.instructor.split(' ')[0]}</span>
            <span className="text-xs text-gray-500">Instructor</span>
          </div>
        </div>
        <button className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-xl font-semibold text-xs hover:shadow-lg transition-all duration-200 transform hover:scale-105 group-hover:from-red-600 group-hover:to-pink-700 flex items-center space-x-1">
          <Clock className="h-3 w-3" />
          <span>Remind</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/10 pb-20">
      
      {/* Enhanced Sticky Header with Glass Morphism */}
      <div className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl">{userProfile.avatar}</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent">
                    Welcome back, {userProfile?.name?.split(' ')[0] || 'Learner'}! 👋
                  </h1>
                  <p className="text-sm text-gray-600 mt-0.5">
                    Ready to continue your journey in {userProfile.field}?
                  </p>
                </div>
              </div>
            </div>
            
            {userProfile?.streak && (
              <div className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2.5 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-200 cursor-pointer">
                <Sparkles className="h-4 w-4" />
                <span className="font-bold text-sm">{userProfile.streak} day streak</span>
                <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 pt-6">

        {/* Enhanced Primary Action Tiles - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {primaryActions.map((action, index) => (
            <button
              key={action.id}
              onClick={() => onNavigate(action.targetPage)}
              className={`
                w-full text-left bg-gradient-to-br ${action.bgGradient} rounded-3xl p-5 shadow-xl 
                overflow-hidden relative transform transition-all duration-500 hover:scale-[1.02] 
                focus:outline-none focus:ring-2 focus:ring-opacity-50 hover:shadow-2xl 
                border ${action.borderColor} backdrop-blur-sm group
                ${action.featured ? 'ring-2 ring-yellow-400/40' : ''}
                animate-fade-in-up
              `}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Animated background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-white/80 shadow-lg border border-white/50 transform group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className={`h-6 w-6 bg-gradient-to-r ${action.gradient} bg-clip-text text-transparent`} />
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    {action.badge && (
                      <div className="bg-white/80 text-gray-700 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                        {action.badge}
                      </div>
                    )}
                    {action.featured && (
                      <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold">
                        <Zap className="h-3 w-3 fill-current" />
                        <span>FEATURED</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                  {action.title}
                </h2>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">{action.description}</p>
                <p className="text-xs font-semibold text-gray-700 mb-4 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  {action.stats}
                </p>
              </div>

              {/* Enhanced Call to Action */}
              <div className={`
                relative z-10 py-3 px-4 
                bg-gradient-to-r ${action.gradient} text-white font-bold 
                flex items-center justify-between rounded-xl
                transition-all duration-300 group-hover:shadow-lg
                shadow-md text-sm backdrop-blur-sm
                group-hover:from-opacity-100 group-hover:to-opacity-100
                transform group-hover:translate-y-[-2px]
              `}>
                <span>Explore Now</span>
                <div className="flex items-center space-x-1">
                  <span className="text-xs font-normal opacity-90">Get Started</span>
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Enhanced Learning Stats Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <BarChart3 className="h-6 w-6 mr-3 text-blue-500" />
              Learning Dashboard
            </h2>
            <button className="text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors flex items-center space-x-1">
              <span>View Analytics</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
            {learningStats.map((stat, index) => (
              <QuickStatsCard key={stat.title} stat={stat} index={index} />
            ))}
          </div>
        </div>

        {/* Enhanced Featured Courses Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Bookmark className="h-6 w-6 mr-3 text-green-500" />
              Continue Learning
            </h2>
            <button className="text-green-600 font-semibold text-sm hover:text-green-700 transition-colors flex items-center space-x-1">
              <span>View All Courses</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        </div>

        {/* Enhanced Upcoming Live Sessions */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Calendar className="h-6 w-6 mr-3 text-red-500" />
              Upcoming Live Sessions
            </h2>
            <button className="text-red-600 font-semibold text-sm hover:text-red-700 transition-colors flex items-center space-x-1">
              <span>Full Schedule</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingLiveSessions.map((session, index) => (
              <LiveSessionCard key={session.id} session={session} index={index} />
            ))}
          </div>
        </div>

        {/* Enhanced Premium Upgrade CTA */}
        {!userProfile?.isPremium && (
          <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 rounded-3xl p-6 text-white shadow-2xl transform hover:scale-[1.01] transition-all duration-500 group overflow-hidden relative">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-amber-500/20 to-orange-500/20 group-hover:from-yellow-400/30 group-hover:via-amber-500/30 group-hover:to-orange-500/30 transition-all duration-500" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                    <Rocket className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-1">Unlock Premium Features! 🚀</h3>
                    <p className="text-amber-100 text-sm">
                      Get unlimited access to all courses, live sessions, and exclusive content
                    </p>
                  </div>
                </div>
                <button className="bg-white text-orange-600 font-bold py-3 px-6 rounded-2xl hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 text-sm group/btn">
                  <Crown className="h-4 w-4" />
                  <span>Upgrade Now</span>
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>
              
              {/* Premium features list */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/20">
                {[
                  { icon: Shield, text: 'Ad Free' },
                  { icon: Video, text: 'All Videos' },
                  { icon: Zap, text: 'Live Access' },
                  { icon: BookOpen, text: 'PDF Notes' }
                ].map((feature, index) => (
                  <div key={feature.text} className="flex items-center space-x-2 text-sm">
                    <feature.icon className="h-4 w-4 text-white" />
                    <span className="text-amber-100">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default TutorialPage;