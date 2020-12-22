import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UsersService } from '../../../users.service';
import { Subscription } from 'rxjs';
import { LoginSuccessComponent } from './login-success/login-success.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  hidePassword: boolean = true;
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private usersService: UsersService
  ) {}

  private getSub: Subscription = new Subscription();
  formGroup: FormGroup = new FormGroup({});
  credentialsInvalid: boolean = false;

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.getSub.unsubscribe();
  }

  onSubmit(): void {
    this.getSub = this.usersService.getUsers().subscribe((data) => {
      let users = data;
      for (let user of users) {
        if (
          user.email === this.formGroup.value.email &&
          user.password === this.formGroup.value.password
        ) {
          localStorage.setItem('UserLoggedIn', JSON.stringify(user));
          this.dialog.open(LoginSuccessComponent, {
            panelClass: 'loginSuccesContainer',
          });
        } else {
          this.credentialsInvalid = true;
        }
      }
    });
  }
}
