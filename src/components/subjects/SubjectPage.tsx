import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Clock, CheckCircle, AlertCircle } from 'lucide-react';
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

  if (!userProfile) return null;

  const years = [2021, 2022, 2023, 2024, 2025];
  const types = [
    { value: 'mid', label: 'Mid Exam' },
    { value: 'final', label: 'Final Exam' }
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

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button 
            onClick={onBack}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{subject}</h1>
            <p className="text-gray-600 capitalize">{userProfile.field} Sciences</p>
          </div>
        </div>

        {/* Selection Controls */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Select Exam</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Year Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Academic Year
              </label>
              <div className="grid grid-cols-3 gap-2">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`
                      p-3 rounded-lg text-sm font-medium transition-colors
                      ${selectedYear === year
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                    `}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Exam Type
              </label>
              <div className="space-y-2">
                {types.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setSelectedType(type.value as 'mid' | 'final')}
                    className={`
                      w-full p-3 rounded-lg text-sm font-medium transition-colors text-left
                      ${selectedType === type.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                    `}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Test Information */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              {subject} - {selectedType === 'mid' ? 'Mid' : 'Final'} Exam {selectedYear}
            </h3>
            {testProgress && (
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Completed</span>
              </div>
            )}
          </div>

          {questions.length > 0 ? (
            <>
              {/* Test Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{questions.length}</div>
                  <div className="text-sm text-blue-700">Questions</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">60</div>
                  <div className="text-sm text-orange-700">Minutes (Timed)</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">∞</div>
                  <div className="text-sm text-green-700">Practice Mode</div>
                </div>
              </div>

              {/* Previous Score */}
              {testProgress && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <div>
                      <h4 className="font-semibold text-green-800">Previous Result</h4>
                      <p className="text-green-700">
                        Score: {testProgress.score}/{questions.length} ({Math.round((testProgress.score / questions.length) * 100)}%)
                      </p>
                      <p className="text-sm text-green-600">
                        Time: {Math.floor(testProgress.timeSpent / 60)}:{(testProgress.timeSpent % 60).toString().padStart(2, '0')}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Test Mode Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={() => handleStartTest(true)}
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <Clock className="h-6 w-6" />
                    <div className="text-left">
                      <div className="font-semibold text-lg">Timed Mode</div>
                      <div className="text-sm text-blue-100">60 minutes exam simulation</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleStartTest(false)}
                  className="group bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-xl hover:from-green-600 hover:to-teal-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <Play className="h-6 w-6" />
                    <div className="text-left">
                      <div className="font-semibold text-lg">Practice Mode</div>
                      <div className="text-sm text-green-100">No time limit, learn at your pace</div>
                    </div>
                  </div>
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Questions Available</h3>
              <p className="text-gray-600 mb-4">
                Questions for {subject} {selectedType === 'mid' ? 'Mid' : 'Final'} Exam {selectedYear} are not available yet.
              </p>
              <p className="text-sm text-gray-500">
                Try selecting a different year or exam type, or check back later.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;