import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { TeamsService } from '../../../../teams.service';
import { Subscription } from 'rxjs';
import { Team } from '../../../../team';
import { Router } from '@angular/router';
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
    private router: Router
  ) {}

  private getSub: Subscription = new Subscription();
  private postSub: Subscription = new Subscription();
  formGroup: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      teamName: ['', [Validators.required]],
      teamIndustry: ['', [Validators.required]],
      creator: JSON.parse(localStorage.getItem('UserLoggedIn') || '{}'),
    });
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
    this.getSub.unsubscribe();
  }
  onSubmit(): void {
    this.postSub = this.teamsService
      .createTeam(this.formGroup.value)
      .subscribe((data) => {
        alert('You have successfully created a new team!');
        this.dialog.closeAll();
        this.getSub = this.teamsService.getTeams().subscribe((data) => {
          console.log(data);
        });
      });
  }
}
