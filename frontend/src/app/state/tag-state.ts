import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Tag } from '../shared/models/tag.model';
import { TagService } from '../shared/services/tag.service';
import { CurrentStatusService } from '../shared/services/battery-status/current-status.service';
import { BatteryStatus } from '../shared/models/battery-status.model';
import { NotificationService } from '../shared/services/notification.service';

@Injectable({ providedIn: 'root' })
export class TagStateService {
  private tagService = inject(TagService);
  private currentStatusService = inject(CurrentStatusService);
  private notificationService = inject(NotificationService);

  private _tags: WritableSignal<Tag[]> = signal<Tag[]>([]);
  tags: Signal<Tag[]> = this._tags.asReadonly();

  loadTags() {
    try {
      this.tagService.getTags().subscribe(tags => {
        const baseTags: Tag[] = tags.map(t => ({
          node_address: t.node_address,
          voltage: t.voltage,
          created_at: t.created_at,
          updated_at: t.updated_at,
        }));

        this._tags.set(baseTags);

        baseTags.forEach(tag => {
          this.currentStatusService
            .getTagBatteryStatus(tag.node_address)
            .subscribe(status => {
              this.updateTag(tag.node_address, status);
            });
        });
      });
    } catch (error) {
      console.error('Error loading tags:', error);
      this.notificationService.showError('Error loading tags');
    }
  }

  private updateTag(nodeAddress: string, status: BatteryStatus) {
    this._tags.update(tags =>
    tags.map(tag =>
    tag.node_address === nodeAddress
    ? {
      ...tag,
      battery_status: {
        title: status.title,
        percentage: status.percentage,
        prediction_days: status.prediction_days,
        prediction_hours: status.prediction_hours,
      } as BatteryStatus
    }: tag
    ))
  }
}
