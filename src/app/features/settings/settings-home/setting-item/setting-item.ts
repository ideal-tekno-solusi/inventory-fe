import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { SettingItemType } from '../../settings.type';

@Component({
  selector: 'app-setting-item',
  imports: [RouterModule, TranslocoModule],
  templateUrl: './setting-item.html',
})
export class SettingItem {
  readonly name = input.required<string>();
  readonly url = input<string>();
  readonly children = input<SettingItemType[]>([]);
}
