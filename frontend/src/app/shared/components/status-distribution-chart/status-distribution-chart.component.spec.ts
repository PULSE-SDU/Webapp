import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusDistributionChartComponent } from './status-distribution-chart.component';
import { StatusDistributionService } from '../../services/status-distribution.service';
import { of } from 'rxjs';
import { BatteryStatus } from '../../../enums';
import { BatteryStatusColor } from '../../models/battery-status-color';

describe('StatusDistributionChartComponent', () => {
  let component: StatusDistributionChartComponent;
  let fixture: ComponentFixture<StatusDistributionChartComponent>;
  let mockStatusDistributionService: jasmine.SpyObj<StatusDistributionService>;

  beforeEach(async () => {
    mockStatusDistributionService = jasmine.createSpyObj('StatusDistributionService', [
      'getStatusDistribution',
    ]);

    mockStatusDistributionService.getStatusDistribution.and.returnValue(
      of({
        data: [
          { status: BatteryStatus.FULL, count: 6 },
          { status: BatteryStatus.WARNING, count: 2 },
          { status: BatteryStatus.CRITICAL, count: 3 },
          { status: BatteryStatus.CHARGING, count: 1 },
        ],
      }),
    );

    await TestBed.configureTestingModule({
      imports: [StatusDistributionChartComponent],
      providers: [{ provide: StatusDistributionService, useValue: mockStatusDistributionService }],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusDistributionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load chart data on init', () => {
    expect(mockStatusDistributionService.getStatusDistribution).toHaveBeenCalled();
    expect(component.chartOptions()).not.toBeNull();
  });

  it('should set correct chart series data', () => {
    const chartOptions = component.chartOptions();
    expect(chartOptions?.series).toEqual([6, 2, 3, 1]);
  });

  it('should set correct labels', () => {
    const chartOptions = component.chartOptions();
    expect(chartOptions?.labels).toEqual(['Full', 'Warning', 'Critical', 'Charging']);
  });

  it('should set correct colors', () => {
    const chartOptions = component.chartOptions();
    expect(chartOptions?.colors).toEqual([
      BatteryStatusColor[BatteryStatus.FULL],
      BatteryStatusColor[BatteryStatus.WARNING],
      BatteryStatusColor[BatteryStatus.CRITICAL],
      BatteryStatusColor[BatteryStatus.CHARGING],
    ]);
  });
});
