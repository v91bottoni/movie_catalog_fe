import { Component } from '@angular/core';
import { ForgotPasswordComponent } from 'src/app/components/forgot-password/forgot-password.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-spinner-dialog',
  templateUrl: './spinner-dialog.component.html',
  styleUrls: ['./spinner-dialog.component.scss']
})
export class SpinnerDialogComponent {

  constructor(public dialogRef: MatDialogRef<ForgotPasswordComponent>) { }
}
