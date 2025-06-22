import React, { useState, useEffect } from 'react';
import { BookOpen, Flame, Star } from 'lucide-react';
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

      
        {/* Stats Section */}
        <div className="mb-8">
          (
            <StreakStats
              currentStreak={mockUser.streak.current}
              bestStreak={mockUser.streak.best}
              booksGoal={mockUser.goals.booksPerYear}
              currentBooks={mockUser.goals.currentProgress}
              pagesPerDay={mockUser.goals.pagesPerDay}
            />
          )
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

