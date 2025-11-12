import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentAttentionComponent } from '../../shared/components/equipment-attention/equipment-attention.component';
import { Tag } from '../../shared/models/tag.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TagDetailsDialogComponent } from '../../shared/components/tag-details-dialog/tag-details-dialog.component';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, EquipmentAttentionComponent, MatDialogModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private dialog = inject(MatDialog);

  equipmentData: Tag[] = [
    {
      tagId: 'patient-monitor-c3',
      equipmentName: 'Patient Monitor C3',
      status: 'critical',
      location: 'Emergency - Bay 1',
      batteryLevel: 15,
      daysLeft: 1,
    },
    {
      tagId: 'pulse-oximeter-h1',
      equipmentName: 'Pulse Oximeter H1',
      status: 'critical',
      location: 'Emergency - Bay 3',
      batteryLevel: 18,
      daysLeft: 1,
    },
    {
      tagId: 'ventilator-b3',
      equipmentName: 'Ventilator B3',
      status: 'critical',
      location: 'ICU - Room 304',
      batteryLevel: 22,
      daysLeft: 2,
    },
    {
      tagId: 'ecg-machine-g1',
      equipmentName: 'ECG Machine G1',
      status: 'warning',
      location: 'Cardiology - Room 201',
      batteryLevel: 38,
      daysLeft: 4,
    },
    {
      tagId: 'ventilator-b2',
      equipmentName: 'Ventilator B2',
      status: 'warning',
      location: 'ICU - Room 302',
      batteryLevel: 45,
      daysLeft: 5,
    },
  ];

  sampleTag: Tag = {
    tagId: 'TAG-003',
    equipmentName: 'Patient Monitor C3',
    type: 'Patient Monitor',
    location: 'Emergency - Bay 1',
    batteryLevel: 15,
    status: 'critical',
    prediction: '1 day remaining',
    voltage: '10.5V',
  };

  openTagDetailsDialog(): void {
    this.dialog.open(TagDetailsDialogComponent, {
      width: '600px',
      maxWidth: '90vw',
      data: this.sampleTag,
    });
  }
}
