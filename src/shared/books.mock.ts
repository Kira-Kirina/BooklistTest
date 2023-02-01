import { IBook } from './models/IBook';

export const BOOKS_MOCK: IBook[] = [
  {
    title: 'The Last Wish',
    author: 'Andrzej Sapkowski',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur cupiditate ipsum, neque in nam recusandae repudiandae quaerat veritatis molestiae quos. ',
    totalNumberOfPages: 400,
    language: ' Polish',
    genre: 'Fiction',
  },
  {
    title: 'Three Comrades',
    author: 'Erich Maria Remarque',
    description:
      'Guided tutorials with hands-on coding to develop practical experience and build working code and apps. Start a Firebase codelab for iOS, Android, or Web.',
    totalNumberOfPages: 496,
    language: ' German',
    genre: 'Fiction',
  },
  {
    title: 'Alice’s Adventures in Wonderland',
    author: 'Lewis Carroll',
    description:
      'Formal reference documentation for Firebase SDKs, Firebase REST APIs, and Firebase tools. Find Firebase reference docs under the Reference tab at the top of the page.',
    totalNumberOfPages: 92,
    language: ' English',
    genre: 'Fantasy',
  },
  {
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    description:
      'Boost user engagement with rich analytics, A/B testing, and messaging campaigns. Understand your users to better support and retain them. Run experiments to test ideas and uncover new insights. Customize your app for different user segments.',
    totalNumberOfPages: 671,
    language: ' Russian',
    genre: 'Philosophy',
  },
  {
    title: 'War and Peace',
    author: 'Leo Tolstoy',
    description:
      'Improve app quality in less time with less effort. Simplify testing, triaging, and troubleshooting. Carefully roll out features and monitor adoption. Pinpoint, prioritize, and fix stability and performance issues early.',
    totalNumberOfPages: 1392,
    language: ' Russian',
    genre: 'Historical Fiction',
  },
];
