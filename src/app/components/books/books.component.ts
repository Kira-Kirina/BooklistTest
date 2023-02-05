import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
export class BooksComponent implements OnInit, AfterViewInit {
  formControl!: FormGroup;
  @ViewChild(MatTable) table!: MatTable<IBook>;
  maxNumberOfPages!: number;
  value: number = 40;
  highValue: number = 2000;
  pageControl = new FormControl([0, 2000]);
  booklist!: IBook[];
  book!: IBook;
  dataSource!: MatTableDataSource<IBook>;

  options: Options = {};
  // options: Options = {
  //   floor: 0,
  //   ceil: 2000,
  //   step: 50,
  // };

  displayedColumns: string[] = [
    'title',
    'author',
    'description',
    'totalNumberOfPages',
    'language',
    'genre',
  ];
  genres: string[] = [];
  authors: string[] = [];
  languages: string[] = [];

  constructor(
    private bookService: BookService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}
  ngAfterViewInit(): void {
    let rangeOptions: Options = {
      floor: 0,
      ceil: this.maxNumberOfPages,
      step: 50,
    };
    this.options = rangeOptions;
  }

  ngOnInit(): void {
    this.getBookList().subscribe((books) => {
      this.booklist = books as IBook[];
      this.dataSource = new MatTableDataSource(this.booklist);
      this.getGenres();
      this.getAuthors();
      this.getLanguages();
      this.getMaxNumberOfPages();

      // this.getSliderOptions();
      this.customFilterSetup();
    });
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

  getSliderOptions() {
    this.options['floor'] = 0;
    this.options['ceil'] = this.maxNumberOfPages;
    this.options['step'] = 50;
  }
  getGenres() {
    this.booklist.forEach((book) => {
      if (this.genres.includes(book.genre)) return;
      this.genres.push(book.genre);
    });
    return this.genres;
  }
  getAuthors() {
    this.booklist.forEach((book) => this.authors.push(book.author));
    return this.authors;
  }
  getLanguages() {
    this.booklist.forEach((book) => {
      if (this.languages.includes(book.language)) return;
      this.languages.push(book.language);
    });
    return this.languages;
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
