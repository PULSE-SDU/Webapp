import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tag } from '../models/tag.model';
import { environment } from '../../../environments/environment'
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private http = inject(HttpClient)
  private notificationService = inject(NotificationService);

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${environment.apiUrl}/tags`).pipe(
      catchError((error) => {
        this.notificationService.showError('Failed to fetch tags.');
        return throwError(() => error);
      })
    );
  }
}

