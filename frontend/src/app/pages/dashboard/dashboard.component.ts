import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentAttentionComponent } from '../../shared/components/equipment-attention/equipment-attention.component';
import { InfoCards } from '../../shared/components/info-cards/info-cards';
import { StatusDistribution } from '../../shared/components/status-distribution/status-distribution';
import { Tag } from '../../shared/models/tag.model';

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
    {
      tagId: 'defibrillator-a1',
      equipmentName: 'Defibrillator A1',
      status: 'ok',
      location: 'Emergency - Bay 2',
      batteryLevel: 75,
      daysLeft: 10,
    },
    {
      tagId: 'infusion-pump-d2',
      equipmentName: 'Infusion Pump D2',
      status: 'ok',
      location: 'ICU - Room 301',
      batteryLevel: 82,
      daysLeft: 12,
    },
    {
      tagId: 'patient-monitor-c1',
      equipmentName: 'Patient Monitor C1',
      status: 'ok',
      location: 'Emergency - Bay 1',
      batteryLevel: 68,
      daysLeft: 8,
    },
    {
      tagId: 'ventilator-b1',
      equipmentName: 'Ventilator B1',
      status: 'ok',
      location: 'ICU - Room 303',
      batteryLevel: 71,
      daysLeft: 9,
    },
    {
      tagId: 'ecg-machine-g2',
      equipmentName: 'ECG Machine G2',
      status: 'ok',
      location: 'Cardiology - Room 202',
      batteryLevel: 65,
      daysLeft: 7,
    },
    {
      tagId: 'pulse-oximeter-h2',
      equipmentName: 'Pulse Oximeter H2',
      status: 'ok',
      location: 'Emergency - Bay 4',
      batteryLevel: 58,
      daysLeft: 6,
    },
    {
      tagId: 'defibrillator-a2',
      equipmentName: 'Defibrillator A2',
      status: 'charging',
      location: 'Emergency - Bay 2',
      batteryLevel: 85,
      daysLeft: 15,
    },
  ];

  get totalEquipment(): number {
    return this.equipmentData.length;
  }

  get criticalStatus(): number {
    return this.equipmentData.filter((item) => item.status === 'critical').length;
  }

  get warningStatus(): number {
    return this.equipmentData.filter((item) => item.status === 'warning').length;
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
      .filter((item) => item.status === 'critical' || item.status === 'warning')
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

    const statusCounts: Record<string, number> = {
      ok: 0,
      warning: 0,
      critical: 0,
      charging: 0,
    };

    this.equipmentData.forEach((item) => {
      const status = item.status || 'ok';
      if (status in statusCounts) {
        statusCounts[status]++;
      } else {
        statusCounts['ok']++;
      }
    });

    const statusMap: Record<string, { label: string; color: string }> = {
      ok: { label: 'Normal', color: 'green' },
      warning: { label: 'Warning', color: 'yellow' },
      critical: { label: 'Critical', color: 'red' },
      charging: { label: 'Charging', color: 'blue' },
    };

    return Object.entries(statusCounts)
      .map(([status, count]) => ({
        label: statusMap[status].label,
        count,
        percent: Math.round((count / total) * 100),
        color: statusMap[status].color,
      }))
      .filter((item) => item.count > 0);
  }
}
