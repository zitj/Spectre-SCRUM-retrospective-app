import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UsersService } from '../../../users.service';
import { Subscription } from 'rxjs';
import { User } from '../../../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  hidePassword: boolean = false;
  emailCheck: boolean = false;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private usersService: UsersService
  ) {}

  private getSub: Subscription = new Subscription();
  private postSub: Subscription = new Subscription();
  formGroup: FormGroup = new FormGroup({});
  users: User[] = [];

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
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
    for (let user of this.users) {
      if (user.email === this.formGroup.value.email) {
        this.emailCheck = true;
        return;
      }
    }

    this.postSub = this.usersService
      .postUser(this.formGroup.value)
      .subscribe((data) => {
        alert('You have successfully created a new account!');
      });

    this.dialog.closeAll();
  }
}
