import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { TagsBrowser } from './modules/tags-page/components/tags-browser/tags-browser';

export const routes: Routes = [
  // TODO: add real routes here (remove redirect to) and do:
  // example:  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tag-list', component: TagsBrowser },
  { path: 'analytics', redirectTo: '' },
  { path: '**', redirectTo: 'dashboard' },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
