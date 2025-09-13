import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';
import { routes } from './app.routes';
import { withCredentialsInterceptor } from './core/interceptors/with-credentials-interceptor';
import { jwtInterceptor } from './core/interceptors/jwt-interceptor';
import { PageTitleStrategy } from './core/strategies/page-title.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: TitleStrategy, useClass: PageTitleStrategy },
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([withCredentialsInterceptor, jwtInterceptor])),
  ],
};
