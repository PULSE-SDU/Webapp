import { Routes } from '@angular/router';

export const routes: Routes = [
  // TODO: add real routes here (remove redirect to) and do:
  // example:  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard', redirectTo: '' },
  { path: 'tag-list', redirectTo: '' },
  { path: 'analytics', redirectTo: '' },
  { path: '**', redirectTo: '' },
];
