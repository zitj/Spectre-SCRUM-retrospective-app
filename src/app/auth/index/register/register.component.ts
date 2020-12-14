import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UsersService } from '../../../users.service';
import { Subscription } from 'rxjs';

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

  private sub: Subscription = new Subscription();
  formGroup: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.sub = this.usersService.getUsers().subscribe((data) => {
      this.usersService.users = data;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit(): void {
    for (let user of this.usersService.users) {
      if (user.email === this.formGroup.value.email) {
        this.emailCheck = true;
        alert('The user with this email already exists.');
        return;
      }
    }
    alert('You have successfully created a new account!');
    this.usersService.postUser(this.formGroup);
    this.dialog.closeAll();
  }
}
