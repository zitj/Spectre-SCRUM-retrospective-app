import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { environment } from '../environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(public http: HttpClient) {}

  url = environment.url;
  users: User[] = [];

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + 'users');
  }

  postUser(arg: FormGroup) {
    this.http.post(this.url + 'users', arg.value).subscribe((data) => {});
  }
}
