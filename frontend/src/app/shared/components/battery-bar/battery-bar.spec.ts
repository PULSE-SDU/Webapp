import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteryBar } from './battery-bar';

describe('BatteryBar', () => {
  let component: BatteryBar;
  let fixture: ComponentFixture<BatteryBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatteryBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatteryBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
