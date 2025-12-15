import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Tag } from '../models/tag.model';
import { BatteryStatus } from '../../enums';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private http = inject(HttpClient);
  private apiUrl = `http://localhost:8000/api/tags/`;

  getTags(): Observable<Tag[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((tags) =>
        tags.map((t) => {
          const rawTagId = t.tagId || t.tag_id;
          const tagId = String(rawTagId);

          // Assumption: 3.1V = 100%, 2.6V = 0%
          let calculatedLevel = 0;
          if (t.voltage) {
             const maxV = 3.1;
             const minV = 2.6;
             const pct = ((t.voltage - minV) / (maxV - minV)) * 100;
             calculatedLevel = Math.max(0, Math.min(100, Math.round(pct)));
          }

          const finalBatteryLevel = t.batteryLevel ?? calculatedLevel;

          let derivedStatus = BatteryStatus.FULL;
          if (finalBatteryLevel < 20) {
            derivedStatus = BatteryStatus.DEAD;
          } else if (finalBatteryLevel < 50) {
            derivedStatus = BatteryStatus.DEPLETING;
          }

          return {
            id: t.id,
            tagId: String(t.tagId ?? t.tag_id),
            batteryLevel: finalBatteryLevel,
            status: t.status || derivedStatus,
            voltage: t.voltage,
            prediction: 'Loading...'
          };
        })
      )
    );
  }

  getTag(tagId: string): Observable<Tag> {
    return this.http.get<Tag>(`${this.apiUrl}${tagId}/`);
  }

  getTagDetails(tagId: string): Observable<Tag> {
    return this.http.get<Tag>(`${this.apiUrl}${tagId}/details/`);
  }
  getPrediction(id: number): Observable<string> {
    return this.http.get<any>(`${this.apiUrl}${id}/prediction/`).pipe(
      map((response) => {
        if (!response) return 'No Prediction Data';

        // Prefer human-friendly values from inferencer
        if (response.predicted_rul_days != null) {
          return `${Number(response.predicted_rul_days).toFixed(1)} days`;
        }
        if (response.predicted_rul_hours != null) {
          return `${Number(response.predicted_rul_hours).toFixed(1)} hours`;
        }

        // Backwards compatibility
        if (typeof response === 'string') return response;
        if (response?.prediction) return String(response.prediction);
        if (response?.result) return String(response.result);
        if (response?.remaining_life) return `${response.remaining_life}`;

        return JSON.stringify(response);
      }),
      catchError(() => of('No Prediction Data'))
    );
  }
}
