import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { InsertMovieComponent } from 'src/app/components/insert-movie/insert-movie.component';

@Component({
  selector: 'app-insert-movie-dialog',
  template: `
    <h1 mat-dialog-title> <b>Movie Inserted!</b> </h1>
    <div mat-dialog-content>
    Movie Successfully Inserted!!
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button mat-dialog-close cdkFocusInitial>Ok</button>
    </div>
  `,
  styles: [
  ]
})
export class InsertMovieDialogComponent {
  
  constructor(public dialogRef: MatDialogRef<InsertMovieComponent>) {}
}
