import { Component, computed, inject } from '@angular/core';
import { UserStore } from '@app/core/auth/store/user.store';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dashboard',
  imports: [TranslocoModule, ButtonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly userStore = inject(UserStore);
  protected user = computed(() => this.userStore.claims().sub);

  toggleMode() {
    document.querySelector('html')!.classList.toggle('dark-mode');
  }
}
