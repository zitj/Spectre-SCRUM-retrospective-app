import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { TeamsService } from '../../../../teams.service';
import { Subscription } from 'rxjs';
import { User } from '../../../../user';
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

  private getSub: Subscription = new Subscription();
  private postSub: Subscription = new Subscription();
  formGroup: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      industry: ['', [Validators.required]],
      creatorId: JSON.parse(localStorage.getItem('UserLoggedIn') || '{}').id,
      memberId: '',
      isAdmin: false,
    });

    this.getSub = this.usersService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
    this.getSub.unsubscribe();
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
    this.postSub = this.teamsService
      .createTeam(this.formGroup.value)
      .subscribe((data) => {
        this.dialog.open(CreateTeamSuccessComponent, {
          panelClass: 'createTeamSuccess',
        });
      });
  }
}
