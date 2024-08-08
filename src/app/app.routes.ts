import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CarListComponent } from './components/car-list/car-list.component';

export const routes: Routes = [
  { path: 'car-list', component: CarListComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
