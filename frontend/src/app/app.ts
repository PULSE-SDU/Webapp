import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InfoCards } from './info-cards/info-cards'; 
import { StatusDistribution } from './status-distribution/status-distribution';
import { Header } from './shared/components/header/header';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, InfoCards, StatusDistribution, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
