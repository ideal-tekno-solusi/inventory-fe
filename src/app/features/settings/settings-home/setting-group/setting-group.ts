import { Component, input } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { SettingItem } from '../setting-item/setting-item';
import { SettingItemType } from '../../settings.type';

@Component({
  selector: 'app-setting-group',
  imports: [TranslocoModule, SettingItem],
  templateUrl: './setting-group.html',
})
export class SettingGroup {
  readonly name = input.required<string>();
  readonly children = input<SettingItemType[]>([]);
}
