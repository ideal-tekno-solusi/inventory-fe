import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencySettings } from './currency-settings';

describe('CurrencySettings', () => {
  let component: CurrencySettings;
  let fixture: ComponentFixture<CurrencySettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencySettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencySettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
