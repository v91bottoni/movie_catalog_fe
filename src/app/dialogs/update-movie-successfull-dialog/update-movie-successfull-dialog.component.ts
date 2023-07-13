import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-movie-successfull-dialog',
  templateUrl: './update-movie-successfull-dialog.component.html',
  styleUrls: ['./update-movie-successfull-dialog.component.scss']
})
export class UpdateMovieSuccessfullDialogComponent {

  constructor(public dialogRef: MatDialogRef<UpdateMovieSuccessfullDialogComponent>){}

}
