import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import AuthModal from './components/auth/AuthModal';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import BottomBar from './components/layout/BottomBar';
import HomePage from './components/home/HomePage';
import SubjectPage from './components/subjects/SubjectPage';
import TestPage from './components/test/TestPage';
import PremiumPage from './components/premium/PremiumPage';
import ChatPage from './components/chat/ChatPage';
import LeaderboardPage from './components/leaderboard/LeaderboardPage';
import NotesPage from './components/notes/NotesPage';
import ProfilePage from './components/profile/ProfilePage';
import SettingsPage from './components/settings/SettingsPage';
import { Question } from './types';

function AppContent() {
  const { currentUser, userProfile, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [currentSubject, setCurrentSubject] = useState<string | null>(null);
  const [testQuestions, setTestQuestions] = useState<Question[]>([]);
  const [testWithTimer, setTestWithTimer] = useState(false);

  // Pages that should show the bottom bar
  const bottomBarPages = ['home', 'notes', 'chat', 'leaderboard', 'profile'];
  const showBottomBar = bottomBarPages.includes(currentPage) && currentUser && userProfile;

  useEffect(() => {
    if (!loading && !currentUser) {
      setShowAuthModal(true);
    }
  }, [currentUser, loading]);

  const handleNavigation = (page: string, subject?: string) => {
    setCurrentPage(page);
    if (subject) {
      setCurrentSubject(subject);
    }
    setSidebarOpen(false);
  };

  const handleStartTest = (questions: Question[], withTimer: boolean) => {
    setTestQuestions(questions);
    setTestWithTimer(withTimer);
    setCurrentPage('test');
  };

  const handleTestComplete = (score: number, timeSpent: number) => {
    // Test completion is handled in TestPage component
    console.log('Test completed:', { score, timeSpent });
  };

  const handleBackToSubject = () => {
    setCurrentPage('subject');
    setTestQuestions([]);
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setCurrentSubject(null);
    setTestQuestions([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-white font-bold text-xl">RH</span>
          </div>
          <p className="text-gray-600">Loading Remedail-Hub...</p>
        </div>
      </div>
    );
  }

  if (!currentUser || !userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-2xl">FH</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Remedial-Hub</h1>
          <p className="text-xl text-gray-600 mb-8">Your Ultimate Exam Preparation Platform</p>
          <div className="space-x-4">
            <button
              onClick={() => {
                setAuthMode('login');
                setShowAuthModal(true);
              }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setAuthMode('register');
                setShowAuthModal(true);
              }}
              className="bg-white text-blue-600 border border-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              Sign Up
            </button>
          </div>
        </div>

        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          mode={authMode}
          onModeChange={setAuthMode}
        />
      </div>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} />;
      case 'subject':
        return (
          <SubjectPage
            subject={currentSubject!}
            onBack={handleBackToHome}
            onStartTest={handleStartTest}
          />
        );
      case 'test':
        return (
          <TestPage
            questions={testQuestions}
            withTimer={testWithTimer}
            onBack={handleBackToSubject}
            onComplete={handleTestComplete}
          />
        );
      case 'premium':
        return <PremiumPage />;
      case 'chat':
        return <ChatPage />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'notes':
        return <NotesPage />;
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        onMenuToggle={() => setSidebarOpen(true)}
        onProfileClick={() => handleNavigation('profile')}
      />
      
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentPage={currentPage}
        onNavigate={handleNavigation}
      />

      <main className={showBottomBar ? 'pb-20 safe-area-bottom' : ''}>
        {renderPage()}
      </main>

      {/* Bottom Navigation Bar */}
      {showBottomBar && (
        <BottomBar 
          currentPage={currentPage}
          onNavigate={handleNavigation}
        />
      )}

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;