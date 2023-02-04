import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorFormComponent } from './components/author-form/author-form.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { BooksComponent } from './components/books/books.component';

const routes: Routes = [
  { path: '', component: BooksComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: 'author/add', component: AuthorFormComponent },
  { path: 'author/edit/:author', component: AuthorFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
