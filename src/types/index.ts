export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string[];
  coverUrl: string;
  description: string;
  status: 'reading' | 'completed' | 'want-to-read';
  rating?: number;
  progress?: number;
  dateStarted?: string;
  dateCompleted?: string;
  highlights?: Highlight[];
  reviews?: Review[];
}

export interface Highlight {
  id: string;
  text: string;
  timestamp: string;
  page?: number;
  chapter?: string;
  reactions: string[];
}

export interface Review {
  id: string;
  bookId: string;
  title: string;
  content: string;
  rating: number;
  mood: string;
  createdAt: string;
  wordCount: number;
}

export interface ReadingStreak {
  current: number;
  best: number;
  lastReadDate: string;
}

export interface ReadingGoal {
  booksPerYear: number;
  currentProgress: number;
  pagesPerDay: number;
}

export interface UserProfile {
  name: string;
  streak: ReadingStreak;
  goals: ReadingGoal;
  favoriteGenres: string[];
  theme: 'light' | 'dark';
}