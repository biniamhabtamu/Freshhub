import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Crown, TrendingUp, Users, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { LeaderboardEntry } from '../../types';

const LeaderboardPage: React.FC = () => {
  const { userProfile } = useAuth();
  const [selectedField, setSelectedField] = useState<'natural' | 'social' | 'all'>('all');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    // Generate mock leaderboard data - in a real app, this would come from Firebase
    const mockData: LeaderboardEntry[] = [
      {
        userId: '1',
        name: 'Abebe Kebede',
        field: 'natural',
        totalScore: 95,
        testsCompleted: 12,
        averageScore: 89.2
      },
      {
        userId: '2',
        name: 'Hanan Ahmed',
        field: 'social',
        totalScore: 92,
        testsCompleted: 10,
        averageScore: 87.8
      },
      {
        userId: '3',
        name: 'Daniel Tesfaye',
        field: 'natural',
        totalScore: 88,
        testsCompleted: 8,
        averageScore: 85.5
      },
      {
        userId: '4',
        name: 'Meron Tadesse',
        field: 'social',
        totalScore: 85,
        testsCompleted: 9,
        averageScore: 84.2
      },
      {
        userId: '5',
        name: 'Yonas Alemayehu',
        field: 'natural',
        totalScore: 82,
        testsCompleted: 7,
        averageScore: 83.1
      },
      // Add current user to leaderboard if they have taken tests
      ...(userProfile ? [{
        userId: userProfile.id,
        name: userProfile.name,
        field: userProfile.field,
        totalScore: 75,
        testsCompleted: 5,
        averageScore: 78.5
      }] : [])
    ];

    // Load real data from localStorage
    const storedData = localStorage.getItem('leaderboard');
    const realData = storedData ? JSON.parse(storedData) : mockData;
    
    // Filter and sort
    const filteredData = selectedField === 'all' 
      ? realData 
      : realData.filter((entry: LeaderboardEntry) => entry.field === selectedField);
    
    const sortedData = filteredData.sort((a: LeaderboardEntry, b: LeaderboardEntry) => b.averageScore - a.averageScore);
    
    setLeaderboard(sortedData);
  }, [selectedField, userProfile]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-orange-500" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-400';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-red-500';
      default:
        return 'bg-white';
    }
  };

  const currentUserRank = leaderboard.findIndex(entry => entry.userId === userProfile?.id) + 1;

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Leaderboard</h1>
          <p className="text-xl text-gray-600">See how you rank among your peers</p>
        </div>

        {/* Field Filter */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => setSelectedField('all')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedField === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Fields
            </button>
            <button
              onClick={() => setSelectedField('natural')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedField === 'natural'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Natural Sciences
            </button>
            <button
              onClick={() => setSelectedField('social')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                selectedField === 'social'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Social Sciences
            </button>
          </div>
        </div>

        {/* User's Rank */}
        {currentUserRank > 0 && (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-1">Your Ranking</h2>
                <p className="text-blue-100">Keep improving to climb higher!</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">#{currentUserRank}</div>
                <div className="text-sm text-blue-100">Current Rank</div>
              </div>
            </div>
          </div>
        )}

        {/* Top 3 Podium */}
        {leaderboard.length >= 3 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Top Performers</h2>
            <div className="flex items-end justify-center space-x-8">
              {/* 2nd Place */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Medal className="h-10 w-10 text-white" />
                </div>
                <div className="bg-gray-100 rounded-lg p-4 min-w-[150px]">
                  <div className="text-lg font-bold text-gray-900">{leaderboard[1]?.name}</div>
                  <div className="text-sm text-gray-600 capitalize">{leaderboard[1]?.field}</div>
                  <div className="text-xl font-bold text-gray-700 mt-2">{leaderboard[1]?.averageScore.toFixed(1)}%</div>
                </div>
              </div>

              {/* 1st Place */}
              <div className="text-center transform -translate-y-4">
                <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="h-12 w-12 text-white" />
                </div>
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-lg p-4 min-w-[150px]">
                  <div className="text-lg font-bold text-gray-900">{leaderboard[0]?.name}</div>
                  <div className="text-sm text-gray-600 capitalize">{leaderboard[0]?.field}</div>
                  <div className="text-xl font-bold text-yellow-700 mt-2">{leaderboard[0]?.averageScore.toFixed(1)}%</div>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Medal className="h-10 w-10 text-white" />
                </div>
                <div className="bg-orange-100 rounded-lg p-4 min-w-[150px]">
                  <div className="text-lg font-bold text-gray-900">{leaderboard[2]?.name}</div>
                  <div className="text-sm text-gray-600 capitalize">{leaderboard[2]?.field}</div>
                  <div className="text-xl font-bold text-orange-700 mt-2">{leaderboard[2]?.averageScore.toFixed(1)}%</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full Leaderboard */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Rankings</h2>
            <p className="text-gray-600">Complete leaderboard for {selectedField === 'all' ? 'all fields' : `${selectedField} sciences`}</p>
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
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Total Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leaderboard.map((entry, index) => {
                  const rank = index + 1;
                  const isCurrentUser = entry.userId === userProfile?.id;
                  
                  return (
                    <tr 
                      key={entry.userId} 
                      className={`hover:bg-gray-50 ${isCurrentUser ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getRankIcon(rank)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                            <span className="text-white font-medium text-sm">
                              {entry.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className={`text-sm font-medium ${isCurrentUser ? 'text-blue-900' : 'text-gray-900'}`}>
                              {entry.name}
                              {isCurrentUser && <span className="text-blue-600 ml-2">(You)</span>}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="capitalize text-sm text-gray-700">{entry.field} Sciences</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{entry.testsCompleted}</span>
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
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium text-gray-900">{entry.totalScore}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{leaderboard.length}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {leaderboard.length > 0 
                    ? (leaderboard.reduce((acc, entry) => acc + entry.averageScore, 0) / leaderboard.length).toFixed(1)
                    : 0
                  }%
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Top Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {leaderboard.length > 0 ? leaderboard[0].averageScore.toFixed(1) : 0}%
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <Trophy className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;