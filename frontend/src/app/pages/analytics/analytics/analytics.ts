import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StackedAreaChart } from '../../../shared/components/stacked-area-chart/stacked-area-chart';
import { BatteryHistoryGraphComponent } from '../../../shared/components/battery-history-graph/battery-history-graph.component';
import { StatusDistributionChartComponent } from '../../../shared/components/status-distribution-chart/status-distribution-chart.component';

@Component({
  selector: 'app-analytics',
  imports: [
    CommonModule,
    StackedAreaChart,
    BatteryHistoryGraphComponent,
    StatusDistributionChartComponent,
  ],
  templateUrl: './analytics.html',
  styleUrl: './analytics.scss',
})
export class Analytics {}
