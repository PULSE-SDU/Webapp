import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EquipmentTag } from '../../models/equipment-tag.model';

@Component({
  standalone: true,
  selector: 'app-tag-details-dialog',
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './tag-details-dialog.component.html',
  styleUrl: './tag-details-dialog.component.scss',
})
export class TagDetailsDialogComponent {
  dialogRef = inject(MatDialogRef<TagDetailsDialogComponent>);
  tag = inject<EquipmentTag>(MAT_DIALOG_DATA);

  close(): void {
    this.dialogRef.close();
  }

  getBatteryColor(level: number, status: EquipmentTag['status']): string {
    if (status === 'charging') return '#000000';
    if (status === 'critical') return '#ef4444';
    if (status === 'warning') return '#f59e0b';
    return '#6b7280';
  }

  getStatusClass(status: EquipmentTag['status']): string {
    return `status-${status}`;
  }

  getPredictionClass(prediction: string, status: EquipmentTag['status']): string {
    if (status === 'charging') return 'prediction-charging';
    if (status === 'critical') return 'prediction-critical';
    if (status === 'warning') return 'prediction-warning';
    return 'prediction-normal';
  }
}

