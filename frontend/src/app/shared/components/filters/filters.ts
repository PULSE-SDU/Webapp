import { Component, OnInit, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterDescriptor, FilterValue } from './models/filter-descriptor';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterType } from '../../../enums';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './filters.html',
  styleUrls: ['./filters.scss'],
})
export class Filters implements OnInit {
  protected readonly FilterType = FilterType;
  public filtersFormGroup: FormGroup = new FormGroup({});

  public filters = input<FilterDescriptor[]>([]);
  public updateFilter = output<FilterValue>();

  ngOnInit() {
    const formControls: Record<string, FormControl> = {};
    for (const filter of this.filters() || []) {
      formControls[filter.key] = new FormControl(
        filter.type === FilterType.SELECT && filter.multiple ? [] : '',
      );
    }
    this.filtersFormGroup = new FormGroup(formControls);

    this.filtersFormGroup.valueChanges.subscribe((values: FilterValue) => {
      this.updateFilter.emit(values);
    });
  }

  clearFilters() {
    this.filtersFormGroup.reset();
  }
}
