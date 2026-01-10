import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Tag } from '../shared/models/tag.model';
import { TagService } from '../shared/services/tag.service';
import { CurrentStatusService } from '../shared/services/battery-status/current-status.service';
import { BatteryStatus } from '../shared/models/battery-status.model';

@Injectable({ providedIn: 'root' })
export class TagStateService {
  private _tags: WritableSignal<Tag[]> = signal<Tag[]>([]);
  tags: Signal<Tag[]> = this._tags.asReadonly();
  private tagService = inject(TagService);
  private currentStatusService = inject(CurrentStatusService);

  loadTags() {
    this.tagService.getTags().subscribe(tags => {
      const baseTags: Tag[] = tags.map(t => ({
        node_address: t.node_address,
        voltage: t.voltage
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
  }

  private updateTag(nodeAddress: string, status: BatteryStatus) {
    this._tags.update(tags =>
    tags.map(tag =>
    tag.node_address === nodeAddress
    ? {
      ...tag,
      batteryStatus: {
        status_title: status.status_title,
        battery_percentage: status.battery_percentage,
        prediction_days: status.prediction_days,
        prediction_hours: status.prediction_hours,
      } as BatteryStatus
    }: tag
    ))
  }
}
