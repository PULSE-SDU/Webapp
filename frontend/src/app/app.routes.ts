import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  // TODO: add real routes here (remove redirect to) and do:
  // example:  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tag-list', redirectTo: '' },
  { path: 'analytics', redirectTo: '' },
  { path: '**', redirectTo: 'dashboard' },
];
