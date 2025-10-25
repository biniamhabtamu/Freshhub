import React, { useState } from 'react';
import { Download, FileText, Lock, Search, Filter, X, Zap, BookOpen, Crown } from 'lucide-react';

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
}
const useAuth = () => ({ userProfile: { id: 'u1', name: 'Alex Doe', isPremium: false } as UserProfile });
// ----------------------------------------

const NotesPage: React.FC = () => {
  const { userProfile } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Mobile filter state

  // Mock notes data (kept as is)
  const notes: Note[] = [
    {
      id: '1',
      title: 'Geography Physical Features',
      description: 'Comprehensive guide to physical geography features including mountains, rivers, and climate patterns.',
      fileUrl: '#',
      fileType: 'pdf',
      fileSize: '2.5 MB',
      subject: 'Geography',
      isPremium: true
    },
    {
      id: '2',
      title: 'Logic and Critical Thinking',
      description: 'Essential concepts in logical reasoning and critical thinking skills.',
      fileUrl: '#',
      fileType: 'ppt',
      fileSize: '3.2 MB',
      subject: 'Logic',
      isPremium: true
    },
    {
      id: '3',
      title: 'Anthropology Cultural Studies',
      description: 'Introduction to cultural anthropology and human societies.',
      fileUrl: '#',
      fileType: 'pdf',
      fileSize: '1.8 MB',
      subject: 'Anthropology',
      isPremium: false
    },
    {
      id: '4',
      title: 'English Grammar Rules',
      description: 'Complete reference for English grammar rules and usage.',
      fileUrl: '#',
      fileType: 'doc',
      fileSize: '1.2 MB',
      subject: 'English',
      isPremium: true
    },
    {
      id: '5',
      title: 'Psychology Fundamentals',
      description: 'Basic principles of psychology and human behavior.',
      fileUrl: '#',
      fileType: 'pdf',
      fileSize: '4.1 MB',
      subject: 'Psychology',
      isPremium: true
    },
    {
      id: '6',
      title: 'Economics Market Systems',
      description: 'Understanding different economic systems and market structures.',
      fileUrl: '#',
      fileType: 'ppt',
      fileSize: '2.9 MB',
      subject: 'Economics',
      isPremium: true
    }
  ];

  const subjects = ['all', 'Geography', 'Logic', 'Anthropology', 'English', 'Psychology', 'Economics', 'Civic', 'C++'];
  const fileTypes = ['all', 'pdf', 'ppt', 'doc'];

  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          note.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || note.subject === selectedSubject;
    const matchesType = selectedType === 'all' || note.fileType === selectedType;
    
    return matchesSearch && matchesSubject && matchesType;
  });

  const handleDownload = (note: Note) => {
    if (note.isPremium && !userProfile?.isPremium) {
      alert('This note requires a Premium subscription. Please upgrade to access.');
      return;
    }
    alert(`Downloading ${note.title}...`);
  };

  // Emojis for a "human" touch
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

  // Warmer, unique color palette
  const getFileTypeColor = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'ppt':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'doc':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleMobileFilterSubmit = () => {
    setIsFilterOpen(false);
  };


  return (
    // Creamy/Warm background gradient
    <div className="min-h-screen bg-gradient-to-br from-white to-orange-50/70 pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <header className="text-center mb-12 lg:mb-16">
          <div className="w-20 h-20 bg-gradient-to-tr from-teal-500 to-green-500 rounded-[2rem] flex items-center justify-center mx-auto mb-4 shadow-xl shadow-teal-500/30">
            <BookOpen className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-gray-900 mb-2 tracking-tight">
            The Study Almanac
          </h1>
          <p className="text-lg sm:text-xl font-light text-gray-600 max-w-3xl mx-auto">
            Hand-curated knowledge notes to elevate your learning journey.
          </p>
        </header>

        {/* Search & Filter Section (Distinct Card) */}
        <div className="bg-white rounded-[2.5rem] p-4 lg:p-6 shadow-2xl shadow-gray-200/50 mb-10 border border-gray-100">
            {/* Search Bar - Sticky on Mobile with a modern floating appearance */}
            <div className="sticky top-4 z-20 py-1 lg:py-0 lg:static">
                <div className="flex items-center space-x-3">
                    {/* Search Input */}
                    <div className="relative flex-grow">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                        type="text"
                        placeholder="Search by topic or keyword..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full bg-white text-gray-800 focus:ring-4 focus:ring-teal-500/30 focus:border-teal-500 transition duration-200 text-base shadow-inner"
                        />
                    </div>

                    {/* Mobile Filter Button */}
                    <button
                        onClick={() => setIsFilterOpen(true)}
                        className="lg:hidden p-4 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 transition duration-150 active:scale-95"
                        aria-label="Open Filters"
                    >
                        <Filter className="h-6 w-6" />
                    </button>
                </div>
            </div>

            {/* Desktop Filters (Always visible, clean pill style) */}
            <div className="hidden lg:grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
                <h2 className="md:col-span-1 text-lg font-bold text-gray-700 flex items-center">
                    <Filter className="h-5 w-5 mr-3 text-teal-600" />
                    Refine By:
                </h2>
                {/* Subject Filter */}
                <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full py-3 px-4 border border-gray-200 rounded-xl bg-white shadow-sm appearance-none cursor-pointer text-gray-700 hover:border-teal-400 transition"
                >
                    {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                        {subject === 'all' ? 'All Subjects' : subject}
                    </option>
                    ))}
                </select>

                {/* File Type Filter */}
                <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full py-3 px-4 border border-gray-200 rounded-xl bg-white shadow-sm appearance-none cursor-pointer text-gray-700 hover:border-teal-400 transition"
                >
                    {fileTypes.map((type) => (
                    <option key={type} value={type}>
                        {type === 'all' ? 'All Types' : type.toUpperCase()}
                    </option>
                    ))}
                </select>
                <div className="hidden md:block"></div> {/* Spacer */}
            </div>
        </div>


        {/* Premium Notice (Warm, inviting, and clearly actionable) */}
        {!userProfile?.isPremium && (
          <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-3xl p-6 lg:p-8 mb-12 shadow-2xl shadow-orange-300/50 transform hover:scale-[1.005] transition duration-300 ease-in-out">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <Zap className="h-8 w-8 text-yellow-100 mr-4 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-extrabold mb-1">Unlock <span className='text-yellow-100'>Full Access</span> 🚀</h2>
                  <p className="text-orange-100 text-sm md:text-base">
                    Upgrade to Premium for unlimited downloads and exclusive notes.
                  </p>
                </div>
              </div>
              {/* NOTE: Removed direct onClick on button since onNavigate is not defined here, replaced with generic alert */}
              <button onClick={() => alert('Navigate to Premium Page')} className="flex items-center space-x-2 bg-white text-orange-600 font-bold py-3 px-6 rounded-full hover:bg-gray-100 transition duration-150 shadow-lg whitespace-nowrap w-full md:w-auto">
                <Crown className="h-5 w-5" />
                <span>Get Premium</span>
              </button>
            </div>
          </div>
        )}

        {/* Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNotes.map((note) => {
            const isAccessible = !note.isPremium || userProfile?.isPremium;
            
            return (
              <div
                key={note.id}
                // Humanized card style: Creamy background, soft border, lifted shadow on hover
                className={`bg-white rounded-[2rem] shadow-xl border border-gray-100 p-6 flex flex-col transition-all duration-300 ${
                  isAccessible 
                    ? 'hover:shadow-2xl hover:shadow-teal-100/50 hover:border-teal-200/50 hover:scale-[1.01]' 
                    : 'opacity-70 grayscale cursor-default'
                }`}
              >
                {/* Header: Icon, Type, Premium Tag */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl leading-none mr-4">{getFileIcon(note.fileType)}</div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getFileTypeColor(note.fileType)}`}>
                      {note.fileType.toUpperCase()}
                    </span>
                    {note.isPremium && (
                      <div className="flex items-center space-x-1 p-1 pr-2 bg-yellow-50 rounded-full border border-yellow-300 shadow-sm">
                        <Lock className="h-3 w-3 text-yellow-700" />
                        <span className="text-xs font-medium text-yellow-800">PREMIUM</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Title and Description */}
                <h3 className="font-serif font-extrabold text-xl text-gray-900 mb-2">{note.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{note.description}</p>

                {/* Footer: Subject and Size */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 mb-4">
                  <span className="bg-teal-100 text-teal-800 text-xs px-3 py-1 rounded-full font-semibold border border-teal-200">
                    {note.subject}
                  </span>
                  <span className="text-sm text-gray-500 font-medium">{note.fileSize}</span>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => handleDownload(note)}
                  disabled={!isAccessible}
                  className={`w-full py-3 px-4 rounded-full font-bold transition-colors flex items-center justify-center space-x-2 shadow-lg active:scale-[0.98] ${
                    isAccessible
                      ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-teal-500/40'
                      : 'bg-gray-300 text-gray-600 cursor-not-allowed shadow-none'
                  }`}
                >
                  {isAccessible ? (
                    <>
                      <Download className="h-5 w-5" />
                      <span>Download Note</span>
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

        {/* No Results */}
        {filteredNotes.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl mt-10 shadow-xl border border-gray-100">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-serif font-semibold text-gray-900 mb-2">No notes found</h3>
            <p className="text-gray-600">
              Try simplifying your search or checking other categories.
            </p>
          </div>
        )}

        {/* Statistics (Subtle and informative) */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl border border-gray-100 p-6 lg:p-10">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 border-b border-teal-200 pb-4">Almanac at a Glance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 border rounded-xl bg-teal-50 border-teal-300/50">
              <div className="text-4xl font-extrabold text-teal-700">{notes.length}</div>
              <div className="text-sm text-gray-600 mt-1 font-medium">Total Notes</div>
            </div>
            <div className="text-center p-4 border rounded-xl bg-green-50 border-green-300/50">
              <div className="text-4xl font-extrabold text-green-700">
                {notes.filter(n => !n.isPremium).length}
              </div>
              <div className="text-sm text-gray-600 mt-1 font-medium">Free Resources</div>
            </div>
            <div className="text-center p-4 border rounded-xl bg-yellow-50 border-yellow-300/50">
              <div className="text-4xl font-extrabold text-yellow-700">
                {notes.filter(n => n.isPremium).length}
              </div>
              <div className="text-sm text-gray-600 mt-1 font-medium">Exclusive Content</div>
            </div>
            <div className="text-center p-4 border rounded-xl bg-purple-50 border-purple-300/50">
              <div className="text-4xl font-extrabold text-purple-700">
                {[...new Set(notes.map(n => n.subject))].length}
              </div>
              <div className="text-sm text-gray-600 mt-1 font-medium">Disciplines Covered</div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Mobile Filter Modal (Soft slide-out panel) --- */}
      <div
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
          isFilterOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:hidden`}
      >
        {/* Backdrop */}
        {isFilterOpen && (
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsFilterOpen(false)} aria-hidden="true" />
        )}

        {/* Modal Content */}
        <div className="absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl p-6 flex flex-col rounded-l-3xl">
          {/* Header */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-6">
            <h2 className="text-2xl font-serif font-bold text-gray-900 flex items-center">
              <Filter className="h-6 w-6 mr-2 text-teal-600" /> Filter Options
            </h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
              aria-label="Close Filters"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6 flex-grow overflow-y-auto">
            {/* Subject Filter */}
            <div>
              <label htmlFor="mobile-subject" className="block text-sm font-bold text-gray-700 mb-2">
                Subject Category
              </label>
              <select
                id="mobile-subject"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full py-3 px-4 border border-gray-200 rounded-xl focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm"
              >
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject === 'all' ? 'All Subjects' : subject}
                  </option>
                ))}
              </select>
            </div>

            {/* File Type Filter */}
            <div>
              <label htmlFor="mobile-type" className="block text-sm font-bold text-gray-700 mb-2">
                Document Type
              </label>
              <select
                id="mobile-type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full py-3 px-4 border border-gray-200 rounded-xl focus:ring-teal-500 focus:border-teal-500 bg-white shadow-sm"
              >
                {fileTypes.map((type) => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Apply Button (Sticky to the bottom of the modal) */}
          <div className="pt-6 border-t border-gray-200">
            <button
              onClick={handleMobileFilterSubmit}
              className="w-full py-3 bg-teal-600 text-white font-bold rounded-full shadow-lg hover:bg-teal-700 transition duration-150"
            >
              Show Results
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default NotesPage;