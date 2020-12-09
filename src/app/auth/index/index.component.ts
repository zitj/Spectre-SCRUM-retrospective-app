import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openSignUpForm() {
    return this.dialog.open(RegisterComponent);
  }
  openSignInForm() {
    return this.dialog.open(LoginComponent);
  }
}
