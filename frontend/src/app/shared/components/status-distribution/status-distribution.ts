import { Component, input } from '@angular/core';
import { BatteryStatusTitle } from '../../../enums';
import { BatteryBar } from '../battery-bar/battery-bar';
import { StatusColor } from '../../models/battery-status-color';
import { BatteryStatusCount } from '../../models/battery-status-count';
import { BatteryStatus } from '../../models/battery-status.model';
import { Summary } from '../../models/summary.model';

@Component({
  selector: 'app-status-distribution',
  standalone: true,
  imports: [BatteryBar],
  templateUrl: './status-distribution.html',
  styleUrl: './status-distribution.scss',
})
export class StatusDistribution {
  summaryData = input<Summary>({
    id: 0,
    date: '0',
    normal_count: 0,
    low_count: 0,
    offline_count: 0,
    average_percentage: 0,
    total_tags: 0,
  });

  summaryToBatteryStatusCount(): BatteryStatusCount[] {
    return [
      { status: BatteryStatusTitle.NORMAL, count: this.summaryData().normal_count },
      { status: BatteryStatusTitle.LOW, count: this.summaryData().low_count },
      { status: BatteryStatusTitle.OFFLINE, count: this.summaryData().offline_count },
    ];
  }

  getColorValue(status: BatteryStatusTitle): string {
    return StatusColor[status] ?? '#9CA3AF';
  }

  getCountPercentage(count: number): number {
    const countSum = this.summaryToBatteryStatusCount()
      .map((item) => item.count)
      .reduce((a, b) => a + b, 0);

    const percentage = countSum > 0 ? (count / countSum) * 100 : 0;
    return Math.round(percentage * 10) / 10;
  }

  /** Map BatteryStatusCount → Tag interface used by BatteryBar */
  toBatteryStatus(item: BatteryStatusCount): BatteryStatus {
    return {
      id: 0,
      node_address: '',
      title: item.status,
      percentage: this.getCountPercentage(item.count),
    };
  }
}
