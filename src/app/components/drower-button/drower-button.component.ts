import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drower-button',
  templateUrl: './drower-button.component.html',
  styleUrls: ['./drower-button.component.css']
})
export class DrowerButtonComponent {

  constructor(private router: Router){}

  @Output()drawerEvent = new EventEmitter<string>;
  panelOpenState = false;

  logOut(){
    sessionStorage.clear();
    this.drawerEventFire();
  }

  drawerEventFire(){
    this.drawerEvent.emit("DrawerToggleEvent");
  }

  navigateCategory(category:string){
    this.router.navigate(['/home/gerne/'+category+'/1']);
  }

}
