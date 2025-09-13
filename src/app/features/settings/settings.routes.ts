import { Routes } from '@angular/router';

export const settingsRoutes: Routes = [
  {
    title: 'Settings',
    path: '',
    loadComponent: () => import('./settings-list/settings-list').then((m) => m.SettingsList),
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
