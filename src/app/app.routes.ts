import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { authRoutes } from './core/auth/auth.routes';

export const routes: Routes = [
  ...authRoutes,
  {
    path: '',
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadComponent: () => import('@feature/dashboard/dashboard').then((c) => c.Dashboard),
      },
    ],
  },
];
