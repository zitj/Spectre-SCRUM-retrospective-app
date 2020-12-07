import { Component, OnInit } from '@angular/core';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  hide: boolean = true;
  dialogService: DialogService;
  constructor(dialogService: DialogService) {
    this.dialogService = dialogService;
  }

  ngOnInit(): void {}
}
