import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  signal,
  ViewChild,
  ElementRef,
  AfterViewInit,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusDistributionService } from '../../services/status-distribution.service';
import { StatusColor } from '../../models/battery-status-color';
import ApexCharts from 'apexcharts';
import type { ApexOptions } from 'apexcharts';

/**
 * Component that displays equipment status distribution as a pie chart.
 * Uses ApexCharts for visualization with dummy data from StatusDistributionService.
 */
@Component({
  selector: 'app-status-distribution-chart',
  imports: [CommonModule],
  templateUrl: './status-distribution-chart.component.html',
  styleUrl: './status-distribution-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusDistributionChartComponent implements OnInit, AfterViewInit {
  @ViewChild('chartElement', { static: false }) chartElement?: ElementRef;

  private readonly statusDistributionService = inject(StatusDistributionService);
  private readonly cdr = inject(ChangeDetectorRef);

  public chartOptions = signal<ApexOptions | null>(null);

  private chart?: ApexCharts;
  private viewInitialized = false;

  ngOnInit(): void {
    this.loadChartData();
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    // Try to render if data is already loaded
    // Use setTimeout to ensure DOM is fully ready
    setTimeout(() => {
      if (this.chartOptions() && this.chartElement?.nativeElement) {
        this.renderChart(this.chartOptions()!);
      }
    }, 0);
  }

  /**
   * Loads chart data from the service and configures the chart options
   */
  private loadChartData(): void {
    this.statusDistributionService.getStatusDistribution().subscribe({
      next: (response) => {
        const series = response.data.map((item) => item.count);
        const labels = response.data.map((item) => item.status);
        const colors = response.data.map((item) => StatusColor[item.status]);

        const options: ApexOptions = {
          series,
          chart: {
            type: 'pie',
            width: '100%',
            height: 380,
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
        // Use setTimeout to ensure DOM is fully ready and change detection has run
        if (this.viewInitialized) {
          setTimeout(() => {
            if (this.chartElement?.nativeElement) {
              this.renderChart(options);
            }
          }, 100);
        }
      },
      error: (error) => {
        console.error('Error loading status distribution:', error);
      },
    });
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
