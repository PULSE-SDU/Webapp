import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  StatusDistribution,
  EquipmentStatus,
  StatusDistributionResponse,
} from '../components/status-distribution-chart/models/status-distribution.model';

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
  getStatusDistribution(): Observable<StatusDistributionResponse> {
    // Mock data matching the specification
    const mockData: StatusDistribution[] = [
      { status: EquipmentStatus.Normal, count: 6 },
      { status: EquipmentStatus.Warning, count: 2 },
      { status: EquipmentStatus.Critical, count: 3 },
      { status: EquipmentStatus.Charging, count: 1 },
    ];

    // Simulate API call with delay
    return of({ data: mockData }).pipe(delay(300));

    // Future backend integration:
    // return this.http.get<StatusDistributionResponse>('/api/equipment/status-distribution/');
  }
}
