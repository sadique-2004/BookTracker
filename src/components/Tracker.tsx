import React, { useState, useEffect } from 'react';
import { BookOpen, Flame, Star } from 'lucide-react';
import StreakBadge3D from './TrackerComponents/StreakBadge3d';
import StreakStats from './TrackerComponents/StreakStats';
import StreakChart from './TrackerComponents/StreakChart';
import { mockUser } from '../utils/mockData';

const Tracker: React.FC = () => {
{
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <div className={`min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="container mx-auto px-4 py-8">
        
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 mb-8 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5" />
          <div className="relative z-10">
            
        
            {/* Streak comparison */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 mr-2" />
                  <span className="text-gray-700 font-medium">Personal Best</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {mockUser.streak.best} days
                </div>
              </div>
              <div className="mt-3">
                <div className="w-full bg-gray-300 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${Math.min((mockUser.streak.current / mockUser.streak.best) * 100, 100)}%` 
                    }}
                  />
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  {Math.round((mockUser.streak.current / mockUser.streak.best) * 100)}% of your best streak
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="mb-8">
            <StreakStats
              currentStreak={mockUser.streak.current}
              bestStreak={mockUser.streak.best}
              booksGoal={mockUser.goals.booksPerYear}
              currentBooks={mockUser.goals.currentProgress}
              pagesPerDay={mockUser.goals.pagesPerDay}
            />
        </div>

         {/* Chart Section */}
        <div className="mb-8">
          <StreakChart 
            currentStreak={mockUser.streak.current} 
            bestStreak={mockUser.streak.best} 
          />
        </div>
      </div>
    </div>
) 
};
}

export default Tracker;

