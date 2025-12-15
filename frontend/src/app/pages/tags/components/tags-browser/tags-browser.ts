import { Component, inject, OnInit } from '@angular/core';
import { Filters } from '../../../../shared/components/filters/filters';
import { TagsList } from '../tags-list/tags-list';
import { Tag } from '../../../../shared/models/tag.model';
import { FilterType, BatteryStatus } from '../../../../enums';
import { TagDetailsDialogComponent } from '../../../../shared/components/tag-details-dialog/tag-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FilterDescriptor } from '../../../../shared/components/filters/models/filter-descriptor';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TagService } from '../../../../shared/services/tag.service';

@Component({
  standalone: true,
  selector: 'app-tags-browser',
  imports: [Filters, TagsList, MatPaginatorModule],
  templateUrl: './tags-browser.html',
  styleUrl: './tags-browser.scss',
})
export class TagsBrowser implements OnInit {
  private dialog = inject(MatDialog);
  private tagService = inject(TagService);

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
      options: Object.values(BatteryStatus),
      multiple: true,
    },
    {
      key: 'prediction',
      type: FilterType.SELECT,
      placeholder: 'Prediction',
      options: ['Less than 7 days', '7-30 days', 'More than 30 days'],
    },
  ];

  tags: Tag[] = [];

  length = 0;
  pageSize = 10;
  pageIndex = 0;

  pagedTags: Tag[] = [];

  ngOnInit() {
    this.loadTags();
  }

  loadTags() {
    this.tagService.getTags().subscribe({
      next: (data: Tag[]) => {
        this.tags = data;
        this.updatePagedTags(); // Show list immediately

        // Then fetch AI predictions one by one (by DB pk)
        this.tags.forEach((tag) => {
          if (tag.id == null) {
            tag.prediction = 'No id';
            return;
          }

          this.tagService.getPrediction(tag.id).subscribe({
            next: (pred) => {
              tag.prediction = pred;
            },
            error: (err) => {
              console.error(`Error fetching prediction for ${tag.tagId}:`, err);
              tag.prediction = 'No Prediction Data';
            },
          });
        });
      },
      error: (err) => console.error(err),
    });
  }

  fetchPrediction(tag: Tag) {
    if (tag.id == null) return;

    this.tagService.getPrediction(tag.id).subscribe({
      next: (prediction: string) => {
        this.tags = this.tags.map(t =>
          t.id === tag.id ? { ...t, prediction } : t
        );
        this.updatePagedTags();
      },
      error: (err: any) =>
        console.error(`Error fetching prediction for ${tag.tagId}:`, err),
    });
  }


  updatePagedTags() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedTags = this.tags.slice(start, end);
  }

  onPage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedTags();
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
