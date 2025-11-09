import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { EquipmentAttentionItem } from '../../models/equipment-attention-item.model';

@Component({
  standalone: true,
  selector: 'app-equipment-attention',
  imports: [CommonModule, MatCardModule],
  templateUrl: './equipment-attention.component.html',
  styleUrl: './equipment-attention.component.scss',
})
export class EquipmentAttentionComponent {
  @Input() equipment: EquipmentAttentionItem[] = [];
}
