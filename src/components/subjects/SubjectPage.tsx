import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Clock, CheckCircle, AlertCircle, Calendar, BookOpen, Award, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getQuestionsBySubjectAndYear } from '../../data/questions';
import { Question } from '../../types';

interface SubjectPageProps {
  subject: string;
  onBack: () => void;
  onStartTest: (questions: Question[], withTimer: boolean) => void;
}

const SubjectPage: React.FC<SubjectPageProps> = ({ subject, onBack, onStartTest }) => {
  const { userProfile } = useAuth();
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  const [selectedType, setSelectedType] = useState<'mid' | 'final'>('mid');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!userProfile) return null;

  const years = [2021, 2022, 2023, 2024, 2025];
  const types = [
    { value: 'mid', label: 'Mid Term', icon: BookOpen },
    { value: 'final', label: 'Final Exam', icon: Award }
  ];

  const questions = getQuestionsBySubjectAndYear(subject, selectedYear, selectedType, userProfile.field);

  // Get progress for this specific test
  const getTestProgress = () => {
    const progressKey = `test_${userProfile.id}_${subject}_${selectedYear}_${selectedType}`;
    const progress = localStorage.getItem(progressKey);
    return progress ? JSON.parse(progress) : null;
  };

  const testProgress = getTestProgress();

  const handleStartTest = (withTimer: boolean) => {
    if (questions.length > 0) {
      onStartTest(questions, withTimer);
    }
  };

  // Color themes based on subject
  const getSubjectTheme = () => {
    const themes = {
      math: { primary: '#8B5CF6', gradient: 'from-purple-500 to-indigo-600', light: 'bg-purple-50' },
      physics: { primary: '#06B6D4', gradient: 'from-cyan-500 to-blue-600', light: 'bg-cyan-50' },
      chemistry: { primary: '#10B981', gradient: 'from-emerald-500 to-green-600', light: 'bg-emerald-50' },
      biology: { primary: '#84CC16', gradient: 'from-lime-500 to-green-500', light: 'bg-lime-50' },
      default: { primary: '#F59E0B', gradient: 'from-amber-500 to-orange-600', light: 'bg-amber-50' }
    };
    
    const subjectKey = subject.toLowerCase();
    return themes[subjectKey as keyof typeof themes] || themes.default;
  };

  const theme = getSubjectTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 lg:p-6">
      {/* Floating Header */}
      <div className={`
        max-w-4xl mx-auto sticky top-4 z-10 transition-all duration-300
        ${isScrolled ? 'scale-95 opacity-90' : 'scale-100 opacity-100'}
      `}>
        <div className={`
          bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-4 mb-6
          transition-all duration-300
          ${isScrolled ? 'shadow-xl' : 'shadow-lg'}
        `}>
          <div className="flex items-center space-x-4">
            <button 
              onClick={onBack}
              className={`
                p-3 rounded-xl transition-all duration-200 flex items-center justify-center
                bg-white shadow-lg border border-gray-100 hover:shadow-xl
                hover:scale-105 active:scale-95
              `}
              style={{ color: theme.primary }}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 truncate">{subject}</h1>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: theme.primary }}
                ></div>
                <p className="text-gray-600 text-sm capitalize truncate">
                  {userProfile.field} Sciences
                </p>
              </div>
            </div>

            {testProgress && (
              <div 
                className="hidden sm:flex items-center space-x-2 px-3 py-2 rounded-lg text-white font-medium text-sm"
                style={{ backgroundColor: theme.primary }}
              >
                <CheckCircle className="h-4 w-4" />
                <span>Completed</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Selection Controls */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Calendar className="h-6 w-6" style={{ color: theme.primary }} />
            <h2 className="text-xl font-bold text-gray-900">Select Exam</h2>
          </div>
          
          <div className="space-y-6">
            {/* Year Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Academic Year
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`
                      p-4 rounded-xl text-sm font-semibold transition-all duration-200
                      border-2 hover:scale-105 active:scale-95
                      ${selectedYear === year
                        ? 'text-white shadow-lg transform scale-105'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200'
                      }
                    `}
                    style={{
                      backgroundColor: selectedYear === year ? theme.primary : undefined,
                      borderColor: selectedYear === year ? theme.primary : undefined,
                    }}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Exam Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {types.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <button
                      key={type.value}
                      onClick={() => setSelectedType(type.value as 'mid' | 'final')}
                      className={`
                        p-4 rounded-xl transition-all duration-200 border-2 text-left
                        hover:scale-105 active:scale-95
                        ${selectedType === type.value
                          ? 'text-white shadow-lg transform scale-105'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200'
                        }
                      `}
                      style={{
                        backgroundColor: selectedType === type.value ? theme.primary : undefined,
                        borderColor: selectedType === type.value ? theme.primary : undefined,
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <IconComponent className="h-5 w-5" />
                        <span className="font-semibold">{type.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Test Information */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
          {questions.length > 0 ? (
            <>
              {/* Test Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {subject} - {selectedType === 'mid' ? 'Mid Term' : 'Final Exam'} {selectedYear}
                  </h3>
                  <p className="text-gray-600">Ready to test your knowledge?</p>
                </div>
                
                {testProgress && (
                  <div className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-full text-white font-medium text-sm"
                    style={{ backgroundColor: theme.primary }}
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Completed</span>
                  </div>
                )}
              </div>

              {/* Test Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className={`p-4 rounded-xl border-2 border-gray-100 ${theme.light}`}>
                  <div className="flex items-center space-x-3">
                    <BookOpen className="h-6 w-6" style={{ color: theme.primary }} />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{questions.length}</div>
                      <div className="text-sm text-gray-600">Questions</div>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-xl border-2 border-gray-100 ${theme.light}`}>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-6 w-6" style={{ color: theme.primary }} />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">60</div>
                      <div className="text-sm text-gray-600">Minutes</div>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-xl border-2 border-gray-100 ${theme.light}`}>
                  <div className="flex items-center space-x-3">
                    <Zap className="h-6 w-6" style={{ color: theme.primary }} />
                    <div>
                      <div className="text-2xl font-bold text-gray-900">∞</div>
                      <div className="text-sm text-gray-600">Practice Mode</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Previous Score */}
              {testProgress && (
                <div 
                  className="rounded-xl p-4 mb-8 border-2 text-white"
                  style={{ 
                    background: `linear-gradient(135deg, ${theme.primary}20, ${theme.primary}40)`,
                    borderColor: theme.primary
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Award className="h-8 w-8" style={{ color: theme.primary }} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">Previous Result</h4>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <div className="text-sm">
                          <span className="font-semibold text-gray-700">Score: </span>
                          <span className="font-bold" style={{ color: theme.primary }}>
                            {testProgress.score}/{questions.length} ({Math.round((testProgress.score / questions.length) * 100)}%)
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="font-semibold text-gray-700">Time: </span>
                          <span className="font-bold" style={{ color: theme.primary }}>
                            {Math.floor(testProgress.timeSpent / 60)}:{(testProgress.timeSpent % 60).toString().padStart(2, '0')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Test Mode Buttons */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <button
                  onClick={() => handleStartTest(true)}
                  className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-lg mb-1">Timed Mode</div>
                      <div className="text-blue-100 text-sm">60 minutes exam simulation</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleStartTest(false)}
                  className="group bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-2xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-lg mb-1">Practice Mode</div>
                      <div className="text-emerald-100 text-sm">No time limit, learn at your pace</div>
                    </div>
                  </div>
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
                <AlertCircle className="h-10 w-10 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">No Questions Available</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Questions for {subject} {selectedType === 'mid' ? 'Mid Term' : 'Final Exam'} {selectedYear} are not available yet.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 max-w-md mx-auto">
                <p className="text-sm text-yellow-800">
                  Try selecting a different year or exam type, or check back later for updates.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;