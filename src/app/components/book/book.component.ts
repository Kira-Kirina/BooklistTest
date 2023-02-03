import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IBook } from 'src/shared/models/IBook';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  book!: IBook;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { book: IBook }) {}

  ngOnInit(): void {
    if (this.data) {
      this.book = this.data.book;
    }
  }
}
