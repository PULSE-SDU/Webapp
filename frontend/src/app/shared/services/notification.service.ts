import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private snackBar = inject(MatSnackBar);

  show(message: string, panelClass: string, duration: number) {
    const config: MatSnackBarConfig = {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: [panelClass],
      duration: duration,
    };
    this.snackBar.open(message, 'Close', config);
  }

  showError(message: string) {
    this.show(message || 'An error occurred.', 'error-snackbar', 5000);
  }

  showSuccess(message: string) {
    this.show(message, 'success-snackbar', 3000);
  }

  showWarning(message: string) {
    this.show(message, 'warning-snackbar', 4000);
  }
}
