import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide: boolean = false;

  constructor(public dialog: MatDialog) {}

  user = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}

  onSubmit(): void {
    console.log(this.user.value);
  }

  myClickHandler($event: any): void {
    $event.preventDefault();
    this.hide = !this.hide;
  }

  closeBtnHandler($event: any): void {
    $event.preventDefault();
    this.dialog.closeAll();
  }
}
