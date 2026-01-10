import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BatteryStatusTitle } from '../../../enums';
import { BatteryStatusCount } from '../../models/battery-status-count';

/**
 * Service for fetching equipment status distribution data.
 * Currently provides mock data, structured for easy backend integration.
 */
@Injectable({
  providedIn: 'root',
})
export class StatusDistributionService {
  /**
   * Fetches the current equipment status distribution.
   * @returns Observable of status distribution response
   */
  getStatusDistribution(): Observable<{ data: BatteryStatusCount[] }> {
    // Mock data matching the specification
    const mockData: BatteryStatusCount[] = [
      { status: BatteryStatusTitle.GOOD, count: 6 },
      { status: BatteryStatusTitle.LOW, count: 2 },
      { status: BatteryStatusTitle.OFFLINE, count: 3 },
    ];

    // Simulate API call with delay
    return of({ data: mockData }).pipe(delay(300));

    // Future backend integration:
    // return this.http.get<{ data: BatteryStatusCount[] }>('/api/equipment/status-distribution/');
  }
}
