import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { IBook } from 'src/shared/models/IBook';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit {
  // booklist!: IBook[];
  authors: string[] = [];
  languages: string[] = [];
  bookForm = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    description: new FormControl(''),
    totalNumberOfPages: new FormControl(''),
    language: new FormControl(''),
    genre: new FormControl(''),
  });

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getAllAuthors().subscribe((data) => (this.authors = data));
    this.bookService
      .getAllLanguages()
      .subscribe((data) => (this.languages = data));
  }
  // getBookList() {
  //   return this.bookService.getAllBooks();
  // }
  onBookSubmit() {
    if (!this.bookForm.value) return;
    const book: IBook = {
      title: this.bookForm.value.title!,
      author: this.bookForm.value.author!,
      description: this.bookForm.value.description!,
      totalNumberOfPages: +this.bookForm.value.totalNumberOfPages!,
      language: this.bookForm.value.language!,
      genre: this.bookForm.value.genre!,
    };
    this.bookService.addBook(book);
    this.bookForm.reset();
  }
}
