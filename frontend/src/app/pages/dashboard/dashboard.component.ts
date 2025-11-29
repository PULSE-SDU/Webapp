import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentAttentionComponent } from '../../shared/components/equipment-attention/equipment-attention.component';
import { StatusDistribution } from '../../shared/components/status-distribution/status-distribution';
import { Tag } from '../../shared/models/tag.model';
import { BatteryStatus } from '../../enums';
import { BatteryHistoryGraphComponent } from '../../shared/components/battery-history-graph/battery-history-graph.component';

interface StatusItem {
  label: string;
  count: number;
  percent: number;
  color: string;
}

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    EquipmentAttentionComponent,
    StatusDistribution,
    BatteryHistoryGraphComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
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
    {
      tagId: 'defibrillator-a1',
      equipmentName: 'Defibrillator A1',
      status: BatteryStatus.NORMAL,
      location: 'Emergency - Bay 2',
      batteryLevel: 75,
      prediction: '10 days left',
    },
    {
      tagId: 'infusion-pump-d2',
      equipmentName: 'Infusion Pump D2',
      status: BatteryStatus.NORMAL,
      location: 'ICU - Room 301',
      batteryLevel: 82,
      prediction: '12 days left',
    },
    {
      tagId: 'patient-monitor-c1',
      equipmentName: 'Patient Monitor C1',
      status: BatteryStatus.NORMAL,
      location: 'Emergency - Bay 1',
      batteryLevel: 68,
      prediction: '8 days left',
    },
    {
      tagId: 'ventilator-b1',
      equipmentName: 'Ventilator B1',
      status: BatteryStatus.NORMAL,
      location: 'ICU - Room 303',
      batteryLevel: 71,
      prediction: '9 days left',
    },
    {
      tagId: 'ecg-machine-g2',
      equipmentName: 'ECG Machine G2',
      status: BatteryStatus.NORMAL,
      location: 'Cardiology - Room 202',
      batteryLevel: 65,
      prediction: '7 days left',
    },
    {
      tagId: 'pulse-oximeter-h2',
      equipmentName: 'Pulse Oximeter H2',
      status: BatteryStatus.NORMAL,
      location: 'Emergency - Bay 4',
      batteryLevel: 58,
      prediction: '6 days left',
    },
    {
      tagId: 'defibrillator-a2',
      equipmentName: 'Defibrillator A2',
      status: BatteryStatus.FULL,
      location: 'Emergency - Bay 2',
      batteryLevel: 85,
      prediction: '15 days left',
    },
  ];

  get totalEquipment(): number {
    return this.equipmentData.length;
  }

  get criticalStatus(): number {
    return this.equipmentData.filter((item) => item.status === BatteryStatus.CRITICAL).length;
  }

  get warningStatus(): number {
    return this.equipmentData.filter((item) => item.status === BatteryStatus.WARNING).length;
  }

  get averageBattery(): number {
    const validBatteryLevels = this.equipmentData
      .map((item) => item.batteryLevel)
      .filter((level): level is number => level !== undefined);

    if (validBatteryLevels.length === 0) return 0;

    const sum = validBatteryLevels.reduce((acc, level) => acc + level, 0);
    return Math.round(sum / validBatteryLevels.length);
  }

  get equipmentNeedingAttention(): Tag[] {
    return this.equipmentData
      .filter(
        (item) => item.status === BatteryStatus.CRITICAL || item.status === BatteryStatus.WARNING,
      )
      .sort((a, b) => {
        // Sort by batteryLevel (ascending)
        return (a.batteryLevel ?? 0) - (b.batteryLevel ?? 0);
      });
  }

  get statusDistribution(): StatusItem[] {
    const total = this.equipmentData.length;
    if (total === 0) return [];

    const statusCounts: Record<BatteryStatus, number> = {
      [BatteryStatus.NORMAL]: 0,
      [BatteryStatus.WARNING]: 0,
      [BatteryStatus.CRITICAL]: 0,
      [BatteryStatus.FULL]: 0,
    };

    this.equipmentData.forEach((item) => {
      const status = item.status || BatteryStatus.NORMAL;
      if (status in statusCounts) {
        statusCounts[status]++;
      } else {
        statusCounts[BatteryStatus.NORMAL]++;
      }
    });

    const statusMap: Record<BatteryStatus, { label: string; color: string }> = {
      [BatteryStatus.NORMAL]: { label: 'Normal', color: 'green' },
      [BatteryStatus.WARNING]: { label: 'Warning', color: 'yellow' },
      [BatteryStatus.CRITICAL]: { label: 'Critical', color: 'red' },
      [BatteryStatus.FULL]: { label: 'Normal', color: 'green' },
    };

    return Object.entries(statusCounts)
      .map(([status, count]) => ({
        label: statusMap[status as BatteryStatus].label,
        count,
        percent: Math.round((count / total) * 100),
        color: statusMap[status as BatteryStatus].color,
      }))
      .filter((item) => item.count > 0);
  }
}
