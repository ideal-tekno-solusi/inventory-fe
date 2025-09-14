import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Auth } from '@app/core/auth/services/auth';
import { AppInit } from '@app/core/services/app-init';

@Component({
  selector: 'app-oauth-callback',
  imports: [RouterModule],
  templateUrl: './oauth-callback.html',
})
export class OauthCallback implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly auth = inject(Auth);
  private readonly appInit = inject(AppInit);

  protected error = signal('');

  ngOnInit(): void {
    const state = this.route.snapshot.queryParamMap.get('state');
    const code = this.route.snapshot.queryParamMap.get('code');
    const sessionState = sessionStorage.getItem('state');

    if (state !== sessionState) {
      this.error.set('Session mismatch!');
      return;
    }

    if (!code) {
      this.error.set("Code isn't exist!");
      return;
    }

    this.auth.exchangeCodeForToken(code).subscribe({
      next: async () => {
        const redirectUrl = state ? new URL(state).pathname : '/';
        this.appInit.init();
        this.router.navigateByUrl(redirectUrl);
      },
      error: (err: HttpErrorResponse) => {
        this.error.set(err.message);
      },
    });
  }
}
