import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Grid, List, Star, Clock, CheckCircle, BookmarkPlus } from 'lucide-react';
import { mockBooks } from '../utils/mockData';
import { Book } from '../types';

const LibraryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGenre, setFilterGenre] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredBooks = mockBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = filterGenre === '' || book.genre.includes(filterGenre);
    const matchesStatus = filterStatus === '' || book.status === filterStatus;
    
    return matchesSearch && matchesGenre && matchesStatus;
  });

  const allGenres = Array.from(new Set(mockBooks.flatMap(book => book.genre)));

  const getStatusIcon = (status: Book['status']) => {
    switch (status) {
      case 'reading':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'want-to-read':
        return <BookmarkPlus className="h-4 w-4 text-orange-500" />;
    }
  };

  const getStatusText = (status: Book['status']) => {
    switch (status) {
      case 'reading':
        return 'Reading';
      case 'completed':
        return 'Completed';
      case 'want-to-read':
        return 'Want to Read';
    }
  };

  const getStatusColor = (status: Book['status']) => {
    switch (status) {
      case 'reading':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300';
      case 'completed':
        return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300';
      case 'want-to-read':
        return 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">My Library</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Organize and track your reading collection
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full lg:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search books or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Genre Filter */}
            <select
              value={filterGenre}
              onChange={(e) => setFilterGenre(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">All Genres</option>
              {allGenres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">All Status</option>
              <option value="reading">Reading</option>
              <option value="completed">Completed</option>
              <option value="want-to-read">Want to Read</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-gray-600 shadow-sm text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-gray-600 shadow-sm text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Books Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <Link 
                key={book.id} 
                to={`/book/${book.id}`}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={book.coverUrl} 
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}>
                      {getStatusIcon(book.status)}
                      <span>{getStatusText(book.status)}</span>
                    </span>
                    {book.rating && (
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">{book.rating}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{book.author}</p>
                  {book.progress !== undefined && book.progress > 0 && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{book.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${book.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1">
                    {book.genre.slice(0, 2).map((genre) => (
                      <span 
                        key={genre}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBooks.map((book) => (
              <Link 
                key={book.id} 
                to={`/book/${book.id}`}
                className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex p-6">
                  <div className="w-16 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                    <img 
                      src={book.coverUrl} 
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="ml-6 flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {book.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">{book.author}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                          {book.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {book.genre.map((genre) => (
                            <span 
                              key={genre}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-3 ml-4">
                        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(book.status)}`}>
                          {getStatusIcon(book.status)}
                          <span>{getStatusText(book.status)}</span>
                        </span>
                        {book.rating && (
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{book.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {book.progress !== undefined && book.progress > 0 && (
                      <div className="mt-3">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <span>Reading Progress</span>
                          <span>{book.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${book.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No books found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryPage;