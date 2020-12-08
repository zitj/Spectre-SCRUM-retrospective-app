import { Component, OnInit } from '@angular/core';
import { DialogService } from '../dialog.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  constructor(public dialogService: DialogService) {}

  ngOnInit(): void {}

  openSignUpForm() {
    console.log('sign up form');
    this.dialogService.dialog.open(RegisterComponent);
  }
  openSignInForm() {
    console.log('sign in form');
    this.dialogService.dialog.open(LoginComponent);
  }
}
