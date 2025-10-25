import React from 'react';
import { PlayCircle, Zap, BookOpen, Video, Users, Clock, ChevronRight } from 'lucide-react'; 
import { useAuth } from '../../context/AuthContext';

interface TutorialPageProps {
  onNavigate: (page: string, subject?: string) => void;
}

const TutorialPage: React.FC<TutorialPageProps> = ({ onNavigate }) => {
  const { userProfile } = useAuth();

  const primaryActions = [
    {
      id: 'live',
      title: 'Live Tutorials',
      description: 'Join scheduled, interactive learning sessions with experts.',
      icon: Zap,
      gradient: 'from-red-500 to-pink-600',
      actionLabel: 'View Schedule',
      targetPage: 'live-tutorials',
    },
    {
      id: 'video',
      title: 'Video Library',
      description: 'Access a vast collection of on-demand recorded video lessons.',
      icon: PlayCircle,
      gradient: 'from-blue-500 to-indigo-600',
      actionLabel: 'Browse Videos',
      targetPage: 'video-tutorials',
    },
  ];

  // *** FIX APPLIED HERE: Using solid background and dark text color for contrast ***
  const QuickStatsCard = ({ title, value, icon: Icon, colorClass, bgColorClass }: { title: string, value: string, icon: React.FC<any>, colorClass: string, bgColorClass: string }) => (
    <div className="flex-shrink-0 w-36 sm:w-auto bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col space-y-2">
        {/* The icon now has a distinct background and is visible */}
        <div className={`p-2 rounded-lg inline-block self-start ${bgColorClass} shadow-md`}>
          <Icon className={`h-5 w-5 ${colorClass}`} />
        </div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20"> 
      
      {/* Sticky Mobile Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm p-4 border-b border-gray-200 shadow-sm sm:p-6 lg:static lg:bg-transparent lg:shadow-none lg:border-none lg:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 truncate">
            Hello, {userProfile?.name?.split(' ')[0] || 'Learner'}! 👋
          </h1>
          <p className="text-md text-gray-600 mt-0.5 hidden sm:block">
            Your hub for **Live** and **Video** tutorials.
          </p>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">

        {/* Primary Action Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {primaryActions.map((action) => (
            <button
              key={action.id}
              onClick={() => onNavigate(action.targetPage)}
              className={`
                w-full text-left bg-white rounded-2xl p-5 shadow-lg overflow-hidden relative 
                transform transition-all duration-300 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-opacity-50
                hover:shadow-xl group
              `}
              style={{ paddingBottom: '70px' }}
            >
              {/* Background Gradient Splash */}
              <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${action.gradient}`} />
              
              <div className="relative z-10">
                {/* Icon is now in a white box for contrast */}
                <div className={`p-3 rounded-xl inline-block mb-3 bg-white text-gray-900 shadow-lg border border-gray-100`}>
                  <action.icon className={`h-6 w-6 ${action.gradient.replace('from-', 'text-').split(' ')[0]}`} />
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-1">{action.title}</h2>
                <p className="text-sm text-gray-600 mb-3">{action.description}</p>
              </div>

              {/* Attractive Call to Action Overlay at the Bottom */}
              <div className={`
                absolute bottom-0 left-0 right-0 py-3 px-5 
                bg-gradient-to-r ${action.gradient} text-white font-semibold 
                flex items-center justify-between
                transition-all duration-300 group-hover:scale-y-[1.05] group-hover:shadow-2xl
              `}>
                <span className="text-sm">{action.actionLabel}</span>
                <ChevronRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>

        {/* --- */}

        {/* Quick Stats & Features (Mobile UX: Horizontal Scroll) */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Progress at a Glance</h2>
          <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide snap-x">
            
            {/* Quick Stats Cards with correct colors for visibility */}
            <QuickStatsCard title="Total Videos" value="150+" icon={Video} colorClass="text-teal-700" bgColorClass="bg-teal-100" />
            <QuickStatsCard title="Upcoming Live" value="3" icon={Clock} colorClass="text-yellow-700" bgColorClass="bg-yellow-100" />
            <QuickStatsCard title="Courses Enrolled" value="7" icon={BookOpen} colorClass="text-purple-700" bgColorClass="bg-purple-100" />
            <QuickStatsCard title="Peer Groups" value="12" icon={Users} colorClass="text-orange-700" bgColorClass="bg-orange-100" />
          </div>
        </div>
        
        {/* --- */}
        
        {/* Featured Section */}
        <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recommended Next Step</h2>
            <div className="bg-white p-5 rounded-xl shadow-lg border border-indigo-100">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-lg font-semibold text-gray-800">Complete the Introduction Module</p>
                        <p className="text-sm text-indigo-500">Video Tutorial: Thermodynamics Basics</p>
                    </div>
                    <button 
                        onClick={() => onNavigate('video-tutorials', 'thermodynamics')}
                        className="p-2 bg-indigo-500 text-white rounded-full transition-all hover:bg-indigo-600 shadow-md flex-shrink-0"
                        aria-label="Start recommended video tutorial"
                    >
                        <PlayCircle className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>

      </div>
      
    </div>
  );
};

export default TutorialPage;