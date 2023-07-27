import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-multi-select-dialog',
  templateUrl: './multi-select-dialog.component.html',
  styleUrls: ['./multi-select-dialog.component.scss']
})
export class MultiSelectDialogComponent {
  @Output()launchString = new EventEmitter<string[]>();

  listElement:string[]=['Clooney','Carry'];
  listOut:string[]=[];
  path:string;
  constructor(
    public dialogRef: MatDialogRef<MultiSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { path: string }){
    this.path = data.path;
    console.log(this.path);

  }
  renderOut(option:string){

    if(this.listOut.includes(option)){
      this.listOut = this.listOut.filter(val=>val!=option);
    }else{
      this.listOut.push(option);
    }
    console.log(this.listOut);
  }
}
