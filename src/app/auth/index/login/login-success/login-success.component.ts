import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
@Component({
  selector: 'app-login-success',
  templateUrl: './login-success.component.html',
  styleUrls: ['./login-success.component.scss'],
})
export class LoginSuccessComponent implements OnInit {
  constructor(public dialog: MatDialog, private router: Router) {}

  someAction() {
    this.router.navigate(['/main/dashboards']);
    this.dialog.closeAll();
  }

  ngOnInit(): void {}
}
