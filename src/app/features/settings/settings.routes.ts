import { Routes } from '@angular/router';
import { provideTranslocoScope } from '@jsverse/transloco';

export const settingsRoutes: Routes = [
  {
    title: 'Settings',
    path: '',
    providers: [provideTranslocoScope('settings')],
    loadComponent: () => import('./settings-home/settings-home').then((m) => m.SettingsHome),
  },
  {
    path: '',
    loadComponent: () => import('./settings-layout/settings-layout').then((m) => m.SettingsLayout),
    children: [
      {
        title: 'Currency Settings',
        path: 'currency',
        loadComponent: () =>
          import('./currency-settings/currency-settings').then((m) => m.CurrencySettings),
      },
    ],
  },
];
