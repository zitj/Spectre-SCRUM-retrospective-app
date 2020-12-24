import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardsComponent } from './main/dashboards/dashboards.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './main/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TeamsComponent } from './main/teams/teams.component';
import { StatisticsComponent } from './main/statistics/statistics.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MainComponent } from './main/main.component';
import { MainGuard } from './main.guard';

const routes = [
  {
    path: '',
    component: MainComponent,
    canLoad: [MainGuard],
    children: [
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
    ],
  },
  {
    path: '**',
    redirectTo: '/main',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [
    DashboardsComponent,
    HeaderComponent,
    TeamsComponent,
    StatisticsComponent,
    MainComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    RouterModule.forChild(routes),
  ],
})
export class MainModule {}
