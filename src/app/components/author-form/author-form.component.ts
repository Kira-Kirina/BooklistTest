import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorFormComponent implements OnInit {
  authorForm = new FormGroup({
    author: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  chekAuthor!: string;
  editedAuthor$ = this.route.paramMap.pipe(
    map((paramMap) => {
      let author = paramMap.get('author');
      if (author) {
        this.chekAuthor = author;
      }
      this.bookService.selectAuthor(author + '');
      return author;
    })
  );
  author$ = this.bookService.getAuthor().pipe(
    tap((author) => {
      this.authorForm.patchValue({ author: author });
    })
  );

  authorModel$ = combineLatest([this.editedAuthor$, this.author$]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {}
  submit() {
    if (!this.authorForm.valid) return;

    if (this.chekAuthor) {
      // this.bookService.updateAuthor(this.authorForm.value.author!);
      // console.log(this.authorForm.value.author);
      console.log('update');
    } else {
      if (this.authorForm.value.author) {
        this.bookService.addAuthor(this.authorForm.value.author);
      }
    }

    this.router.navigateByUrl('/authors');
  }
}
