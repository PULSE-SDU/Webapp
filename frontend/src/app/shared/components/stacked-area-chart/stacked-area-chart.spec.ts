import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StackedAreaChart } from './stacked-area-chart';

describe('StackedAreaChart', () => {
  let component: StackedAreaChart;
  let fixture: ComponentFixture<StackedAreaChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackedAreaChart],
    }).compileComponents();

    fixture = TestBed.createComponent(StackedAreaChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
