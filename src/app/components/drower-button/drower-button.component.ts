import { Component, EventEmitter, Output } from '@angular/core';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
  selector: 'app-drower-button',
  templateUrl: './drower-button.component.html',
  styleUrls: ['./drower-button.component.css']
})
export class DrowerButtonComponent {
  @Output()drawerEvent = new EventEmitter<string>;
constructor(private util : UtilityService){}

  logOut(){
    sessionStorage.clear();
    localStorage.clear();
    this.util.username = null;
    this.drawerEventFire();
  }

  drawerEventFire(){
    this.drawerEvent.emit("DrawerToggleEvent");
  }

}
