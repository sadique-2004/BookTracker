import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Target, TrendingUp, Sparkles, Star } from 'lucide-react';
import { mockUser, featuredBooks, trendingGenres } from '../utils/mockData';
import { useUser } from "@clerk/clerk-react";

const HomePage: React.FC = () => {
  const { user } = useUser();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Welcome back, {user?.username}!
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Your Reading
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Journey</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Track your progress, discover new stories, and build lasting reading habits
            </p>

            {/* Streak Badge */}
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl px-6 py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 mb-12">
              <div className="text-2xl">🔥</div>
              <div>
                <div className="text-2xl font-bold">{mockUser.streak.current}</div>
                <div className="text-xs opacity-90">Day Streak</div>
              </div>
              <div className="text-xs opacity-75">
                Best: {mockUser.streak.best} days
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-200">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-xl">
                <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mockUser.goals.currentProgress}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Books Read</div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-200">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-xl">
                <Target className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.round((mockUser.goals.currentProgress / mockUser.goals.booksPerYear) * 100)}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Year Goal</div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-200">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-xl">
                <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {mockUser.goals.pagesPerDay}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Pages/Day</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Books Carousel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Books</h2>
          <Link 
            to="/library" 
            className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
          >
            <span>View all</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredBooks.map((book) => (
            <Link 
              key={book.id} 
              to={`/book/${book.id}`}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={book.coverUrl} 
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {book.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{book.author}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {book.rating}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {book.genre.slice(0, 2).map((genre) => (
                      <span 
                        key={genre}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Trending Genres Word Cloud */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Trending Genres
        </h2>
        
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap justify-center items-center gap-4">
            {trendingGenres.map((genre, index) => {
              const sizes = ['text-lg', 'text-xl', 'text-2xl', 'text-3xl'];
              const colors = [
                'text-blue-600 dark:text-blue-400',
                'text-purple-600 dark:text-purple-400',
                'text-green-600 dark:text-green-400',
                'text-red-600 dark:text-red-400',
                'text-yellow-600 dark:text-yellow-400',
                'text-pink-600 dark:text-pink-400',
                'text-indigo-600 dark:text-indigo-400',
                'text-teal-600 dark:text-teal-400'
              ];
              
              return (
                <span
                  key={genre}
                  className={`font-bold cursor-pointer hover:scale-110 transition-transform duration-200 ${
                    sizes[index % sizes.length]
                  } ${colors[index % colors.length]}`}
                >
                  {genre}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Reading?</h2>
          <p className="text-xl opacity-90 mb-8">
            Discover your next favorite book and continue your reading journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/library"
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Browse Library
            </Link>
            <Link
              to="/review"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Write a Review
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;