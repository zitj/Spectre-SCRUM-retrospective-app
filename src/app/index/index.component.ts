import { Component, OnInit } from '@angular/core';
import { DialogService } from '../dialog.service';
import { LogInFormComponent } from '../log-in-form/log-in-form.component';
import { RegisterFormComponent } from '../register-form/register-form.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  constructor(public dialogService: DialogService) {
    this.dialogService = dialogService;
  }
  ngOnInit(): void {}

  openSignInForm() {
    this.dialogService.dialog.open(RegisterFormComponent);
  }
  openLogInForm() {
    this.dialogService.dialog.open(LogInFormComponent);
  }
}
