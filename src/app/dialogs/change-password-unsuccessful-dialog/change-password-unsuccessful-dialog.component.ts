import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ChangePasswordComponent } from 'src/app/components/change-password/change-password.component';

@Component({
  selector: 'app-change-password-unsuccessful-dialog',
  template: `
    <h1 mat-dialog-title> <b>OPS!</b> </h1>
    <div mat-dialog-content>
      The link you followed is probably expired.
      Please request a new one.
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button mat-dialog-close cdkFocusInitial routerLink='/forgot-password'>I want another link!</button>
    </div>
  `,
  styles: ['button {margin-right: 8px;}']
})
export class ChangePasswordUnsuccessfulDialogComponent {

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>) {}

}
