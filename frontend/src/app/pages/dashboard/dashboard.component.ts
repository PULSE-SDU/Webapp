import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentAttentionComponent } from '../../shared/components/equipment-attention/equipment-attention.component';
import { InfoCards } from '../../shared/components/info-cards/info-cards';
import { StatusDistribution } from '../../shared/components/status-distribution/status-distribution';
import { Tag } from '../../shared/models/tag.model';
import { BatteryStatus } from '../../enums';
import { InfoCard } from '../../shared/components/info-cards/models/info-card.model';
import { StatusColor } from '../../shared/models/battery-status-color';

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
      status: BatteryStatus.DEAD,
      batteryLevel: 15,
      prediction: '1 days left',
    },
    {
      tagId: 'pulse-oximeter-h1',
      status: BatteryStatus.DEAD,
      batteryLevel: 18,
      prediction: '1 days left',
    },
    {
      tagId: 'ventilator-b3',
      status: BatteryStatus.DEAD,
      batteryLevel: 22,
      prediction: '2 days left',
    },
    {
      tagId: 'ecg-machine-g1',
      status: BatteryStatus.DEAD,
      batteryLevel: 38,
      prediction: '4 days left',
    },
    {
      tagId: 'ventilator-b2',
      status: BatteryStatus.DEPLETING,
      batteryLevel: 45,
      prediction: '5 days left',
    },
    {
      tagId: 'defibrillator-a1',
      status: BatteryStatus.DEPLETING,
      batteryLevel: 75,
      prediction: '10 days left',
    },
    {
      tagId: 'infusion-pump-d2',
      status: BatteryStatus.DEPLETING,
      batteryLevel: 82,
      prediction: '12 days left',
    },
    {
      tagId: 'patient-monitor-c1',
      status: BatteryStatus.DEPLETING,
      batteryLevel: 68,
      prediction: '8 days left',
    },
    {
      tagId: 'ventilator-b1',
      status: BatteryStatus.FULL,
      batteryLevel: 71,
      prediction: '9 days left',
    },
    {
      tagId: 'ecg-machine-g2',
      status: BatteryStatus.FULL,
      batteryLevel: 65,
      prediction: '7 days left',
    },
    {
      tagId: 'pulse-oximeter-h2',
      status: BatteryStatus.FULL,
      batteryLevel: 58,
      prediction: '6 days left',
    },
    {
      tagId: 'defibrillator-a2',
      status: BatteryStatus.FULL,
      batteryLevel: 85,
      prediction: '15 days left',
    },
  ];

  get totalEquipment(): number {
    return this.equipmentData.length;
  }

  get depletingStatus(): number {
    return this.equipmentData.filter((item) => item.status === BatteryStatus.DEPLETING).length;
  }

  get deadStatus(): number {
    return this.equipmentData.filter((item) => item.status === BatteryStatus.DEAD).length;
  }

  get averageBattery(): number {
    const validBatteryLevels = this.equipmentData
      .map((item) => item.batteryLevel)
      .filter((level): level is number => level !== undefined);

    if (validBatteryLevels.length === 0) return 0;

    const sum = validBatteryLevels.reduce((acc, level) => acc + level, 0);
    return Math.round(sum / validBatteryLevels.length);
  }

  get infoCards(): InfoCard[] {
    return [
      {
        title: 'Total Equipment',
        content: 12,
        subtitle: 'Active monitoring tags',
        icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
        iconColor: 'text-black-400',
      },
      {
        title: BatteryStatus.DEAD,
        content: 3,
        subtitle: 'Requires immediate attention',
        icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
        iconColor: StatusColor[BatteryStatus.DEAD],
      },
      {
        title: BatteryStatus.DEPLETING,
        content: 2,
        subtitle: 'Monitor closely',
        icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.102L13.828 9.828m3.153 3.153a4 4 0 005.656 0l4-4a4 4 0 10-5.656-5.656l-1.1 1.1',
        iconColor: StatusColor[BatteryStatus.DEPLETING],
      },
      {
        title: 'Average Battery',
        content: 59,
        subtitle: '',
        icon: 'M15 7h4a2 2 0 012 2v6a2 2 0 01-2 2h-4m-2 2h-2m4-2H5a2 2 0 01-2-2V9a2 2 0 012-2h4m-2 2h2',
        iconColor: 'text-custom-success',
        isBattery: true,
      },
    ];
  }

  get equipmentNeedingAttention(): Tag[] {
    return this.equipmentData
      .filter(
        (item) => item.status === BatteryStatus.DEAD || item.status === BatteryStatus.DEPLETING,
      )
      .sort((a, b) => {
        // Sort by prediction (extract days from string), then by batteryLevel (ascending)
        const extractDays = (prediction?: string): number => {
          if (!prediction) return Infinity;
          const match = prediction.match(/(\d+)/);
          return match ? parseInt(match[1], 10) : Infinity;
        };
        const aDays = extractDays(a.prediction);
        const bDays = extractDays(b.prediction);
        if (aDays !== bDays) {
          return aDays - bDays;
        }
        return (a.batteryLevel ?? 0) - (b.batteryLevel ?? 0);
      });
  }
}
