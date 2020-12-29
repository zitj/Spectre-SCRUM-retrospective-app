import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateDashboardComponent } from './create-dashboard/create-dashboard.component';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss'],
})
export class DashboardsComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openCreateDashboardPanel(): void {
    this.dialog.open(CreateDashboardComponent);
    console.log('Dashboard open');
  }
  openDashboard(): void {
    console.log('Open individual dashboard');
  }
}
