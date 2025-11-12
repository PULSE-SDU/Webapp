import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-stacked-area-chart',
  templateUrl: './stacked-area-chart.html',
  styleUrls: ['./stacked-area-chart.scss'],
})
export class StackedAreaChart implements OnInit, OnDestroy {
  private chart: ApexCharts | undefined;

  private readonly STACKED_AREA_COLORS = {
    critical: '#F87171',
    warning: '#FCD34D',
    normal: '#4ADE80',
  };

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.initializeChart();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  //private fetchChartData(): void {
  //const apiUrl = '....';
  //this.http.get<any>(apiUrl).subscribe({
  // next: (response) => {
  //API data to match ApexCharts format
  //const chartData = this.transformApiData(response);
  //this.initializeChart(chartData);
  //},
  //error: (err) => {
  // console.error('Error fetching chart data:', err);
  //}
  // });
  //}
  //private transformApiData(data: any) {
  // { dates: [...], critical: [...], warning: [...], normal: [...] } have to figure out status endpoints
  //const { dates, critical, warning, normal } = data;

  private getChartData() {
    const dates = [
      '2025-10-14',
      '2025-10-16',
      '2025-10-18',
      '2025-10-20',
      '2025-10-22',
      '2025-10-24',
      '2025-10-26',
      '2025-10-28',
      '2025-10-30',
      '2025-11-01',
      '2025-11-03',
      '2025-11-05',
      '2025-11-07',
      '2025-11-09',
      '2025-11-11',
    ];

    const criticalCounts = [3, 2, 4, 3, 5, 4, 6, 7, 5, 4, 3, 5, 6, 3, 2];
    const warningCounts = [2, 3, 1, 2, 1, 2, 1, 2, 3, 4, 5, 3, 2, 4, 1];
    const normalCounts = [7, 7, 7, 7, 6, 6, 5, 3, 4, 4, 4, 4, 4, 5, 9];

    return [
      {
        name: 'Normal',
        data: dates.map((date, i) => [new Date(date).getTime(), normalCounts[i]]),
      },
      {
        name: 'Warning',
        data: dates.map((date, i) => [new Date(date).getTime(), warningCounts[i]]),
      },
      {
        name: 'Critical',
        data: dates.map((date, i) => [new Date(date).getTime(), criticalCounts[i]]),
      },
    ];
  }

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
        this.STACKED_AREA_COLORS.normal,
        this.STACKED_AREA_COLORS.warning,
        this.STACKED_AREA_COLORS.critical,
      ],
      dataLabels: { enabled: false },
      stroke: {
        curve: 'smooth',
        width: 2,
        colors: ['#34D399', '#FBBF24', '#EF4444'],
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
        itemMargin: { horizontal: 15, vertical: 5 },
        markers: {
          width: 12,
          height: 12,
          radius: 12,
        } as any,
      },
      xaxis: {
        type: 'datetime',
        tickAmount: 8,
        labels: {
          datetimeFormatter: {
            year: 'MMM yyyy',
            month: 'MMM d',
            day: 'MMM d',
            hour: 'HH:mm',
          },
          style: { colors: ['#6B7280'] },
        },
        axisBorder: { show: false },
        axisTicks: { show: true },
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

    const chartEl = this.el.nativeElement.querySelector('#stackedAreaChart');
    this.chart = new ApexCharts(chartEl, options);
    this.chart.render();
  }
}
