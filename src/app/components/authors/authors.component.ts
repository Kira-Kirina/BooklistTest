import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent implements OnInit {
  authors$!: Observable<string[]>;
  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.authors$ = this.bookService.getAllAuthors();
  }
  editAuthor(author: string) {}
  addAuthor() {}
}
