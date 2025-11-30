import { Component, input } from '@angular/core';
import { StatusColor } from '../../models/battery-status-color';
import { BatteryBarData } from './models/battery-bar.types';

@Component({
  selector: 'app-battery-bar',
  standalone: true,
  imports: [],

  templateUrl: './battery-bar.html',
  styleUrl: './battery-bar.scss',
})
export class BatteryBar {
  tag = input<BatteryBarData>();
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
