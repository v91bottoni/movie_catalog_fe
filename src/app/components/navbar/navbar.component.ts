import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/service/search.service';
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
        transform:'scale(1%)',
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
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  username: string| null = "";
  constructor(private searchService : SearchService, protected util: UtilityService,
    private router:Router){


  }
  @Output()drawerEvent = new EventEmitter<string>;
  searchTerm = '';
  searchElem!:HTMLElement;
  searchIcon = "search";
  isOpen :boolean = false;

  toggle(elem:HTMLElement){
    this.searchElem = elem;
    elem.classList.toggle("hide");
    if(this.searchIcon == "search") {
      this.searchIcon = "visibility_off";
      this.addE(elem);
    }
    else {
      this.searchIcon = "search";
      this.removeE(elem);

    }
  }
  searchFilm(param:string, elem:HTMLElement){
    this.toggle(elem);
    // posticipando, sottoscrivo in SearchResult prima di eseguire Subject.next() in nextParam().
    setTimeout(()=>{this.searchService.nextParam(param); },0);
  }
  drawerEventFire(){
    this.drawerEvent.emit("DrawerToggleEvent");
  }



  fun = (event:KeyboardEvent) => {
    if(event.key == 'Enter'){
      this.router.navigate(["search"]);
      this.toggle(this.searchElem);
      setTimeout(()=>{this.searchService.nextParam(this.searchTerm); },0);

    }
  };
  addE(ele:HTMLElement){
    ele.addEventListener("keydown" , this.fun)}

  removeE(ele:HTMLElement){
    ele.removeEventListener("keydown", this.fun);
  }


  logOut(){
    sessionStorage.clear();
    localStorage.clear();
    this.util.username = null;
    this.util.role = null;
  }
}
