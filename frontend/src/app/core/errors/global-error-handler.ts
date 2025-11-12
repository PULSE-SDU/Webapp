import { ErrorHandler, inject, Injectable } from '@angular/core';
import { NotificationService } from '../../shared/services/notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  notificationService = inject(NotificationService);

  handleError(): void {
    this.notificationService.showError('Something went wrong. Please try again.');
  }
}
