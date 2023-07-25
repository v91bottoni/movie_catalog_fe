import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component,  Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { delay } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
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
        transform:'scale(1%) ',
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
  constructor(
    protected util: UtilityService,
    private authService: AuthService,
    private alert: SnackbarService,
    private translate: TranslateService){
  }
  @Output()drawerEvent = new EventEmitter<string>;

  isOpen :boolean = false;
  proElement!:HTMLElement;




  toggleProfile(proMenu:HTMLElement){
    this.proElement = proMenu;
    if(this.isOpen){
      this.isOpen = false;
      proMenu.classList.add('closePro');
      document.removeEventListener('click', this.closeProfile);
    }else{
      this.isOpen = true;
      proMenu.classList.remove('closePro');
      setTimeout(() => {document.addEventListener('click', this.closeProfile)}, 1);
    }
  }


  drawerEventFire(){
    this.drawerEvent.emit("DrawerToggleEvent");
  }

  closeProfile = ()=>{
    this.isOpen = false;
    this.proElement.classList.add('closePro');
    document.removeEventListener('click', this.closeProfile);
  }

  logOut(){
    if(this.authService.logout()){
      this.util.username = null;
      this.util.role = null;
      setTimeout(() => {
        this.alert.openSuccess(this.translate.instant("message.logoutSuccess"), this.translate.instant("button.ok"));
      }, 1);
    }
  }
}
