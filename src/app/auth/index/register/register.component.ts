import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UsersService } from '../../../users.service';
import { User } from '../../../user';

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
    public usersService: UsersService
  ) {}

  public formGroup: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  private subscription = this.usersService.getUsers().subscribe((data) => {
    this.usersService.users = data;
  });

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(): void {}
}
