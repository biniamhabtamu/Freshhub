import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Download, FileText, Lock, Search, Filter, X, Zap, BookOpen, Crown, Sparkles, TrendingUp, Users, Star, ArrowRight, BookMarked, Grid, List, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MOCK IMPORTS FOR STANDALONE CODE ---
interface UserProfile { id: string; name: string; isPremium: boolean; }
interface Note {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: 'pdf' | 'ppt' | 'doc';
  fileSize: string;
  subject: string;
  isPremium: boolean;
  downloads?: number;
  rating?: number;
  icon?: string;
}
const useAuth = () => ({ userProfile: { id: 'u1', name: 'Alex Johnson', isPremium: false } as UserProfile });
// ----------------------------------------

/* Modal component for centered content display */
const Modal = React.memo(function Modal({ children, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="relative w-full max-w-md max-h-[80vh] overflow-y-auto rounded-3xl shadow-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 z-10"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>
        <div className="p-6">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
});

/* Subject Card component for grid layout */
const SubjectGridCard = React.memo(function SubjectGridCard({ subject, onClick, isLocked, isFavorite, toggleFavorite, noteCount }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`
        relative rounded-2xl shadow-lg border overflow-hidden cursor-pointer group
        transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-400/30
        ${isLocked ? 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 border-gray-300 dark:border-gray-700' : 
          'bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-gray-200 dark:border-gray-800'}
      `}
      onClick={onClick}
      tabIndex={0}
      aria-label={`Select ${subject} ${isLocked ? '(locked)' : ''}`}
    >
      <div className="p-5 flex flex-col items-center text-center h-full">
        <div className={`
          p-4 rounded-2xl flex items-center justify-center shrink-0 mb-3 transition-all duration-300 group-hover:scale-110
          ${isLocked ? 'bg-gray-300/50 dark:bg-gray-700/70' : 'bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/40 dark:to-indigo-900/40'}
        `}>
          <span className={`text-3xl ${isLocked ? 'text-gray-500 dark:text-gray-400' : 'text-purple-600 dark:text-purple-300'}`}>
            {isLocked ? '🔒' : getSubjectIcon(subject)}
          </span>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <h3 className={`text-base font-bold truncate mb-1 ${isLocked ? 'text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-100'}`}>
            {subject}
          </h3>
          <p className={`text-xs ${isLocked ? 'text-gray-400 dark:text-gray-500' : 'text-gray-500 dark:text-gray-400'}`}>
            {isLocked ? 'Upgrade to access' : `${noteCount} notes available`}
          </p>
        </div>
        {isLocked && (
          <div className="absolute top-3 right-3 flex items-center justify-center w-6 h-6 bg-amber-500 rounded-full shadow-md">
            <Crown className="w-3 h-3 text-white" aria-hidden="true" />
          </div>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(subject);
          }}
          className="absolute top-3 left-3 p-1.5 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-sm"
          aria-label={isFavorite ? `Remove ${subject} from favorites` : `Add ${subject} to favorites`}
        >
          <Star className={`w-4 h-4 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-500 dark:text-gray-400'}`} aria-hidden="true" />
        </button>
      </div>
    </motion.article>
  );
});

/* Note Card component */
const NoteCard = React.memo(function NoteCard({ note, onDownload, isPremiumUser }) {
  const isAccessible = !note.isPremium || isPremiumUser;
  
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf': return '📚';
      case 'ppt': return '💡';
      case 'doc': return '📝';
      default: return '📄';
    }
  };

  const getFileTypeColor = (fileType: string) => {
    switch (fileType) {
      case 'pdf': return 'from-red-500 to-pink-600';
      case 'ppt': return 'from-teal-500 to-cyan-600';
      case 'doc': return 'from-indigo-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-5 flex flex-col transition-all duration-300 hover:shadow-xl ${
        isAccessible ? 'cursor-pointer hover:border-purple-300 dark:hover:border-purple-600' : 'opacity-80'
      }`}
      onClick={() => isAccessible && onDownload(note)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="text-4xl leading-none mr-4 transform group-hover:scale-110 transition-transform duration-300">
          {getFileIcon(note.fileType)}
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getFileTypeColor(note.fileType)} shadow-md`}>
            {note.fileType.toUpperCase()}
          </span>
          {note.isPremium && (
            <div className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full shadow-md">
              <Crown className="h-3 w-3 text-white" />
              <span className="text-xs font-bold text-white">PREMIUM</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 mb-4">
        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2 line-clamp-2 leading-tight">
          {note.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 leading-relaxed">
          {note.description}
        </p>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <Download className="h-3 w-3" />
            <span>{note.downloads?.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-3 w-3 text-yellow-500 fill-current" />
            <span>{note.rating}</span>
          </div>
        </div>
        <span className="font-semibold">{note.fileSize}</span>
      </div>

      {/* Download Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDownload(note);
        }}
        disabled={!isAccessible}
        className={`w-full py-3 px-4 rounded-xl font-bold transition-all duration-200 flex items-center justify-center space-x-2 ${
          isAccessible
            ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-lg hover:shadow-purple-500/25 active:scale-95'
            : 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed'
        }`}
      >
        {isAccessible ? (
          <>
            <Download className="h-4 w-4" />
            <span>Download</span>
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" />
            <span>Premium Required</span>
          </>
        )}
      </button>
    </motion.div>
  );
});

/* Subject Card Skeleton */
const SubjectCardSkeleton = () => (
  <motion.article
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-5 flex flex-col items-center text-center animate-pulse bg-gray-100 dark:bg-gray-800"
  >
    <div className="p-4 rounded-2xl mb-3 w-14 h-14 bg-gray-300 dark:bg-gray-700" />
    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2" />
    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
  </motion.article>
);

/* Note Card Skeleton */
const NoteCardSkeleton = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-5 flex flex-col animate-pulse"
  >
    <div className="flex items-start justify-between mb-3">
      <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-xl" />
      <div className="w-16 h-6 bg-gray-300 dark:bg-gray-700 rounded-full" />
    </div>
    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2" />
    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full mb-1" />
    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-4" />
    <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-xl" />
  </motion.div>
);

const getSubjectIcon = (subject: string) => {
  const icons: { [key: string]: string } = {
    Geography: '🗺️',
    Logic: '🧠',
    Anthropology: '👥',
    English: '📖',
    Psychology: '🧪',
    Economics: '💹',
    Civic: '🏛️',
    'C++': '💻'
  };
  return icons[subject] || '📚';
};

const NotesPage: React.FC = () => {
  const { userProfile } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeSort, setActiveSort] = useState('recent');
  const [viewMode, setViewMode] = useState<'subjects' | 'notes'>('subjects');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // Enhanced mock notes data
  const notes: Note[] = [
    {
      id: '1',
      title: 'Geography Physical Features',
      description: 'Comprehensive guide to physical geography features including mountains, rivers, and climate patterns with interactive diagrams.',
      fileUrl: '#',
      fileType: 'pdf',
      fileSize: '2.5 MB',
      subject: 'Geography',
      isPremium: true,
      downloads: 1247,
      rating: 4.8,
      icon: '🗺️'
    },
    {
      id: '2',
      title: 'Logic and Critical Thinking',
      description: 'Essential concepts in logical reasoning and critical thinking skills with practical examples and exercises.',
      fileUrl: '#',
      fileType: 'ppt',
      fileSize: '3.2 MB',
      subject: 'Logic',
      isPremium: true,
      downloads: 892,
      rating: 4.6,
      icon: '🧠'
    },
    {
      id: '3',
      title: 'Anthropology Cultural Studies',
      description: 'Introduction to cultural anthropology and human societies across different civilizations and time periods.',
      fileUrl: '#',
      fileType: 'pdf',
      fileSize: '1.8 MB',
      subject: 'Anthropology',
      isPremium: false,
      downloads: 567,
      rating: 4.4,
      icon: '👥'
    },
    {
      id: '4',
      title: 'English Grammar Rules',
      description: 'Complete reference for English grammar rules and usage with detailed explanations and practice sections.',
      fileUrl: '#',
      fileType: 'doc',
      fileSize: '1.2 MB',
      subject: 'English',
      isPremium: true,
      downloads: 2156,
      rating: 4.9,
      icon: '📖'
    },
    {
      id: '5',
      title: 'Psychology Fundamentals',
      description: 'Basic principles of psychology and human behavior including cognitive processes and developmental stages.',
      fileUrl: '#',
      fileType: 'pdf',
      fileSize: '4.1 MB',
      subject: 'Psychology',
      isPremium: true,
      downloads: 1345,
      rating: 4.7,
      icon: '🧪'
    },
    {
      id: '6',
      title: 'Economics Market Systems',
      description: 'Understanding different economic systems and market structures with real-world case studies.',
      fileUrl: '#',
      fileType: 'ppt',
      fileSize: '2.9 MB',
      subject: 'Economics',
      isPremium: true,
      downloads: 978,
      rating: 4.5,
      icon: '💹'
    },
    {
      id: '7',
      title: 'Civic Education Basics',
      description: 'Fundamental concepts of civic education and citizenship responsibilities in modern society.',
      fileUrl: '#',
      fileType: 'pdf',
      fileSize: '2.1 MB',
      subject: 'Civic',
      isPremium: false,
      downloads: 723,
      rating: 4.3,
      icon: '🏛️'
    },
    {
      id: '8',
      title: 'C++ Programming Guide',
      description: 'Comprehensive C++ programming tutorial from basics to advanced object-oriented concepts.',
      fileUrl: '#',
      fileType: 'doc',
      fileSize: '3.5 MB',
      subject: 'C++',
      isPremium: false,
      downloads: 1890,
      rating: 4.8,
      icon: '💻'
    }
  ];

  const subjects = ['Geography', 'Logic', 'Anthropology', 'English', 'Psychology', 'Economics', 'Civic', 'C++'];
  const fileTypes = ['all', 'pdf', 'ppt', 'doc'];
  const sortOptions = [
    { id: 'recent', label: 'Most Recent', icon: Sparkles },
    { id: 'popular', label: 'Most Popular', icon: TrendingUp },
    { id: 'rating', label: 'Highest Rated', icon: Star }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const toggleFavorite = useCallback((subjectName: string) => {
    setFavorites(prev =>
      prev.includes(subjectName)
        ? prev.filter(name => name !== subjectName)
        : [...prev, subjectName]
    );
  }, []);

  const filteredNotes = useMemo(() => {
    let result = notes.filter((note) => {
      const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          note.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject = selectedSubject === 'all' || note.subject === selectedSubject;
      const matchesType = selectedType === 'all' || note.fileType === selectedType;
      
      return matchesSearch && matchesSubject && matchesType;
    });

    // Apply sorting
    switch (activeSort) {
      case 'popular':
        result = result.sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
        break;
      case 'rating':
        result = result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'recent':
      default:
        // Keep original order for recent
        break;
    }

    return result;
  }, [searchTerm, selectedSubject, selectedType, activeSort]);

  const subjectNotesCount = useMemo(() => {
    const counts: { [key: string]: number } = {};
    subjects.forEach(subject => {
      counts[subject] = notes.filter(note => note.subject === subject).length;
    });
    return counts;
  }, []);

  const handleDownload = (note: Note) => {
    if (note.isPremium && !userProfile?.isPremium) {
      alert('This note requires a Premium subscription. Please upgrade to access.');
      return;
    }
    alert(`Downloading ${note.title}...`);
  };

  const handleSubjectClick = (subject: string) => {
    setSelectedSubject(subject);
    setViewMode('notes');
  };

  const totalDownloads = notes.reduce((sum, note) => sum + (note.downloads || 0), 0);
  const averageRating = (notes.reduce((sum, note) => sum + (note.rating || 0), 0) / notes.length).toFixed(1);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100' : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900'}`}>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl pt-8 pb-20">
        {/* Enhanced Header */}
        <div className="mb-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center mb-4"
          >
            <div className="flex items-center justify-center mb-3 bg-gradient-to-r from-purple-600 to-indigo-600 p-3 rounded-2xl shadow-lg">
              <BookMarked className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Study Almanac
            </h1>
          </motion.div>
          <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} max-w-2xl mx-auto mb-6`}>
            {userProfile?.isPremium
              ? "Access all notes and premium content with your membership."
              : "Explore free notes or upgrade to unlock premium study materials."}
          </p>
          
          {!userProfile?.isPremium && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => alert('Navigate to Premium Page')}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center gap-2 mx-auto focus:outline-none focus:ring-4 focus:ring-purple-400/30 shadow-md"
              aria-label="Upgrade to Premium"
            >
              <Crown className="w-5 h-5" />
              Upgrade to Premium
              <Sparkles className="w-4 h-4" />
            </motion.button>
          )}
        </div>

        {/* Enhanced Search & Filter Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-6 lg:p-8 shadow-2xl shadow-gray-200/30 dark:shadow-gray-900/30 mb-8 border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search notes, subjects, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 border border-gray-300/50 dark:border-gray-600/50 rounded-2xl bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-gray-100 focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 text-lg shadow-inner backdrop-blur-sm"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100/50 dark:bg-gray-700/50 rounded-2xl p-2">
              <button
                onClick={() => setViewMode('subjects')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  viewMode === 'subjects'
                    ? 'bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-300 shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <Grid className="h-4 w-4" />
                <span>Subjects</span>
              </button>
              <button
                onClick={() => setViewMode('notes')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  viewMode === 'notes'
                    ? 'bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-300 shadow-lg'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <List className="h-4 w-4" />
                <span>All Notes</span>
              </button>
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-2 bg-gray-100/50 dark:bg-gray-700/50 rounded-2xl p-2">
              {sortOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => setActiveSort(option.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                      activeSort === option.id
                        ? 'bg-white dark:bg-gray-600 text-purple-600 dark:text-purple-300 shadow-lg'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{option.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Desktop Filters */}
          <div className="hidden lg:grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 mt-6 border-t border-gray-200/50 dark:border-gray-700/50">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300/50 dark:border-gray-600/50 rounded-2xl bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-gray-100 shadow-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
              >
                <option value="all">All Subjects</option>
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">File Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300/50 dark:border-gray-600/50 rounded-2xl bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-gray-100 shadow-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-200"
              >
                {fileTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All File Types' : type.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {viewMode === 'subjects' 
                  ? `${subjects.length} subjects available`
                  : `${filteredNotes.length} notes found`
                }
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Premium CTA */}
        {!userProfile?.isPremium && (
          <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 rounded-3xl p-8 mb-8 text-white shadow-2xl shadow-orange-300/30 transform hover:scale-[1.005] transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full transform -translate-x-1/2 translate-y-1/2" />
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-6 md:mb-0">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm mr-6">
                    <Zap className="h-8 w-8 text-yellow-100" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Unlock Premium Content 🚀</h2>
                    <p className="text-amber-100 text-lg">
                      Access all {notes.filter(n => n.isPremium).length}+ premium notes and exclusive features
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => alert('Navigate to Premium Page')}
                  className="flex items-center space-x-3 bg-white text-orange-600 font-bold py-4 px-8 rounded-2xl hover:scale-105 active:scale-95 transition-transform duration-200 shadow-lg hover:shadow-xl"
                >
                  <Crown className="h-5 w-5" />
                  <span>Get Premium</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Section */}
        <section>
          {viewMode === 'subjects' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              <AnimatePresence>
                {loading ? (
                  Array(8).fill(0).map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <SubjectCardSkeleton />
                    </motion.div>
                  ))
                ) : subjects.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No subjects found</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                      Try adjusting your search criteria.
                    </p>
                  </div>
                ) : (
                  subjects.map((subject) => (
                    <SubjectGridCard
                      key={subject}
                      subject={subject}
                      onClick={() => handleSubjectClick(subject)}
                      isLocked={notes.some(n => n.subject === subject && n.isPremium) && !userProfile?.isPremium}
                      isFavorite={favorites.includes(subject)}
                      toggleFavorite={toggleFavorite}
                      noteCount={subjectNotesCount[subject]}
                    />
                  ))
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence>
                {loading ? (
                  Array(6).fill(0).map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <NoteCardSkeleton />
                    </motion.div>
                  ))
                ) : filteredNotes.length === 0 ? (
                  <div className="col-span-full text-center py-12 bg-white dark:bg-gray-800 rounded-2xl">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No notes found</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Try adjusting your search or filter criteria.
                    </p>
                  </div>
                ) : (
                  filteredNotes.map((note) => (
                    <NoteCard
                      key={note.id}
                      note={note}
                      onDownload={handleDownload}
                      isPremiumUser={userProfile?.isPremium || false}
                    />
                  ))
                )}
              </AnimatePresence>
            </div>
          )}
        </section>

        {/* Enhanced Statistics */}
        <div className="mt-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 lg:p-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-100 dark:to-gray-200 bg-clip-text text-transparent mb-8 text-center">
            Knowledge Hub Insights
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-700/50">
              <div className="text-4xl font-bold text-blue-700 dark:text-blue-300 mb-2">{notes.length}</div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Total Notes</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200/50 dark:border-green-700/50">
              <div className="text-4xl font-bold text-green-700 dark:text-green-300 mb-2">
                {notes.filter(n => !n.isPremium).length}
              </div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Free Resources</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200/50 dark:border-amber-700/50">
              <div className="text-4xl font-bold text-amber-700 dark:text-amber-300 mb-2">
                {totalDownloads.toLocaleString()}
              </div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Total Downloads</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20 border border-purple-200/50 dark:border-purple-700/50">
              <div className="text-4xl font-bold text-purple-700 dark:text-purple-300 mb-2">{averageRating}</div>
              <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">Average Rating</div>
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Mobile Filter Modal */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)} aria-hidden="true" />

            {/* Modal Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute top-0 right-0 w-full max-w-md h-full bg-white dark:bg-gray-800 shadow-2xl p-6 flex flex-col rounded-l-3xl"
            >
              {/* Header */}
              <div className="flex justify-between items-center pb-4 border-b border-gray-200/50 dark:border-gray-700/50 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                  <Filter className="h-6 w-6 mr-3 text-purple-600 dark:text-purple-400" /> 
                  Filter & Sort
                </h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-3 rounded-2xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Close Filters"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-8 flex-grow overflow-y-auto">
                {/* Sort Options */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Sort By</h3>
                  <div className="space-y-3">
                    {sortOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.id}
                          onClick={() => setActiveSort(option.id)}
                          className={`w-full flex items-center space-x-4 p-4 rounded-2xl border-2 transition-all duration-200 ${
                            activeSort === option.id
                              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                              : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="font-medium">{option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Filters */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Subject</h3>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="w-full py-4 px-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                    >
                      <option value="all">All Subjects</option>
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">File Type</h3>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full py-4 px-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                    >
                      {fileTypes.map((type) => (
                        <option key={type} value={type}>
                          {type === 'all' ? 'All File Types' : type.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <div className="pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
                >
                  Apply Filters ({filteredNotes.length})
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotesPage;