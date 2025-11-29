import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentAttentionComponent } from '../../shared/components/equipment-attention/equipment-attention.component';
import { Tag } from '../../shared/models/tag.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BatteryStatus } from '../../enums';

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
      status: BatteryStatus.CRITICAL,
      location: 'Emergency - Bay 1',
      batteryLevel: 15,
      prediction: '1 days left',
    },
    {
      tagId: 'pulse-oximeter-h1',
      equipmentName: 'Pulse Oximeter H1',
      status: BatteryStatus.CRITICAL,
      location: 'Emergency - Bay 3',
      batteryLevel: 18,
      prediction: '1 days left',
    },
    {
      tagId: 'ventilator-b3',
      equipmentName: 'Ventilator B3',
      status: BatteryStatus.CRITICAL,
      location: 'ICU - Room 304',
      batteryLevel: 22,
      prediction: '2 days left',
    },
    {
      tagId: 'ecg-machine-g1',
      equipmentName: 'ECG Machine G1',
      status: BatteryStatus.CRITICAL,
      location: 'Cardiology - Room 201',
      batteryLevel: 38,
      prediction: '4 days left',
    },
    {
      tagId: 'ventilator-b2',
      equipmentName: 'Ventilator B2',
      status: BatteryStatus.WARNING,
      location: 'ICU - Room 302',
      batteryLevel: 45,
      prediction: '5 days left',
    },
  ];
}
