import { Book } from '../types/book';

export const sampleBooks: Book[] = [
  {
    id: '1',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    cover: 'https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.5,
    genre: 'Contemporary Fiction',
    description: 'A reclusive Hollywood icon finally tells her story to a young journalist, revealing the truth about her glamorous and scandalous life.',
  },
  {
    id: '2',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    cover: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.7,
    genre: 'Science Fiction',
    description: 'A lone astronaut must save humanity from extinction in this thrilling tale of scientific discovery and friendship.',
  },
  {
    id: '3',
    title: 'The Song of Achilles',
    author: 'Madeline Miller',
    cover: 'https://images.pexels.com/photos/3283568/pexels-photo-3283568.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.6,
    genre: 'Historical Fiction',
    description: 'A stunning reimagining of the Iliad, told through the eyes of Patroclus, Achilles\' companion and lover.',
  },
  {
    id: '4',
    title: 'Circe',
    author: 'Madeline Miller',
    cover: 'https://images.pexels.com/photos/3616956/pexels-photo-3616956.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.4,
    genre: 'Mythology',
    description: 'The story of the Greek goddess Circe, who transforms from a nymph into a formidable witch.',
  },
  {
    id: '5',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    cover: 'https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.2,
    genre: 'Contemporary Fiction',
    description: 'Between life and death is a library where each book represents a different life you could have lived.',
  },
  {
    id: '6',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    cover: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400',
    rating: 4.1,
    genre: 'Science Fiction',
    description: 'An artificial friend observes the world with wonder and curiosity in this moving tale of love and sacrifice.',
  },
];

export const getSimilarBooks = (currentBook: Book): Book[] => {
  return sampleBooks
    .filter(book => book.id !== currentBook.id)
    .filter(book => book.genre === currentBook.genre || Math.abs(book.rating - currentBook.rating) < 0.5)
    .slice(0, 3);
};