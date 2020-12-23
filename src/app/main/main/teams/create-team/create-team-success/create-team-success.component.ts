import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-team-success',
  templateUrl: './create-team-success.component.html',
  styleUrls: ['./create-team-success.component.scss'],
})
export class CreateTeamSuccessComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}
}
