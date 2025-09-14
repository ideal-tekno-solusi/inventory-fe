import { Component } from '@angular/core';
import { settingList } from './setting-list';
import { SettingSection } from './setting-section/setting-section';

@Component({
  selector: 'app-settings-home',
  imports: [SettingSection],
  templateUrl: './settings-home.html',
})
export class SettingsHome {
  protected readonly sections = settingList;
}
