import React from 'react';
import { TrendingUp, Target, Calendar, Award } from 'lucide-react';

interface StreakStatsProps {
  currentStreak: number;
  bestStreak: number;
  booksGoal: number;
  currentBooks: number;
  pagesPerDay: number;
}

export default function StreakStats({ 
  currentStreak, 
  bestStreak, 
  booksGoal, 
  currentBooks, 
  pagesPerDay 
}: StreakStatsProps) {
  const booksProgress = (currentBooks / booksGoal) * 100;
  const streakProgress = (currentStreak / bestStreak) * 100;

  const stats = [
    {
      icon: TrendingUp,
      label: 'Current Streak',
      value: currentStreak,
      unit: 'days',
      progress: streakProgress,
      color: 'bg-gradient-to-r from-blue-500 to-indigo-600'
    },
    {
      icon: Award,
      label: 'Best Streak',
      value: bestStreak,
      unit: 'days',
      progress: 100,
      color: 'bg-gradient-to-r from-yellow-500 to-orange-500'
    },
    {
      icon: Target,
      label: 'Books This Year',
      value: currentBooks,
      unit: `/ ${booksGoal}`,
      progress: booksProgress,
      color: 'bg-gradient-to-r from-green-500 to-emerald-600'
    },
    {
      icon: Calendar,
      label: 'Pages Per Day',
      value: pagesPerDay,
      unit: 'pages',
      progress: 75, // Mock progress
      color: 'bg-gradient-to-r from-purple-500 to-pink-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.unit}</div>
              </div>
            </div>
            
            <div className="mb-2">
              <div className="text-sm font-medium text-gray-700 mb-1">
                {stat.label}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-700 ease-out ${stat.color}`}
                  style={{ width: `${Math.min(stat.progress, 100)}%` }}
                />
              </div>
            </div>
            
            <div className="text-xs text-gray-500">
              {Math.round(stat.progress)}% progress
            </div>
          </div>
        );
      })}
    </div>
  );
}