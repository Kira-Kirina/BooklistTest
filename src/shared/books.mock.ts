import { IBook } from './models/IBook';

export const BOOKS_MOCK: IBook[] = [
  {
    title: 'The Last Wish',
    author: 'Andrzej Sapkowski',
    description:
      'While not all of the documentation for RxJS reflects this terminology, it is a goal of the team to ensure it does, and to ensure the language and names around the library use this document as a source of truth and unified language.',
    totalNumberOfPages: 400,
    language: 'Polish',
    genre: 'Fiction',
  },
  {
    title: 'Three Comrades',
    author: 'Erich Maria Remarque',
    description:
      'Guided tutorials with hands-on coding to develop practical experience and build working code and apps. Start a Firebase codelab for iOS, Android, or Web.',
    totalNumberOfPages: 496,
    language: 'German',
    genre: 'Fiction',
  },
  {
    title: 'Some book',
    author: 'Some Author',
    description:
      'Any system or thing that is the source of values that are being pushed out of the observable subscription to the consumer. This can be a wide variety of things, from a WebSocket to a simple iteration over an Array. ',
    totalNumberOfPages: 356,
    language: 'German',
    genre: 'Fiction',
  },
  {
    title: 'Alice’s Adventures in Wonderland',
    author: 'Lewis Carroll',
    description:
      'Formal reference documentation for Firebase SDKs, Firebase REST APIs, and Firebase tools. Find Firebase reference docs under the Reference tab at the top of the page.',
    totalNumberOfPages: 92,
    language: 'English',
    genre: 'Fantasy',
  },
  {
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    description:
      'Boost user engagement with rich analytics, A/B testing, and messaging campaigns. Understand your users to better support and retain them. Run experiments to test ideas and uncover new insights. Customize your app for different user segments.',
    totalNumberOfPages: 671,
    language: 'Russian',
    genre: 'Philosophy',
  },
  {
    title: 'War and Peace',
    author: 'Leo Tolstoy',
    description:
      'Improve app quality in less time with less effort. Simplify testing, triaging, and troubleshooting. Carefully roll out features and monitor adoption. Pinpoint, prioritize, and fix stability and performance issues early.',
    totalNumberOfPages: 1392,
    language: 'Russian',
    genre: 'Historical Fiction',
  },
  {
    title: 'Don Quixote',
    author: 'Miguel de Cervantes',
    description:
      'Internationalized and accessible components for everyone. Well tested to ensure performance and reliability.Straightforward APIs with consistent cross platform behaviour.',
    totalNumberOfPages: 765,
    language: 'Spanish',
    genre: 'Adventure',
  },
  {
    title: 'A Tale of Two Cities',
    author: 'Charles Dickens',
    description:
      'Provide tools that help developers build their own custom components with common interaction patterns.Customizable within the bounds of the Material Design specification.',
    totalNumberOfPages: 678,
    language: 'English',
    genre: 'Historical',
  },
  {
    title: 'Dream of the Red Chamber',
    author: 'Cao Xueqin',
    description:
      'Built by the Angular team to integrate seamlessly with Angular. Start from scratch or drop into your existing applications.',
    totalNumberOfPages: 934,
    language: 'Chinese',
    genre: 'Family saga',
  },
  {
    title: 'Vardi Wala Gunda',
    author: 'Ved Prakash Sharma',
    description:
      'Observers in RxJS may also be partial. If you do not provide one of the callbacks, the execution of the Observable will still happen normally, except some types of notifications will be ignored, because they do not have a corresponding callback in the Observer.',
    totalNumberOfPages: 546,
    language: 'Hindi',
    genre: 'Detective',
  },
];
