import { Component, inject, OnInit, effect } from '@angular/core';
import { Filters } from '../../../../shared/components/filters/filters';
import { TagsList } from '../tags-list/tags-list';
import { Tag } from '../../../../shared/models/tag.model';
import { TagDetailsDialogComponent } from '../../../../shared/components/tag-details-dialog/tag-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TagStateService } from '../../../../state/tag-state';
import { BatteryStatusTitle, FilterType } from '../../../../enums';
import { FilterDescriptor } from '../../../../shared/components/filters/models/filter-descriptor';

@Component({
  standalone: true,
  selector: 'app-tags-browser',
  imports: [Filters, TagsList, MatPaginatorModule],
  templateUrl: './tags-browser.html',
  styleUrl: './tags-browser.scss',
})
export class TagsBrowser implements OnInit {
  private dialog = inject(MatDialog);
  tagState = inject(TagStateService);
  tags = this.tagState.tags;

  length = 0;
  pageSize = 10;
  pageIndex = 0;

  pagedTags: Tag[] = [];

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
      options: Object.values(BatteryStatusTitle),
      multiple: true,
    },
    {
      key: 'prediction',
      type: FilterType.SELECT,
      placeholder: 'Prediction',
      options: ['Less than 24 hours', '1-3 days', 'More than 3 days'],
    },
  ];

  ngOnInit() {
    this.tagState.loadTags();
    this.setPage(this.pageIndex, this.pageSize);

    effect(() => {
      const current = this.tags();
      this.length = current.length;
      this.setPage(this.pageIndex, this.pageSize);
    });
  }

  setPage(pageIndex: number, pageSize: number) {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    const all = this.tags();
    this.pagedTags = all.slice(start, end);
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
