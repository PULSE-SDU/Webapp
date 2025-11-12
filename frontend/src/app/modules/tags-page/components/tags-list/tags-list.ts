import { Component, input, output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Tag } from '../../../../shared/models/tag.model';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TagStatus } from '../../../../enums';

@Component({
  standalone: true,
  selector: 'app-tags-list',
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './tags-list.html',
  styleUrl: './tags-list.scss',
})
export class TagsList {
  public tags = input<Tag[]>([]);
  public openTagDetails = output<Tag>();

  getBatteryColor(status: TagStatus): string {
    if (!status) return '#6b7280';
    if (status === TagStatus.CHARGING) return '#000000';
    if (status === TagStatus.CRITICAL) return '#ef4444';
    if (status === TagStatus.WARNING) return '#f59e0b';
    return '#6b7280';
  }
}
