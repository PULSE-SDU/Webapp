import {
  Component,
  ChangeDetectionStrategy,
  signal,
  ViewChild,
  ElementRef,
  inject,
  ChangeDetectorRef,
  input,
  effect,
  AfterViewInit, // <-- add this
} from '@angular/core';

import { StatusColor } from '../../models/battery-status-color';
import ApexCharts from 'apexcharts';
import type { ApexOptions } from 'apexcharts';
import { Summary } from '../../models/summary.model';
import { BatteryStatusTitle } from '../../../enums';

/**
 * Component that displays equipment status distribution as a pie chart.
 * Uses ApexCharts for visualization with dummy data from StatusDistributionService.
 */
@Component({
  selector: 'app-status-distribution-chart',
  imports: [],
  templateUrl: './status-distribution-chart.component.html',
  styleUrl: './status-distribution-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusDistributionChartComponent implements AfterViewInit {
  @ViewChild('chartElement', { static: false }) chartElement?: ElementRef;

  private readonly cdr = inject(ChangeDetectorRef);

  public chartOptions = signal<ApexOptions | null>(null);
  currentStatusDistribution = input<Summary>();

  private chart?: ApexCharts;
  private viewInitialized = false;

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    if (this.chartOptions()) {
      this.renderChart(this.chartOptions()!);
    }
  }

  private _statusEffect = effect(() => {
    if (this.currentStatusDistribution()) {
      this.loadChartData();
      console.log(this.chartOptions());
      // Only render if view is initialized and chartElement is available
      if (this.viewInitialized && this.chartOptions()) {
        this.renderChart(this.chartOptions()!);
      }
    }
  });

  private loadChartData(): void {
    const summary = this.currentStatusDistribution();
    if (!summary) {
      return;
    }
    const series = [summary.normal_count, summary.low_count, summary.offline_count];
    const labels = [BatteryStatusTitle.NORMAL, BatteryStatusTitle.LOW, BatteryStatusTitle.OFFLINE];
    const colors = [
      StatusColor[BatteryStatusTitle.NORMAL],
      StatusColor[BatteryStatusTitle.LOW],
      StatusColor[BatteryStatusTitle.OFFLINE],
    ];

    const options: ApexOptions = {
      series,
      chart: {
        type: 'pie',
        width: '100%',
        height: 340,
      },
      labels,
      colors,
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '14px',
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number) => {
          return val.toFixed(1) + '%';
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: '0%',
          },
        },
      },
    };

    this.chartOptions.set(options);
    this.cdr.markForCheck();

    // Render chart if view is already initialized
    if (this.viewInitialized) {
      setTimeout(() => {
        if (this.chartElement?.nativeElement) {
          this.renderChart(options);
        }
      }, 100);
    }
  }

  /**
   * Renders the ApexCharts pie chart
   */
  private renderChart(options: ApexOptions): void {
    if (this.chartElement?.nativeElement) {
      // Destroy existing chart if any
      if (this.chart) {
        this.chart.destroy();
      }
      this.chart = new ApexCharts(this.chartElement.nativeElement, options);
      this.chart.render();
    }
  }
}
