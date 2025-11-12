import { Component, OnInit, input } from '@angular/core';

interface StatusIten {
  label: string;
  count: number;
  percent: number;
  color: string;
}

@Component({
  selector: 'app-status-distribution',
  imports: [],
  templateUrl: './status-distribution.html',
  styleUrl: './status-distribution.scss',
})
export class StatusDistribution implements OnInit {
  statusData = input<StatusIten[]>([
    { label: 'Normal', color: 'green', percent: 50, count: 6 },
    { label: 'Warning', color: 'yellow', percent: 17, count: 2 },
    { label: 'Critical', color: 'red', percent: 25, count: 3 },
    { label: 'Charging', color: 'blue', percent: 8, count: 1 },
  ]);

  ngOnInit(): void {
    //if the parent provides data, this will override the default
  }

  getColorValue(color: string): string {
    const colors: Record<string, string> = {
      green: '#10B981',
      yellow: '#F59E0B',
      red: '#DC2626',
      blue: '#3B82F6',
    };
    return colors[color] || '#9CA3AF';
  }
}

// for future
// fetchDataFromAPI() {
//   this.http.get<StatusItem[]>('/api/status-data').subscribe(data => {
//     this.statusData = data;
//   });
// }
