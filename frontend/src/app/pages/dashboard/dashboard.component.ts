import { Component, effect, inject } from '@angular/core';

import { EquipmentAttentionComponent } from '../../shared/components/equipment-attention/equipment-attention.component';
import { InfoCards } from '../../shared/components/info-cards/info-cards';
import { StatusDistribution } from '../../shared/components/status-distribution/status-distribution';
import { BatteryStatusTitle } from '../../enums';
import { InfoCard } from '../../shared/components/info-cards/models/info-card.model';
import { StatusColor } from '../../shared/models/battery-status-color';
import { SummaryStateService } from '../../state/summary-state';
import { CurrentStatusService } from '../../shared/services/battery-status/current-status.service';
import { TagStateService } from '../../state/tag-state';
import { firstValueFrom } from 'rxjs';
import { Tag } from '../../shared/models/tag.model';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [EquipmentAttentionComponent, InfoCards, StatusDistribution],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private summaryStateService = inject(SummaryStateService);
  private tagsStateService = inject(TagStateService);
  private batteryStatusService = inject(CurrentStatusService);

  equipmentNeedingAttention: Tag[] = [];
  summary = this.summaryStateService.latestSummary;
  tags = this.tagsStateService.tags;

  private _tagsEffect = effect(async () => {
    if (this.tags().length) {
      await this.loadEquipNeedingAttention();
    }
  });

  get infoCards(): InfoCard[] {
    return [
      {
        title: 'Total Equipment',
        content: this.summary().total_tags,
        subtitle: 'Active monitoring tags',
        icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
        iconColor: 'text-black-400',
      },
      {
        title: BatteryStatusTitle.OFFLINE,
        content: this.summary().offline_count,
        subtitle: 'Requires immediate attention',
        icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
        iconColor: StatusColor[BatteryStatusTitle.OFFLINE],
      },
      {
        title: BatteryStatusTitle.LOW,
        content: this.summary().low_count,
        subtitle: 'Monitor closely',
        icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.102L13.828 9.828m3.153 3.153a4 4 0 005.656 0l4-4a4 4 0 10-5.656-5.656l-1.1 1.1',
        iconColor: StatusColor[BatteryStatusTitle.LOW],
      },
      {
        title: 'Average Battery',
        content: this.summary().average_percentage,
        subtitle: '',
        icon: 'M15 7h4a2 2 0 012 2v6a2 2 0 01-2 2h-4m-2 2h-2m4-2H5a2 2 0 01-2-2V9a2 2 0 012-2h4m-2 2h2',
        iconColor: 'text-custom-success',
        isBattery: true,
      },
    ];
  }

  async loadEquipNeedingAttention() {
    const nodeAddresses: string[] =
      (await firstValueFrom(
        this.batteryStatusService.filterTags([BatteryStatusTitle.OFFLINE, BatteryStatusTitle.LOW]),
      )) ?? [];
    this.equipmentNeedingAttention = this.tags()
      .filter((tag) => nodeAddresses.includes(tag.node_address))
      .slice(0, 3);
  }
}
