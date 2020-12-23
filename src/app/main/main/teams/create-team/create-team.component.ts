import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { TeamsService } from '../../../../teams.service';
import { Subscription } from 'rxjs';
import { Team } from '../../../../team';
import { User } from '../../../../user';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UsersService } from '../../../../users.service';

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
  cars = [
    { name: 'volvo', id: 1 },
    { name: 'lada', id: 2 },
    { name: 'mercedes', id: 3 },
  ];

  private getSub: Subscription = new Subscription();
  private postSub: Subscription = new Subscription();
  formGroup: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.getUsers();
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      industry: ['', [Validators.required]],
      creatorId: JSON.parse(localStorage.getItem('UserLoggedIn') || '{}').id,
      memberId: '',
    });
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
  }

  getUsers(): void {
    this.getSub = this.usersService.getUsers().subscribe((data) => {
      this.users = data;
      console.log(this.users);
    });
  }

  selectMembers(event: any): void {
    this.formGroup.patchValue({
      selectedMember: event.target.value,
    });
  }

  // onChange(event: any): void {
  //   if (event.option.selected) {
  //   }
  // }

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
        alert('You have successfully created a new team!');
        this.dialog.closeAll();
        this.refresh();
      });
  }
}
