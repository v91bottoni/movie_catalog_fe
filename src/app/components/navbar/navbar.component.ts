import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component,  Output, EventEmitter, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { delay } from 'rxjs';
import { Click_event } from 'src/app/models/click_event';
import { user } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { UserService } from 'src/app/service/user.service';
import { UtilityService } from 'src/app/service/utility.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  username: string| null = "";
  constructor(
    protected util: UtilityService,
    private authService: AuthService,
    private alert: SnackbarService,
    private translate: TranslateService,
    private userService: UserService){
  }
  @Output()drawerEvent = new EventEmitter<string>;

  isOpen :boolean = false;
  proElement!:HTMLElement;

  ngOnInit(): void {
    console.log("Nav Inizializzata")
    this.userService.getUserById( Number(sessionStorage.getItem("userID")) ).subscribe(res=>{
      if(res ){
        var userView:user = res;
        var event: Click_event = new  Click_event();
        event.id = 0;
        event.eventType = "view";
        var today:Date = new Date();
        event.eventDate = today;
        event.eventUser = userView;
        this.util.saveEvent(event).subscribe( resp => {
          console.log(resp);
        });
      }
  });



  }

  goTop(){
    window.scrollTo({
      top:0,
      left:0,
      behavior:'smooth'
    });
  }

  toggleProfile(proMenu:HTMLElement){
    this.proElement = proMenu;
    if(this.isOpen){
      this.isOpen = false;
      proMenu.classList.add('closePro');
      document.removeEventListener('click', this.closeProfile);
      document.removeEventListener('scroll', this.closeScrollFun);
    }else{
      this.isOpen = true;
      proMenu.classList.remove('closePro');
      setTimeout(() => {
        document.addEventListener('click', this.closeProfile);
        document.addEventListener('scroll', this.closeScrollFun);
      }, 1);
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
  closeScrollFun = ()=>{
    if(window.scrollY>400){
      if(!this.proElement.classList.contains('closeProfile')){
        this.isOpen = false;
        this.proElement.classList.add('closePro');
        document.removeEventListener('click', this.closeProfile);
        document.removeEventListener('scroll', this.closeScrollFun);
      }
    }
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
