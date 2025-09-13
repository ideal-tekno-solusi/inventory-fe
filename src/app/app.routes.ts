import { Routes } from '@angular/router';
import { provideTranslocoScope } from '@jsverse/transloco';
import { authRoutes } from './core/auth/auth.routes';
import { authGuard } from './core/guards/auth-guard';

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
        title: 'Dashboard',
        path: 'dashboard',
        loadComponent: () => import('@feature/dashboard/dashboard').then((m) => m.Dashboard),
        providers: [provideTranslocoScope('dashboard')],
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./features/settings/settings.routes').then((r) => r.settingsRoutes),
      },
    ],
  },
  {
    path: '**',
    title: 'Page Not Found',
    loadComponent: () => import('@feature/error/not-found/not-found').then((m) => m.NotFound),
  },
];
