import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Home, Library, PenTool, Settings, Menu, X, Flame, User, LogIn } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { mockUser } from '../utils/mockData';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Library', href: '/library', icon: Library },
    { name: 'Review', href: '/review', icon: PenTool },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">BookTracker</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Reading Streak, Theme Toggle & Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900 px-3 py-1 rounded-full">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-semibold text-orange-700 dark:text-orange-300">
                {mockUser.streak.current} day streak
              </span>
            </div>
            
            {/* <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <span className="text-lg">🌙</span>
              ) : (
                <span className="text-lg">☀️</span>
              )}
            </button> */}

            {/* Auth Buttons */}
            <div className="flex items-center space-x-2">
              

              <SignedOut>
              <SignInButton mode="modal" >
                <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200">
                <LogIn className="h-4 w-4" />
                <span className="text-sm font-medium">Login</span>
              </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center space-x-2">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "h-8 w-8", // Size of avatar
                    },
                  }}
                  afterSignOutUrl="/"
                />
              </div>
            </SignedIn>
              {/* <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
                <User className="h-4 w-4" />
                <span className="text-sm font-medium">Sign Up</span>
              </button> */}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <span className="text-lg">🌙</span>
              ) : (
                <span className="text-lg">☀️</span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-base font-medium flex items-center space-x-2 transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            
            {/* Mobile Auth Buttons */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
              <button className="w-full flex items-center space-x-2 px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200">
                <LogIn className="h-5 w-5" />
                <span>Login</span>
              </button>
              {/* <button className="w-full flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
                <User className="h-5 w-5" />
                <span>Sign Up</span>
              </button> */}
            </div>
            
            {/* Mobile Streak Display */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900 px-3 py-2 rounded-full mx-3">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-semibold text-orange-700 dark:text-orange-300">
                  {mockUser.streak.current} day streak
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;