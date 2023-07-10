import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ChangePasswordComponent } from 'src/app/components/change-password/change-password.component';

@Component({
  selector: 'app-change-password-successful-dialog',
  template: `
    <h1 mat-dialog-title> <b>You changed your password!</b> </h1>
    <div mat-dialog-content>
      Congratulations, now you can finally login again.
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button mat-dialog-close cdkFocusInitial routerLink='/login'>Go to login!</button>
    </div>
  `,
  styles: ['button {margin-right: 8px;}']
})
export class ChangePasswordSuccessfulDialogComponent {

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>) {}
}
