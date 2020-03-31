import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ITweet } from '../../models/tweet';
import { ISearch } from '../../models/search';
import { ITweetListConfiguration } from '../../models/tweetListConfiguration';
import { ITrends } from '../../models/trends';

@Injectable({ providedIn: 'root' })
export class ApiTwitterService {

  private url = 'http://localhost:8080';
  
  tweetListConfiguration: ITweetListConfiguration;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
    this.tweetListConfiguration = {
      hideNotVerified: false,
      hideNotFollowed: false,
      hideDefaultProfile: false,
      hideWithLink: false,
      hideTextTruncated: false
    }
  }

  getTweets(): Observable<ITweet[]> {
    return this.http.get<ITweet[]>(this.url + "/timeline?count=100")
      .pipe(
        map((data) => {
          data.forEach(element => {
            element.created_at = new Date(element.created_at);
          });
          return this.filterTweets(data);
        }),
        catchError(this.handleError<ITweet[]>('getTweets', []))
      );
  }

  searchTweets(term: string): Observable<ISearch> {
    const newTerm: string =  term.replace("#","%23");
    return this.http.get<ISearch>(`${this.url}/search/?q=${newTerm}&count=100`);
  }

  filterTweet(tweet: ITweet) {
    if (this.tweetListConfiguration.hideNotVerified && !tweet.user.verified) {
      return false;
    }
    if (this.tweetListConfiguration.hideNotFollowed && !tweet.user.following) {
      return false;
    }
    if (this.tweetListConfiguration.hideDefaultProfile && tweet.user.default_profile) {
      return false;
    }
    if (this.tweetListConfiguration.hideWithLink && tweet.entities.urls.length != 0) {
      return false;
    }
    if (this.tweetListConfiguration.hideTextTruncated && tweet.truncated) {
      return false;
    }
    return true;
  }

  filterTweets(data: ITweet[]) {
    const newArray = data.filter(element => this.filterTweet(element));
    return newArray;
  }

  getTweetListConfiguration(): ITweetListConfiguration {
    return this.tweetListConfiguration;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

  getTweet(id: string): Observable<ITweet> {
    const url = `${this.url}/show?id=${id}`;
    return this.http.get<ITweet>(url);
    console.log(url);
  }

  getTrends(): Observable<ITrends[]> {
    return this.http.get<ITrends[]>(this.url + "/trends?id=23424747");
  }

}