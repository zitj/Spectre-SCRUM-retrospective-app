import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { TeamsService } from '../../../../teams.service';
import { Subscription } from 'rxjs';
import { User } from '../../../../user';
import { Team } from '../../../../team';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from '../../../../users.service';
import { CreateTeamSuccessComponent } from './create-team-success/create-team-success.component';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss'],
})
export class CreateTeamComponent implements OnInit, OnDestroy {
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private teamsService: TeamsService,
    private router: Router,
    private location: Location,
    private usersService: UsersService
  ) {}

  users: Array<User> = [];
  teams: Array<Team> = [];

  filteredUsers: Array<User> = [];

  private getUsers: Subscription = new Subscription();
  private getTeams: Subscription = new Subscription();
  private postSub: Subscription = new Subscription();
  private updateSub: Subscription = new Subscription();

  userLoggedIn: User = JSON.parse(localStorage.getItem('UserLoggedIn') || '{}');
  formGroup: FormGroup = new FormGroup({});
  teamNameErrMsg: string = 'Team name is required';
  teamId: number = 99;
  heading: string = '';

  ngOnInit(): void {
    this.heading = this.teamsService.panel;

    this.getTeams = this.teamsService.getTeams().subscribe((data) => {
      this.teams = data;

      for (let team of this.teams) {
        if (team.creatorId === this.userLoggedIn.id) {
          this.teamId = team.id;
        }
      }
    });

    this.getUsers = this.usersService.getUsers().subscribe((data) => {
      this.users = data.filter((user) => user.id !== this.userLoggedIn.id);
    });

    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, this.uniqueTeamName(this.teams)]],
      industry: ['', [Validators.required]],
      creatorId: this.userLoggedIn.id,
      memberId: [''],
      isAdmin: false,
    });
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
    this.getUsers.unsubscribe();
    this.getTeams.unsubscribe();
    this.updateSub.unsubscribe();
  }

  uniqueTeamName(teams: Team[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      for (let team of this.teams) {
        if (team.name.toLowerCase() == control.value.toLowerCase()) {
          this.teamNameErrMsg = 'This team already exists';
          return { uniqueTeamName: false };
        }
      }
      if (!control.value) {
        this.teamNameErrMsg = 'Team name is required';
        return { uniqueTeamName: false };
      }
      return null;
    };
  }

  selectMembers(event: any): void {
    this.formGroup.patchValue({
      selectedMember: event.target.value,
    });
  }

  refresh(): void {
    this.router
      .navigateByUrl('main', {
        skipLocationChange: true,
      })
      .then(() => {
        this.router.navigate([decodeURI(this.location.path())]);
      });
  }

  onSubmit(): void {
    if (this.teamsService.panel === 'Edit') {
      this.updateSub = this.teamsService
        .updateTeam(this.teamId, this.formGroup.value)
        .subscribe((data) => {});
      this.dialog.closeAll();
      this.refresh();
    }

    if (this.teamsService.panel === 'Create') {
      this.postSub = this.teamsService
        .createTeam(this.formGroup.value)
        .subscribe((data) => {
          this.dialog.open(CreateTeamSuccessComponent, {
            panelClass: 'createTeamSuccess',
          });
        });
    }
  }
}
