import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from './users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(public http: HttpClient) {}

  url = 'http://localhost:3000/users';

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.url);
  }
}
