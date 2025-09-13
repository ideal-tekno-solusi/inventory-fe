import { Component, computed, inject } from '@angular/core';
import { UserStore } from '@app/core/auth/store/user.store';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-dashboard',
  imports: [TranslocoModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly userStore = inject(UserStore);
  protected user = computed(() => this.userStore.claims().sub);
}
