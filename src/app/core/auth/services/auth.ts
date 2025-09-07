import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse, JwtClaims } from '@app/types/api.type';
import { environment } from '@env/environment';
import { catchError, firstValueFrom, map, of, switchMap, tap, throwError, timer } from 'rxjs';
import { UserStore } from '../store/user.store';

const { clientId, ssoUrl } = environment;
const origin = window.location.origin;

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly PKCE_VERIFIER_LENGTH = 64;

  private readonly http = inject(HttpClient);
  private readonly userStore = inject(UserStore);

  getUser() {
    const endpoint = ssoUrl + '/user';
    return this.http.get<ApiResponse<JwtClaims>>(endpoint).pipe(map((res) => res.data || null));
  }

  getPermissions() {
    // TODO: to be implemented
    return of(['category.read', 'category.create', 'category.update', 'category.delete']);
  }

  loadUserAndPermissions() {
    return firstValueFrom(
      this.getUser().pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            return timer(1000).pipe(
              tap(() => this.requestLogin()),
              switchMap(() => throwError(() => err)),
            );
          }

          alert('ERR10121 ' + err.message);
          return throwError(() => err);
        }),
        switchMap((user: JwtClaims | null) => {
          if (user) {
            this.userStore.setUser(user);
            return this.getPermissions().pipe(
              tap((permissions: string[]) => {
                this.userStore.setPermissions(permissions);
              }),
            );
          }
          return of([]);
        }),
      ),
    );
  }

  async requestLogin() {
    const state = origin;
    const codeVerifier = this.generateCodeVerifier();

    try {
      const codeChallenge = await this.generateCodeChallenge(codeVerifier);
      const searchParams = {
        response_type: 'code',
        client_id: clientId,
        redirect_uri: origin + '/oauth-callback',
        scope: 'profile email',
        state,
        code_challenge: codeChallenge,
        code_challenge_method: 'S256',
      };
      const query = new URLSearchParams(searchParams).toString();
      const authUrl = ssoUrl + '/authorize?' + query;

      sessionStorage.setItem('state', state);
      sessionStorage.setItem('pkce_code_verifier', codeVerifier);

      window.location.href = authUrl;
    } catch (e) {
      alert('Error' + e);
    }
  }

  exchangeCodeForToken(code: string) {
    const tokenEndpoint = ssoUrl + '/token';
    const redirectUri = origin + '/oauth-callback';
    const codeVerifier = sessionStorage.getItem('pkce_code_verifier') || '';
    const payload = {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      code_verifier: codeVerifier,
    };

    return this.http.post<ApiResponse>(tokenEndpoint, payload);
  }

  private generateCodeVerifier() {
    const randomBytes = new Uint8Array(this.PKCE_VERIFIER_LENGTH);
    crypto.getRandomValues(randomBytes);
    return this.base64UrlEncode(randomBytes);
  }

  private async generateCodeChallenge(codeVerifier: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return this.base64UrlEncode(new Uint8Array(hash));
  }

  private base64UrlEncode(buffer: Uint8Array<ArrayBuffer>) {
    const base64 = btoa(String.fromCharCode(...buffer));
    return base64.replace(/-/g, '+').replace(/_/g, '/');
  }
}
