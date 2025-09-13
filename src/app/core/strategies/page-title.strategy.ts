import { DefaultTitleStrategy, RouterStateSnapshot } from '@angular/router';
import { environment } from '@env/environment';

export class PageTitleStrategy extends DefaultTitleStrategy {
  override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    const { appName } = environment;

    if (title) {
      this.title.setTitle(`${title} | ${appName}`);
    }
  }
}
