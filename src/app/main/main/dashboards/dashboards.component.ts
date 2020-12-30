import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateDashboardComponent } from './create-dashboard/create-dashboard.component';
import { Subscription } from 'rxjs';
import { Team } from '../../../team';
import { User } from '../../../user';
import { TeamsService } from '../../../teams.service';
import { AlertComponent } from './alert/alert.component';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss'],
})
export class DashboardsComponent implements OnInit {
  constructor(private dialog: MatDialog, private teamsService: TeamsService) {}
  private getTeams: Subscription = new Subscription();
  userLoggedIn: User = JSON.parse(localStorage.getItem('UserLoggedIn') || '{}');
  teams: Team[] = [];
  canCreateDashboard: boolean = false;

  ngOnInit(): void {
    this.getTeams = this.teamsService.getTeams().subscribe((data) => {
      this.teams = data;
      console.log(this.teams);
    });
  }

  openPanel() {
    this.dialog.open(CreateDashboardComponent, {
      panelClass: 'createDashboardPanel',
    });
    this.canCreateDashboard = true;
  }

  openCreateDashboardPanel(): void {
    for (let team of this.teams) {
      if (this.userLoggedIn.id == team.creatorId) {
        this.openPanel();
      }
      for (let member of team.memberId) {
        if (this.userLoggedIn.id == member) {
          this.openPanel();
        }
      }
    }
    if (!this.canCreateDashboard) {
      this.dialog.open(AlertComponent, {
        panelClass: 'alert',
      });
    }
  }

  openDashboard(): void {
    console.log('Open individual dashboard');
  }
}
