import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TeamsComponent } from './teams/teams.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes = [
  {
    path: 'dashboards',
    component: DashboardsComponent,
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
  },

  {
    path: 'teams',
    component: TeamsComponent,
  },
];

@NgModule({
  declarations: [
    DashboardsComponent,
    HeaderComponent,
    TeamsComponent,
    StatisticsComponent,
  ],
  imports: [CommonModule, MatToolbarModule, RouterModule.forChild(routes)],
})
export class MainModule {}
