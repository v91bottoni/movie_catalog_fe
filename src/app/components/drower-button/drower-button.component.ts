import { Component, EventEmitter, Output } from '@angular/core';
import { UtilityService } from 'src/app/service/utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drower-button',
  templateUrl: './drower-button.component.html',
  styleUrls: ['./drower-button.component.css']
})
export class DrowerButtonComponent {

  constructor(private router: Router, private util : UtilityService){}

  @Output()drawerEvent = new EventEmitter<string>;
panelOpenState = false;

  logOut(){
    sessionStorage.clear();
    localStorage.clear();
    this.util.username = null;
    this.drawerEventFire();
  }

  drawerEventFire(){
    this.drawerEvent.emit("DrawerToggleEvent");
  }

  navigateCategory(category:string){
    this.router.navigate(['/home/gerne/'+category+'/1']);
  }

}
