import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ITweet } from '../../models/tweet';

@Injectable({ providedIn: 'root' })
export class ApiTwitterService {

  private url = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  //Get all tweets
  getTweets(): Observable<ITweet[]> {
    return this.http.get<ITweet[]>(this.url + "/timeline?count=100")
      .pipe(
        map((data) => {
          data.forEach(element => {
            element.created_at = new Date(element.created_at);
          });
          return data;
        }),
        catchError(this.handleError<ITweet[]>('getTweets', []))
      );
  }

  //Get only one specific tweet (code needs to be adapted)
  getMovie(id: number): Observable<ITweet> {
    const url = `${this.url}/${id}`;
    return this.http.get<ITweet>(url).pipe(
      catchError(this.handleError<ITweet>(`getMovie id=${id}`))
    );
  }

  //Search tweets (code needs to be adapted)
  searchMovies(term: string): Observable<ITweet[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<ITweet[]>(`${this.url}/?title=${term}`).pipe(
      catchError(this.handleError<ITweet[]>('searchMovies', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}