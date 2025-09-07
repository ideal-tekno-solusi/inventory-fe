import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Auth } from '@app/core/auth/services/auth';

@Component({
  selector: 'app-oauth-callback',
  imports: [RouterModule],
  templateUrl: './oauth-callback.html',
  styleUrl: './oauth-callback.scss',
})
export class OauthCallback implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly auth = inject(Auth);

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
      next: () => {
        window.location.href = state || '/';
      },
      error: (err: HttpErrorResponse) => {
        this.error.set(err.message);
      },
    });
  }
}
