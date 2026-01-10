import { Component, input } from '@angular/core';
import { StatusColor } from '../../models/battery-status-color';
import { BatteryStatusTitle } from '../../../enums';

@Component({
  selector: 'app-status-chip',
  templateUrl: './status-chip.html',
  styleUrls: ['./status-chip.scss'],
})
export class StatusChipComponent {
  batteryStatus = input<BatteryStatusTitle>();

  getStatusColor(): string {
    const status = this.batteryStatus();
    if (status && StatusColor[status]) {
      return StatusColor[status];
    }
    return 'gray';
  }
}
