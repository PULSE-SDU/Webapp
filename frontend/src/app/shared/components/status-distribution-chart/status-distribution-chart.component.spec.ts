import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusDistributionChartComponent } from './status-distribution-chart.component';
import { StatusDistributionService } from '../../services/status-distribution.service';
import { of } from 'rxjs';
import { EquipmentStatus } from '../../../enums';

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
          { status: EquipmentStatus.Normal, count: 6 },
          { status: EquipmentStatus.Warning, count: 2 },
          { status: EquipmentStatus.Critical, count: 3 },
          { status: EquipmentStatus.Charging, count: 1 },
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
    expect(chartOptions?.labels).toEqual(['Normal', 'Warning', 'Critical', 'Charging']);
  });

  it('should set correct colors', () => {
    const chartOptions = component.chartOptions();
    expect(chartOptions?.colors).toEqual(['#4CAF50', '#FF9800', '#F44336', '#2196F3']);
  });
});
