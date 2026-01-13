import { Component, effect, input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexDataLabels,
  ApexStroke,
  ApexFill,
  ApexGrid,
  ApexTooltip,
} from 'ng-apexcharts';
import { Summary } from '../../models/summary.model';

export interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  fill: ApexFill;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  colors: string[];
}

@Component({
  standalone: true,
  selector: 'app-battery-history-graph',
  imports: [MatCardModule, NgApexchartsModule],
  templateUrl: './battery-history-graph.component.html',
  styleUrl: './battery-history-graph.component.scss',
})
export class BatteryHistoryGraphComponent {
  currentStatusDistribution = input<Summary>();
  historicData = input<Summary[]>();

  public chartOptions!: ChartOptions;

  private _historicDataEffect = effect(() => {
    if (this.historicData()) {
      this.initializeChart();
    }
  });

  initializeChart() {
    const chartData = this.transformSummaryData(this.historicData());
    this.chartOptions = {
      series: [
        {
          name: 'Battery Level',
          data: chartData.values,
        },
      ],
      chart: {
        type: 'area',
        height: 350,
        stacked: true,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.6,
          opacityTo: 0.1,
        },
      },
      xaxis: {
        categories: chartData.dates,
        labels: {
          style: {
            colors: '#6b7280',
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        min: 0,
        max: 100,
        tickAmount: 5,
        labels: {
          formatter: (value: number) => {
            return value.toFixed(0) + '%';
          },
          style: {
            colors: '#6b7280',
            fontSize: '12px',
          },
        },
      },
      grid: {
        borderColor: '#e5e7eb',
        strokeDashArray: 4,
      },
      tooltip: {
        y: {
          formatter: (value: number) => {
            return value.toFixed(1) + '%';
          },
        },
      },
      colors: ['#3b82f6'],
    };
  }

  private transformSummaryData(data: Summary[] | undefined): { dates: string[]; values: number[] } {
    if (!data || data.length === 0) {
      return { dates: [], values: [] };
    }
    // Sort by date ascending
    const sorted = [...data].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    return {
      dates: sorted.map((s) => s.date),
      values: sorted.map((s) => s.average_percentage),
    };
  }
}
