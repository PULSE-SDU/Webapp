import {
  Component,
  OnDestroy,
  ElementRef,
  inject,
  input,
  effect,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import ApexCharts from 'apexcharts';
import { StatusColor } from '../../models/battery-status-color';
import { BatteryStatusTitle } from '../../../enums';
import { Summary } from '../../models/summary.model';

@Component({
  selector: 'app-stacked-area-chart',
  standalone: true,
  templateUrl: './stacked-area-chart.html',
  styleUrls: ['./stacked-area-chart.scss'],
})
export class StackedAreaChart implements OnDestroy, AfterViewInit {
  @ViewChild('stackedAreaChart', { static: false }) chartElement?: ElementRef;
  private chart: ApexCharts | undefined;
  private viewInitialized = false;
  el = inject(ElementRef);

  historicData = input<Summary[]>();
  private _historicDataEffect = effect(() => {
    if (this.historicData() && this.viewInitialized && this.chartElement?.nativeElement) {
      this.getChartData();
      this.initializeChart();
    }
  });

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    if (this.historicData() && this.chartElement?.nativeElement) {
      this.getChartData();
      this.initializeChart();
    }
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  private getChartData() {
    try {
      const data = this.historicData() ?? [];
      const sorted = [...data].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );
      return [
        {
          name: BatteryStatusTitle.NORMAL,
          data: sorted.map((s) => [new Date(s.date).getTime(), s.normal_count]),
        },
        {
          name: BatteryStatusTitle.LOW,
          data: sorted.map((s) => [new Date(s.date).getTime(), s.low_count]),
        },
        {
          name: BatteryStatusTitle.OFFLINE,
          data: sorted.map((s) => [new Date(s.date).getTime(), s.offline_count]),
        },
      ];
    } catch (error) {
      console.error('Error generating chart data:', error);
      return [];
    }
  }

  /** Initialize ApexChart */
  private initializeChart(): void {
    const series = this.getChartData();
    const options: ApexCharts.ApexOptions = {
      series,
      chart: {
        type: 'area',
        height: 384,
        stacked: true,
        toolbar: { show: false },
        fontFamily: 'Inter, sans-serif',
      },
      colors: [
        StatusColor[BatteryStatusTitle.NORMAL],
        StatusColor[BatteryStatusTitle.LOW],
        StatusColor[BatteryStatusTitle.OFFLINE],
      ],
      dataLabels: { enabled: false },
      stroke: {
        curve: 'smooth',
        width: 2,
        colors: [
          StatusColor[BatteryStatusTitle.NORMAL],
          StatusColor[BatteryStatusTitle.LOW],
          StatusColor[BatteryStatusTitle.OFFLINE],
        ],
      },
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.7,
          opacityTo: 0.9,
        },
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '13px',
        fontWeight: 500,
        labels: { colors: ['#4B5563'] },
      },
      xaxis: {
        type: 'datetime',
        tickAmount: 8,
        labels: {
          style: { colors: ['#6B7280'] },
          datetimeFormatter: {
            month: 'MMM d',
            day: 'MMM d',
            year: 'MMM yyyy',
          },
        },
      },
      yaxis: {
        min: 0,
        max: 12,
        tickAmount: 4,
        labels: { style: { colors: ['#6B7280'] } },
      },
      tooltip: {
        x: { format: 'MMM dd, yyyy' },
      },
      grid: { show: false },
    };
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new ApexCharts(this.chartElement!.nativeElement, options);
    this.chart.render();
  }
}
