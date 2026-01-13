import { Component, input } from '@angular/core';
import { InfoCard } from './models/info-card.model';

@Component({
  selector: 'app-info-cards',
  imports: [],
  templateUrl: './info-cards.html',
  styleUrl: './info-cards.scss',
})
export class InfoCards {
  infoCards = input<InfoCard[]>([]);

  get cardsToDisplay(): InfoCard[] {
    return this.infoCards().length ? this.infoCards() : [];
  }

  getValueClass(card: InfoCard): string {
    if (card.isBattery) return 'text-gray-900';
    return card.iconColor ?? 'text-gray-900';
  }
}
