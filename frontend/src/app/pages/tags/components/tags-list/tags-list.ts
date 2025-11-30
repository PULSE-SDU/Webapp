import { Component, input, output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Tag } from '../../../../shared/models/tag.model';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { BatteryBar } from '../../../../shared/components/battery-bar/battery-bar';
import { StatusChipComponent } from '../../../../shared/components/status-chip/status-chip';
import { BatteryStatus } from '../../../../enums';
import { StatusColor } from '../../../../shared/models/battery-status-color';

@Component({
  standalone: true,
  selector: 'app-tags-list',
  imports: [CommonModule, MatTableModule, MatButtonModule, BatteryBar, StatusChipComponent],
  templateUrl: './tags-list.html',
  styleUrl: './tags-list.scss',
})
export class TagsList {
  public tags = input<Tag[]>([]);
  public openTagDetails = output<Tag>();
  protected readonly BatteryStatus = BatteryStatus;

  getStatusColor(status: BatteryStatus): string {
    return StatusColor[status as BatteryStatus];
  }
}
