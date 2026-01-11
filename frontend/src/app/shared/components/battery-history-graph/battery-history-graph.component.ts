import { Component, Input } from '@angular/core';

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
  @Input() currentBatteryPercentage = 98;
  @Input() historicalData?: { date: string; batteryLevel: number }[];

  public chartOptions: ChartOptions;

  constructor() {
    const dummyData = this.generateDummyData();
    const dates = dummyData.map((d) => d.date);
    const values = dummyData.map((d) => d.batteryLevel);

    this.chartOptions = {
      series: [
        {
          name: 'Battery Level',
          data: values,
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
        categories: dates,
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

  private generateDummyData(): { date: string; batteryLevel: number }[] {
    return [
      { date: 'Oct 7', batteryLevel: 95.2 },
      { date: 'Oct 9', batteryLevel: 96.8 },
      { date: 'Oct 11', batteryLevel: 98.1 },
      { date: 'Oct 13', batteryLevel: 99.5 },
      { date: 'Oct 15', batteryLevel: 99.8 },
      { date: 'Oct 17', batteryLevel: 100.0 },
      { date: 'Oct 19', batteryLevel: 99.7 },
      { date: 'Oct 21', batteryLevel: 98.9 },
      { date: 'Oct 23', batteryLevel: 97.5 },
      { date: 'Oct 25', batteryLevel: 98.3 },
      { date: 'Oct 27', batteryLevel: 99.1 },
      { date: 'Oct 29', batteryLevel: 99.6 },
      { date: 'Oct 31', batteryLevel: 99.9 },
      { date: 'Nov 2', batteryLevel: 99.4 },
      { date: 'Nov 4', batteryLevel: 98.7 },
    ];
  }
}
