import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EquipmentTag } from '../../shared/models/equipment-tag.model';
import { TagDetailsDialogComponent } from './tag-details-dialog.component';

@Component({
  standalone: true,
  selector: 'app-tag-list',
  imports: [CommonModule, MatTableModule, MatButtonModule, MatDialogModule],
  templateUrl: './tag-list.component.html',
  styleUrl: './tag-list.component.scss',
})
export class TagListComponent {
  displayedColumns: string[] = [
    'tagId',
    'equipmentName',
    'type',
    'location',
    'batteryLevel',
    'status',
    'prediction',
    'actions',
  ];

  tags: EquipmentTag[] = [
    {
      tagId: 'TAG-008',
      equipmentName: 'Ventilator B3',
      type: 'Ventilator',
      location: 'ICU - Room 304',
      batteryLevel: 22,
      status: 'critical',
      prediction: '2 days remaining',
      voltage: '10.8V',
    },
    {
      tagId: 'TAG-002',
      equipmentName: 'Syringe Pump E1',
      type: 'Syringe Pump',
      location: 'Emergency - Bay 3',
      batteryLevel: 45,
      status: 'warning',
      prediction: '5 days remaining',
      voltage: '11.2V',
    },
    {
      tagId: 'TAG-003',
      equipmentName: 'Patient Monitor C3',
      type: 'Patient Monitor',
      location: 'Emergency - Bay 1',
      batteryLevel: 15,
      status: 'critical',
      prediction: '1 day remaining',
      voltage: '10.5V',
    },
    {
      tagId: 'TAG-012',
      equipmentName: 'Pulse Oximeter H1',
      type: 'Pulse Oximeter',
      location: 'Emergency - Bay 3',
      batteryLevel: 38,
      status: 'warning',
      prediction: '4 days remaining',
      voltage: '11.0V',
    },
    {
      tagId: 'TAG-007',
      equipmentName: 'Ultrasound A2',
      type: 'Ultrasound',
      location: 'Radiology - Mobile',
      batteryLevel: 92,
      status: 'normal',
      prediction: '18 days remaining',
      voltage: '12.1V',
    },
    {
      tagId: 'TAG-015',
      equipmentName: 'Infusion Pump F4',
      type: 'Infusion Pump',
      location: 'ICU - Room 305',
      batteryLevel: 100,
      status: 'charging',
      prediction: 'Currently charging',
      voltage: '12.6V',
    },
    {
      tagId: 'TAG-009',
      equipmentName: 'ECG Machine G1',
      type: 'ECG Machine',
      location: 'Cardiology - Room 201',
      batteryLevel: 55,
      status: 'normal',
      prediction: '6 days remaining',
      voltage: '11.5V',
    },
    {
      tagId: 'TAG-011',
      equipmentName: 'Defibrillator D2',
      type: 'Defibrillator',
      location: 'Emergency - Mobile',
      batteryLevel: 78,
      status: 'normal',
      prediction: '12 days remaining',
      voltage: '11.9V',
    },
  ];

  private dialog = inject(MatDialog);

  openDetailsDialog(tag: EquipmentTag): void {
    this.dialog.open(TagDetailsDialogComponent, {
      width: '600px',
      maxWidth: '90vw',
      data: tag,
    });
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
