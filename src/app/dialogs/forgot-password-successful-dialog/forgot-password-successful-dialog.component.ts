import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ForgotPasswordComponent } from 'src/app/components/forgot-password/forgot-password.component';

@Component({
  selector: 'app-forgot-password-successful-dialog',
  templateUrl: './forgot-password-successful-dialog.component.html',
  styleUrls: ['./forgot-password-successful-dialog.component.scss']
})
export class ForgotPasswordSuccessfulDialogComponent {

  constructor(public dialogRef: MatDialogRef<ForgotPasswordComponent>) {}

  closeDialog(){
    this.dialogRef.close();
  }
}
