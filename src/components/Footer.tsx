import React from 'react';
import { Heart, Twitter, Instagram, Github, Quote } from 'lucide-react';
import { mockUser, quotes } from '../utils/mockData';

const Footer: React.FC = () => {
  const todayQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quote of the Day */}
          <div className="lg:col-span-2">
            <div className="flex items-start space-x-3">
              <Quote className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Quote of the Day
                </h3>
                <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed">
                  {todayQuote}
                </p>
              </div>
            </div>
          </div>

          {/* Reading Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Your Progress
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Current Streak</span>
                <span className="font-semibold text-orange-600 dark:text-orange-400">
                  {mockUser.streak.current} days
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Books This Year</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {mockUser.goals.currentProgress} / {mockUser.goals.booksPerYear}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(mockUser.goals.currentProgress / mockUser.goals.booksPerYear) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>for book lovers</span>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            © 2024 BookTracker. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;