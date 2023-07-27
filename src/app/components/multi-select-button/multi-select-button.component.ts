import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MultiSelectDialogComponent } from 'src/app/dialogs/multi-select-dialog/multi-select-dialog.component';

@Component({
  selector: 'app-multi-select-button',
  templateUrl: './multi-select-button.component.html',
  styleUrls: ['./multi-select-button.component.scss']
})
export class MultiSelectButtonComponent {
  @Input() path:string='';
constructor(public dialog: MatDialog){}

  openMenu(){
    this.dialog.open(MultiSelectDialogComponent, {
      data: { path: this.path }
    });

  }
}
