import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'oauth-callback',
    loadComponent: () =>
      import('@feature/auth/oauth-callback/oauth-callback').then((m) => m.OauthCallback),
  },
];
