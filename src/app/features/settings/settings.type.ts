export interface SettingSectionType {
  name: string;
  permissions: string[];
  children: SettingGroupType[][];
}

export interface SettingGroupType {
  name: string;
  permissions: string[];
  children: SettingItemType[];
}

export interface SettingItemType {
  name: string;
  permissions: string[];
  children?: SettingItemType[];
  url?: string;
}
