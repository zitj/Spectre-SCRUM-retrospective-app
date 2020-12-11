import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { DataService } from '../../../data.service';
import { Users } from '../../../users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hidePassword: boolean = false;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    public dataService: DataService
  ) {}

  public formGroup: FormGroup = new FormGroup({});
  users: Users[] = [];

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.dataService.getUsers().subscribe((data) => {
      this.users = data;
      console.log(this.users);
    });
  }

  onSubmit(): void {}
}
