import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-team-success',
  templateUrl: './create-team-success.component.html',
  styleUrls: ['./create-team-success.component.scss'],
})
export class CreateTeamSuccessComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {}

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
