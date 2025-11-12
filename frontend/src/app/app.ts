import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InfoCards } from './shared/components/info-cards/info-cards';
import { StatusDistribution } from './shared/components/status-distribution/status-distribution';
import { Header } from './shared/components/header/header';
import { StackedAreaChart } from './shared/components/stacked-area-chart/stacked-area-chart';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    RouterOutlet,
    InfoCards,
    StatusDistribution,
    Header,
    StackedAreaChart,
    NgApexchartsModule,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {}
