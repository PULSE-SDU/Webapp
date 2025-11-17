import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentAttentionComponent } from '../../shared/components/equipment-attention/equipment-attention.component';
import { InfoCards } from '../../shared/components/info-cards/info-cards';
import { InfoCard } from '../../shared/components/info-cards/models/info-card.model';
import { StatusDistribution } from '../../shared/components/status-distribution/status-distribution';
import { Tag } from '../../shared/models/tag.model';
import { BatteryStatus } from '../../enums';

interface StatusItem {
  label: string;
  count: number;
  percent: number;
  color: string;
}

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, EquipmentAttentionComponent, InfoCards, StatusDistribution],
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
      daysLeft: 10,
    },
    {
      tagId: 'infusion-pump-d2',
      equipmentName: 'Infusion Pump D2',
      status: BatteryStatus.NORMAL,
      location: 'ICU - Room 301',
      batteryLevel: 82,
      daysLeft: 12,
    },
    {
      tagId: 'patient-monitor-c1',
      equipmentName: 'Patient Monitor C1',
      status: BatteryStatus.NORMAL,
      location: 'Emergency - Bay 1',
      batteryLevel: 68,
      daysLeft: 8,
    },
    {
      tagId: 'ventilator-b1',
      equipmentName: 'Ventilator B1',
      status: BatteryStatus.NORMAL,
      location: 'ICU - Room 303',
      batteryLevel: 71,
      daysLeft: 9,
    },
    {
      tagId: 'ecg-machine-g2',
      equipmentName: 'ECG Machine G2',
      status: BatteryStatus.NORMAL,
      location: 'Cardiology - Room 202',
      batteryLevel: 65,
      daysLeft: 7,
    },
    {
      tagId: 'pulse-oximeter-h2',
      equipmentName: 'Pulse Oximeter H2',
      status: BatteryStatus.NORMAL,
      location: 'Emergency - Bay 4',
      batteryLevel: 58,
      daysLeft: 6,
    },
    {
      tagId: 'defibrillator-a2',
      equipmentName: 'Defibrillator A2',
      status: BatteryStatus.FULL,
      location: 'Emergency - Bay 2',
      batteryLevel: 85,
      daysLeft: 15,
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
      .filter((item) => item.status === BatteryStatus.CRITICAL || item.status === BatteryStatus.WARNING)
      .sort((a, b) => {
        // Sort by daysLeft (ascending), then by batteryLevel (ascending)
        const aDays = a.daysLeft ?? Infinity;
        const bDays = b.daysLeft ?? Infinity;
        if (aDays !== bDays) {
          return aDays - bDays;
        }
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
      [BatteryStatus.FULL]: { label: 'Charging', color: 'blue' },
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

  get infoCards(): InfoCard[] {
    return [
      {
        title: 'Total Equipment',
        content: this.totalEquipment,
        subtitle: 'Active monitoring tags',
        icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
        iconColor: 'text-gray-400',
      },
      {
        title: 'Critical Status',
        content: this.criticalStatus,
        subtitle: 'Requires immediate attention',
        icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
        iconColor: 'text-custom-critical',
      },
      {
        title: 'Warning Status',
        content: this.warningStatus,
        subtitle: 'Monitor closely',
        icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.102L13.828 9.828m3.153 3.153a4 4 0 005.656 0l4-4a4 4 0 10-5.656-5.656l-1.1 1.1',
        iconColor: 'text-custom-warning',
      },
      {
        title: 'Average Battery',
        content: this.averageBattery,
        subtitle: '',
        icon: 'M15 7h4a2 2 0 012 2v6a2 2 0 01-2 2h-4m-2 2h-2m4-2H5a2 2 0 01-2-2V9a2 2 0 012-2h4m-2 2h2',
        iconColor: 'text-custom-success',
        isBattery: true,
      },
    ];
  }
}
