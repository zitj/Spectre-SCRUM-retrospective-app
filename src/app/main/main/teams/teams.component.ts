import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateTeamComponent } from './create-team/create-team.component';
import { TeamsService } from '../../../teams.service';
import { Subscription } from 'rxjs';
import { Team } from '../../../team';
import { DeleteTeamComponent } from './delete-team/delete-team.component';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit, OnDestroy {
  constructor(public dialog: MatDialog, private teamsService: TeamsService) {}
  userLoggedIn = JSON.parse(localStorage.getItem('UserLoggedIn') || '{}');
  teams: Team[] = [];
  private getSub: Subscription = new Subscription();

  ngOnInit(): void {
    this.getSub = this.teamsService.getTeams().subscribe((data) => {
      this.teams = data;
      for (let team of this.teams) {
        if (team.creatorId === this.userLoggedIn.id) {
          team.isAdmin = true;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.getSub.unsubscribe();
  }

  openDeleteTeamPanel() {
    this.dialog.open(DeleteTeamComponent, {
      panelClass: 'deleteTeamContainer',
    });
  }
  openCreateTeamPanel(): void {
    this.dialog.open(CreateTeamComponent, {
      panelClass: 'createTeamContainer',
    });
  }
}
