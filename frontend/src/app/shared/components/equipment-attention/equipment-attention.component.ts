import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Tag } from '../../models/tag.model';
import { BatteryStatus } from '../../../enums';

@Component({
  standalone: true,
  selector: 'app-equipment-attention',
  imports: [CommonModule, MatCardModule],
  templateUrl: './equipment-attention.component.html',
  styleUrl: './equipment-attention.component.scss',
})
export class EquipmentAttentionComponent {
  public equipment = input<Tag[]>([]);
  protected readonly batteryStatus = BatteryStatus;
}
