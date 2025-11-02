import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Play, Clock, CheckCircle, AlertCircle, Calendar, BookOpen, Award, Zap, BarChart3, TrendingUp, Target, X, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getQuestionsBySubjectAndYear } from '../../data/questions';
import { Question } from '../../types';

interface SubjectPageProps {
  subject: string;
  onBack: () => void;
  onStartTest: (questions: Question[], withTimer: boolean) => void;
}

// Helper to get a subject-specific icon
const getSubjectIcon = (subject: string) => {
  const icons = {
    math: Target,
    physics: Zap,
    chemistry: Award,
    biology: BookOpen,
    default: BarChart3
  };
  const subjectKey = subject.toLowerCase() as keyof typeof icons;
  return icons[subjectKey] || icons.default;
};

const SubjectPage: React.FC<SubjectPageProps> = ({ subject, onBack, onStartTest }) => {
  const { userProfile } = useAuth();
  const [selectedYear, setSelectedYear] = useState<number | null>(2025); // Set to null initially or keep default
  const [selectedType, setSelectedType] = useState<'mid' | 'final' | null>('mid'); // Set to null initially or keep default
  const [isScrolled, setIsScrolled] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);

  const years = [2021, 2022, 2023, 2024, 2025];
  const types = [
    { value: 'mid', label: 'Mid Term', icon: BookOpen },
    { value: 'final', label: 'Final Exam', icon: Award }
  ];

  const getSubjectTheme = useCallback(() => {
    const themes = {
      math: { primary: '#8B5CF6', dark: '#7C3AED', gradient: 'from-purple-500 to-indigo-600', light: 'bg-purple-50', iconBg: 'bg-purple-500/10' },
      physics: { primary: '#06B6D4', dark: '#0891B2', gradient: 'from-cyan-500 to-blue-600', light: 'bg-cyan-50', iconBg: 'bg-cyan-500/10' },
      chemistry: { primary: '#10B981', dark: '#059669', gradient: 'from-emerald-500 to-green-600', light: 'bg-emerald-50', iconBg: 'bg-emerald-500/10' },
      biology: { primary: '#84CC16', dark: '#65A30D', gradient: 'from-lime-500 to-green-500', light: 'bg-lime-50', iconBg: 'bg-lime-500/10' },
      default: { primary: '#F59E0B', dark: '#D97706', gradient: 'from-amber-500 to-orange-600', light: 'bg-amber-50', iconBg: 'bg-amber-500/10' }
    };
    
    const subjectKey = subject.toLowerCase();
    return themes[subjectKey as keyof typeof themes] || themes.default;
  }, [subject]);

  const theme = getSubjectTheme();
  const SubjectIcon = getSubjectIcon(subject);

  // Use optional chaining and null checks here
  const questions = getQuestionsBySubjectAndYear(subject, selectedYear, selectedType, userProfile?.field || '');
  const totalQuestions = questions.length;

  const getTestProgress = useCallback(() => {
    if (!userProfile || !selectedYear || !selectedType) return null;
    const progressKey = `test_${userProfile.id}_${subject}_${selectedYear}_${selectedType}`;
    const progress = localStorage.getItem(progressKey);
    return progress ? JSON.parse(progress) : null;
  }, [userProfile, subject, selectedYear, selectedType]);

  const testProgress = getTestProgress();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Show modal only if both are selected AND questions exist
    if (selectedYear !== null && selectedType !== null && totalQuestions > 0) {
      setShowChallengeModal(true);
    } else {
      setShowChallengeModal(false); 
    }
  }, [selectedYear, selectedType, totalQuestions]);

  if (!userProfile) return null;

  const handleStartTest = (withTimer: boolean) => {
    if (questions.length > 0) {
      setShowChallengeModal(false);
      onStartTest(questions, withTimer);
    }
  };

  const FloatingHeader = () => (
    <div className={`
      max-w-4xl mx-auto sticky top-0 z-20 transition-all duration-300
      ${isScrolled ? 'py-2' : 'py-6'}
    `}>
      <div className={`
        bg-white/95 backdrop-blur-lg rounded-xl shadow-xl border border-gray-100 p-3 transition-all duration-300 flex items-center justify-between
      `}>
        <div className="flex items-center space-x-3">
          <button 
            onClick={onBack}
            className="p-2 rounded-lg transition-all duration-200 flex items-center justify-center bg-white shadow-md border border-gray-100 hover:shadow-lg hover:scale-105 active:scale-95"
            style={{ color: theme.primary }}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-gray-900 truncate">{subject}</h1>
            <p className="text-gray-600 text-sm capitalize truncate">{userProfile.field} Sciences</p>
          </div>
        </div>
        
        {testProgress && (
          <div 
            className="flex items-center space-x-2 px-3 py-1 rounded-full text-white font-medium text-xs"
            style={{ backgroundColor: theme.primary }}
          >
            <CheckCircle className="h-3 w-3" />
            <span>Done</span>
          </div>
        )}
      </div>
    </div>
  );

  const HeroSection = () => (
    <div className={`
      relative max-w-4xl mx-auto p-8 rounded-3xl mb-8 overflow-hidden
      bg-gradient-to-r ${theme.gradient} text-white shadow-2xl
      ${isScrolled ? 'opacity-0 h-0 p-0 mb-0' : 'opacity-100 h-auto transition-all duration-300'}
    `}>
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Cpath fill=\'%23ffffff\' fill-opacity=\'0.2\' d=\'M98.6 34.6L79.7 15.7C74.6 10.6 67.5 7.6 60 7.6S45.4 10.6 40.3 15.7L21.4 34.6C16.3 39.7 13.3 46.8 13.3 54.3s3 14.6 8.1 19.7L40.3 93.3C45.4 98.4 52.5 101.4 60 101.4s14.6-3 19.7-8.1L98.6 74C103.7 68.9 106.7 61.8 106.7 54.3S103.7 39.7 98.6 34.6z\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px' }}></div>
      <div className="relative flex items-start space-x-6">
        <div className="p-4 bg-white/20 rounded-2xl flex-shrink-0">
          <SubjectIcon className="h-10 w-10 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-extrabold">{subject} Mastery</h2>
          <p className="mt-1 text-white/90">Select an exam to begin your focused practice session.</p>
        </div>
      </div>
    </div>
  );

  const SelectionControls = () => (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 sm:p-8">
      <div className="flex items-center space-x-3 mb-6">
        <Calendar className="h-6 w-6" style={{ color: theme.dark }} />
        <h2 className="text-2xl font-bold text-gray-900">Choose Your Test</h2>
      </div>
      
      <div className="space-y-8">
        {/* Year Selection */}
        <div>
          <label className="block text-base font-semibold text-gray-700 mb-4">
            🗓️ Academic Year
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {years.map((year) => {
              const isSelected = selectedYear === year;
              return (
                <button
                  key={year}
                  onClick={() => { setSelectedYear(year); setShowChallengeModal(false); }}
                  className={`
                    p-3 rounded-xl text-sm font-semibold transition-all duration-200 border-2 
                    hover:scale-105 active:scale-95 shadow-md
                    ${isSelected
                      ? 'text-white shadow-lg transform scale-105 border-transparent ring-4 ring-offset-2'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200'
                    }
                  `}
                  style={{
                    backgroundColor: isSelected ? theme.primary : undefined,
                    borderColor: isSelected ? theme.primary : undefined,
                    boxShadow: isSelected ? `0 0 0 4px ${theme.primary}50` : undefined, // Subtle ring effect
                  }}
                >
                  {year}
                </button>
              );
            })}
          </div>
        </div>

        {/* Type Selection */}
        <div>
          <label className="block text-base font-semibold text-gray-700 mb-4">
            📚 Exam Type
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {types.map((type) => {
              const IconComponent = type.icon;
              const isSelected = selectedType === type.value;
              return (
                <button
                  key={type.value}
                  onClick={() => { setSelectedType(type.value as 'mid' | 'final'); setShowChallengeModal(false); }}
                  className={`
                    p-5 rounded-2xl transition-all duration-200 border-2 text-left shadow-lg
                    hover:scale-[1.02] active:scale-[0.98] flex items-center space-x-4
                    ${isSelected
                      ? `text-white border-transparent ring-4 ring-offset-2`
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
                    }
                  `}
                  style={{
                    background: isSelected ? `linear-gradient(135deg, ${theme.primary}, ${theme.dark})` : undefined,
                    borderColor: isSelected ? theme.primary : undefined,
                    boxShadow: isSelected ? `0 0 0 4px ${theme.primary}50` : undefined, // Subtle ring effect
                  }}
                >
                  <div className={`p-2 rounded-lg transition-transform duration-300 ${isSelected ? 'bg-white/20' : theme.iconBg}`}>
                    <IconComponent className="h-6 w-6" style={{ color: isSelected ? 'white' : theme.primary }} />
                  </div>
                  <div>
                    <span className="font-extrabold text-lg block">{type.label}</span>
                    <span className={`text-sm ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>{type.value === 'mid' ? 'Half-Course Review' : 'Full Exam Practice'}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const TestInformation = () => (
    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 sm:p-8">
      {totalQuestions > 0 && selectedYear && selectedType ? (
        <>
          {/* Test Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
                Test Snapshot
                </h3>
                <p className="text-gray-600">
                Selected: **{subject} - {selectedType === 'mid' ? 'Mid Term' : 'Final Exam'} {selectedYear}**
                </p>
            </div>
            {/* CTA button to re-open modal */}
            <button
                onClick={() => setShowChallengeModal(true)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg active:scale-95`}
                style={{ backgroundColor: theme.primary }}
            >
                <Star className='h-4 w-4 fill-white'/>
                <span>Start Test</span>
            </button>
          </div>

          {/* Test Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <StatCard icon={BookOpen} value={totalQuestions} label="Questions" theme={theme} />
            <StatCard icon={Clock} value={60} label="Minutes" theme={theme} />
            <StatCard icon={Zap} value="∞" label="Practice Attempts" theme={theme} />
          </div>

          {/* Previous Score */}
          {testProgress ? (
            <div 
              className="rounded-xl p-5 mb-8 border-2 border-dashed"
              style={{ borderColor: theme.primary }}
            >
              <div className="flex items-center space-x-4">
                <div className={`flex-shrink-0 p-3 rounded-full ${theme.iconBg}`}>
                  <TrendingUp className="h-6 w-6" style={{ color: theme.primary }} />
                </div>
                <div className="flex-1">
                  <h4 className="font-extrabold text-lg text-gray-900">Your Last Score</h4>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                    <div className="text-base">
                      <span className="font-semibold text-gray-700">Result: </span>
                      <span className="font-bold" style={{ color: theme.dark }}>
                        {testProgress.score}/{totalQuestions}
                      </span>
                    </div>
                    <div className="text-base">
                      <span className="font-semibold text-gray-700">Percentage: </span>
                      <span className="font-bold" style={{ color: theme.dark }}>
                        {Math.round((testProgress.score / totalQuestions) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
                <p className="text-sm text-blue-800 font-medium flex items-center space-x-2">
                    <Star className="h-4 w-4 text-blue-600 fill-blue-300"/>
                    <span>No previous score found for this test. Start now to set your first benchmark!</span>
                </p>
            </div>
          )}
        </>
      ) : (
        <NoQuestionsFound theme={theme} subject={subject} selectedType={selectedType} selectedYear={selectedYear} />
      )}
    </div>
  );

  // New Challenge Modal Component
  const ChallengeModal = () => (
    <div className={`
      fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 transition-opacity duration-500
      ${showChallengeModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}
    `}>
      <div className={`
        bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-lg w-full relative transform transition-all duration-500 ease-out
        ${showChallengeModal ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10'}
      `}>
        <button
          onClick={() => setShowChallengeModal(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shadow-md"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>

        <h4 className="text-center text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
          Ready to Challenge Yourself?
        </h4>
        <p className="text-center text-gray-600 mb-8 max-w-xs mx-auto text-lg">
          {selectedYear} {selectedType === 'mid' ? 'Mid Term' : 'Final Exam'}
        </p>

        <div className="grid grid-cols-1 gap-5">
          <ModeButton 
            onClick={() => handleStartTest(true)}
            title="Timed Exam Mode ⏱️"
            subtitle="Simulate the real test with a strict 60-minute countdown."
            icon={Clock}
            gradient="from-blue-600 to-indigo-700"
          />
          <ModeButton 
            onClick={() => handleStartTest(false)}
            title="Practice & Review Mode 💡"
            subtitle="No time limit. Check answers and review explanations as you go."
            icon={Play}
            gradient="from-emerald-500 to-teal-600"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4 lg:p-8">
      {FloatingHeader()}
      <div className="max-w-4xl mx-auto space-y-8 mt-[-1rem]">
        {HeroSection()}
        {SelectionControls()}
        {TestInformation()}
      </div>
      {ChallengeModal()}
    </div>
  );
};

// --- Helper Components ---

const StatCard = ({ icon: Icon, value, label, theme }: any) => (
  <div className={`p-4 rounded-xl border-2 border-gray-100 shadow-sm transition-shadow duration-300 hover:shadow-md ${theme.light}`}>
    <div className="flex items-center space-x-3">
      <div className={`p-2 rounded-full ${theme.iconBg}`}>
        <Icon className="h-6 w-6" style={{ color: theme.primary }} />
      </div>
      <div>
        <div className="text-3xl font-extrabold text-gray-900">{value}</div>
        <div className="text-sm text-gray-600">{label}</div>
      </div>
    </div>
  </div>
);

const ModeButton = ({ onClick, title, subtitle, icon: Icon, gradient }: any) => (
  <button
    onClick={onClick}
    className={`
      group bg-gradient-to-r ${gradient} text-white p-6 rounded-2xl transition-all duration-300 shadow-xl 
      transform hover:scale-[1.02] active:scale-[0.98] border-b-4 border-transparent hover:border-white/50
    `}
  >
    <div className="flex items-center space-x-4">
      <div className="p-3 bg-white/20 rounded-xl group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
        <Icon className="h-6 w-6" />
      </div>
      <div className="text-left">
        <div className="font-bold text-xl mb-1">{title}</div>
        <div className="text-sm opacity-80">{subtitle}</div>
      </div>
    </div>
  </button>
);

const NoQuestionsFound = ({ theme, subject, selectedType, selectedYear }: any) => (
  <div className="text-center py-10">
    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center border-4 border-red-200">
      <AlertCircle className="h-10 w-10 text-red-600" />
    </div>
    <h3 className="text-2xl font-bold text-gray-900 mb-3">Questions Unavailable</h3>
    <p className="text-gray-600 mb-6 max-w-md mx-auto">
      **{subject} - {selectedType === 'mid' ? 'Mid Term' : 'Final Exam'} {selectedYear}** questions are not loaded yet.
    </p>
    <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4 max-w-sm mx-auto shadow-inner">
      <p className="text-sm text-yellow-900 font-medium">
        Try selecting a different year or exam type, or check back later for updates.
      </p>
    </div>
  </div>
);

export default SubjectPage;