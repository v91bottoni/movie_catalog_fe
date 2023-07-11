import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ForgotPasswordComponent } from 'src/app/components/forgot-password/forgot-password.component';

@Component({
  selector: 'app-forgot-password-unsuccessful-dialog',
  templateUrl: './forgot-password-unsuccessful-dialog.component.html',
  styleUrls: ['./forgot-password-unsuccessful-dialog.component.scss']
})
export class ForgotPasswordUnsuccessfulDialogComponent {


  constructor(public dialogRef: MatDialogRef<ForgotPasswordComponent>) {}
}
