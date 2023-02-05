import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import { IBook } from 'src/shared/models/IBook';
import { BooksComponent } from './books.component';

describe('BooksComponent', () => {
  let booklist: IBook[];
  let mockBookService: any;
  let component: BooksComponent;
  beforeEach(() => {
    booklist = [
      {
        title: 'The Last Wish',
        author: 'Andrzej Sapkowski',
        description: 'While not all of the documentation ',
        totalNumberOfPages: 400,
        language: 'Polish',
        genre: 'Fiction',
      },
      {
        title: 'Three Comrades',
        author: 'Erich Maria Remarque',
        description: 'Guided tutorials with hands-on coding ',
        totalNumberOfPages: 496,
        language: 'German',
        genre: 'Fiction',
      },
    ];
    mockBookService = jasmine.createSpyObj('BookService', ['allBooks']);
    component = new (BooksComponent as any)(mockBookService);
  });

  it('should return booklist', () => {
    mockBookService.allBooks.and.returnValue(of(true));
    component.booklist = booklist;
    component.getBookList();
    expect(mockBookService.allBooks).toHaveBeenCalledTimes(1);
    expect(component.booklist.length).toBe(2);
  });
});
