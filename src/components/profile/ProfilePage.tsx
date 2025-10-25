import React, { useState } from 'react';
import { 
  User, Edit, Crown, Calendar, Phone, Mail, GraduationCap, 
  Trophy, BookOpen, Clock, X, Save, TrendingUp 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

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
      // Simulate validation (e.g., ensure name is not empty)
      if (!editData.name.trim()) {
        alert("Name cannot be empty.");
        return;
      }
      await updateUserProfile(editData); 
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      // In a real app, show a toast notification here
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

  /**
   * Calculates user statistics from localStorage.
   */
  const getUserStats = () => {
    const stats = {
      testsCompleted: 0,
      averageScore: 0,
      totalScore: 0,
      studyHours: 0
    };

    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(`test_${userProfile.id}_`)) {
        const item = localStorage.getItem(key);
        if (!item) return;
        
        try {
          const data = JSON.parse(item);
          
          if (typeof data.score === 'number') {
            stats.testsCompleted += 1;
            stats.totalScore += data.score;
          }
          
          if (typeof data.timeSpent === 'number' && data.timeSpent > 0) {
            stats.studyHours += Math.round(data.timeSpent / 3600); 
          }
        } catch (e) {
          // Log error for development, but don't stop execution
          console.warn("Skipping corrupted localStorage item:", key);
        }
      }
    });

    stats.averageScore = stats.testsCompleted > 0 
      ? Math.round(stats.totalScore / stats.testsCompleted) 
      : 0;

    return stats;
  };

  const stats = getUserStats();

  // Unified Date Formatting for consistency
  const memberSinceDate = new Date(userProfile.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // --- STAT CARD COMPONENT (for cleaner JSX) ---
  const StatCard = ({ title, value, icon: Icon, colorClass, goalPercentage = 0, unit = '' }: {
    title: string;
    value: number | string;
    icon: React.ElementType;
    colorClass: string;
    goalPercentage?: number;
    unit?: string;
  }) => {
    // Clamp progress between 0 and 100
    const progress = Math.min(100, Math.max(0, goalPercentage));

    return (
      <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:border-blue-200">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-full" style={{ backgroundColor: `${colorClass}10` }}>
            <Icon className="h-6 w-6" style={{ color: colorClass }} />
          </div>
          <div className="text-right">
            <p className="text-3xl font-extrabold text-gray-900 leading-none">{value}{unit}</p>
          </div>
        </div>
        
        <p className="text-sm font-semibold text-gray-500 mb-4">{title}</p>

        {/* Simulated Progress Bar for visual engagement */}
        <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
          <div 
            className="h-full rounded-full" 
            style={{ 
              width: `${progress}%`, 
              backgroundColor: colorClass,
              transition: 'width 0.5s ease-in-out'
            }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">
            {goalPercentage > 0 ? `Target ${progress}% achieved` : 'Data snapshot'}
        </p>
      </div>
    );
  };

  // --- MAIN RENDER ---
  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-10">
      <div className="max-w-5xl mx-auto">
        
        {/* Profile Header Block */}
        <div className="bg-gradient-to-br from-blue-700 to-indigo-800 rounded-3xl p-8 text-white mb-10 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start justify-between">
            <div className="flex items-center space-x-6">
              {/* Avatar (with Initials) */}
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center border-4 border-white/70 shadow-lg">
                <span className="text-3xl font-bold">{getInitials(userProfile.name)}</span>
              </div>
              
              {/* User Info */}
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl lg:text-4xl font-extrabold">{userProfile.name}</h1>
                  {userProfile.isPremium && (
                    <div className="flex items-center bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold shadow-inner">
                      <Crown className="h-4 w-4 mr-1 fill-yellow-900" />
                      <span>PREMIUM</span>
                    </div>
                  )}
                </div>
                <p className="text-blue-200 text-xl capitalize font-medium">
                  {userProfile.field} Sciences Student
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <GraduationCap className="h-5 w-5 text-blue-300" />
                  <span className="text-blue-300 text-sm">
                    Member Since {memberSinceDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(true)}
              className="mt-6 md:mt-0 bg-white/30 hover:bg-white/50 text-white px-5 py-2 rounded-xl transition-all duration-200 flex items-center space-x-2 font-medium shadow-md"
              disabled={isEditing}
            >
              <Edit className="h-4 w-4" />
              <span>Edit Info</span>
            </button>
          </div>
        </div>

        {/* Stats Cards Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            title="Tests Completed"
            value={stats.testsCompleted}
            unit=""
            icon={BookOpen}
            colorClass="#3b82f6" // blue-500
            goalPercentage={(stats.testsCompleted / 50) * 100} // Example goal: 50 tests
          />
          <StatCard
            title="Average Score"
            value={stats.averageScore}
            unit="%"
            icon={Trophy}
            colorClass="#10b981" // emerald-500
            goalPercentage={stats.averageScore} // Goal is 100%
          />
          <StatCard
            title="Total Points"
            value={stats.totalScore.toLocaleString()}
            unit=""
            icon={TrendingUp}
            colorClass="#f59e0b" // amber-500
            goalPercentage={(stats.totalScore / 5000) * 100} // Example goal: 5000 points
          />
          <StatCard
            title="Study Hours Logged"
            value={stats.studyHours}
            unit="h"
            icon={Clock}
            colorClass="#8b5cf6" // violet-500
            goalPercentage={(stats.studyHours / 100) * 100} // Example goal: 100 hours
          />
        </div>
        
        {/* Profile Details Section */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 lg:p-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Account Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Personal Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-blue-600 flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Personal Data</span>
              </h3>

              <DetailField 
                label="Full Name" 
                value={userProfile.name} 
                icon={User} 
                isEditing={isEditing}
                editValue={editData.name}
                onEdit={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
              />

              <DetailField 
                label="Email Address" 
                value={userProfile.email} 
                icon={Mail} 
                isEditing={false}
                note="Email cannot be changed"
              />

              <DetailField 
                label="Phone Number" 
                value={userProfile.phone || 'N/A'} 
                icon={Phone} 
                isEditing={isEditing}
                editValue={editData.phone}
                onEdit={(e) => setEditData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>

            {/* Academic & Account Information */}
            <div className="space-y-6 border-t md:border-t-0 md:border-l border-gray-100 md:pl-8 pt-8 md:pt-0">
              <h3 className="text-xl font-semibold text-purple-600 flex items-center space-x-2">
                <GraduationCap className="h-5 w-5" />
                <span>Academic & Status</span>
              </h3>

              <DetailField 
                label="Academic Field" 
                value={`${userProfile.field} Sciences`} 
                icon={GraduationCap} 
                isEditing={false}
                transform="capitalize"
              />

              <DetailField 
                label="Account Status" 
                value={userProfile.isPremium ? "Premium Member" : "Free Member"} 
                icon={Crown} 
                isEditing={false}
                valueClass={userProfile.isPremium ? 'text-yellow-600' : 'text-gray-700'}
              />

              <DetailField 
                label="Member Since" 
                value={memberSinceDate} 
                icon={Calendar} 
                isEditing={false}
              />
            </div>
          </div>
          
          {/* Action Buttons (Edit Mode) */}
          {isEditing && (
            <div className="flex space-x-4 mt-10 pt-6 border-t border-gray-100 justify-end">
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 bg-gray-200 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-300 transition-colors shadow-sm font-semibold"
              >
                <X className="h-5 w-5" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg font-semibold"
              >
                <Save className="h-5 w-5" />
                <span>Save Changes</span>
              </button>
            </div>
          )}
        </div>
        
        {/* Premium Upgrade CTA */}
        {!userProfile.isPremium && (
          <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-3xl p-8 mt-10 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
              <div className='flex items-center space-x-4 mb-4 md:mb-0'>
                <Crown className="h-12 w-12 text-white fill-yellow-900" />
                <div>
                  <h2 className="text-2xl font-bold mb-1">Go Premium, Go Farther</h2>
                  <p className="text-yellow-100">Unlock full access to all materials and detailed performance reports.</p>
                </div>
              </div>
              <button className="bg-white text-orange-600 px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors font-semibold shadow-lg min-w-[180px]">
                Upgrade Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


// --- Detail Field Component (for better code organization) ---
const DetailField = ({ 
    label, value, icon: Icon, isEditing, editValue, onEdit, note, valueClass, transform 
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
}) => (
    <div>
        <label className="block text-sm font-medium text-gray-500 mb-1">
            {label}
        </label>
        {isEditing && onEdit ? (
            <input
                type={label.toLowerCase().includes('phone') ? 'tel' : 'text'}
                value={editValue}
                onChange={onEdit}
                className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            />
        ) : (
            <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                <Icon className="h-5 w-5 text-blue-500" />
                <span className={`text-gray-900 font-medium ${valueClass || ''} ${transform === 'capitalize' ? 'capitalize' : ''}`}>
                    {value}
                </span>
            </div>
        )}
        {note && <p className="text-xs text-gray-500 mt-1 pl-8">{note}</p>}
    </div>
);

export default ProfilePage;