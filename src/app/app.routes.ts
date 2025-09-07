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
        title: 'Dashboard | IMaS',
        path: 'dashboard',
        loadComponent: () => import('@feature/dashboard/dashboard').then((c) => c.Dashboard),
      },
    ],
  },
  {
    path: '**',
    title: 'Page Not Found | IMaS',
    loadComponent: () => import('@feature/error/not-found/not-found').then((c) => c.NotFound),
  },
];
