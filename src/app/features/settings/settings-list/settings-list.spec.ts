import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsList } from './settings-list';

describe('SettingsList', () => {
  let component: SettingsList;
  let fixture: ComponentFixture<SettingsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
