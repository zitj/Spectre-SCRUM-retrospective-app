import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(public http: HttpClient) {}

  url = environment.url;
  users: User[] = [];

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }
}
