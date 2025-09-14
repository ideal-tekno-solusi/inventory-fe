import { Component, input } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { SettingGroupType } from '../../settings.type';
import { SettingGroup } from '../setting-group/setting-group';

@Component({
  selector: 'app-setting-section',
  imports: [TranslocoModule, SettingGroup],
  templateUrl: './setting-section.html',
})
export class SettingSection {
  readonly name = input.required<string>();
  readonly children = input<SettingGroupType[][]>([]);
}
