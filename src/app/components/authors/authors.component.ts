import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { IAuthor } from 'src/shared/models/IAuthor';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent implements OnInit, OnDestroy {
  authors: IAuthor[] = [];
  authorsSub!: Subscription;
  constructor(private authorService: AuthorService) {}

  ngOnInit(): void {
    this.authorService.getAuthorsFromServer().subscribe((data) => {
      console.log(data);
      this.authors = data;
    });
  }

  ngOnDestroy(): void {
    this.authorsSub && this.authorsSub.unsubscribe();
  }
}
