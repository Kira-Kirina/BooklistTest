import { Injectable } from '@angular/core';
import { map, merge, Observable, of, scan, Subject } from 'rxjs';
import { BOOKS_MOCK } from 'src/shared/books.mock';
import { IBook } from 'src/shared/models/IBook';
import { AUTHORS_MOCK, LANGUAGES_MOCK } from 'src/shared/select-data.mock';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private bookSubject = new Subject<IBook>();
  public bookObservable: Observable<IBook> = this.bookSubject.asObservable();

  constructor() {}
  getAllBooks(): Observable<IBook[]> {
    return of(BOOKS_MOCK);
  }
  addBook(book: IBook) {
    this.bookSubject.next(book);
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
}
