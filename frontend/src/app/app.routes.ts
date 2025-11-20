import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TagsBrowser } from './pages/tags/components/tags-browser/tags-browser';

export const routes: Routes = [
  // TODO: add real routes here (remove redirect to) and do:
  // example:  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tag-list', redirectTo: 'dashboard' },
  { path: 'analytics', redirectTo: 'dashboard' },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
