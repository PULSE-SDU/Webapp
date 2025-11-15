import { Component, input, output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Tag } from '../../../../shared/models/tag.model';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { BatteryStatus } from '../../../../enums';
import {BatteryBar} from '../../../../shared/components/battery-bar/battery-bar';

@Component({
  standalone: true,
  selector: 'app-tags-list',
  imports: [CommonModule, MatTableModule, MatButtonModule, BatteryBar],
  templateUrl: './tags-list.html',
  styleUrl: './tags-list.scss',
})
export class TagsList {
  public tags = input<Tag[]>([]);
  public openTagDetails = output<Tag>();
}
