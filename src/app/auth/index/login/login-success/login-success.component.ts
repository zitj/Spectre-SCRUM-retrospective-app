import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-success',
  templateUrl: './login-success.component.html',
  styleUrls: ['./login-success.component.scss'],
})
export class LoginSuccessComponent implements OnInit {
  constructor(public dialog: MatDialog, private router: Router) {}

  navigateToMain(): void {
    this.router.navigate(['main/teams']);
    this.dialog.closeAll();
  }

  ngOnInit(): void {}
}
