import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  FormGroup,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormBuilder,
} from '@angular/forms';
import { User } from '../../../../user';
import { Team } from '../../../../team';

interface Template {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-dashboard',
  templateUrl: './create-dashboard.component.html',
  styleUrls: ['./create-dashboard.component.scss'],
})
export class CreateDashboardComponent implements OnInit {
  constructor(public dialog: MatDialog, private formBuilder: FormBuilder) {}
  userLoggedIn: User = JSON.parse(localStorage.getItem('UserLoggedIn') || '{}');
  formGroup: FormGroup = new FormGroup({});

  templates: Template[] = [
    { value: 'pros-and-cons', viewValue: 'Pros and cons' },
    { value: 'start-stop-continue', viewValue: 'Start - stop - continue' },
  ];

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      template: ['', [Validators.required]],
    });
  }
  onSubmit(): void {
    console.log('submited!');
  }
  selectTemplate(event: any): void {
    this.formGroup.patchValue({
      selectedTemplate: event.target.value,
    });
  }
}
