import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from 'src/app/services/book.service';
import { IBook } from 'src/shared/models/IBook';
import { BookComponent } from '../book/book.component';
import { MatTable, MatTableDataSource } from '@angular/material/table';
// import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<IBook>;
  // authorsControl = new FormControl('');
  booklist!: IBook[];
  book!: any;
  // book!: IBook;
  dataSource!: MatTableDataSource<IBook>;
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
    this.booklist.forEach((book) => genres.push(book.genre));
    return genres;
  }
  get authors() {
    let authors: string[] = [];
    this.booklist.forEach((book) => authors.push(book.author));
    return authors;
  }
  constructor(private bookService: BookService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getBookList().subscribe((books) => {
      this.booklist = books as IBook[];
      this.dataSource = new MatTableDataSource(this.booklist);
    });
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
    console.log(genre);
    this.dataSource.filter = genre.trim().toLowerCase();
  }
  onChangeAuthors(author: string) {
    console.log(author);

    this.dataSource.filter = author.trim().toLowerCase();
  }

  // removeData() {
  //   this.dataSource.filteredData.pop();
  //   this.table.renderRows();
  // }
}
