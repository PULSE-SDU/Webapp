import { Component, input, output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Tag } from '../../../../shared/models/tag.model';
import { MatButtonModule } from '@angular/material/button';

import { BatteryBar } from '../../../../shared/components/battery-bar/battery-bar';
import { StatusChipComponent } from '../../../../shared/components/status-chip/status-chip';
import { BatteryStatusTitle } from '../../../../enums';
import { StatusColor } from '../../../../shared/models/battery-status-color';

@Component({
  standalone: true,
  selector: 'app-tags-list',
  imports: [MatTableModule, MatButtonModule, BatteryBar, StatusChipComponent],
  templateUrl: './tags-list.html',
  styleUrl: './tags-list.scss',
})
export class TagsList {
  public tags = input<Tag[]>([]);
  public openTagDetails = output<Tag>();
  protected readonly BatteryStatus = BatteryStatusTitle;

  getStatusColor(status: BatteryStatusTitle): string {
    return StatusColor[status as BatteryStatusTitle];
  }
}
