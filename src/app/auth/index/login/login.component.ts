import { importType } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UsersService } from '../../../users.service';
import { Subscription } from 'rxjs';
import { User } from '../../../user';
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
  emailCheck: boolean = false;
  passwordCheck: boolean = false;
  formGroup: FormGroup = new FormGroup({});
  users: User[] = [];

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
      this.users = data;
      for (let user of this.users) {
        if (
          user.email == this.formGroup.value.email &&
          user.password == this.formGroup.value.password
        ) {
          localStorage.setItem('UserLoggedIn', JSON.stringify(user));
          this.dialog.open(LoginSuccessComponent);
        } else {
          this.emailCheck = true;
          this.passwordCheck = true;
        }
      }
    });
  }
}
