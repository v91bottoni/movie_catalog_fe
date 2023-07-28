import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MultiSelectDialogComponent } from 'src/app/dialogs/multi-select-dialog/multi-select-dialog.component';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-multi-select-button',
  templateUrl: './multi-select-button.component.html',
  styleUrls: ['./multi-select-button.component.scss']
})
export class MultiSelectButtonComponent {
  @Input() path:string = '';
  @Input() movie!:Movie;
  @Output()launchString = new EventEmitter<Array<any>>();
constructor(public dialog: MatDialog){}

  openMenu(){
    this.dialog.open(MultiSelectDialogComponent, {
      data: { path: this.path, movie:this.movie }
    }).afterClosed().subscribe(res=>{
      if(res!= null){
        console.log('MULTISELECT Button Component Result: ', res);
        this.launchString.emit(res);
      }
    });

  }
}
