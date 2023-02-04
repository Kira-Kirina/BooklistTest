import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { AuthorService } from 'src/app/services/author.service';
import { IAuthor } from 'src/shared/models/IAuthor';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss'],
})
export class AuthorFormComponent implements OnInit {
  authorForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });
  authorId!: string;
  author!: IAuthor;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authorService: AuthorService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((paramMap) => {
          let id = paramMap.get('id');
          if (id) {
            this.authorId = id;
          }
          return id;
        })
      )
      .subscribe();

    if (this.authorId) {
      this.authorService
        .getAuthorFromServer(this.authorId)
        .pipe(
          map((author) => (this.author = author)),
          tap((author) => {
            this.authorForm.patchValue({ name: author.name });
          })
        )
        .subscribe();
    }
  }
  submit() {
    if (!this.authorForm.valid) return;

    if (this.authorId) {
      this.authorService
        .updateAuthorToServer({
          name: this.authorForm.value.name!,
          id: this.authorId,
        })
        .subscribe(() => this.router.navigate(['/authors']));
    } else {
      this.authorService
        .addAuthorToServer({
          name: this.authorForm.value.name!,
        })
        .subscribe(() => this.router.navigate(['/authors']));
    }
  }
}
