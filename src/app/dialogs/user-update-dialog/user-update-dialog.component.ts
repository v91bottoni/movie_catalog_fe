import { Component } from '@angular/core';
import { UserInfoComponent } from 'src/app/components/user-info/user-info.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-update-dialog',
  templateUrl: './user-update-dialog.component.html',
  styleUrls: ['./user-update-dialog.component.scss']
})
export class UserUpdateDialogComponent {

  constructor(public dialogRef: MatDialogRef<UserInfoComponent>) {}

}
