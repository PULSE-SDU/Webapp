import { Component, input } from '@angular/core';
import { StatusColor } from '../../models/battery-status-color';
import { Tag } from '../../models/tag.model';

@Component({
  selector: 'app-battery-bar',
  imports: [],
  templateUrl: './battery-bar.html',
  styleUrl: './battery-bar.scss',
})
export class BatteryBar {
  batteryData = input<Tag>();
  barWidthPercentage = input<number>();

  getStatusColor(): string {
    const status = this.batteryData()?.status;
    if (status && StatusColor[status]) {
      return StatusColor[status];
    }
    return 'gray';
  }

  getBatteryLevel(): number {
    const batteryLevel = this.batteryData()?.batteryLevel;
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
