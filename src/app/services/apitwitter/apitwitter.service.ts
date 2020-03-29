import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ITrends } from '../../models/trends';

@Injectable({ providedIn: 'root' })
export class ApiTwitterService {

  private url = 'http://localhost:8080';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }



  getTrends(): Observable<ITrends[]> {
    return this.http.get<ITrends[]>(this.url + "/trends?id=23424747");
  }


}