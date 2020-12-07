import { Component, OnInit } from '@angular/core';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.scss'],
})
export class LogInFormComponent implements OnInit {
  hide: boolean = true;
  dialogService: DialogService;
  constructor(dialogService: DialogService) {
    this.dialogService = dialogService;
  }

  ngOnInit(): void {}
}
