import { inject, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, firstValueFrom } from 'rxjs';
import { Auth } from '../auth/services/auth';

@Injectable({
  providedIn: 'root',
})
export class AppInit {
  private readonly auth = inject(Auth);

  private readonly initialized = signal(false);
  readonly isInitialized = this.initialized.asReadonly();

  constructor() {
    const skipUrls = ['/oauth-callback'];
    if (!skipUrls.includes(window.location.pathname)) {
      this.init();
    }
  }

  async init() {
    await this.auth.loadUserAndPermissions();
    this.initialized.set(true);
  }

  async waitUntilInitialized(): Promise<void> {
    if (this.initialized()) return;
    await firstValueFrom(toObservable(this.initialized).pipe(filter(Boolean)));
  }
}
