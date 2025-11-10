import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InfoCards } from './info-cards/info-cards'; 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InfoCards],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('PULSE');
}
