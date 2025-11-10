import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TagListComponent } from './pages/tag-list/tag-list.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tag-list', component: TagListComponent },
  { path: 'analytics', redirectTo: '' },
  { path: '**', redirectTo: '' },
];
