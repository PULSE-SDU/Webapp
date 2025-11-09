import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentAttentionComponent } from '../../shared/components/equipment-attention/equipment-attention.component';
import { EquipmentAttentionItem } from '../../shared/models/equipment-attention-item.model';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, EquipmentAttentionComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
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
}
