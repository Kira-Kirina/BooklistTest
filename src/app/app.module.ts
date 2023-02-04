import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BooklistComponent } from './components/booklist/booklist.component';

import { BookComponent } from './components/book/book.component';
import { BooksComponent } from './components/books/books.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { AuthorsComponent } from './components/authors/authors.component';
import { AuthorFormComponent } from './components/author-form/author-form.component';
import { MatDividerModule } from '@angular/material/divider';

import { HttpClientModule } from '@angular/common/http';
// import { MatSliderModule } from '@angular/material/slider';
@NgModule({
  declarations: [
    AppComponent,
    BooklistComponent,
    BookComponent,
    BooksComponent,
    BookCardComponent,
    AuthorsComponent,
    AuthorFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSliderModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
