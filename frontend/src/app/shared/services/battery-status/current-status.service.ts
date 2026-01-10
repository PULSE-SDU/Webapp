import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NotificationService } from '../notification.service';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { BatteryStatusTitle } from '../../../enums';
import { BatteryStatusCount } from '../../models/battery-status-count';
import { BatteryStatus } from '../../models/battery-status.model';

@Injectable({
  providedIn: 'root',
})
export class CurrentStatusService {
  private http = inject(HttpClient)
  private notificationService = inject(NotificationService);

  getTagBatteryStatus(nodeAddress: string): Observable<BatteryStatus> {
    return this.http.get<BatteryStatus>(`${environment.apiUrl}/battery-status/${nodeAddress}`).pipe(
      catchError((error) => {
        this.notificationService.showError('Failed to fetch tag battery status.');
        return throwError(() => error);
      }
    ));
  }

  filterTagsByStatus(statusTitle: BatteryStatusTitle): Observable<string[]> {
    const params = new HttpParams().set('status', statusTitle as unknown as string);
    return this.http.get<string[]>(`${environment.apiUrl}/battery-status`, { params }).pipe(
      catchError((error) => {
        this.notificationService.showError('Failed to filter tags by status.');
        return throwError(() => error);
      }
    ));
  }

  getBatteryStatusCount(): Observable<BatteryStatusCount> {
    return this.http.get<BatteryStatusCount>(`${environment.apiUrl}/battery-status/count-by-status`).pipe(
      catchError((error) => {
        this.notificationService.showError('Failed to get count by status.');
        return throwError(() => error);
      }
    ));
  }
}
