import React, { useEffect, useRef, useState } from 'react';
import { Star, BookOpen, Users } from 'lucide-react';
import { Book, TooltipPosition } from '../../types/book';

interface FloatingTooltipProps {
  isVisible: boolean;
  position: TooltipPosition;
  currentBook: Book;
  similarBooks: Book[];
  onClose: () => void;
}

export const FloatingTooltip: React.FC<FloatingTooltipProps> = ({
  isVisible,
  position,
  currentBook,
  similarBooks,
  onClose,
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [adjustedPosition, setAdjustedPosition] = useState(position);

  useEffect(() => {
    if (isVisible && tooltipRef.current) {
      const tooltip = tooltipRef.current;
      const rect = tooltip.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let newX = position.x;
      let newY = position.y;

      // Adjust horizontal position if tooltip goes off-screen
      if (position.x + rect.width > viewportWidth - 20) {
        newX = viewportWidth - rect.width - 20;
      }
      if (newX < 20) {
        newX = 20;
      }

      // Adjust vertical position if tooltip goes off-screen
      if (position.y + rect.height > viewportHeight - 20) {
        newY = position.y - rect.height - 20;
      }
      if (newY < 20) {
        newY = 20;
      }

      setAdjustedPosition({ x: newX, y: newY });
    }
  }, [isVisible, position]);

  if (!isVisible) return null;

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
    <div
      ref={tooltipRef}
      className="fixed z-50 animate-in fade-in-0 zoom-in-95 duration-200"
      style={{
        left: `${adjustedPosition.x}px`,
        top: `${adjustedPosition.y}px`,
      }}
      onMouseLeave={onClose}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 w-96 max-w-sm">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Similar to "{currentBook.title}"</h3>
        </div>

        {/* Similar Books Grid */}
        <div className="space-y-3">
          {similarBooks.map((book) => (
            <div
              key={book.id}
              className="group flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
            >
              {/* Book Cover */}
              <div className="flex-shrink-0">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-12 h-16 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow duration-200"
                />
              </div>

              {/* Book Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 text-sm leading-tight truncate group-hover:text-blue-600 transition-colors duration-200">
                  {book.title}
                </h4>
                <p className="text-xs text-gray-600 mt-1 truncate">
                  by {book.author}
                </p>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mt-1.5">
                  <div className="flex items-center gap-0.5">
                    {renderStars(book.rating)}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">
                    {book.rating.toFixed(1)}
                  </span>
                </div>

                {/* Genre */}
                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full mt-2">
                  {book.genre}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>Based on reader preferences</span>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200">
              View all
            </button>
          </div>
        </div>
      </div>

      {/* Tooltip Arrow */}
      <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-l border-t border-gray-100 transform rotate-45 shadow-sm"></div>
    </div>
  );
};