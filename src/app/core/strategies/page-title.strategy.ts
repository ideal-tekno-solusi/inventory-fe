import { Injectable } from '@angular/core';
import { DefaultTitleStrategy, RouterStateSnapshot } from '@angular/router';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class PageTitleStrategy extends DefaultTitleStrategy {
  override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    const { appName } = environment;

    if (title) {
      this.title.setTitle(`${title} | ${appName}`);
    }
  }
}
