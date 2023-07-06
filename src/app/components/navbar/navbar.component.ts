import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SearchService } from 'src/app/service/search.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private searchService : SearchService){

  }
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
    this.toggle(elem);
    // posticipando, sottoscrivo in SearchResult prima di eseguire Subject.next() in nextParam().
    setTimeout(()=>{this.searchService.nextParam(param); },0);
  }
  drawerEventFire(){
    this.drawerEvent.emit("DrawerToggleEvent");
  }

}
