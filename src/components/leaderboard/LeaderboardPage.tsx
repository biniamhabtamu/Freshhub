import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Trophy,
  Medal,
  Crown,
  TrendingUp,
  Users,
  Star,
  Filter,
  Award,
  Target,
  Clock,
  Search,
  ChevronDown,
  Sparkles,
  ArrowDown,
  ArrowUp,
  SortAsc,
  Calendar // <-- FIX: Added Calendar icon import
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { LeaderboardEntry } from '../../types'; // Assuming this points to the type defined above

// --- Types for Sorting ---
type SortField = 'averageScore' | 'totalScore' | 'improvement';
type SortOrder = 'desc' | 'asc';

// --- Helper Functions for Date/Time Simulation (for Time Range Filtering) ---

// In a real app, this would be done server-side or with real timestamps.
const isEntryInTimeRange = (entry: LeaderboardEntry, timeRange: 'all' | 'weekly' | 'monthly'): boolean => {
  if (timeRange === 'all') return true;

  const entryDate = new Date(entry.lastActive);
  // Using a fixed reference date for mock data consistency
  const now = new Date('2024-01-15'); 

  if (timeRange === 'weekly') {
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(now.getDate() - 7);
    return entryDate >= oneWeekAgo;
  }

  if (timeRange === 'monthly') {
    const oneMonthAgo = new Date(now);
    oneMonthAgo.setMonth(now.getMonth() - 1);
    return entryDate >= oneMonthAgo;
  }

  return true;
};

// --- Mock Data Enhancements for Last Active and Score Change ---

const generateMockData = (userProfile: any): LeaderboardEntry[] => {
  const baseData: LeaderboardEntry[] = [
    {
      userId: '1', name: 'Abebe Kebede', field: 'natural',
      totalScore: 2850, testsCompleted: 32, averageScore: 89.2,
      streak: 15, lastActive: '2024-01-15', improvement: 12.5,
      weeklyScore: 120, monthlyScore: 500
    },
    {
      userId: '2', name: 'Hanan Ahmed', field: 'social',
      totalScore: 2760, testsCompleted: 28, averageScore: 87.8,
      streak: 8, lastActive: '2024-01-14', improvement: 8.3,
      weeklyScore: 80, monthlyScore: 350
    },
    {
      userId: '3', name: 'Daniel Tesfaye', field: 'natural',
      totalScore: 2640, testsCompleted: 25, averageScore: 85.5,
      streak: 12, lastActive: '2024-01-15', improvement: 15.2,
      weeklyScore: 150, monthlyScore: 450
    },
    {
      userId: '4', name: 'Meron Tadesse', field: 'social',
      totalScore: 2550, testsCompleted: 22, averageScore: 84.2,
      streak: 5, lastActive: '2024-01-13', improvement: 6.7,
      weeklyScore: 50, monthlyScore: 280
    },
    {
      userId: '5', name: 'Yonas Alemayehu', field: 'natural',
      totalScore: 2460, testsCompleted: 20, averageScore: 83.1,
      streak: 18, lastActive: '2024-01-10', improvement: 20.1,
      weeklyScore: 40, monthlyScore: 150
    },
    {
      userId: '6', name: 'Sara Mohammed', field: 'social',
      totalScore: 2400, testsCompleted: 18, averageScore: 81.5,
      streak: 10, lastActive: '2024-01-15', improvement: 9.8,
      weeklyScore: 90, monthlyScore: 400
    },
    {
      userId: '7', name: 'Michael Getachew', field: 'natural',
      totalScore: 2340, testsCompleted: 16, averageScore: 79.8,
      streak: 7, lastActive: '2024-01-12', improvement: 14.3,
      weeklyScore: 60, monthlyScore: 300
    },
  ];

  if (userProfile) {
    // Add current user to leaderboard if they exist
    baseData.push({
      userId: userProfile.id,
      name: userProfile.name,
      field: userProfile.field as 'natural' | 'social', 
      totalScore: 2250,
      testsCompleted: 15,
      averageScore: 78.5,
      streak: 6,
      lastActive: '2024-01-15',
      improvement: 11.2,
      weeklyScore: 110,
      monthlyScore: 320
    });
  }
  return baseData;
};

// --- Main Component ---

const LeaderboardPage: React.FC = () => {
  const { userProfile } = useAuth();
  const [selectedField, setSelectedField] = useState<'natural' | 'social' | 'all'>('all');
  const [timeRange, setTimeRange] = useState<'all' | 'weekly' | 'monthly'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortField>('averageScore');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Toggle sort direction or change field
  const handleSortChange = (field: SortField) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc'); // Default to descending for new sort field
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortBy !== field) return <SortAsc className="h-4 w-4 text-gray-400" />;
    return sortOrder === 'asc' 
      ? <ArrowUp className="h-4 w-4 text-blue-600" /> 
      : <ArrowDown className="h-4 w-4 text-blue-600" />;
  };


  // --- Data Fetching, Filtering, and Sorting Logic (Enhanced useEffect) ---
  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      const mockData = generateMockData(userProfile);
      
      const storedData = localStorage.getItem('leaderboard');
      const realData: LeaderboardEntry[] = storedData ? JSON.parse(storedData) : mockData;

      let filteredData = realData.filter(entry => {
        // 1. Field Filter
        const fieldMatch = selectedField === 'all' || entry.field === selectedField;
        
        // 2. Search Filter
        const searchMatch = !searchQuery || entry.name.toLowerCase().includes(searchQuery.toLowerCase());
        
        // 3. Time Range Filter (simulated)
        const timeMatch = isEntryInTimeRange(entry, timeRange);

        return fieldMatch && searchMatch && timeMatch;
      });

      // 4. Sorting Logic
      const sortedData = filteredData.sort((a, b) => {
        let comparison = 0;
        
        // Determine the value to sort by
        const getSortValue = (entry: LeaderboardEntry) => {
            switch (sortBy) {
                case 'totalScore': return entry.totalScore;
                case 'improvement': return entry.improvement;
                default: return entry.averageScore; // Default is averageScore
            }
        };

        const valA = getSortValue(a);
        const valB = getSortValue(b);

        if (valA > valB) {
          comparison = 1;
        } else if (valA < valB) {
          comparison = -1;
        }

        return sortOrder === 'desc' ? comparison * -1 : comparison;
      });

      setLeaderboard(sortedData);
      setIsLoading(false);
    };

    fetchData();
  }, [selectedField, timeRange, searchQuery, userProfile, sortBy, sortOrder]);

  // Memoized calculations
  const totalStudents = leaderboard.length;
  const averageLeaderboardScore = useMemo(() => {
    if (totalStudents === 0) return 0;
    return (leaderboard.reduce((acc, entry) => acc + entry.averageScore, 0) / totalStudents).toFixed(1);
  }, [leaderboard, totalStudents]);

  const topScore = leaderboard[0]?.averageScore.toFixed(1) || 0;
  
  const currentUserEntry = leaderboard.find(entry => entry.userId === userProfile?.id);
  const currentUserRank = currentUserEntry ? leaderboard.findIndex(entry => entry.userId === userProfile?.id) + 1 : 0;
  const currentUserImprovement = currentUserEntry?.improvement || 0;


  // --- Shared UI Logic (Rank Icons) ---
  const getRankIcon = useCallback((rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-orange-500" />;
      default:
        return <span className="text-sm font-bold text-gray-600">#{rank}</span>;
    }
  }, []);

  const getRankColor = useCallback((rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-orange-500';
      case 2:
        return 'from-gray-300 to-gray-400';
      case 3:
        return 'from-orange-400 to-red-500';
      default:
        return 'from-blue-500 to-purple-600';
    }
  }, []);

  // --- Mobile-friendly table row component (LeaderboardCard) ---
  const LeaderboardCard = ({ entry, rank }: { entry: LeaderboardEntry; rank: number }) => {
    const isCurrentUser = entry.userId === userProfile?.id;

    return (
      <div className={`bg-white rounded-xl p-4 shadow-md border ${
        isCurrentUser ? 'border-blue-500 bg-blue-50 shadow-lg scale-[1.01]' : 'border-gray-200'
      } transition-all mb-3`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r ${getRankColor(rank)}`}>
              {getRankIcon(rank)}
            </div>
            <div>
              <div className={`font-semibold ${isCurrentUser ? 'text-blue-900' : 'text-gray-900'}`}>
                {entry.name}
                {isCurrentUser && <span className="text-blue-600 ml-1 text-sm font-normal">(You)</span>}
              </div>
              <div className="text-xs text-gray-500 capitalize">{entry.field} Sciences</div>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-lg font-bold ${
              entry.averageScore >= 90 ? 'text-green-600' :
              entry.averageScore >= 80 ? 'text-blue-600' :
              entry.averageScore >= 70 ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {entry.averageScore.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-500">Avg Score</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center border-t border-gray-100 pt-3">
          {/* Tests Completed */}
          <div>
            <div className="flex items-center justify-center space-x-1 text-gray-700">
              <TrendingUp className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">{entry.testsCompleted}</span>
            </div>
            <div className="text-xs text-gray-500">Tests</div>
          </div>
          {/* Total Points */}
          <div>
            <div className="flex items-center justify-center space-x-1 text-gray-700">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">{entry.totalScore}</span>
            </div>
            <div className="text-xs text-gray-500">Points</div>
          </div>
          {/* Improvement */}
          <div>
            <div className="flex items-center justify-center space-x-1 text-gray-700">
              <Target className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-green-600">+{entry.improvement}%</span>
            </div>
            <div className="text-xs text-gray-500">Growth</div>
          </div>
        </div>
      </div>
    );
  };

  // --- Loading State UI ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="w-32 h-8 bg-gray-300 rounded-lg mx-auto mb-4"></div>
            <div className="w-48 h-6 bg-gray-300 rounded-lg mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-gray-200 rounded-xl h-24"></div>
              ))}
            </div>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="bg-gray-200 rounded-xl h-20 mb-4"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- Main Render ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Trophy className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Global Leaderboard</h1>
          <p className="text-lg lg:text-xl text-gray-600">See how you rank among your peers in **{selectedField === 'all' ? 'All Fields' : `${selectedField} Sciences`}**</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search students by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
              />
            </div>

            {/* Filter Toggle for Mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center space-x-2 px-4 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors justify-center font-medium"
            >
              <Filter className="h-5 w-5" />
              <span>Filter & Sort</span>
              <ChevronDown className={`h-5 w-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* Filters (Field & Time Range) */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:flex lg:items-center space-y-4 lg:space-y-0 lg:space-x-4`}>
              
              {/* Field Filter */}
              <div className="flex flex-wrap gap-2 lg:gap-3">
                {[
                  { id: 'all', label: 'All Fields' },
                  { id: 'natural', label: 'Natural Sciences' },
                  { id: 'social', label: 'Social Sciences' }
                ].map((field) => (
                  <button
                    key={field.id}
                    onClick={() => setSelectedField(field.id as any)}
                    className={`px-4 py-2 rounded-xl font-medium text-sm transition-all shadow-sm ${
                      selectedField === field.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {field.label}
                  </button>
                ))}
              </div>
              
              {/* Time Range Filter (New Feature) */}
              <div className="flex flex-wrap gap-2 lg:gap-3 items-center">
                <span className="text-sm font-medium text-gray-600 hidden lg:block">Time:</span>
                {[
                  { id: 'all', label: 'All Time', icon: <Clock className="h-4 w-4" /> },
                  { id: 'monthly', label: 'Monthly', icon: <Calendar className="h-4 w-4" /> },
                  { id: 'weekly', label: 'Weekly', icon: <Calendar className="h-4 w-4" /> }
                ].map((range) => (
                  <button
                    key={range.id}
                    onClick={() => setTimeRange(range.id as any)}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-xl font-medium text-sm transition-all shadow-sm ${
                      timeRange === range.id
                        ? 'bg-orange-500 text-white hover:bg-orange-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {range.icon}
                    <span>{range.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* User's Rank Card */}
        {currentUserRank > 0 && (
          <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-2xl p-6 mb-6 shadow-xl border-4 border-white/50">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-extrabold mb-1 flex items-center">
                  <Star className="h-6 w-6 mr-2 text-yellow-300" />
                  Your Current Ranking
                </h2>
                <p className="text-blue-100 opacity-90 text-sm">You are currently ranked **#{currentUserRank}** globally. </p>
                <div className="flex items-center space-x-4 mt-3">
                  <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                    <Target className="h-4 w-4" />
                    <span className="text-sm font-semibold">#{currentUserRank} Position</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-semibold text-green-300">+{currentUserImprovement}% Growth</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-1 border-b-2 border-white/50 pb-1">#{currentUserRank}</div>
                <div className="text-blue-100 text-sm">Out of {totalStudents}</div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Total Students */}
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-xl lg:text-2xl font-bold text-gray-900">{totalStudents}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Avg Score */}
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Leaderboard Avg</p>
                <p className="text-xl lg:text-2xl font-bold text-gray-900">
                  {averageLeaderboardScore}%
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>

          {/* Top Score */}
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Top Score</p>
                <p className="text-xl lg:text-2xl font-bold text-gray-900">
                  {topScore}%
                </p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Trophy className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Active Today */}
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Students</p>
                <p className="text-xl lg:text-2xl font-bold text-gray-900">
                  {leaderboard.filter(entry => entry.lastActive === '2024-01-15').length}
                </p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Sparkles className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Top 3 Podium - Desktop Only (Remains the same as original) */}
        {leaderboard.length >= 3 && (
            <div className="hidden lg:block bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-8 flex items-center justify-center">
                <Award className="h-6 w-6 text-yellow-500 mr-2" />
                Top Performers
              </h2>
              <div className="flex items-end justify-center space-x-8">
                {/* 2nd Place */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Medal className="h-8 w-8 text-white" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4 min-w-[150px] border-2 border-gray-300 -translate-y-4">
                    <div className="text-lg font-bold text-gray-900">{leaderboard[1]?.name}</div>
                    <div className="text-sm text-gray-600 capitalize">{leaderboard[1]?.field}</div>
                    <div className="text-xl font-bold text-gray-700 mt-2">{leaderboard[1]?.averageScore.toFixed(1)}%</div>
                  </div>
                  <span className="text-2xl font-extrabold text-gray-600">#2</span>
                </div>

                {/* 1st Place */}
                <div className="text-center transform -translate-y-4">
                  <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl border-4 border-yellow-200">
                    <Crown className="h-10 w-10 text-white" />
                  </div>
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-lg p-4 min-w-[150px] shadow-2xl">
                    <div className="text-lg font-bold text-gray-900">{leaderboard[0]?.name}</div>
                    <div className="text-sm text-gray-600 capitalize">{leaderboard[0]?.field}</div>
                    <div className="text-xl font-bold text-yellow-700 mt-2">{leaderboard[0]?.averageScore.toFixed(1)}%</div>
                  </div>
                  <span className="text-3xl font-extrabold text-yellow-600">#1</span>
                </div>

                {/* 3rd Place */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Medal className="h-8 w-8 text-white" />
                  </div>
                  <div className="bg-orange-100 rounded-lg p-4 min-w-[150px] border-2 border-orange-300 -translate-y-4">
                    <div className="text-lg font-bold text-gray-900">{leaderboard[2]?.name}</div>
                    <div className="text-sm text-gray-600 capitalize">{leaderboard[2]?.field}</div>
                    <div className="text-xl font-bold text-orange-700 mt-2">{leaderboard[2]?.averageScore.toFixed(1)}%</div>
                  </div>
                  <span className="text-2xl font-extrabold text-orange-600">#3</span>
                </div>
              </div>
            </div>
          )}


        {/* Leaderboard Title */}
        <div className="flex items-center justify-between mb-4 mt-6">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Full Rankings</h2>
          <div className="text-sm text-gray-600">
            Showing **{leaderboard.length}** students
          </div>
        </div>

        {/* Mobile Leaderboard Cards */}
        <div className="lg:hidden space-y-3">
          {leaderboard.map((entry, index) => (
            <LeaderboardCard key={entry.userId} entry={entry} rank={index + 1} />
          ))}
        </div>

        {/* Desktop Leaderboard Table (Enhanced with Sorting) */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {/* Rank */}
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-[100px]">Rank</th>
                  {/* Student */}
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">Student</th>
                  {/* Field */}
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Field</th>
                  {/* Tests */}
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Tests</th>
                  
                  {/* Avg Score (Sortable) */}
                  <th 
                    className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSortChange('averageScore')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Avg Score</span>
                      {getSortIcon('averageScore')}
                    </div>
                  </th>

                  {/* Points (Sortable) */}
                  <th 
                    className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSortChange('totalScore')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Points</span>
                      {getSortIcon('totalScore')}
                    </div>
                  </th>
                  
                  {/* Improvement (Sortable) */}
                  <th 
                    className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSortChange('improvement')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Improvement</span>
                      {getSortIcon('improvement')}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leaderboard.map((entry, index) => {
                  const rank = index + 1;
                  const isCurrentUser = entry.userId === userProfile?.id;
                  
                  return (
                    <tr 
                      key={entry.userId} 
                      className={`transition-all ${
                        isCurrentUser ? 'bg-blue-50 hover:bg-blue-100 border-l-4 border-blue-500 font-semibold' : 'hover:bg-gray-50'
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getRankIcon(rank)}
                          {entry.streak > 5 && (
                            <div className="flex items-center space-x-1 bg-orange-100 px-2 py-1 rounded-full shadow-sm">
                              <Sparkles className="h-3 w-3 text-orange-600" />
                              <span className="text-xs font-bold text-orange-700">{entry.streak}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-gradient-to-r ${getRankColor(rank)}`}>
                            <span className="text-white font-medium text-sm">
                              {entry.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className={`text-sm font-medium ${isCurrentUser ? 'text-blue-900' : 'text-gray-900'}`}>
                              {entry.name}
                              {isCurrentUser && <span className="text-blue-600 ml-2 font-normal">(You)</span>}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>Active {entry.lastActive}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="capitalize text-xs text-gray-700 bg-gray-100 px-3 py-1 rounded-full shadow-sm border border-gray-200">
                          {entry.field}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="h-4 w-4 text-purple-500" />
                          <span className="text-sm font-medium text-gray-700">{entry.testsCompleted}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-lg font-bold ${
                          entry.averageScore >= 90 ? 'text-green-600' :
                          entry.averageScore >= 80 ? 'text-blue-600' :
                          entry.averageScore >= 70 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {entry.averageScore.toFixed(1)}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium text-gray-900">{entry.totalScore.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Target className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium text-green-600">+{entry.improvement}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {leaderboard.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-200 mt-6">
            <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Results Found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search query, field filter, or time range.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedField('all');
                setTimeRange('all');
                setSortBy('averageScore');
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-md"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;