import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TeamsService } from '../../../../teams.service';
import { Subscription } from 'rxjs';
import { Team } from '../../../../team';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-delete-team',
  templateUrl: './delete-team.component.html',
  styleUrls: ['./delete-team.component.scss'],
})
export class DeleteTeamComponent implements OnInit, OnDestroy {
  constructor(
    public dialog: MatDialog,
    private teamsService: TeamsService,
    private router: Router,
    private location: Location
  ) {}

  teams: Team[] = [];
  teamId: number = 90;
  teamName: string = '';

  private getSub: Subscription = new Subscription();
  private delSub: Subscription = new Subscription();
  userLoggedIn = JSON.parse(localStorage.getItem('UserLoggedIn') || '{}');

  ngOnInit(): void {
    this.getSub = this.teamsService.getTeams().subscribe((data) => {
      this.teams = data;
      for (let team of this.teams) {
        if (team.creatorId === this.userLoggedIn.id) {
          this.teamId = team.id;
          this.teamName = team.name;
        }
      }
    });
  }
  ngOnDestroy(): void {
    this.getSub.unsubscribe();
    this.delSub.unsubscribe();
  }

  deleteTeam(): void {
    this.delSub = this.teamsService
      .deleteTeam(this.teamId)
      .subscribe((data) => {
        this.refresh();
      });
  }

  refresh(): void {
    this.router
      .navigateByUrl('main', {
        skipLocationChange: true,
      })
      .then(() => {
        this.router.navigate([decodeURI(this.location.path())]);
        this.dialog.closeAll();
      });
  }
}
