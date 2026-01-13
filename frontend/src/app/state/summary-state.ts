import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { CurrentStatusService } from '../shared/services/battery-status/current-status.service';
import { NotificationService } from '../shared/services/notification.service';
import { Summary } from '../shared/models/summary.model';

@Injectable({ providedIn: 'root' })
export class SummaryStateService {
  private currentStatusService = inject(CurrentStatusService);
  private notificationService = inject(NotificationService);

  private _latestSummary: WritableSignal<Summary> = signal<Summary>({
    id: 0,
    date: '0',
    total_tags: 0,
    normal_count: 0,
    low_count: 0,
    offline_count: 0,
    average_percentage: 0,
  });

  latestSummary: Signal<Summary> = this._latestSummary.asReadonly();

  loadLatestSummary() {
    try {
      this.currentStatusService.getLatestSummary().subscribe((summary) => {
        this._latestSummary.set(summary);
      });
    } catch (error) {
      console.error('Error loading latest summary:', error);
      this.notificationService.showError('Error loading latest summary');
    }
  }
}
