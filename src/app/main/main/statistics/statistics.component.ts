import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TeamsService } from '../../../teams.service';
import { DashboardsService } from '../../../dashboards.service';
import { Team } from '../../../team';
import { User } from '../../../user';
import { Dashboard } from '../../../dashboard';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  constructor(
    private teamsService: TeamsService,
    private dashboardsService: DashboardsService
  ) {}
  private getTeams: Subscription = new Subscription();
  private getDashboards: Subscription = new Subscription();
  teams: Team[] = [];
  dashboards: Dashboard[] = [];
  showDashboards: Dashboard[] = [];
  userLoggedIn: User = JSON.parse(localStorage.getItem('UserLoggedIn') || '{}');
  ngOnInit(): void {
    this.getTeams = this.teamsService.getTeams().subscribe((data) => {
      this.teams = data;
    });
  }
}
