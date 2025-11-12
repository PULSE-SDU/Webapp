import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { NgApexchartsModule } from 'ng-apexcharts';
import { StatusDistributionChartComponent } from './shared/components/status-distribution-chart/status-distribution-chart.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, Header, NgApexchartsModule, StatusDistributionChartComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {}
