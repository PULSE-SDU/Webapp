import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteryHistoryGraphComponent } from './battery-history-graph.component';

describe('BatteryHistoryGraphComponent', () => {
  let component: BatteryHistoryGraphComponent;
  let fixture: ComponentFixture<BatteryHistoryGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatteryHistoryGraphComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BatteryHistoryGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default inputs', () => {
    expect(component.currentBatteryPercentage).toBe(98);
  });

  it('should have chart options configured', () => {
    expect(component.chartOptions).toBeDefined();
    expect(component.chartOptions.series).toBeDefined();
    expect(component.chartOptions.series.length).toBe(1);
    expect(component.chartOptions.series[0].name).toBe('Battery Level');
  });

  it('should render chart with dummy data', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('apx-chart')).toBeTruthy();
  });

  it('should display battery information in the header', () => {
    component.currentBatteryPercentage = 95;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('.card-title');
    const subtitle = compiled.querySelector('.card-subtitle');

    expect(title?.textContent).toContain('Battery History');
    expect(subtitle?.textContent).toContain('95%');
  });
});
