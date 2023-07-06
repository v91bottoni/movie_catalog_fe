import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output()drawerEvent = new EventEmitter<string>;
  searchTerm = '';
  searchIcon="search";
  ngOnInit(): void {

  }
  toggle(elem:HTMLElement){
    elem.classList.toggle("hide");
    if(this.searchIcon == "search") this.searchIcon = "visibility_off";
    else this.searchIcon = "search";
  }
  searchFilm(param:string, elem:HTMLElement){
    console.log(param);
    this.toggle(elem);
  }
  drawerEventFire(){
    this.drawerEvent.emit("DrawerToggleEvent");
  }

}
