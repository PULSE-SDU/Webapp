import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StackedAreaChart } from '../../../shared/components/stacked-area-chart/stacked-area-chart';
import { InfoCards } from '../../../shared/components/info-cards/info-cards';

@Component({
  selector: 'app-analytics',
  imports: [CommonModule, StackedAreaChart, InfoCards],
  templateUrl: './analytics.html',
  styleUrl: './analytics.scss',
})
export class Analytics {}
