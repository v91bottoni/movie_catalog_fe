import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-expiredialog',
  templateUrl: './expiredialog.component.html',
  styleUrls: ['./expiredialog.component.scss']
})
export class ExpiredialogComponent {
  constructor(public dialogRef: MatDialogRef<ExpiredialogComponent>){}

}
