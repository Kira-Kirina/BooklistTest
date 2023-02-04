import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  concat,
  concatMap,
  map,
  merge,
  Observable,
  of,
  scan,
  Subject,
} from 'rxjs';
import { BOOKS_MOCK } from 'src/shared/books.mock';
import { IAuthor } from 'src/shared/models/IAuthor';
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
  private addAuthorSubject = new BehaviorSubject<string>('');
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

  getAllLanguages(): Observable<string[]> {
    return of(LANGUAGES_MOCK);
  }
  addBook(book: IBook) {
    this.bookSubject.next(book);
  }
}
