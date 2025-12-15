import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Tag } from '../../models/tag.model';
import { BatteryStatus } from '../../../enums';
import { StatusColor } from '../../models/battery-status-color';

@Component({
  standalone: true,
  selector: 'app-tag-details-dialog',
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './tag-details-dialog.component.html',
  styleUrl: './tag-details-dialog.component.scss',
})
export class TagDetailsDialogComponent {
  public readonly batteryStatus = BatteryStatus;

  dialogRef = inject(MatDialogRef<TagDetailsDialogComponent>);
  tag = inject<Tag>(MAT_DIALOG_DATA);

  close(): void {
    this.dialogRef.close();
  }

  getBatteryColor(status: BatteryStatus | undefined): string {
    if (!status) return '#6b7280';
    return StatusColor[status] || '#6b7280';
  }

  getStatusClass(status: BatteryStatus | undefined): string {
    if (!status) return '';
    return `status-${status}`;
  }
}
