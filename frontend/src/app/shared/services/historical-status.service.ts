import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BatteryStatus } from '../../enums';
import { BatteryStatusCount } from '../models/battery-status-count';

/**
 * Service for fetching and filtering historical battery status data.
 * Currently provides mock data, structured for easy backend integration.
 */
@Injectable({
  providedIn: 'root',
})
export class HistoricalStatusService {
  /**
   * Retrieves the total count of historical status records.
   * @returns Observable of total count response
   */
  getHistoricalStatusCount(): Observable<{ data: number }> {
    // Mock data - total historical records
    const mockCount = 450;

    // Simulate API call with delay
    return of({ data: mockCount }).pipe(delay(300));

    // Future backend integration:
    // return this.http.get<{ data: number }>('/api/equipment/historical-status/count');
  }

  /**
   * Filters historical status records by number of days.
   * @param days Number of days to filter historical data (e.g., 7 for last 7 days)
   * @returns Observable of filtered historical status data
   */
  getHistoricalStatusByDays(days: number): Observable<{ data: BatteryStatusCount[] }> {
    // Mock data varying by day parameter
    const mockDataMap: Record<number, BatteryStatusCount[]> = {
      7: [
        { status: BatteryStatus.FULL, count: 45 },
        { status: BatteryStatus.NORMAL, count: 12 },
        { status: BatteryStatus.WARNING, count: 8 },
        { status: BatteryStatus.CRITICAL, count: 5 },
      ],
      30: [
        { status: BatteryStatus.FULL, count: 180 },
        { status: BatteryStatus.NORMAL, count: 50 },
        { status: BatteryStatus.WARNING, count: 35 },
        { status: BatteryStatus.CRITICAL, count: 20 },
      ],
      90: [
        { status: BatteryStatus.FULL, count: 520 },
        { status: BatteryStatus.NORMAL, count: 145 },
        { status: BatteryStatus.WARNING, count: 95 },
        { status: BatteryStatus.CRITICAL, count: 60 },
      ],
    };

    // Default to 7 days if not in map
    const mockData = mockDataMap[days] || mockDataMap[7];

    // Simulate API call with delay
    return of({ data: mockData }).pipe(delay(300));

    // Future backend integration:
    // return this.http.get<{ data: BatteryStatusCount[] }>(`/api/equipment/historical-status/?days=${days}`);
  }
}
