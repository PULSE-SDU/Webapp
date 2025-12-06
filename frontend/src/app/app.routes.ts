import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TagsBrowser } from './pages/tags/components/tags-browser/tags-browser';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tag-list', component: TagsBrowser },
  { path: 'analytics', redirectTo: 'dashboard' },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' },
];
