import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarModule} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snkbr: MatSnackBar) { }

  openNotice(msg: string, btntxt: string){
    this.snkbr.open(msg, btntxt, {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      politeness: 'off'
    });
  }

  openError(msg: string, btntxt: string){
    this.snkbr.open(msg, btntxt, {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      politeness: 'off'
    });
  }
}
