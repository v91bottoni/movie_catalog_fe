import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MapDialogComponent } from 'src/app/dialogs/map-dialog/map-dialog.component';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  constructor(protected util :UtilityService, public dialog:MatDialog){

  }
  logout(){
    localStorage.clear();
    this.util.username = null;
    this.util.role = null;
  }
  goTop(){
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
  openMap(){
    this.dialog.open(MapDialogComponent);
  }

  scroll(){
    setTimeout(()=>{
    let path = document.URL.substring(document.baseURI.length);
      document.getElementById(path)?.scrollIntoView({behavior:'smooth'});
    },100);

  }

}
