import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';

const routes = [
  {
    path: 'dashboards',
    component: DashboardsComponent,
  },
];

@NgModule({
  declarations: [DashboardsComponent, HeaderComponent],
  imports: [CommonModule, MatToolbarModule, RouterModule.forChild(routes)],
})
export class MainModule {}
