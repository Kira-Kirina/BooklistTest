import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  merge,
  Observable,
  of,
  scan,
  Subject,
} from 'rxjs';
import { BOOKS_MOCK } from 'src/shared/books.mock';
import { IBook } from 'src/shared/models/IBook';
import { AUTHORS_MOCK, LANGUAGES_MOCK } from 'src/shared/select-data.mock';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private bookSubject = new Subject<IBook>();
  public bookObservable: Observable<IBook> = this.bookSubject.asObservable();
  private selectedAuthorSubject = new BehaviorSubject<string>('');
  public selectedAuthorObservable = this.selectedAuthorSubject.asObservable();
  private addAuthorSubject = new Subject<string>();
  public addAuthorObservable = this.addAuthorSubject.asObservable();
  constructor() {}
  getAllBooks(): Observable<IBook[]> {
    return of(BOOKS_MOCK);
  }
  allBooks(): Observable<IBook[]> {
    return merge(
      this.getAllBooks(),
      this.bookObservable.pipe(map((data) => [data]))
    ).pipe(
      scan((books, book) => {
        const data = [...books, ...book];

        console.log(data);
        return data;
      }, [] as IBook[])
    );
  }
  getAllAuthors(): Observable<string[]> {
    return of(AUTHORS_MOCK);
  }
  getAuthor() {
    return combineLatest([
      this.getAllAuthors(),
      this.selectedAuthorObservable,
    ]).pipe(
      map(([authors, selectedAuthor]) => {
        return authors.find(
          (author) =>
            author.replace(/\s*/g, '').toLowerCase() === selectedAuthor
        );
      })
    );
  }

  addAuthor(author: string) {
    console.log(author, 'author serv');

    this.addAuthorSubject.next(author);
  }
  allAuthors(): Observable<string[]> {
    this.addAuthorObservable.subscribe((x) => {
      console.log(x, 'x');
    });
    return merge(
      this.getAllAuthors(),
      this.addAuthorObservable.pipe(
        map((data) => {
          console.log(data, 'data');
          return [data];
        })
      )
    ).pipe(
      scan((authors, author) => {
        console.log(authors, 'authors');
        const data = [...authors, ...author];

        // console.log(data, 'data');
        return data;
      }, [] as string[])
    );
  }

  // updateAuthor(author: string) {
  //   this.selectedAuthorSubject.next(author);
  // }

  selectAuthor(author: string) {
    this.selectedAuthorSubject.next(author);
  }
  getAllLanguages(): Observable<string[]> {
    return of(LANGUAGES_MOCK);
  }
  addBook(book: IBook) {
    this.bookSubject.next(book);
  }
}
