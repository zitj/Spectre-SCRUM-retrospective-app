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

  openSignUpForm(): void {
    this.dialog.open(RegisterComponent, {
      panelClass: 'registerContainer',
    });
  }
  openSignInForm(): void {
    this.dialog.open(LoginComponent, {
      panelClass: 'loginContainer',
    });
  }
}
