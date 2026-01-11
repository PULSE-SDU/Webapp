import { Component, input } from '@angular/core';
import { StatusColor } from '../../models/battery-status-color';
import { BatteryStatus } from '../../models/battery-status.model';

@Component({
  selector: 'app-battery-bar',
  imports: [],
  templateUrl: './battery-bar.html',
  styleUrl: './battery-bar.scss',
})
export class BatteryBar {
  batteryData = input<BatteryStatus>();
  barWidthPercentage = input<number>();

  getStatusColor(): string {
    const status = this.batteryData()?.title;
    if (status && StatusColor[status]) {
      return StatusColor[status];
    }
    return 'gray';
  }

  getBatteryLevel(): number {
    const batteryLevel = this.batteryData()?.percentage;
    if (batteryLevel) {
      return batteryLevel;
    }
    return 0;
  }

  getBarWidth(): number {
    const width = this.barWidthPercentage();
    if (width && width > 0) {
      return width;
    }
    return 100;
  }
}
