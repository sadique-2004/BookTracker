import React, { useState } from 'react';
import { Star, Heart, Bookmark } from 'lucide-react';
import { Book, TooltipPosition } from '../../types/book';
import { FloatingTooltip } from './FloatingTooltip';

interface BookCardProps {
  book: Book;
  similarBooks: Book[];
}

export const BookCard: React.FC<BookCardProps> = ({ book, similarBooks }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({ x: 0, y: 0 });
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleMouseEnter = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.right + 10,
      y: rect.top,
    });
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={i}
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className="w-4 h-4 text-gray-300"
        />
      );
    }

    return stars;
  };

  return (
    <>
      <div
        className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Book Cover */}
        <div className="relative overflow-hidden">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className={`p-2 rounded-full backdrop-blur-sm transition-colors duration-200 ${
                isLiked 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsBookmarked(!isBookmarked);
              }}
              className={`p-2 rounded-full backdrop-blur-sm transition-colors duration-200 ${
                isBookmarked 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/80 text-gray-600 hover:bg-white hover:text-blue-500'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Book Info */}
        <div className="p-6">
          <h3 className="font-bold text-xl text-gray-900 mb-2 leading-tight">
            {book.title}
          </h3>
          <p className="text-gray-600 mb-3">
            by {book.author}
          </p>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-0.5">
              {renderStars(book.rating)}
            </div>
            <span className="text-sm text-gray-500">
              {book.rating.toFixed(1)}
            </span>
          </div>

          {/* Genre */}
          <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-3">
            {book.genre}
          </span>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {book.description}
          </p>
        </div>
      </div>

      <FloatingTooltip
        isVisible={showTooltip}
        position={tooltipPosition}
        currentBook={book}
        similarBooks={similarBooks}
        onClose={() => setShowTooltip(false)}
      />
    </>
  );
};