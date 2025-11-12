import { Component, input } from '@angular/core';

@Component({
  selector: 'app-info-cards',
  imports: [],
  templateUrl: './info-cards.html',
  styleUrl: './info-cards.scss',
})
export class InfoCards {
  totalEquipment = input(12);
  criticalStatus = input(3);
  warningStatus = input(2);
  averageBattery = input(59);
}
