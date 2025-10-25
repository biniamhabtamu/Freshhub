import React, { useState, useEffect } from 'react';
import { Download, FileText, Lock, Search, Filter, X, Zap, BookOpen, Crown, Sparkles, TrendingUp, Users, Star, ArrowRight, BookMarked } from 'lucide-react';

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
}
const useAuth = () => ({ userProfile: { id: 'u1', name: 'Alex Johnson', isPremium: false } as UserProfile });
// ----------------------------------------

const NotesPage: React.FC = () => {
  const { userProfile } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeSort, setActiveSort] = useState('recent');

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
      rating: 4.8
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
      rating: 4.6
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
      rating: 4.4
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
      rating: 4.9
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
      rating: 4.7
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
      rating: 4.5
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
      rating: 4.3
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
      rating: 4.8
    }
  ];

  const subjects = ['all', 'Geography', 'Logic', 'Anthropology', 'English', 'Psychology', 'Economics', 'Civic', 'C++'];
  const fileTypes = ['all', 'pdf', 'ppt', 'doc'];
  const sortOptions = [
    { id: 'recent', label: 'Most Recent', icon: Sparkles },
    { id: 'popular', label: 'Most Popular', icon: TrendingUp },
    { id: 'rating', label: 'Highest Rated', icon: Star }
  ];

  const [filteredNotes, setFilteredNotes] = useState<Note[]>(notes);

  useEffect(() => {
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

    setFilteredNotes(result);
  }, [searchTerm, selectedSubject, selectedType, activeSort]);

  const handleDownload = (note: Note) => {
    if (note.isPremium && !userProfile?.isPremium) {
      alert('This note requires a Premium subscription. Please upgrade to access.');
      return;
    }
    alert(`Downloading ${note.title}...`);
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return '📚'; 
      case 'ppt':
        return '💡';
      case 'doc':
        return '📝';
      default:
        return '📄';
    }
  };

  const getFileTypeColor = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return 'from-red-500 to-pink-600';
      case 'ppt':
        return 'from-teal-500 to-cyan-600';
      case 'doc':
        return 'from-indigo-500 to-purple-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getSubjectColor = (subject: string) => {
    const colors = {
      Geography: 'from-emerald-500 to-green-600',
      Logic: 'from-blue-500 to-indigo-600',
      Anthropology: 'from-amber-500 to-orange-600',
      English: 'from-violet-500 to-purple-600',
      Psychology: 'from-pink-500 to-rose-600',
      Economics: 'from-cyan-500 to-blue-600',
      Civic: 'from-lime-500 to-green-600',
      'C++': 'from-slate-500 to-gray-600'
    };
    return colors[subject as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const handleMobileFilterSubmit = () => {
    setIsFilterOpen(false);
  };

  const totalDownloads = notes.reduce((sum, note) => sum + (note.downloads || 0), 0);
  const averageRating = (notes.reduce((sum, note) => sum + (note.rating || 0), 0) / notes.length).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Enhanced Header */}
        <header className="text-center mb-12 lg:mb-16 relative">
          {/* Background Elements */}
          <div className="absolute top-10 left-1/4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl" />
          <div className="absolute top-5 right-1/4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl" />
          
          <div className="relative z-10">
            <div className="w-24 h-24 bg-gradient-to-tr from-teal-500 via-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-teal-500/30 transform hover:scale-105 transition-transform duration-300">
              <BookMarked className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-clip-text text-transparent mb-4 tracking-tight">
              Study Almanac
            </h1>
            <p className="text-xl sm:text-2xl font-light text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover premium educational resources to accelerate your learning journey
            </p>
          </div>
        </header>

        {/* Enhanced Search & Filter Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 lg:p-8 shadow-2xl shadow-gray-200/30 mb-12 border border-gray-200/50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search notes, subjects, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 border border-gray-300/50 rounded-2xl bg-white/50 text-gray-800 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg shadow-inner backdrop-blur-sm"
              />
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-2 bg-gray-100/50 rounded-2xl p-2">
              {sortOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={() => setActiveSort(option.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                      activeSort === option.id
                        ? 'bg-white text-blue-600 shadow-lg'
                        : 'text-gray-600 hover:text-gray-800'
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
              className="lg:hidden flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Desktop Filters */}
          <div className="hidden lg:grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 mt-6 border-t border-gray-200/50">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300/50 rounded-2xl bg-white/50 shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
              >
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject === 'all' ? 'All Subjects' : subject}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">File Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300/50 rounded-2xl bg-white/50 shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
              >
                {fileTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All File Types' : type.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <div className="text-sm text-gray-500 font-medium">
                {filteredNotes.length} notes found
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Premium CTA */}
        {!userProfile?.isPremium && (
          <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 rounded-3xl p-8 mb-12 text-white shadow-2xl shadow-orange-300/30 transform hover:scale-[1.005] transition-all duration-300 relative overflow-hidden">
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

        {/* Enhanced Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredNotes.map((note) => {
            const isAccessible = !note.isPremium || userProfile?.isPremium;
            
            return (
              <div
                key={note.id}
                className={`group bg-white rounded-3xl shadow-xl border border-gray-200/50 p-6 flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-blue-100/30 ${
                  isAccessible 
                    ? 'hover:border-blue-300/50 hover:scale-[1.02] cursor-pointer' 
                    : 'opacity-80 grayscale cursor-default'
                }`}
                onClick={() => isAccessible && handleDownload(note)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl leading-none mr-4 transform group-hover:scale-110 transition-transform duration-300">
                    {getFileIcon(note.fileType)}
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getFileTypeColor(note.fileType)} shadow-md`}>
                      {note.fileType.toUpperCase()}
                    </span>
                    {note.isPremium && (
                      <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full shadow-md">
                        <Crown className="h-3 w-3 text-white" />
                        <span className="text-xs font-bold text-white">PREMIUM</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 leading-tight">
                    {note.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {note.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
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

                  {/* Subject Tag */}
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getSubjectColor(note.subject)} shadow-md`}>
                      {note.subject}
                    </span>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(note);
                  }}
                  disabled={!isAccessible}
                  className={`w-full py-3.5 px-4 rounded-2xl font-bold transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg ${
                    isAccessible
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-xl hover:shadow-blue-500/25 active:scale-95'
                      : 'bg-gray-300 text-gray-600 cursor-not-allowed shadow-none'
                  }`}
                >
                  {isAccessible ? (
                    <>
                      <Download className="h-5 w-5" />
                      <span>Download Now</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5" />
                      <span>Premium Required</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* No Results State */}
        {filteredNotes.length === 0 && (
          <div className="text-center py-20 bg-white/80 backdrop-blur-lg rounded-3xl mt-12 shadow-2xl border border-gray-200/50">
            <FileText className="h-20 w-20 text-gray-400 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-gray-900 mb-3">No notes found</h3>
            <p className="text-gray-600 text-lg max-w-md mx-auto mb-6">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedSubject('all');
                setSelectedType('all');
              }}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-2xl font-bold hover:shadow-lg transition-all duration-200"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Enhanced Statistics */}
        <div className="mt-16 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200/50 p-8 lg:p-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent mb-8 text-center">
            Knowledge Hub Insights
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200/50">
              <div className="text-4xl font-bold text-blue-700 mb-2">{notes.length}</div>
              <div className="text-sm font-semibold text-gray-700">Total Notes</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200/50">
              <div className="text-4xl font-bold text-green-700 mb-2">
                {notes.filter(n => !n.isPremium).length}
              </div>
              <div className="text-sm font-semibold text-gray-700">Free Resources</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200/50">
              <div className="text-4xl font-bold text-amber-700 mb-2">
                {totalDownloads.toLocaleString()}
              </div>
              <div className="text-sm font-semibold text-gray-700">Total Downloads</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-violet-100 border border-purple-200/50">
              <div className="text-4xl font-bold text-purple-700 mb-2">{averageRating}</div>
              <div className="text-sm font-semibold text-gray-700">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Filter Modal */}
      <div
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
          isFilterOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:hidden`}
      >
        {/* Backdrop */}
        {isFilterOpen && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)} aria-hidden="true" />
        )}

        {/* Modal Content */}
        <div className="absolute top-0 right-0 w-full max-w-md h-full bg-white shadow-2xl p-6 flex flex-col rounded-l-3xl">
          {/* Header */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-200/50 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Filter className="h-6 w-6 mr-3 text-blue-600" /> 
              Filter & Sort
            </h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="p-3 rounded-2xl text-gray-500 hover:bg-gray-100 transition-colors"
              aria-label="Close Filters"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-8 flex-grow overflow-y-auto">
            {/* Sort Options */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Sort By</h3>
              <div className="space-y-3">
                {sortOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setActiveSort(option.id)}
                      className={`w-full flex items-center space-x-4 p-4 rounded-2xl border-2 transition-all duration-200 ${
                        activeSort === option.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
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
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Subject</h3>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full py-4 px-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white text-gray-800"
                >
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject === 'all' ? 'All Subjects' : subject}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">File Type</h3>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full py-4 px-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white text-gray-800"
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
          <div className="pt-6 border-t border-gray-200/50">
            <button
              onClick={handleMobileFilterSubmit}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
            >
              Apply Filters ({filteredNotes.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesPage;