import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, Header, NgApexchartsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {}
