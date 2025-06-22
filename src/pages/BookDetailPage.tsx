import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, BookOpen, Calendar, Clock, Heart, MessageCircle, Bookmark, Share2, Plus } from 'lucide-react';
import { mockBooks } from '../utils/mockData';

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const book = mockBooks.find(b => b.id === id);
  const [activeTab, setActiveTab] = useState<'overview' | 'highlights' | 'reviews'>('overview');
  const [showSimilarBooks, setShowSimilarBooks] = useState(false);

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Book Not Found</h1>
          <Link to="/library" className="text-blue-600 dark:text-blue-400 hover:underline">
            Return to Library
          </Link>
        </div>
      </div>
    );
  }

  const similarBooks = mockBooks.filter(b => 
    b.id !== book.id && 
    b.genre.some(genre => book.genre.includes(genre))
  ).slice(0, 3);

  const reactions = ['💭', '✨', '📚', '❤️', '🤔', '🎯'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          to="/library"
          className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Library</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book Cover and Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 sticky top-24">
              <div className="aspect-[3/4] overflow-hidden rounded-xl mb-6">
                <img 
                  src={book.coverUrl} 
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Reading Progress */}
              {book.progress !== undefined && book.progress > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>Reading Progress</span>
                    <span>{book.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${book.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors duration-200 flex items-center justify-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Continue Reading</span>
                </button>
                
                <div className="grid grid-cols-3 gap-2">
                  <button className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors duration-200 flex items-center justify-center">
                    <Heart className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors duration-200 flex items-center justify-center">
                    <Bookmark className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors duration-200 flex items-center justify-center">
                    <Share2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Book Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="space-y-3">
                  {book.dateStarted && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Started: {new Date(book.dateStarted).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {book.dateCompleted && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Completed: {new Date(book.dateCompleted).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
              {/* Header */}
              <div className="p-8 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {book.title}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                      by {book.author}
                    </p>
                  </div>
                  {book.rating && (
                    <div className="flex items-center space-x-2 bg-yellow-50 dark:bg-yellow-900 px-4 py-2 rounded-xl">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="font-semibold text-yellow-700 dark:text-yellow-300">
                        {book.rating}
                      </span>
                    </div>
                  )}
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {book.genre.map((genre) => (
                    <span 
                      key={genre}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors relative group"
                      onMouseEnter={() => setShowSimilarBooks(true)}
                      onMouseLeave={() => setShowSimilarBooks(false)}
                    >
                      {genre}
                      
                      {/* Similar Books Tooltip */}
                      {showSimilarBooks && similarBooks.length > 0 && (
                        <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-10">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Similar Books</h4>
                          <div className="space-y-2">
                            {similarBooks.map((similarBook) => (
                              <Link
                                key={similarBook.id}
                                to={`/book/${similarBook.id}`}
                                className="flex items-center space-x-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                              >
                                <img
                                  src={similarBook.coverUrl}
                                  alt={similarBook.title}
                                  className="w-8 h-10 object-cover rounded"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                    {similarBook.title}
                                  </p>
                                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                                    {similarBook.author}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </span>
                  ))}
                </div>

                {/* Status Badge */}
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">
                    {book.status === 'reading' ? 'Currently Reading' : 
                     book.status === 'completed' ? 'Completed' : 'Want to Read'}
                  </span>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <div className="flex space-x-8 px-8">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'highlights', label: 'Highlights' },
                    { id: 'reviews', label: 'Reviews' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Description</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                      {book.description}
                    </p>

                    {/* Step-by-step Review Reader */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-8">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        📖 Step-by-Step Reading Mode
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Follow along with guided reading sessions, perfect for study or deep comprehension.
                      </p>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                        Start Guided Reading
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'highlights' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Highlights</h3>
                      <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                        <Plus className="h-4 w-4" />
                        <span>Add Highlight</span>
                      </button>
                    </div>

                    {book.highlights && book.highlights.length > 0 ? (
                      <div className="space-y-6">
                        {book.highlights.map((highlight) => (
                          <div key={highlight.id} className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-6 rounded-r-xl">
                            <blockquote className="text-lg italic text-gray-900 dark:text-white mb-4">
                              "{highlight.text}"
                            </blockquote>
                            
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {highlight.page && <span>Page {highlight.page} • </span>}
                                <time>{new Date(highlight.timestamp).toLocaleDateString()}</time>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                {reactions.map((emoji) => (
                                  <button
                                    key={emoji}
                                    className={`p-2 rounded-full hover:bg-yellow-100 dark:hover:bg-yellow-800 transition-colors ${
                                      highlight.reactions.includes(emoji) ? 'bg-yellow-200 dark:bg-yellow-700' : ''
                                    }`}
                                  >
                                    {emoji}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No highlights yet</h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Start highlighting memorable passages as you read
                        </p>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                          Add Your First Highlight
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Reviews</h3>
                      <Link
                        to={`/review?book=${book.id}`}
                        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Write Review</span>
                      </Link>
                    </div>

                    <div className="text-center py-12">
                      <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No reviews yet</h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Share your thoughts about this book
                      </p>
                      <Link
                        to={`/review?book=${book.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                      >
                        Write the First Review
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;