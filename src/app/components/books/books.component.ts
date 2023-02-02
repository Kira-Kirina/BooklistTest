import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book.service';
import { IBook } from 'src/shared/models/IBook';
import { BookComponent } from '../book/book.component';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<IBook>;
  maxNumberOfPages!: number;
  authorControl = new FormControl('');
  languageControl = new FormControl('');
  genreControl = new FormControl('');
  pageControl = new FormControl([0, 2000]);
  booklist!: IBook[];
  book!: IBook;
  filterAuthors: IBook[] = [];
  dataSource!: MatTableDataSource<IBook>;

  options: Options = {
    floor: 0,
    ceil: 2000,
    step: 50,
  };

  displayedColumns: string[] = [
    'title',
    'author',
    'description',
    'totalNumberOfPages',
    'language',
    'genre',
  ];

  get genres() {
    let genres: string[] = [];
    this.booklist.forEach((book) => {
      if (genres.includes(book.genre)) return;
      genres.push(book.genre);
    });
    return genres;
  }
  get authors() {
    let authors: string[] = [];
    this.booklist.forEach((book) => authors.push(book.author));
    return authors;
  }
  get languages() {
    let languages: string[] = [];
    this.booklist.forEach((book) => {
      if (languages.includes(book.language)) return;
      languages.push(book.language);
    });
    return languages;
  }
  constructor(private bookService: BookService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getBookList().subscribe((books) => {
      this.booklist = books as IBook[];
      let numOfPages: number[] = [];
      this.booklist.forEach((book) => numOfPages.push(book.totalNumberOfPages));
      this.dataSource = new MatTableDataSource(this.booklist);

      this.maxNumberOfPages = Math.max(...numOfPages);
      if (this.maxNumberOfPages) {
        this.options.ceil = this.maxNumberOfPages;
      }

      this.dataSource.filterPredicate = function (
        data: any,
        filterValue: string
      ) {
        return (
          data.title
            .trim()
            .toLocaleLowerCase()
            .indexOf(filterValue.trim().toLocaleLowerCase()) >= 0 ||
          data.description
            .trim()
            .toLocaleLowerCase()
            .indexOf(filterValue.trim().toLocaleLowerCase()) >= 0
        );
      };
    });

    if (this.dataSource) {
      this.pageControl.valueChanges.subscribe((value) => {
        if (value) {
          const [x, y] = value;

          const data = this.booklist.filter((book) => {
            return book.totalNumberOfPages >= x && book.totalNumberOfPages <= y;
          });
          this.dataSource.data = data;
        }
      });
      this.genreControl.valueChanges.subscribe((value) => {
        const data = this.booklist.filter((book) => {
          return (
            book.genre.trim().toLocaleLowerCase() ===
            value?.trim().toLocaleLowerCase()
          );
        });
        this.dataSource.data = data;
      });
      this.authorControl.valueChanges.subscribe((values) => {
        const data = this.booklist.filter((book) => {
          if (values?.includes(book.author)) {
            return book;
          }
          return;
        });

        this.dataSource.data = data;
      });
      this.languageControl.valueChanges.subscribe((values) => {
        const data = this.booklist.filter((book) => {
          if (values?.includes(book.language)) {
            return book;
          }
          return;
        });

        this.dataSource.data = data;
      });
    }
  }
  getBookList() {
    return this.bookService.allBooks();
  }
  openDialog(book?: IBook) {
    this.dialog.open(BookComponent, {
      data: {
        book: book,
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
  addData() {
    this.openDialog();
  }
  onChangeGenre(genre: string) {
    this.dataSource.filter = genre.trim().toLowerCase();
  }
}
