import { importType } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  FormGroup,
  FormControl,
  Validators,
  EmailValidator,
  Form,
} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UsersService } from '../../../users.service';
import { Subscription } from 'rxjs';
import { User } from '../../../user';
import { Router } from '@angular/router';

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
    private usersService: UsersService,
    private router: Router
  ) {}

  private getSub: Subscription = new Subscription();
  emailCheck: boolean = false;
  passwordCheck: boolean = false;
  formGroup: FormGroup = new FormGroup({});
  users: User[] = [];

  ngOnInit(): void {
    this.getSub = this.usersService.getUsers().subscribe((data) => {
      this.users = data;
      console.log(this.users);
    });
    this.formGroup = this.formBuilder.group({
      email: [
        null,
        [Validators.required, Validators.email, this.uniqueEmail(this.users)],
      ],
      password: [null, [Validators.required, this.uniquePassword(this.users)]],
    });
  }

  ngOnDestroy(): void {
    this.getSub.unsubscribe();
  }

  uniqueEmail = (users: User[]) => {
    return (control: FormControl): { [key: string]: any } | null => {
      console.log(control.value);
      if (!control.value) {
        return null;
      }
      if (this.users.find((user) => user.email == control.value)) {
        console.log('ISti mejl');
        this.emailCheck = false;
      } else {
        this.emailCheck = true;
      }
      return {};
    };
  };

  uniquePassword = (users: User[]) => {
    return (control: FormControl): { [key: string]: any } | null => {
      console.log(control.value);
      if (!control.value) {
        return null;
      }
      if (this.users.find((user) => user.password == control.value)) {
        console.log('ISti password');
        this.passwordCheck = false;
      } else {
        this.passwordCheck = true;
      }
      return {};
    };
  };

  onSubmit(): void {
    for (let user of this.users) {
      if (
        user.email == this.formGroup.value.email &&
        user.password == this.formGroup.value.password
      ) {
        localStorage.setItem('UserLoggedIn', JSON.stringify(user));
        this.router.navigate(['/main']);
        alert('You have successfully logged in!');
        this.dialog.closeAll();
      }
    }
  }
}
