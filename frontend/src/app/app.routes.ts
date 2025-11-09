import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tag-list', redirectTo: '' },
  { path: 'analytics', redirectTo: '' },
  { path: '**', redirectTo: '' },
];
