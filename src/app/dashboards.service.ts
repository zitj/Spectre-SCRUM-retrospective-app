import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dashboard } from './dashboard';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardsService {
  url = environment.url;
  myTeamId: number = 99;
  myTeamName: string = '';
  constructor(public http: HttpClient) {}

  getDashboards(): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>(this.url + 'dashboards');
  }

  createDashboard(arg: Dashboard): Observable<Dashboard[]> {
    return this.http.post<Dashboard[]>(this.url + 'dashboards', arg);
  }
}
