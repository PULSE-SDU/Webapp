import { Component, input } from '@angular/core';
import { BatteryStatus } from '../../../enums';
import { BatteryBar } from '../battery-bar/battery-bar';
import { StatusColor } from '../../models/battery-status-color';

interface StatusIten {
  label: string;
  count: number;
  percent: number;
  color: string;
}

// Fake tag type for battery-bar
interface FakeTag {
  tagId: string;
  batteryLevel: number;
  status: BatteryStatus;
}

@Component({
  selector: 'app-status-distribution',
  imports: [BatteryBar],
  standalone: true,
  templateUrl: './status-distribution.html',
  styleUrl: './status-distribution.scss',
})

export class StatusDistribution {
  statusData = input<StatusIten[]>([
    { label: 'Normal', color: 'green', percent: 50, count: 6 },
    { label: 'Warning', color: 'yellow', percent: 17, count: 2 },
    { label: 'Critical', color: 'red', percent: 25, count: 3 },
    { label: 'Charging', color: 'blue', percent: 8, count: 1 },
  ])
   getColorValue(color: string): string {
    return StatusColor[color] ?? '#9CA3AF';
  };

   /** Map item.color → BatteryStatus enum */
  toBatteryStatus(color: string): BatteryStatus {
    const map: Record<string, BatteryStatus> = {
      green: BatteryStatus.NORMAL,
      yellow: BatteryStatus.WARNING,
      red: BatteryStatus.CRITICAL,
      blue: BatteryStatus.FULL, 
    };
    return map[color] ?? BatteryStatus.NORMAL;
  }
    /** Convert StatusItem → FakeTag required by BatteryBar */
  toTag(item: StatusIten): FakeTag {
    return {
      tagId: '',
      batteryLevel: item.percent,
      status: this.toBatteryStatus(item.color),
    };
  }
}

// for future
// fetchDataFromAPI() {
//   this.http.get<StatusItem[]>('/api/status-data').subscribe(data => {
//     this.statusData = data;
//   });
// }
