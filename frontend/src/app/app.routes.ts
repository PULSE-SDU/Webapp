import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TagsBrowser } from './pages/tags/components/tags-browser/tags-browser';
import { Analytics } from './pages/analytics/analytics/analytics';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tag-list', component: TagsBrowser },
  { path: 'analytics', component: Analytics },
  { path: '**', redirectTo: 'dashboard' },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
];
