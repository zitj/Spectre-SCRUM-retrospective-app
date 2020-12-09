import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: 'dashboards',
    component: DashboardsComponent,
  },
];

@NgModule({
  declarations: [DashboardsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class MainModule {}
