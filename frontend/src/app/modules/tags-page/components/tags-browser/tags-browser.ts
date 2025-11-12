import { Component, inject } from '@angular/core';
import { Filters } from '../../../../shared/components/filters/filters';
import { TagsList } from '../tags-list/tags-list';
import { Tag } from '../../../../shared/models/tag.model';
import { FilterType, TagStatus } from '../../../../enums';
import { TagDetailsDialogComponent } from '../../../../shared/components/tag-details-dialog/tag-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FilterDescriptor } from '../../../../shared/components/filters/models/filter-descriptor';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  standalone: true,
  selector: 'app-tags-browser',
  imports: [Filters, TagsList, MatPaginator],
  templateUrl: './tags-browser.html',
  styleUrl: './tags-browser.scss',
})
export class TagsBrowser {
  private dialog = inject(MatDialog);

  filters: FilterDescriptor[] = [
    {
      key: 'search',
      type: FilterType.SEARCH,
      placeholder: 'Search tags...',
    },
    {
      key: 'status',
      type: FilterType.SELECT,
      placeholder: 'All statuses',
      options: Object.values(TagStatus),
      multiple: true,
    },
    {
      key: 'prediction',
      type: FilterType.SELECT,
      placeholder: 'Prediction',
      options: ['Less than 7 days', '7-30 days', 'More than 30 days'],
    },
  ];

  tags: Tag[] = [
    {
      tagId: '1',
      batteryLevel: 1,
      status: TagStatus.FULL,
      prediction: '30 days left',
      voltage: 3,
    },
    {
      tagId: '2',
      batteryLevel: 0.5,
      status: TagStatus.WARNING,
      prediction: '15 days left',
      voltage: 2.5,
    },
    {
      tagId: '3',
      batteryLevel: 0.2,
      status: TagStatus.CRITICAL,
      prediction: '5 days left',
      voltage: 1.5,
    },
    {
      tagId: '4',
      batteryLevel: 0.85,
      status: TagStatus.FULL,
      prediction: '45 days left',
      voltage: 3.2,
    },
    {
      tagId: '5',
      batteryLevel: 0.65,
      status: TagStatus.WARNING,
      prediction: '20 days left',
      voltage: 2.9,
    },
    {
      tagId: '6',
      batteryLevel: 0.4,
      status: TagStatus.WARNING,
      prediction: '12 days left',
      voltage: 2.6,
    },
    {
      tagId: '7',
      batteryLevel: 0.95,
      status: TagStatus.FULL,
      prediction: '60 days left',
      voltage: 3.3,
    },
    {
      tagId: '8',
      batteryLevel: 0.12,
      status: TagStatus.CRITICAL,
      prediction: '3 days left',
      voltage: 1.4,
    },
    {
      tagId: '9',
      batteryLevel: 0.33,
      status: TagStatus.CRITICAL,
      prediction: '7 days left',
      voltage: 1.8,
    },
  ];

  length = this.tags.length;

  // tags that are actually shown in the list
  pagedTags: Tag[] = [];

  constructor() {
    this.setPage(0, 10);
  }

  setPage(pageIndex: number, pageSize: number) {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    this.pagedTags = this.tags.slice(start, end);
  }

  onPage(event: { pageIndex: number; pageSize: number }) {
    this.setPage(event.pageIndex, event.pageSize);
  }

  openTagDetails(tag: Tag): void {
    this.dialog.open(TagDetailsDialogComponent, {
      width: '600px',
      maxWidth: '90vw',
      height: '90vh',
      data: tag,
    });
  }
}
