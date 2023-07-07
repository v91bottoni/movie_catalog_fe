import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-drower-button',
  templateUrl: './drower-button.component.html',
  styleUrls: ['./drower-button.component.css']
})
export class DrowerButtonComponent {
  @Output()drawerEvent = new EventEmitter<string>;


  logOut(){
    sessionStorage.clear();
    this.drawerEventFire();
  }

  drawerEventFire(){
    this.drawerEvent.emit("DrawerToggleEvent");
  }

}
