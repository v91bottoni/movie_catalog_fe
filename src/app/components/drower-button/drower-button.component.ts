import { Component, EventEmitter, Output } from '@angular/core';
import { UtilityService } from 'src/app/service/utility.service';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-drower-button',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        margin: '0 10px',
        transform:'scale(100%)',
        opacity: 1,
      })),
      state('closed', style({
        transform:'scale(1%)',
        opacity: 0,
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.2s')
      ]),
    ]),
  ],
  templateUrl: './drower-button.component.html',
  styleUrls: ['./drower-button.component.scss']
})
export class DrowerButtonComponent {

  constructor(private router: Router, protected util : UtilityService){ }

  @Output()drawerEvent = new EventEmitter<string>;
panelOpenState = false;
isOpenHome= false;
isOpenCat= false;
isOpenProf= false;
isOpenLog= false;
isOpenAdd= false;
isOpenMan= false;


  drawerEventFire(){
    this.drawerEvent.emit("DrawerToggleEvent");
  }

  navigateCategory(category:string){
    this.router.navigate(['/home/gerne/'+category+'/1']);
  }

}
