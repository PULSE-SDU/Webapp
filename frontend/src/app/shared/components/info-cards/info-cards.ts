import { Component } from '@angular/core';

@Component({
  selector: 'app-info-cards',
  imports: [],
  templateUrl: './info-cards.html',
  styleUrl: './info-cards.scss',
})
export class InfoCards {
  totalEquipment = 12;
  criticalStatus = 3;
  warningStatus = 2;
  averageBattery = 59;
}
