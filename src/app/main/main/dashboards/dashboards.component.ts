import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateDashboardComponent } from './create-dashboard/create-dashboard.component';
import { Subscription } from 'rxjs';
import { Team } from '../../../team';
import { Dashboard } from '../../../dashboard';
import { User } from '../../../user';
import { TeamsService } from '../../../teams.service';
import { DashboardsService } from '../../../dashboards.service';
import { AlertComponent } from './alert/alert.component';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss'],
})
export class DashboardsComponent implements OnInit, OnDestroy {
  constructor(
    private dialog: MatDialog,
    private teamsService: TeamsService,
    private dashboardsService: DashboardsService
  ) {}
  private getTeams: Subscription = new Subscription();
  private getDashboards: Subscription = new Subscription();
  userLoggedIn: User = JSON.parse(localStorage.getItem('UserLoggedIn') || '{}');
  teams: Team[] = [];
  dashboards: Dashboard[] = [];
  showDashboards: Dashboard[] = [];
  canCreateDashboard: boolean = false;
  teamIds: Array<number> = [];

  ngOnInit(): void {
    this.getTeams = this.teamsService.getTeams().subscribe((data) => {
      this.teams = data;
      for (let team of this.teams) {
        if (this.userLoggedIn.id == team.creatorId) {
          this.teamIds.push(team.id);
        }
        for (let member of team.memberId) {
          if (this.userLoggedIn.id == member) {
            this.teamIds.push(team.id);
          }
        }
      }

      this.getDashboards = this.dashboardsService
        .getDashboards()
        .subscribe((data) => {
          this.dashboards = data;

          for (let teamId of this.teamIds) {
            this.dashboards.forEach((dashboard) => {
              if (dashboard.teamId == teamId) {
                this.showDashboards.push(dashboard);
              }
            });
          }
        });
    });
  }
  ngOnDestroy(): void {
    this.getTeams.unsubscribe();
    this.getDashboards.unsubscribe();
  }

  newDashboardInfo(id: number, name: string): void {
    this.canCreateDashboard = true;
    this.dashboardsService.myTeamId = id;
    this.dashboardsService.myTeamName = name;
  }

  openCreateDashboardPanel(): void {
    for (let team of this.teams) {
      if (this.userLoggedIn.id == team.creatorId) {
        this.newDashboardInfo(team.id, team.name);
      }
      for (let member of team.memberId) {
        if (this.userLoggedIn.id == member) {
          this.newDashboardInfo(team.id, team.name);
        }
      }
    }

    if (!this.canCreateDashboard) {
      this.dialog.open(AlertComponent, {
        panelClass: 'alert',
      });
    } else {
      this.dialog.open(CreateDashboardComponent, {
        panelClass: 'createDashboardPanel',
      });
    }
  }

  openDashboard(): void {
    console.log('Open individual dashboard');
  }
}
