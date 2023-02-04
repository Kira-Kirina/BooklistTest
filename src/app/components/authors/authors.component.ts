import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsComponent implements OnInit {
  authors$ = this.bookService.allAuthors();
  constructor(private bookService: BookService) {}

  ngOnInit(): void {}
}
