import React, { useState } from 'react';
import { Download, FileText, Lock, Search, Filter, X, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Note } from '../../types';

// Assuming Note type and useAuth are correctly imported/defined

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

  // Enhanced icons for a more visual appeal
  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return '📑'; // Larger and clearer visual
      case 'ppt':
        return '📈';
      case 'doc':
        return '✍️';
      default:
        return '📄';
    }
  };

  // Cleaner, more contrasting colors
  const getFileTypeColor = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return 'bg-rose-50 text-rose-600 ring-rose-200';
      case 'ppt':
        return 'bg-amber-50 text-amber-600 ring-amber-200';
      case 'doc':
        return 'bg-sky-50 text-sky-600 ring-sky-200';
      default:
        return 'bg-gray-50 text-gray-600 ring-gray-200';
    }
  };

  const handleMobileFilterSubmit = () => {
    setIsFilterOpen(false);
  };


  return (
    // Updated background for a subtle gradient effect
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100/50 pt-4 pb-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <header className="text-center mb-10 lg:mb-16">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
            <FileText className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2 tracking-tight">
            Knowledge Hub <span className="text-blue-600">Notes</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Find, filter, and download high-quality study materials across all your subjects.
          </p>
        </header>

        {/* Search Bar - Sticky on Mobile with a modern floating appearance */}
        <div className="sticky top-0 z-20 py-3 lg:py-0 lg:static mb-8">
          <div className="bg-white rounded-xl shadow-2xl shadow-blue-200/50 border border-gray-100 p-4 lg:p-0 lg:shadow-none lg:border-none">
            <div className="flex items-center space-x-3">
              {/* Search Input */}
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for notes (e.g., Logic, Grammar, features...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-50 focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 transition duration-200 text-base"
                />
              </div>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden p-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition duration-150 active:scale-95"
                aria-label="Open Filters"
              >
                <Filter className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Filters (Always visible, clean card style) */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-4 gap-4 bg-white rounded-2xl shadow-xl border border-blue-100 p-6 mb-10">
          <h2 className="md:col-span-1 text-xl font-bold text-gray-800 flex items-center">
            <Filter className="h-6 w-6 mr-3 text-blue-600" />
            Quick Filters
          </h2>
          {/* Subject Filter */}
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full py-3 px-4 border border-blue-300 rounded-xl focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 bg-white shadow-sm appearance-none cursor-pointer text-gray-700"
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
            className="w-full py-3 px-4 border border-blue-300 rounded-xl focus:ring-4 focus:ring-blue-500/50 focus:border-blue-500 bg-white shadow-sm appearance-none cursor-pointer text-gray-700"
          >
            {fileTypes.map((type) => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type.toUpperCase()}
              </option>
            ))}
          </select>
          <div className="hidden md:block"></div> {/* Spacer */}
        </div>


        {/* Premium Notice (More prominent and action-oriented) */}
        {!userProfile?.isPremium && (
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-3xl p-6 lg:p-8 mb-10 shadow-2xl shadow-purple-300/50 transform hover:scale-[1.01] transition duration-300 ease-in-out">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <Zap className="h-8 w-8 text-yellow-300 mr-4 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-extrabold mb-1">Go Premium, Get Ahead!</h2>
                  <p className="text-indigo-100 text-sm md:text-base">
                    Unlock all premium resources and study with zero limits.
                  </p>
                </div>
              </div>
              <button className="flex items-center space-x-2 bg-yellow-400 text-gray-900 font-bold py-3 px-6 rounded-full hover:bg-yellow-300 transition duration-150 shadow-lg whitespace-nowrap w-full md:w-auto">
                <Lock className="h-5 w-5" />
                <span>Activate Premium</span>
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
                // Updated card style: subtle glassmorphism effect, sharper corners, and vibrant hover
                className={`bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 p-6 flex flex-col transition-all duration-300 ${
                  isAccessible 
                    ? 'hover:shadow-2xl hover:border-blue-300/70 hover:scale-[1.02]' 
                    : 'opacity-70 grayscale cursor-default'
                }`}
              >
                {/* Header: Icon, Type, Premium Tag */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl leading-none mr-4">{getFileIcon(note.fileType)}</div>
                  <div className="flex flex-col items-end space-y-1">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ring-1 ${getFileTypeColor(note.fileType)}`}>
                      {note.fileType.toUpperCase()}
                    </span>
                    {note.isPremium && (
                      <div className="flex items-center space-x-1 p-1 pr-2 bg-yellow-100 rounded-full border border-yellow-300">
                        <Lock className="h-3 w-3 text-yellow-700" />
                        <span className="text-xs font-medium text-yellow-800">PREMIUM</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Title and Description */}
                <h3 className="font-extrabold text-xl text-gray-900 mb-2">{note.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{note.description}</p>

                {/* Footer: Subject and Size */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium border border-blue-200 shadow-inner">
                    {note.subject}
                  </span>
                  <span className="text-sm text-gray-500 font-semibold">{note.fileSize}</span>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => handleDownload(note)}
                  disabled={!isAccessible}
                  className={`w-full py-3 px-4 rounded-xl font-bold transition-colors flex items-center justify-center space-x-2 shadow-lg active:scale-[0.99] ${
                    isAccessible
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/50'
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
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No notes found</h3>
            <p className="text-gray-600">
              Try simplifying your search or checking other categories.
            </p>
          </div>
        )}

        {/* Statistics */}
        <div className="mt-16 bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 lg:p-10">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6 border-b border-blue-200 pb-4">Study Metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 border rounded-xl bg-blue-50 border-blue-300/50">
              <div className="text-4xl font-extrabold text-blue-600">{notes.length}</div>
              <div className="text-sm text-gray-600 mt-1 font-medium">Total Notes</div>
            </div>
            <div className="text-center p-4 border rounded-xl bg-green-50 border-green-300/50">
              <div className="text-4xl font-extrabold text-green-600">
                {notes.filter(n => !n.isPremium).length}
              </div>
              <div className="text-sm text-gray-600 mt-1 font-medium">Free Notes</div>
            </div>
            <div className="text-center p-4 border rounded-xl bg-yellow-50 border-yellow-300/50">
              <div className="text-4xl font-extrabold text-yellow-600">
                {notes.filter(n => n.isPremium).length}
              </div>
              <div className="text-sm text-gray-600 mt-1 font-medium">Premium Notes</div>
            </div>
            <div className="text-center p-4 border rounded-xl bg-purple-50 border-purple-300/50">
              <div className="text-4xl font-extrabold text-purple-600">
                {[...new Set(notes.map(n => n.subject))].length}
              </div>
              <div className="text-sm text-gray-600 mt-1 font-medium">Subjects Covered</div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Mobile Filter Modal (Highly visible, right-slide panel) --- */}
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
        <div className="absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl p-6 flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <Filter className="h-6 w-6 mr-2 text-blue-600" /> Filter Options
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
                className="w-full py-3 px-4 border border-blue-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
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
                className="w-full py-3 px-4 border border-blue-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
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
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition duration-150"
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