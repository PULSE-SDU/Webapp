import { Component, input } from '@angular/core';
import { BatteryStatus } from '../../../enums';
import { BatteryBar } from '../battery-bar/battery-bar';
import { StatusColor } from '../../models/battery-status-color';
import { BatteryStatusCount } from '../../models/battery-status-count';
import { Tag } from '../../models/tag.model';

@Component({
  selector: 'app-status-distribution',
  standalone: true,
  imports: [BatteryBar],
  templateUrl: './status-distribution.html',
  styleUrl: './status-distribution.scss',
})
export class StatusDistribution {
  statusData = input<BatteryStatusCount[]>([
    { status: BatteryStatus.GOOD, count: 6 },
    { status: BatteryStatus.LOW, count: 2 },
    { status: BatteryStatus.OFFLINE, count: 3 },
  ]);

  getColorValue(status: BatteryStatus): string {
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
  toTag(item: BatteryStatusCount): Tag {
    return {
      tagId: '',
      status: item.status,
      batteryLevel: this.getCountPercentage(item.count),
    };
  }
}
