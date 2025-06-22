import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Eye, BarChart3, Plus, Clock } from 'lucide-react';
import { mockBooks } from '../utils/mockData';

const ReviewNotesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const bookId = searchParams.get('book');
  const book = bookId ? mockBooks.find(b => b.id === bookId) : null;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [mood, setMood] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const moods = ['😊', '😍', '🤔', '😢', '😤', '🤯', '😴', '🔥', '💭', '✨'];

  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [content]);

  const handleSave = () => {
    // Mock save functionality
    alert('Review saved successfully!');
  };

  const addHighlight = () => {
    const timestamp = new Date().toLocaleString();
    const highlightText = `[${timestamp}] New highlight added`;
    setContent(prev => prev + (prev ? '\n\n' : '') + highlightText);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            to={book ? `/book/${book.id}` : '/library'}
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to {book ? 'Book' : 'Library'}</span>
          </Link>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsPreview(!isPreview)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
            >
              <Eye className="h-4 w-4" />
              <span>{isPreview ? 'Edit' : 'Preview'}</span>
            </button>
            
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              <Save className="h-4 w-4" />
              <span>Save Review</span>
            </button>
          </div>
        </div>

        {/* Book Context */}
        {book && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
            <div className="flex items-center space-x-4">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-16 h-20 object-cover rounded-lg"
              />
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{book.title}</h2>
                <p className="text-gray-600 dark:text-gray-400">by {book.author}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {book.genre.slice(0, 3).map((genre) => (
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
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="p-8">
                {!isPreview ? (
                  <div className="space-y-6">
                    {/* Title Input */}
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Review Title
                      </label>
                      <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Give your review a catchy title..."
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg"
                      />
                    </div>

                    {/* Rating */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Rating
                      </label>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setRating(star)}
                            className={`text-2xl transition-colors ${
                              star <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                            } hover:text-yellow-400`}
                          >
                            ★
                          </button>
                        ))}
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                          {rating > 0 ? `${rating}/5 stars` : 'Click to rate'}
                        </span>
                      </div>
                    </div>

                    {/* Mood Picker */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Reading Mood
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {moods.map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => setMood(emoji)}
                            className={`text-2xl p-3 rounded-xl transition-all duration-200 ${
                              mood === emoji
                                ? 'bg-blue-100 dark:bg-blue-900 scale-110'
                                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                            }`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Content Textarea */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Your Review
                        </label>
                        <button
                          onClick={addHighlight}
                          className="flex items-center space-x-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                        >
                          <Plus className="h-3 w-3" />
                          <span>Add Highlight</span>
                        </button>
                      </div>
                      <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Share your thoughts about this book... What did you love? What surprised you? How did it make you feel?"
                        rows={12}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                      />
                    </div>
                  </div>
                ) : (
                  /* Preview Mode */
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        {title && <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h1>}
                        <div className="flex items-center space-x-4">
                          {rating > 0 && (
                            <div className="flex items-center space-x-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                  key={star}
                                  className={`text-lg ${
                                    star <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                                  }`}
                                >
                                  ★
                                </span>
                              ))}
                            </div>
                          )}
                          {mood && <span className="text-2xl">{mood}</span>}
                        </div>
                      </div>
                    </div>
                    
                    <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                      {content || (
                        <p className="text-gray-500 dark:text-gray-400 italic">
                          Your review content will appear here...
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Progress Meter */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Writing Progress</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <span>Word Count</span>
                      <span>{wordCount} words</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((wordCount / 200) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Target: 200 words
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <span>Completion</span>
                      <span>{Math.round((title ? 25 : 0) + (rating > 0 ? 25 : 0) + (mood ? 25 : 0) + (wordCount > 0 ? 25 : 0))}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(title ? 25 : 0) + (rating > 0 ? 25 : 0) + (mood ? 25 : 0) + (wordCount > 0 ? 25 : 0)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Writing Tips */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800 p-6">
                <h3 className="font-semibold text-purple-900 dark:text-purple-300 mb-3">💡 Writing Tips</h3>
                <ul className="space-y-2 text-sm text-purple-700 dark:text-purple-300">
                  <li>• Start with your overall feeling</li>
                  <li>• Mention specific scenes or quotes</li>
                  <li>• Compare to other books you've read</li>
                  <li>• Share who might enjoy this book</li>
                </ul>
              </div>

              {/* Recent Activity */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Clock className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-400">Started writing review</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-400">Auto-saved draft</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewNotesPage;