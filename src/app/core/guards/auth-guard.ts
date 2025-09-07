import { CanActivateChildFn } from '@angular/router';
import { UserStore } from '../auth/store/user.store';
import { inject } from '@angular/core';
import { AppInit } from '../services/app-init';

export const authGuard: CanActivateChildFn = async () => {
  const appInit = inject(AppInit);
  const user = inject(UserStore);

  await appInit.waitUntilInitialized();

  return user.isLoggedIn();
};
