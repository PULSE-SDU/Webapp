import { Component, input } from '@angular/core';
import { BatteryStatusTitle } from '../../../enums';
import { BatteryBar } from '../battery-bar/battery-bar';
import { StatusColor } from '../../models/battery-status-color';
import { BatteryStatusCount } from '../../models/battery-status-count';
import { BatteryStatus } from '../../models/battery-status.model';

@Component({
  selector: 'app-status-distribution',
  standalone: true,
  imports: [BatteryBar],
  templateUrl: './status-distribution.html',
  styleUrl: './status-distribution.scss',
})
export class StatusDistribution {
  statusData = input<BatteryStatusCount[]>([
    { status: BatteryStatusTitle.NORMAL, count: 6 },
    { status: BatteryStatusTitle.LOW, count: 2 },
    { status: BatteryStatusTitle.OFFLINE, count: 3 },
  ]);

  getColorValue(status: BatteryStatusTitle): string {
    return StatusColor[status] ?? '#9CA3AF';
  }

  getCountPercentage(count: number): number {
    const countSum = this.statusData()
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
