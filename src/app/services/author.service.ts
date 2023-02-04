import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IAuthor } from 'src/shared/models/IAuthor';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  constructor(private http: HttpClient) {}
  getAuthorsFromServer(): Observable<IAuthor[]> {
    return this.http
      .get<{ [id: string]: IAuthor }>(
        'https://foodmine-bc936-default-rtdb.firebaseio.com/authors.json'
      )
      .pipe(
        map((authors) => {
          let authorsData: IAuthor[] = [];
          for (let id in authors) {
            authorsData.push({ ...authors[id], id });
          }
          return authorsData;
        })
      );
  }
  addAuthorToServer(author: IAuthor): Observable<IAuthor> {
    return this.http
      .post<{ id: string }>(
        `https://foodmine-bc936-default-rtdb.firebaseio.com/authors.json`,
        author
      )
      .pipe(
        map((id) => {
          console.log(id);

          return {
            name: author.name,
            id: id.id,
          };
        })
      );
  }
  updateAuthorToServer(author: IAuthor): Observable<IAuthor> {
    return this.http.patch<IAuthor>(
      `https://foodmine-bc936-default-rtdb.firebaseio.com/authors/${author.id}.json`,
      author
    );
  }
  getAuthorFromServer(id: string): Observable<IAuthor> {
    return this.http.get<IAuthor>(
      `https://foodmine-bc936-default-rtdb.firebaseio.com/authors/${id}.json`
    );
  }
}
