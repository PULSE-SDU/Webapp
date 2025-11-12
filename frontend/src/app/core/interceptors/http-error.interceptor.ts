import { inject, Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError, tap } from 'rxjs';
import { NotificationService } from '../../shared/services/notification.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  notificationService = inject(NotificationService);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      // success message
      tap((event) => {
        if (event instanceof HttpResponse) {
          const body = event.body as { message?: string } | null;
          const message = body?.message;
          if (message) {
            this.notificationService.showSuccess(message);
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // server-side errors
        if (error.status >= 500) {
          this.notificationService.showError('Server error — please try again later.');
          // client-side errors (validation, auth, etc.)
        } else if (error.status >= 400) {
          this.notificationService.showWarning(error.error?.message || 'Request failed.');
        } else {
          this.notificationService.showError(error.error?.message || 'Request failed.');
        }
        return throwError(() => error);
      }),
    );
  }
}
