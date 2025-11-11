import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentAttentionComponent } from './shared/components/equipment-attention/equipment-attention.component';
import { EquipmentAttentionItem } from './shared/models/equipment-attention-item.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TagDetailsDialogComponent } from './shared/components/tag-details-dialog/tag-details-dialog.component';
import { EquipmentTag } from './shared/models/equipment-tag.model';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    CommonModule,
    EquipmentAttentionComponent,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private dialog = inject(MatDialog);

  equipmentData: EquipmentAttentionItem[] = [
    {
      id: 'patient-monitor-c3',
      name: 'Patient Monitor C3',
      status: 'critical',
      location: 'Emergency - Bay 1',
      batteryPercentage: 15,
      daysLeft: 1,
    },
    {
      id: 'pulse-oximeter-h1',
      name: 'Pulse Oximeter H1',
      status: 'critical',
      location: 'Emergency - Bay 3',
      batteryPercentage: 18,
      daysLeft: 1,
    },
    {
      id: 'ventilator-b3',
      name: 'Ventilator B3',
      status: 'critical',
      location: 'ICU - Room 304',
      batteryPercentage: 22,
      daysLeft: 2,
    },
    {
      id: 'ecg-machine-g1',
      name: 'ECG Machine G1',
      status: 'warning',
      location: 'Cardiology - Room 201',
      batteryPercentage: 38,
      daysLeft: 4,
    },
    {
      id: 'ventilator-b2',
      name: 'Ventilator B2',
      status: 'warning',
      location: 'ICU - Room 302',
      batteryPercentage: 45,
      daysLeft: 5,
    },
  ];

  sampleTag: EquipmentTag = {
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
