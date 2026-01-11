import { Component, inject, OnInit } from '@angular/core';
import { Filters } from '../../../../shared/components/filters/filters';
import { TagsList } from '../tags-list/tags-list';
import { Tag } from '../../../../shared/models/tag.model';
import {
  TagDetailsDialogComponent
} from '../../../../shared/components/tag-details-dialog/tag-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TagStateService } from '../../../../state/tag-state';
import { BatteryStatusTitle, FilterType } from '../../../../enums';
import {
  FilterDescriptor,
  FilterValue,
} from '../../../../shared/components/filters/models/filter-descriptor';
import { CurrentStatusService } from '../../../../shared/services/battery-status/current-status.service';
import { PredictionFilterMap, PredictionFilterOption } from '../../models/prediction-filter-values';

@Component({
  standalone: true,
  selector: 'app-tags-browser',
  imports: [Filters, TagsList, MatPaginatorModule],
  templateUrl: './tags-browser.html',
  styleUrl: './tags-browser.scss',
})
export class TagsBrowser implements OnInit {
  private dialog = inject(MatDialog);
  private tagState = inject(TagStateService);
  private batteryStatusService = inject(CurrentStatusService);

  tags = this.tagState.tags;
  length = 0;
  pageSize = 10;
  pageIndex = 0;

  pagedTags: Tag[] = [];
  filteredTags: Tag[] = [];

  filters: FilterDescriptor[] = [
    {
      key: 'search',
      type: FilterType.SEARCH,
      placeholder: 'Search tags...',
    },
    {
      key: 'title',
      type: FilterType.SELECT,
      placeholder: 'All statuses',
      options: Object.values(BatteryStatusTitle),
      multiple: true,
    },
    {
      key: 'prediction_day',
      type: FilterType.SELECT,
      placeholder: 'Prediction',
      options: Object.keys(PredictionFilterMap),
    },
  ];

  ngOnInit() {
    this.filteredTags = this.tags();
    this.length = this.filteredTags.length;
    this.setPage(this.pageIndex, this.pageSize);
  }

  setPage(pageIndex: number, pageSize: number) {
    const start = pageIndex * pageSize;
    const end = start + pageSize;
    this.pagedTags = this.filteredTags.slice(start, end);
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

  updateFilter(values: Record<string, unknown>) {
    this.filters = this.filters.map(f => ({
      ...f,
      value: values[f.key] as FilterValue
    }));

    const searchValue = this.filters.find(f => f.key === 'search')?.value;
    const titleValue = this.filters.find(f => f.key === 'title')?.value;
    let predictionValue = this.filters.find(f => f.key === 'prediction_day')?.value;

    if (predictionValue && (predictionValue as string).length !== 0) {
      predictionValue = this.mapPredictionFilter(predictionValue as string);
    } else {
      predictionValue = undefined;
    }

    this.batteryStatusService.filterTags(titleValue, predictionValue).subscribe((node_addresses) => {
      this.filteredTags = this.tags().filter((tag) =>
        node_addresses.some((node_address) => node_address === tag.node_address)
      );

      if (searchValue && (searchValue as string).length !== 0) {
        this.batteryStatusService.searchTags(searchValue as string).subscribe((node_addresses) => {
          this.filteredTags = this.filteredTags.filter((tag) =>
            node_addresses.some((node_address) => node_address === tag.node_address)
          );
          this.setPage(this.pageIndex, this.pageSize);
          this.length = this.filteredTags.length;
        });
      } else {
        this.setPage(this.pageIndex, this.pageSize);
        this.length = this.filteredTags.length;
      }
    });
  }

  private mapPredictionFilter(value: string): string[] | string | undefined {
    if (value in PredictionFilterMap) {
      return PredictionFilterMap[value as PredictionFilterOption];
    }
    return value && value.length !== 0 ? value : undefined;
  }
}
