import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Summary } from '../../models/summary.model';

@Injectable({
  providedIn: 'root',
})
export class HistoricStatusService {
  private http = inject(HttpClient);

  getSummaries(days: 7 | 14 | 30): Observable<Summary[]> {
    const params = new HttpParams().set('days', days.toString());
    return this.http.get<Summary[]>(`${environment.apiUrl}/summary/`, { params }).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
