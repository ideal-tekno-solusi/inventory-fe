import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { Auth } from '../auth/services/auth';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        const isExpired = err.error.message.includes('expired');
        if (isExpired) {
          return auth.refreshToken().pipe(
            switchMap(() => {
              const cloned = req.clone();
              return next(cloned);
            }),
          );
        }
      }
      return throwError(() => err);
    }),
  );
};
