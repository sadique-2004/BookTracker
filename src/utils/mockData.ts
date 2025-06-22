import { Book, Review, UserProfile } from '../types';
import { useUser } from "@clerk/clerk-react";

export const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    genre: ['Fiction', 'Philosophy', 'Contemporary'],
    coverUrl: 'https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
    description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.',
    status: 'reading',
    rating: 4.5,
    progress: 65,
    dateStarted: '2024-11-15',
    highlights: [
      {
        id: 'h1',
        text: 'Sometimes regrets aren\'t based on fact at all',
        timestamp: '2024-11-20T14:30:00Z',
        page: 87,
        reactions: ['💭', '✨', '📚']
      }
    ]
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: ['Self-Help', 'Productivity', 'Psychology'],
    coverUrl: 'https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
    description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones. Transform your life through the power of small, consistent changes.',
    status: 'completed',
    rating: 5,
    progress: 100,
    dateStarted: '2024-10-01',
    dateCompleted: '2024-11-10'
  },
  {
    id: '3',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    genre: ['Historical Fiction', 'LGBTQ+', 'Romance'],
    coverUrl: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
    description: 'Reclusive Hollywood icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life.',
    status: 'want-to-read',
    progress: 0
  },
  {
    id: '4',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    genre: ['Science Fiction', 'Space', 'Adventure'],
    coverUrl: 'https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&fit=crop',
    description: 'A lone astronaut must save the earth in this propulsive science thriller from the author of The Martian.',
    status: 'completed',
    rating: 4.8,
    progress: 100,
    dateCompleted: '2024-09-15'
  }
];

export const mockReviews: Review[] = [
  {
    id: 'r1',
    bookId: '2',
    title: 'Life-changing insights on habit formation',
    content: 'This book completely transformed how I think about building habits. The 1% better principle is so simple yet powerful. Clear\'s writing is engaging and backed by solid research.',
    rating: 5,
    mood: '🤯',
    createdAt: '2024-11-11',
    wordCount: 156
  }
];

export const mockUser: UserProfile = {
  name: 'Alex Reader',
  streak: {
    current: 47,
    best: 89,
    lastReadDate: '2024-12-28'
  },
  goals: {
    booksPerYear: 52,
    currentProgress: 38,
    pagesPerDay: 25
  },
  favoriteGenres: ['Fiction', 'Science Fiction', 'Self-Help', 'Philosophy'],
  theme: 'light'
};

export const quotes = [
  "A reader lives a thousand lives before he dies. The man who never reads lives only one. — George R.R. Martin",
  "Books are a uniquely portable magic. — Stephen King",
  "The more that you read, the more things you will know. — Dr. Seuss",
  "Reading is to the mind what exercise is to the body. — Joseph Addison"
];

export const featuredBooks = mockBooks.slice(0, 3);
export const trendingGenres = ['Fiction', 'Science Fiction', 'Self-Help', 'Philosophy', 'Romance', 'Mystery', 'Biography', 'History'];