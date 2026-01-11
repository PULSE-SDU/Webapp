import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NotificationService } from '../notification.service';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { BatteryStatus } from '../../models/battery-status.model';
import { FilterValue } from '../../components/filters/models/filter-descriptor';

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

  filterTags(statusTitle?: FilterValue, predictionDays?: FilterValue): Observable<string[]> {
    let params = new HttpParams();
    if (statusTitle && statusTitle.length > 0) {
      const statusTitleParam = Array.isArray(statusTitle) ? statusTitle.join(',') : statusTitle;
      params = params.set('title', statusTitleParam);
    }
    if (predictionDays) {
      if (Array.isArray(predictionDays)) {
        params = params.set('prediction_days', predictionDays.join(','));
      } else {
        params = params.set('prediction_days__gte', predictionDays.toString());
      }
    }
    return this.http.get<string[]>(`${environment.apiUrl}/battery-status/`, { params }).pipe(
      catchError((error) => {
        this.notificationService.showError('Failed to filter battery status.');
        return throwError(() => error);
      })
    );
  }

  searchTags(searchValue: FilterValue): Observable<string[]> {
    const search = searchValue.toString();
    return this.http.get<string[]>(`${environment.apiUrl}/battery-status/`, { params: { search } }).pipe(
      catchError((error) => {
        this.notificationService.showError('Could not find battery status for the search term.');
        return throwError(() => error);
      })
    );
  }
}
