import React, { useState } from 'react';
import { Moon, Sun, Target, BookOpen, Bell, User, Palette, Save } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { mockUser } from '../utils/mockData';

const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('appearance');
  const [settings, setSettings] = useState({
    name: mockUser.name,
    yearlyGoal: mockUser.goals.booksPerYear,
    dailyPages: mockUser.goals.pagesPerDay,
    favoriteGenres: mockUser.favoriteGenres,
    notifications: {
      readingReminders: true,
      goalProgress: true,
      newRecommendations: false,
    }
  });

  const sections = [
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'reading', label: 'Reading Goals', icon: Target },
    { id: 'preferences', label: 'Preferences', icon: BookOpen },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const allGenres = [
    'Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 'Mystery', 'Romance',
    'Biography', 'History', 'Self-Help', 'Philosophy', 'Poetry', 'Drama',
    'Horror', 'Adventure', 'Contemporary', 'Classic', 'LGBTQ+', 'Young Adult'
  ];

  const handleGenreToggle = (genre: string) => {
    setSettings(prev => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.includes(genre)
        ? prev.favoriteGenres.filter(g => g !== genre)
        : [...prev.favoriteGenres, genre]
    }));
  };

  const handleSaveSettings = () => {
    // Mock save functionality
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Customize your reading experience and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sticky top-24">
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        activeSection === section.id
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="p-8">
                {/* Appearance Settings */}
                {activeSection === 'appearance' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Appearance</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Theme</h3>
                          <div className="grid grid-cols-2 gap-4 max-w-md">
                            <button
                              onClick={() => theme === 'dark' && toggleTheme()}
                              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                                theme === 'light'
                                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <Sun className="h-6 w-6 text-yellow-500" />
                                <div className="text-left">
                                  <div className="font-medium text-gray-900 dark:text-white">Light</div>
                                  <div className="text-sm text-gray-600 dark:text-gray-400">Bright and clean</div>
                                </div>
                              </div>
                            </button>
                            
                            <button
                              onClick={() => theme === 'light' && toggleTheme()}
                              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                                theme === 'dark'
                                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <Moon className="h-6 w-6 text-purple-500" />
                                <div className="text-left">
                                  <div className="font-medium text-gray-900 dark:text-white">Dark</div>
                                  <div className="text-sm text-gray-600 dark:text-gray-400">Easy on the eyes</div>
                                </div>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reading Goals Settings */}
                {activeSection === 'reading' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Reading Goals</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="yearlyGoal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Books per Year
                          </label>
                          <div className="max-w-xs">
                            <input
                              id="yearlyGoal"
                              type="number"
                              value={settings.yearlyGoal}
                              onChange={(e) => setSettings(prev => ({ ...prev, yearlyGoal: parseInt(e.target.value) || 0 }))}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            Current progress: {mockUser.goals.currentProgress} / {settings.yearlyGoal} books
                          </p>
                        </div>

                        <div>
                          <label htmlFor="dailyPages" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Pages per Day
                          </label>
                          <div className="max-w-xs">
                            <input
                              id="dailyPages"
                              type="number"
                              value={settings.dailyPages}
                              onChange={(e) => setSettings(prev => ({ ...prev, dailyPages: parseInt(e.target.value) || 0 }))}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            This helps us track your daily reading progress
                          </p>
                        </div>

                        {/* Progress Visualization */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Your Progress This Year</h4>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                                <span>Books Read</span>
                                <span>{mockUser.goals.currentProgress} / {settings.yearlyGoal}</span>
                              </div>
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                <div 
                                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                                  style={{ width: `${Math.min((mockUser.goals.currentProgress / settings.yearlyGoal) * 100, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Preferences Settings */}
                {activeSection === 'preferences' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Reading Preferences</h2>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Favorite Genres</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Select your favorite genres to get better book recommendations
                        </p>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                          {allGenres.map((genre) => (
                            <button
                              key={genre}
                              onClick={() => handleGenreToggle(genre)}
                              className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                settings.favoriteGenres.includes(genre)
                                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-2 border-blue-500'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-2 border-transparent hover:bg-gray-200 dark:hover:bg-gray-600'
                              }`}
                            >
                              {genre}
                            </button>
                          ))}
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                          {settings.favoriteGenres.length} genre{settings.favoriteGenres.length !== 1 ? 's' : ''} selected
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Settings */}
                {activeSection === 'notifications' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Notifications</h2>
                      
                      <div className="space-y-6">
                        {Object.entries(settings.notifications).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <div>
                              <h3 className="text-base font-medium text-gray-900 dark:text-white">
                                {key === 'readingReminders' && 'Reading Reminders'}
                                {key === 'goalProgress' && 'Goal Progress Updates'}
                                {key === 'newRecommendations' && 'New Book Recommendations'}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {key === 'readingReminders' && 'Daily reminders to keep your reading streak'}
                                {key === 'goalProgress' && 'Weekly updates on your reading goals'}
                                {key === 'newRecommendations' && 'Personalized book suggestions'}
                              </p>
                            </div>
                            <button
                              onClick={() => setSettings(prev => ({
                                ...prev,
                                notifications: {
                                  ...prev.notifications,
                                  [key]: !value
                                }
                              }))}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                value ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  value ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Profile Settings */}
                {activeSection === 'profile' && (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Profile</h2>
                      
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Display Name
                          </label>
                          <div className="max-w-md">
                            <input
                              id="name"
                              type="text"
                              value={settings.name}
                              onChange={(e) => setSettings(prev => ({ ...prev, name: e.target.value }))}
                              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>
                        </div>

                        {/* Reading Stats */}
                        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Reading Statistics</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{mockUser.streak.current}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{mockUser.goals.currentProgress}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Books Read</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{mockUser.streak.best}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Best Streak</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{settings.favoriteGenres.length}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">Fav Genres</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="flex justify-end pt-8 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleSaveSettings}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;