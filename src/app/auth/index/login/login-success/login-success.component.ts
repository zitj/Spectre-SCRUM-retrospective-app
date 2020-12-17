import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-login-success',
  templateUrl: './login-success.component.html',
  styleUrls: ['./login-success.component.scss'],
})
export class LoginSuccessComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}
}
