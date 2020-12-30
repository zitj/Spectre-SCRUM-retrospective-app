import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormBuilder,
} from '@angular/forms';
import { User } from '../../../../user';
import { Team } from '../../../../team';
import { Subscription } from 'rxjs';
import { DashboardsService } from '../../../../dashboards.service';
import { TeamsService } from '../../../../teams.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

interface Template {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-dashboard',
  templateUrl: './create-dashboard.component.html',
  styleUrls: ['./create-dashboard.component.scss'],
})
export class CreateDashboardComponent implements OnInit, OnDestroy {
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private dashboardsService: DashboardsService,
    private teamsService: TeamsService,
    private router: Router,
    private location: Location
  ) {}

  userLoggedIn: User = JSON.parse(localStorage.getItem('UserLoggedIn') || '{}');
  formGroup: FormGroup = new FormGroup({});
  teams: Team[] = [];
  teamId: number = 99;

  private postSub: Subscription = new Subscription();
  private getTeams: Subscription = new Subscription();

  templates: Template[] = [
    { value: 'pros and cons', viewValue: 'Pros and cons' },
    { value: 'start stop continue', viewValue: 'Start - stop - continue' },
  ];

  ngOnInit(): void {
    console.log(this.dashboardsService.myTeamId);
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      template: ['', [Validators.required]],
      teamId: this.dashboardsService.myTeamId,
      teamName: this.dashboardsService.myTeamName,
      creatorId: this.userLoggedIn.id,
    });
  }

  ngOnDestroy(): void {}

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
    this.postSub = this.dashboardsService
      .createDashboard(this.formGroup.value)
      .subscribe((data) => {
        this.refresh();
        this.dialog.closeAll();
      });
  }
}
