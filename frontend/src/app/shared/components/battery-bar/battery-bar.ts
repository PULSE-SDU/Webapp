import { Component, input } from '@angular/core';
import { Tag } from '../../models/tag.model';
import { StatusColor } from '../../models/battery-status-color';

@Component({
  selector: 'app-battery-bar',
  imports: [],
  templateUrl: './battery-bar.html',
  styleUrl: './battery-bar.scss',
})
export class BatteryBar {
  tag = input<Tag>();
  barWidthPercentage = input<number>();

  getStatusColor(): string {
    const status = this.tag()?.status;
    if (status && StatusColor[status]) {
      return StatusColor[status];
    }
    return 'gray';
  }

  getBatteryLevel(): number {
    const batteryLevel = this.tag()?.batteryLevel;
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
