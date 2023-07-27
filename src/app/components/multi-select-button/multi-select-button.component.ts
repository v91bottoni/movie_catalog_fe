import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MultiSelectDialogComponent } from 'src/app/dialogs/multi-select-dialog/multi-select-dialog.component';

@Component({
  selector: 'app-multi-select-button',
  templateUrl: './multi-select-button.component.html',
  styleUrls: ['./multi-select-button.component.scss']
})
export class MultiSelectButtonComponent {
  @Input() path:string = '';
  @Output()launchString = new EventEmitter<string>();
constructor(public dialog: MatDialog){}

  openMenu(){
    this.dialog.open(MultiSelectDialogComponent, {
      data: { path: this.path }
    }).afterClosed().subscribe(res=>{
      if(res!= null){
        //console.log(res);
        let out:string='';
        res.forEach((element: string) => {
          out += element+', ';
        });
        out = out.substring(0,out.length-2);
        console.log(out);
        this.launchString.emit(out);
      }
    });

  }
}
