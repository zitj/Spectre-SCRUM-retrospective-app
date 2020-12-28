import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from './team';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  url = environment.url;
  panel: string = '';

  constructor(public http: HttpClient) {}

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.url + 'teams');
  }
  createTeam(arg: Team): Observable<Team[]> {
    return this.http.post<Team[]>(this.url + 'teams', arg);
  }
  deleteTeam(teamId: number): Observable<Team[]> {
    return this.http.delete<Team[]>(this.url + 'teams' + `/${teamId}`);
  }
  updateTeam(teamId: number, arg: Team): Observable<Team[]> {
    return this.http.put<Team[]>(this.url + 'teams' + `/${teamId}`, arg);
  }
}
