import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { TabModel } from './models/link.model';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [CommonModule, RouterModule, MatToolbarModule, MatIconModule, MatTabsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  tabs: TabModel[] = [
    { label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    { label: 'Tag List', path: '/tag-list', icon: 'list' },
    { label: 'Analytics', path: '/analytics', icon: 'show_chart' },
  ];

  activeLink: string = this.tabs[0].path;
}
