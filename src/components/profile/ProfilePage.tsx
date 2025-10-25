import React, { useState } from 'react';
import { 
  User, Edit, Crown, Calendar, Phone, Mail, GraduationCap, 
  Trophy, BookOpen, Clock, X, Save, TrendingUp, 
  Sparkles, Target, Award, Zap, Shield, Star,
  Bookmark, CheckCircle, ChevronRight
} from 'lucide-react';

// Mock useAuth for standalone functionality
interface UserProfile { 
  id: string; 
  name: string; 
  email: string;
  phone?: string;
  field: string; 
  isPremium: boolean;
  createdAt: string;
  streak?: number;
  level?: number;
  avatarColor?: string;
}
const useAuth = () => ({ 
  userProfile: { 
    id: 'u1', 
    name: 'Alex Johnson', 
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    field: 'computer science', 
    isPremium: false,
    createdAt: '2024-01-15',
    streak: 7,
    level: 12,
    avatarColor: 'from-blue-500 to-cyan-500'
  } as UserProfile,
  updateUserProfile: (data: any) => console.log('Updating profile:', data)
});

// Helper function to get initials for the avatar
const getInitials = (name: string) => {
  return name.split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
};

const ProfilePage: React.FC = () => {
  const { userProfile, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: userProfile?.name || '',
    phone: userProfile?.phone || ''
  });

  if (!userProfile) return null;

  const handleSave = async () => {
    try {
      if (!editData.name.trim()) {
        alert("Name cannot be empty.");
        return;
      }
      await updateUserProfile(editData); 
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert("Failed to save profile. See console for details.");
    }
  };

  const handleCancel = () => {
    setEditData({
      name: userProfile.name,
      phone: userProfile.phone || ''
    });
    setIsEditing(false);
  };

  const getUserStats = () => {
    const stats = {
      testsCompleted: 24,
      averageScore: 87,
      totalScore: 2088,
      studyHours: 47,
      coursesCompleted: 8,
      currentStreak: 7,
      rank: 156
    };
    return stats;
  };

  const stats = getUserStats();

  const memberSinceDate = new Date(userProfile.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Enhanced Stat Card Component
  const StatCard = ({ title, value, icon: Icon, color, gradient, trend, unit = '', progress = 0 }: {
    title: string;
    value: number | string;
    icon: React.ElementType;
    color: string;
    gradient: string;
    trend?: string;
    unit?: string;
    progress?: number;
  }) => (
    <div className={`bg-white rounded-3xl p-6 shadow-xl border border-gray-100/50 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] group cursor-pointer ${gradient}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-2xl bg-gradient-to-br ${color} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        {trend && (
          <div className="flex items-center space-x-1 bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
            <TrendingUp className="h-3 w-3" />
            <span>{trend}</span>
          </div>
        )}
      </div>
      
      <p className="text-3xl font-bold text-gray-900 mb-2">{value}{unit}</p>
      <p className="text-sm font-semibold text-gray-600 mb-4">{title}</p>

      {/* Enhanced Progress Bar */}
      {progress > 0 && (
        <div className="space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div 
              className="h-2 rounded-full transition-all duration-1000 shadow-md"
              style={{ 
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${color.split(' ')[1]}, ${color.split(' ')[3]})`
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500">
            <span>Progress</span>
            <span className="font-semibold">{progress}%</span>
          </div>
        </div>
      )}
    </div>
  );

  // Achievement Badges
  const AchievementBadge = ({ title, description, icon: Icon, color, unlocked }: {
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
    unlocked: boolean;
  }) => (
    <div className={`flex items-center space-x-4 p-4 rounded-2xl border-2 transition-all duration-300 ${
      unlocked 
        ? `${color} border-transparent shadow-lg` 
        : 'bg-gray-50 border-gray-200 opacity-60'
    }`}>
      <div className={`p-3 rounded-xl ${
        unlocked ? 'bg-white/20' : 'bg-gray-200'
      }`}>
        <Icon className={`h-6 w-6 ${
          unlocked ? 'text-white' : 'text-gray-400'
        }`} />
      </div>
      <div className="flex-1">
        <h4 className={`font-semibold ${
          unlocked ? 'text-white' : 'text-gray-600'
        }`}>
          {title}
        </h4>
        <p className={`text-sm ${
          unlocked ? 'text-white/80' : 'text-gray-500'
        }`}>
          {description}
        </p>
      </div>
      {unlocked ? (
        <CheckCircle className="h-5 w-5 text-white" />
      ) : (
        <Lock className="h-5 w-5 text-gray-400" />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Enhanced Profile Header */}
        <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-8 lg:p-10 text-white mb-8 shadow-2xl relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full transform -translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-start justify-between">
              <div className="flex items-center space-x-6 mb-6 lg:mb-0">
                {/* Enhanced Avatar */}
                <div className="relative">
                  <div className="w-28 h-28 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-3xl flex items-center justify-center border-4 border-white/80 shadow-2xl">
                    <span className="text-4xl font-bold text-white">{getInitials(userProfile.name)}</span>
                  </div>
                  {/* Level Badge */}
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <span className="text-white text-sm font-bold">Lvl {userProfile.level}</span>
                  </div>
                </div>
                
                {/* User Info */}
                <div>
                  <div className="flex items-center space-x-4 mb-3">
                    <h1 className="text-4xl lg:text-5xl font-bold">{userProfile.name}</h1>
                    {userProfile.isPremium ? (
                      <div className="flex items-center bg-gradient-to-r from-yellow-400 to-amber-500 text-yellow-900 px-4 py-2 rounded-full font-bold shadow-lg">
                        <Crown className="h-5 w-5 mr-2 fill-yellow-900" />
                        <span>PREMIUM</span>
                      </div>
                    ) : (
                      <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-semibold text-sm">
                        Free Member
                      </div>
                    )}
                  </div>
                  <p className="text-blue-200 text-xl font-medium capitalize mb-2">
                    {userProfile.field} Student
                  </p>
                  <div className="flex items-center space-x-4 text-blue-200">
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="h-5 w-5" />
                      <span>Member Since {memberSinceDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sparkles className="h-5 w-5 text-yellow-300" />
                      <span className="font-semibold">{userProfile.streak} day streak</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Edit Button */}
              <button
                onClick={() => setIsEditing(true)}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-2xl transition-all duration-300 flex items-center space-x-3 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
                disabled={isEditing}
              >
                <Edit className="h-5 w-5" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Tests Completed"
            value={stats.testsCompleted}
            icon={BookOpen}
            color="from-blue-500 to-cyan-500"
            gradient="hover:border-blue-200"
            trend="+3"
            progress={(stats.testsCompleted / 50) * 100}
          />
          <StatCard
            title="Average Score"
            value={stats.averageScore}
            unit="%"
            icon={Trophy}
            color="from-emerald-500 to-green-500"
            gradient="hover:border-emerald-200"
            progress={stats.averageScore}
          />
          <StatCard
            title="Study Hours"
            value={stats.studyHours}
            unit="h"
            icon={Clock}
            color="from-purple-500 to-violet-500"
            gradient="hover:border-purple-200"
            trend="+5.2"
            progress={(stats.studyHours / 100) * 100}
          />
          <StatCard
            title="Global Rank"
            value={`#${stats.rank}`}
            icon={Award}
            color="from-amber-500 to-orange-500"
            gradient="hover:border-amber-200"
            progress={((1000 - stats.rank) / 1000) * 100}
          />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Details Card */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100/50 p-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent mb-8 pb-4 border-b border-gray-100">
                Account Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-blue-600 flex items-center space-x-3">
                    <User className="h-6 w-6" />
                    <span>Personal Information</span>
                  </h3>

                  <EnhancedDetailField 
                    label="Full Name" 
                    value={userProfile.name} 
                    icon={User}
                    isEditing={isEditing}
                    editValue={editData.name}
                    onEdit={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                    color="blue"
                  />

                  <EnhancedDetailField 
                    label="Email Address" 
                    value={userProfile.email} 
                    icon={Mail}
                    isEditing={false}
                    note="Email cannot be changed"
                    color="blue"
                  />

                  <EnhancedDetailField 
                    label="Phone Number" 
                    value={userProfile.phone || 'Not provided'} 
                    icon={Phone}
                    isEditing={isEditing}
                    editValue={editData.phone}
                    onEdit={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
                    color="blue"
                  />
                </div>

                {/* Academic Information */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-purple-600 flex items-center space-x-3">
                    <GraduationCap className="h-6 w-6" />
                    <span>Academic Information</span>
                  </h3>

                  <EnhancedDetailField 
                    label="Academic Field" 
                    value={`${userProfile.field}`} 
                    icon={GraduationCap}
                    isEditing={false}
                    transform="capitalize"
                    color="purple"
                  />

                  <EnhancedDetailField 
                    label="Account Status" 
                    value={userProfile.isPremium ? "Premium Member" : "Free Member"} 
                    icon={userProfile.isPremium ? Crown : Shield}
                    isEditing={false}
                    valueClass={userProfile.isPremium ? 'text-yellow-600 font-bold' : 'text-gray-700'}
                    color="purple"
                  />

                  <EnhancedDetailField 
                    label="Member Since" 
                    value={memberSinceDate} 
                    icon={Calendar}
                    isEditing={false}
                    color="purple"
                  />
                </div>
              </div>
              
              {/* Edit Mode Actions */}
              {isEditing && (
                <div className="flex space-x-4 mt-10 pt-6 border-t border-gray-100 justify-end">
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-3 bg-gray-100 text-gray-800 px-8 py-4 rounded-2xl hover:bg-gray-200 transition-all duration-300 shadow-lg font-semibold hover:scale-105"
                  >
                    <X className="h-5 w-5" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-8 py-4 rounded-2xl hover:shadow-xl transition-all duration-300 shadow-lg font-semibold hover:scale-105"
                  >
                    <Save className="h-5 w-5" />
                    <span>Save Changes</span>
                  </button>
                </div>
              )}
            </div>

            {/* Recent Achievements */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100/50 p-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent mb-6 flex items-center justify-between">
                <span>Recent Achievements</span>
                <button className="text-blue-600 text-sm font-semibold flex items-center space-x-2">
                  <span>View All</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AchievementBadge
                  title="Week Warrior"
                  description="7-day study streak"
                  icon={Sparkles}
                  color="bg-gradient-to-r from-amber-500 to-orange-500"
                  unlocked={true}
                />
                <AchievementBadge
                  title="Test Master"
                  description="Complete 20+ tests"
                  icon={Target}
                  color="bg-gradient-to-r from-blue-500 to-cyan-500"
                  unlocked={true}
                />
                <AchievementBadge
                  title="Speed Learner"
                  description="Finish 5 courses in a month"
                  icon={Zap}
                  color="bg-gradient-to-r from-purple-500 to-pink-500"
                  unlocked={false}
                />
                <AchievementBadge
                  title="Top Performer"
                  description="Maintain 90%+ average"
                  icon={Star}
                  color="bg-gradient-to-r from-green-500 to-emerald-500"
                  unlocked={true}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Premium & Quick Stats */}
          <div className="space-y-8">
            {/* Premium Upgrade CTA */}
            {!userProfile.isPremium && (
              <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 rounded-3xl p-6 text-white shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
                <div className="text-center">
                  <Crown className="h-12 w-12 text-white mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Go Premium! 🚀</h3>
                  <p className="text-amber-100 mb-4 leading-relaxed">
                    Unlock all features, advanced analytics, and premium content
                  </p>
                  <button className="w-full bg-white text-orange-600 py-3 px-6 rounded-2xl font-bold hover:scale-105 transition-transform duration-200 shadow-lg">
                    Upgrade Now
                  </button>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100/50 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span>Weekly Progress</span>
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Study Time</span>
                  <span className="font-semibold text-gray-900">12.5h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tests Taken</span>
                  <span className="font-semibold text-gray-900">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Courses Progress</span>
                  <span className="font-semibold text-gray-900">65%</span>
                </div>
              </div>
            </div>

            {/* Study Goals */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Current Goals</span>
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm">Complete Calculus Course</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-sm">Reach 30-day streak</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-sm">Achieve 90% average</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Detail Field Component
const EnhancedDetailField = ({ 
  label, value, icon: Icon, isEditing, editValue, onEdit, note, valueClass, transform, color 
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  isEditing: boolean;
  editValue?: string;
  onEdit?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  note?: string;
  valueClass?: string;
  transform?: string;
  color: string;
}) => (
  <div className="group">
    <label className="block text-sm font-semibold text-gray-500 mb-3">
      {label}
    </label>
    {isEditing && onEdit ? (
      <div className="relative">
        <input
          type={label.toLowerCase().includes('phone') ? 'tel' : 'text'}
          value={editValue}
          onChange={onEdit}
          className="w-full px-4 py-3 border-2 border-blue-300 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white shadow-sm"
          placeholder={`Enter ${label.toLowerCase()}`}
        />
        <Icon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500" />
      </div>
    ) : (
      <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-xl border border-gray-100 group-hover:bg-gray-100 transition-colors duration-300">
        <div className={`p-2 rounded-lg bg-${color}-100`}>
          <Icon className={`h-5 w-5 text-${color}-600`} />
        </div>
        <span className={`text-gray-900 font-medium flex-1 ${valueClass || ''} ${transform === 'capitalize' ? 'capitalize' : ''}`}>
          {value}
        </span>
      </div>
    )}
    {note && <p className="text-xs text-gray-500 mt-2 pl-12">{note}</p>}
  </div>
);

// Lock icon component for achievements
const Lock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

export default ProfilePage;