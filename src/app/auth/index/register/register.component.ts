import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UsersService } from '../../../users.service';
import { Subscription } from 'rxjs';
import { User } from '../../../user';
import { RegisterSuccessComponent } from './register-success/register-success.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  hidePassword: boolean = false;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private usersService: UsersService
  ) {}

  private getSub: Subscription = new Subscription();
  private postSub: Subscription = new Subscription();
  formGroup: FormGroup = new FormGroup({});
  users: User[] = [];
  emailErrMsg: string = 'Email is required';

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, this.uniqueEmail(this.users)],
      ],
      password: ['', [Validators.required]],
    });
    this.getSub = this.usersService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  ngOnDestroy(): void {
    this.getSub.unsubscribe();
    this.postSub.unsubscribe();
  }

  onSubmit(): void {
    this.postSub = this.usersService
      .postUser(this.formGroup.value)
      .subscribe((data) => {
        this.dialog.open(RegisterSuccessComponent, {
          panelClass: 'registerSuccessContainer',
        });
      });
  }

  uniqueEmail(users: User[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      for (let user of this.users) {
        if (user.email == control.value) {
          this.emailErrMsg = 'This email already exists';
          return { uniqueEmail: false };
        }
      }
      if (!control.value) {
        this.emailErrMsg = 'Email is required';
        return { uniqueEmail: false };
      }
      return null;
    };
  }
}
