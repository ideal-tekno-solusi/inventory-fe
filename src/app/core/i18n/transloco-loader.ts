import { inject, Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);

  getTranslation(lang: string, data?: { scope: string }) {
    const loc = data?.scope ? lang.replace(`${data.scope}/`, '') : lang;

    if (data?.scope) return this.http.get<Translation>(`/assets/i18n/${loc}/${data?.scope}.json`);
    return this.http.get<Translation>(`/assets/i18n/${loc}/common.json`);
  }
}
