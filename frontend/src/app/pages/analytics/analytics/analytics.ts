import { Component, inject, OnInit } from '@angular/core';

import { StackedAreaChart } from '../../../shared/components/stacked-area-chart/stacked-area-chart';
import { BatteryHistoryGraphComponent } from '../../../shared/components/battery-history-graph/battery-history-graph.component';
import { StatusDistributionChartComponent } from '../../../shared/components/status-distribution-chart/status-distribution-chart.component';
import { Summary } from '../../../shared/models/summary.model';
import { HistoricStatusService } from '../../../shared/services/battery-status/historic-status.service';
import { firstValueFrom } from 'rxjs';
import { SummaryStateService } from '../../../state/summary-state';
import { Filters } from '../../../shared/components/filters/filters';
import {
  FilterDescriptor,
  FilterValue,
} from '../../../shared/components/filters/models/filter-descriptor';
import { FilterType } from '../../../enums';
import { TimeRangeFilterMap } from './models/time-range-filter';

@Component({
  selector: 'app-analytics',
  imports: [
    StackedAreaChart,
    BatteryHistoryGraphComponent,
    StatusDistributionChartComponent,
    Filters,
  ],
  templateUrl: './analytics.html',
  styleUrl: './analytics.scss',
})
export class Analytics implements OnInit {
  private historicStatusService = inject(HistoricStatusService);
  private summaryStateService = inject(SummaryStateService);
  private days: 7 | 14 | 30 = 30;

  historicalData: Summary[] = [];
  summaryState = this.summaryStateService.latestSummary();

  filters: FilterDescriptor[] = [
    {
      key: 'days',
      type: FilterType.SELECT,
      placeholder: 'Select time range',
      options: Object.keys(TimeRangeFilterMap),
      multiple: false,
    },
  ];

  async ngOnInit() {
    try {
      await this.getHistoricalStatusDistribution();
    } catch (error) {
      console.error(error);
    }
  }

  async getHistoricalStatusDistribution() {
    this.historicalData = await firstValueFrom(this.historicStatusService.getSummaries(this.days));
  }

  async updateFilter(values: Record<string, unknown>) {
    this.filters = this.filters.map((f) => ({
      ...f,
      value: values[f.key] as FilterValue,
    }));

    const value = this.filters.find((f) => f.key === 'days')?.value;
    if (typeof value === 'string' && value.length !== 0) {
      this.days = this.mapPredictionFilter(value);
    }
    await this.getHistoricalStatusDistribution();
  }

  private mapPredictionFilter(value: string): 7 | 14 | 30 {
    if (value in TimeRangeFilterMap) {
      const mapped = TimeRangeFilterMap[value as keyof typeof TimeRangeFilterMap];
      if (mapped === 7 || mapped === 14 || mapped === 30) {
        return mapped;
      }
    }
    return 30;
  }
}
