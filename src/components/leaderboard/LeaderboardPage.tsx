import React, { useState, useEffect } from 'react';
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
  Calendar,
  Clock,
  Search,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { LeaderboardEntry } from '../../types';

const LeaderboardPage: React.FC = () => {
  const { userProfile } = useAuth();
  const [selectedField, setSelectedField] = useState<'natural' | 'social' | 'all'>('all');
  const [timeRange, setTimeRange] = useState<'all' | 'weekly' | 'monthly'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setIsLoading(true);
    
    // Generate enhanced mock leaderboard data
    const mockData: LeaderboardEntry[] = [
      {
        userId: '1',
        name: 'Abebe Kebede',
        field: 'natural',
        totalScore: 2850,
        testsCompleted: 32,
        averageScore: 89.2,
        streak: 15,
        lastActive: '2024-01-15',
        improvement: 12.5
      },
      {
        userId: '2',
        name: 'Hanan Ahmed',
        field: 'social',
        totalScore: 2760,
        testsCompleted: 28,
        averageScore: 87.8,
        streak: 8,
        lastActive: '2024-01-15',
        improvement: 8.3
      },
      {
        userId: '3',
        name: 'Daniel Tesfaye',
        field: 'natural',
        totalScore: 2640,
        testsCompleted: 25,
        averageScore: 85.5,
        streak: 12,
        lastActive: '2024-01-14',
        improvement: 15.2
      },
      {
        userId: '4',
        name: 'Meron Tadesse',
        field: 'social',
        totalScore: 2550,
        testsCompleted: 22,
        averageScore: 84.2,
        streak: 5,
        lastActive: '2024-01-15',
        improvement: 6.7
      },
      {
        userId: '5',
        name: 'Yonas Alemayehu',
        field: 'natural',
        totalScore: 2460,
        testsCompleted: 20,
        averageScore: 83.1,
        streak: 18,
        lastActive: '2024-01-13',
        improvement: 20.1
      },
      {
        userId: '6',
        name: 'Sara Mohammed',
        field: 'social',
        totalScore: 2400,
        testsCompleted: 18,
        averageScore: 81.5,
        streak: 10,
        lastActive: '2024-01-14',
        improvement: 9.8
      },
      {
        userId: '7',
        name: 'Michael Getachew',
        field: 'natural',
        totalScore: 2340,
        testsCompleted: 16,
        averageScore: 79.8,
        streak: 7,
        lastActive: '2024-01-15',
        improvement: 14.3
      },
      // Add current user to leaderboard if they have taken tests
      ...(userProfile ? [{
        userId: userProfile.id,
        name: userProfile.name,
        field: userProfile.field,
        totalScore: 2250,
        testsCompleted: 15,
        averageScore: 78.5,
        streak: 6,
        lastActive: '2024-01-15',
        improvement: 11.2
      }] : [])
    ];

    setTimeout(() => {
      // Load real data from localStorage
      const storedData = localStorage.getItem('leaderboard');
      const realData = storedData ? JSON.parse(storedData) : mockData;
      
      // Filter and sort
      let filteredData = selectedField === 'all' 
        ? realData 
        : realData.filter((entry: LeaderboardEntry) => entry.field === selectedField);
      
      // Apply search filter
      if (searchQuery) {
        filteredData = filteredData.filter((entry: LeaderboardEntry) =>
          entry.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      const sortedData = filteredData.sort((a: LeaderboardEntry, b: LeaderboardEntry) => b.averageScore - a.averageScore);
      
      setLeaderboard(sortedData);
      setIsLoading(false);
    }, 1000);
  }, [selectedField, searchQuery, userProfile]);

  const getRankIcon = (rank: number) => {
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
  };

  const getRankColor = (rank: number) => {
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
  };

  const currentUserRank = leaderboard.findIndex(entry => entry.userId === userProfile?.id) + 1;

  // Mobile-friendly table row component
  const LeaderboardCard = ({ entry, rank }: { entry: LeaderboardEntry; rank: number }) => {
    const isCurrentUser = entry.userId === userProfile?.id;
    
    return (
      <div className={`bg-white rounded-xl p-4 shadow-sm border ${
        isCurrentUser ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
      } mb-3`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r ${getRankColor(rank)}`}>
              {getRankIcon(rank)}
            </div>
            <div>
              <div className={`font-semibold ${isCurrentUser ? 'text-blue-900' : 'text-gray-900'}`}>
                {entry.name}
                {isCurrentUser && <span className="text-blue-600 ml-1 text-sm">(You)</span>}
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
        
        <div className="grid grid-cols-3 gap-2 text-center border-t pt-3">
          <div>
            <div className="flex items-center justify-center space-x-1">
              <TrendingUp className="h-3 w-3 text-gray-400" />
              <span className="text-sm font-medium">{entry.testsCompleted}</span>
            </div>
            <div className="text-xs text-gray-500">Tests</div>
          </div>
          <div>
            <div className="flex items-center justify-center space-x-1">
              <Star className="h-3 w-3 text-yellow-500" />
              <span className="text-sm font-medium">{entry.totalScore}</span>
            </div>
            <div className="text-xs text-gray-500">Points</div>
          </div>
          <div>
            <div className="flex items-center justify-center space-x-1">
              <Target className="h-3 w-3 text-green-500" />
              <span className="text-sm font-medium text-green-600">+{entry.improvement}%</span>
            </div>
            <div className="text-xs text-gray-500">Growth</div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="w-32 h-8 bg-gray-300 rounded-lg mx-auto mb-4"></div>
            <div className="w-48 h-6 bg-gray-300 rounded-lg mx-auto mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-gray-200 rounded-xl h-32"></div>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Trophy className="h-8 w-8 lg:h-10 lg:w-10 text-white" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Leaderboard</h1>
          <p className="text-lg lg:text-xl text-gray-600">See how you rank among your peers</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 lg:p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Filter Toggle for Mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center space-x-2 px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* Filters */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:flex lg:items-center space-y-4 lg:space-y-0 lg:space-x-4`}>
              {/* Field Filter */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Fields' },
                  { id: 'natural', label: 'Natural' },
                  { id: 'social', label: 'Social' }
                ].map((field) => (
                  <button
                    key={field.id}
                    onClick={() => setSelectedField(field.id as any)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      selectedField === field.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {field.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* User's Rank Card */}
        {currentUserRank > 0 && (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-6 mb-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-2">Your Current Rank</h2>
                <p className="text-blue-100 opacity-90">Keep learning to climb higher in the rankings!</p>
                <div className="flex items-center space-x-4 mt-3">
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4" />
                    <span className="text-sm">#{currentUserRank} Position</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm">+11.2% Improvement</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">#{currentUserRank}</div>
                <div className="text-blue-100 text-sm">Out of {leaderboard.length}</div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-xl lg:text-2xl font-bold text-gray-900">{leaderboard.length}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Score</p>
                <p className="text-xl lg:text-2xl font-bold text-gray-900">
                  {leaderboard.length > 0 
                    ? (leaderboard.reduce((acc, entry) => acc + entry.averageScore, 0) / leaderboard.length).toFixed(1)
                    : 0
                  }%
                </p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Top Score</p>
                <p className="text-xl lg:text-2xl font-bold text-gray-900">
                  {leaderboard.length > 0 ? leaderboard[0]?.averageScore.toFixed(1) : 0}%
                </p>
              </div>
              <div className="p-2 bg-yellow-50 rounded-lg">
                <Trophy className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Today</p>
                <p className="text-xl lg:text-2xl font-bold text-gray-900">
                  {leaderboard.filter(entry => entry.lastActive === '2024-01-15').length}
                </p>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <Sparkles className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Top 3 Podium - Desktop Only */}
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
                <div className="bg-gray-100 rounded-lg p-4 min-w-[150px] border-2 border-gray-300">
                  <div className="text-lg font-bold text-gray-900">{leaderboard[1]?.name}</div>
                  <div className="text-sm text-gray-600 capitalize">{leaderboard[1]?.field}</div>
                  <div className="text-xl font-bold text-gray-700 mt-2">{leaderboard[1]?.averageScore.toFixed(1)}%</div>
                </div>
              </div>

              {/* 1st Place */}
              <div className="text-center transform -translate-y-4">
                <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Crown className="h-10 w-10 text-white" />
                </div>
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-lg p-4 min-w-[150px] shadow-lg">
                  <div className="text-lg font-bold text-gray-900">{leaderboard[0]?.name}</div>
                  <div className="text-sm text-gray-600 capitalize">{leaderboard[0]?.field}</div>
                  <div className="text-xl font-bold text-yellow-700 mt-2">{leaderboard[0]?.averageScore.toFixed(1)}%</div>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Medal className="h-8 w-8 text-white" />
                </div>
                <div className="bg-orange-100 rounded-lg p-4 min-w-[150px] border-2 border-orange-300">
                  <div className="text-lg font-bold text-gray-900">{leaderboard[2]?.name}</div>
                  <div className="text-sm text-gray-600 capitalize">{leaderboard[2]?.field}</div>
                  <div className="text-xl font-bold text-orange-700 mt-2">{leaderboard[2]?.averageScore.toFixed(1)}%</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Title */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Rankings</h2>
          <div className="text-sm text-gray-600">
            Showing {leaderboard.length} students
          </div>
        </div>

        {/* Mobile Leaderboard Cards */}
        <div className="lg:hidden space-y-3">
          {leaderboard.map((entry, index) => (
            <LeaderboardCard key={entry.userId} entry={entry} rank={index + 1} />
          ))}
        </div>

        {/* Desktop Leaderboard Table */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <h2 className="text-2xl font-bold text-gray-900">Full Leaderboard</h2>
            <p className="text-gray-600">Complete rankings for {selectedField === 'all' ? 'all fields' : `${selectedField} sciences`}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Field</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Tests</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Avg Score</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Points</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Improvement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leaderboard.map((entry, index) => {
                  const rank = index + 1;
                  const isCurrentUser = entry.userId === userProfile?.id;
                  
                  return (
                    <tr 
                      key={entry.userId} 
                      className={`hover:bg-gray-50 transition-colors ${
                        isCurrentUser ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getRankIcon(rank)}
                          {entry.streak > 5 && (
                            <div className="flex items-center space-x-1 bg-orange-100 px-2 py-1 rounded-full">
                              <Sparkles className="h-3 w-3 text-orange-600" />
                              <span className="text-xs font-medium text-orange-700">{entry.streak}</span>
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
                              {isCurrentUser && <span className="text-blue-600 ml-2">(You)</span>}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>Active {entry.lastActive}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="capitalize text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                          {entry.field}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="h-4 w-4 text-gray-400" />
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
          <div className="text-center py-12">
            <Trophy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Results Found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedField('all');
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;