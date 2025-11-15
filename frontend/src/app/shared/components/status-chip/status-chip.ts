import { Component, input } from '@angular/core';
import { BatteryStatusColor } from '../../models/battery-status-color';
import { BatteryStatus } from '../../../enums';

@Component({
  selector: 'app-status-chip',
  templateUrl: './status-chip.html',
  styleUrls: ['./status-chip.scss']
})
export class StatusChipComponent {
  batteryStatus = input<BatteryStatus>();

  getStatusColor(): string {
    const status = this.batteryStatus();
    if (status && BatteryStatusColor[status]) {
      return BatteryStatusColor[status];
    }
    return 'gray';
  }
}
