import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snkbr: MatSnackBar) { }

  openSuccess(msg: string, btntxt: string){

    const config = new MatSnackBarConfig();
    config.panelClass = ['success-snackbar'];
    config.duration = 5000;
    config.horizontalPosition = 'end';
    config.verticalPosition = 'bottom';

    this.snkbr.open(msg, btntxt, config);
  }

  openError(msg: string, btntxt: string){

    const config = new MatSnackBarConfig();
    config.panelClass = ['error-snackbar'];
    config.duration = 5000;
    config.horizontalPosition = 'end';
    config.verticalPosition = 'bottom';

    this.snkbr.open(msg, btntxt, config);
  }
}
