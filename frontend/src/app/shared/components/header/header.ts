import { Component, inject, OnDestroy, OnInit } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TabModel } from './models/link.model';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [RouterModule, MatToolbarModule, MatIconModule, MatTabsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit, OnDestroy {
  private router = inject(Router);
  tabs: TabModel[] = [
    { label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
    { label: 'Tag List', path: '/tag-list', icon: 'list' },
    { label: 'Analytics', path: '/analytics', icon: 'show_chart' },
  ];

  public activeLink = '';
  private sub?: Subscription;

  ngOnInit(): void {
    this.setActiveFromUrl(this.router.url);
    this.sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setActiveFromUrl(event.urlAfterRedirects);
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private setActiveFromUrl(url: string): void {
    const matched = this.tabs.find((t) => url.startsWith(t.path));
    this.activeLink = matched ? matched.path : this.tabs[0].path;
  }
}
