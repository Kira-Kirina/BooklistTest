import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book.service';
import { IBook } from 'src/shared/models/IBook';
import { BookComponent } from '../book/book.component';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';
import { BookCardComponent } from '../book-card/book-card.component';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  formControl!: FormGroup;
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
  constructor(
    private bookService: BookService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getBookList().subscribe((books) => {
      this.booklist = books as IBook[];
      this.dataSource = new MatTableDataSource(this.booklist);
    });
    this.getMaxNumberOfPages();
    this.customFilterSetup();
    this.formControl = this.formBuilder.group({
      title: '',
      genre: '',
      author: '',
      language: '',
    });
    this.formControl.valueChanges.subscribe((value) => {
      const filter = {
        ...value,
        author: value.author,
        description: value.title,
        genre: value.genre,
        title: value.title,
        language: value.language,
      } as string;
      this.dataSource.filter = filter;
    });

    this.pageControl.valueChanges.subscribe((value) => {
      if (value) {
        const [x, y] = value;

        const data = this.booklist.filter((book) => {
          return book.totalNumberOfPages >= x && book.totalNumberOfPages <= y;
        });
        this.dataSource.data = data;
      }
    });
  }
  getBookList() {
    return this.bookService.allBooks();
  }
  getMaxNumberOfPages() {
    let numOfPages: number[] = [];
    this.booklist.forEach((book) => numOfPages.push(book.totalNumberOfPages));
    this.maxNumberOfPages = Math.max(...numOfPages);
    if (this.maxNumberOfPages) {
      this.options.ceil = this.maxNumberOfPages;
    }
  }
  customFilterSetup() {
    this.dataSource.filterPredicate = ((data, filter: any) => {
      const a =
        !filter.title ||
        data.title
          .trim()
          .toLowerCase()
          .indexOf(filter.title.trim().toLowerCase()) >= 0 ||
        data
          .description!.trim()
          .toLowerCase()
          .indexOf(filter.description.trim().toLowerCase()) >= 0;
      const b =
        !filter.genre ||
        data.genre.trim().toLowerCase() === filter.genre.trim().toLowerCase();
      const c =
        !filter.author || filter.author.includes(data.author)
          ? data.author
          : filter.author.length < 1
          ? data.author
          : null;

      const d =
        !filter.language || filter.language.includes(data.language)
          ? data.language
          : filter.language.length < 1
          ? data.language
          : null;

      return a && b && c && d;
    }) as (arg0: IBook, arg1: string) => boolean;
  }

  openBookCard(book: IBook) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.data = {
      book: book,
    };
    this.dialog.open(BookComponent, dialogConfig);
  }

  openBookForm() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    this.dialog.open(BookCardComponent, dialogConfig);
  }
}
