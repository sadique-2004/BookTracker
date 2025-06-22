import React from 'react';
import {BookOpen, Sparkles } from 'lucide-react';

import { BookCard } from '../components/FeatureComponents/BookCard';
import { sampleBooks, getSimilarBooks } from '../utils/books';

const FeaturedBooks: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Books
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of must-read books. Hover over any book to discover similar titles you might love.
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              similarBooks={getSimilarBooks(book)}
            />
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-16 bg-white/60 backdrop-blur-sm rounded-3xl p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              How It Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Hover Over Books</h4>
                <p className="text-sm text-gray-600">Move your cursor over any book card to activate the tooltip</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold">2</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">View Suggestions</h4>
                <p className="text-sm text-gray-600">See personalized book recommendations in the floating tooltip</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Discover New Reads</h4>
                <p className="text-sm text-gray-600">Find your next favorite book based on intelligent recommendations</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default FeaturedBooks;