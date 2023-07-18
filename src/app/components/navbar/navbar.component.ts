import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component,  Output, EventEmitter } from '@angular/core';
import { UtilityService } from 'src/app/service/utility.service';


@Component({
  selector: 'app-navbar',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({

        transform:'scale(100%)',
        opacity: 1,
      })),
      state('closed', style({

        transform:'scale(1%) translate(50px, -200px)',
        opacity: 0,
      })),
      transition('open => closed', [
        animate('0.5s ease'),
      ]),
      transition('closed => open', [
        animate('0.2s')
      ]),
    ]),
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  username: string| null = "";
  constructor( protected util: UtilityService){
  }
  @Output()drawerEvent = new EventEmitter<string>;

  isOpen :boolean = false;





  toggleProfile(){
    if(this.isOpen){
      this.isOpen = false;
      document.removeEventListener('click', this.closeProfile);
    }else{
      this.isOpen = true;
      setTimeout(() => {document.addEventListener('click', this.closeProfile)}, 1);
    }
  }


  drawerEventFire(){
    this.drawerEvent.emit("DrawerToggleEvent");
  }




  closeProfile = ()=>{
    this.isOpen = false;
    document.removeEventListener('click', this.closeProfile);
  }





  logOut(){
    sessionStorage.clear();
    localStorage.clear();
    this.util.username = null;
    this.util.role = null;
  }
}
