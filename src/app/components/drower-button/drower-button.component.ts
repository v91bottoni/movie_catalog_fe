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
        animate('0.2s')
      ]),
      transition('closed => open', [
        animate('0.2s 300ms')
      ]),
    ]),

  ],
  templateUrl: './drower-button.component.html',
  styleUrls: ['./drower-button.component.scss']
})
export class DrowerButtonComponent {

  constructor( protected util : UtilityService) { }

isOpenHome= false;
/*isOpenCat= false;
isOpenProf= false;
isOpenLog= false;*/
isOpenAdd= false;
isOpenMan= false;


}
