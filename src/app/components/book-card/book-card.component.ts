import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { IBook } from 'src/shared/models/IBook';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit {
  authors: string[] = [];
  languages: string[] = [];
  bookForm!: FormGroup;

  get fc() {
    return this.bookForm.controls;
  }

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      title: new FormControl(''),
      author: new FormControl(''),
      description: new FormControl(''),
      totalNumberOfPages: new FormControl('', Validators.pattern(/^[0-9]\d*$/)),
      language: new FormControl(''),
      genre: new FormControl(''),
    });
    this.bookService.getAllAuthors().subscribe((data) => (this.authors = data));
    this.bookService
      .getAllLanguages()
      .subscribe((data) => (this.languages = data));
  }

  onBookSubmit() {
    if (!this.bookForm.valid) return;
    const book: IBook = {
      title: this.bookForm.value.title!,
      author: this.bookForm.value.author!,
      description: this.bookForm.value.description!,
      totalNumberOfPages: +this.bookForm.value.totalNumberOfPages!,
      language: this.bookForm.value.language!,
      genre: this.bookForm.value.genre!,
    };
    this.bookService.addBook(book);
    alert('Book created!');
    this.bookForm.reset();
  }
}
