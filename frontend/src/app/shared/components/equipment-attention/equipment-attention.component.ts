import { Component, input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { Tag } from '../../models/tag.model';
import { BatteryStatusTitle } from '../../../enums';
import { StatusChipComponent } from '../status-chip/status-chip';

@Component({
  standalone: true,
  selector: 'app-equipment-attention',
  imports: [MatCardModule, StatusChipComponent],
  templateUrl: './equipment-attention.component.html',
  styleUrl: './equipment-attention.component.scss',
})
export class EquipmentAttentionComponent {
  public equipment = input<Tag[]>([]);
  protected readonly batteryStatus = BatteryStatusTitle;
}
