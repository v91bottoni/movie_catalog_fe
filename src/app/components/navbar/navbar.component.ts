import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, from, map, startWith } from 'rxjs';
import { MovieService } from 'src/app/service/movie.service';
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
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  username: string| null = "";
  constructor(private searchService : SearchService, private movieservice:MovieService, protected util: UtilityService,
    private router:Router){
      this.movieservice.searchMovie(' ', 1).subscribe(resp=>{
        let movies = resp.movieList;
        if(movies){
          movies.forEach(movie=>{this.options.push(movie.title)});
        }else this.options=[];
        //this.filteredOptions = from(Array(this.options));
      });

  }
  @Output()drawerEvent = new EventEmitter<string>;
  searchTerm = '';
  searchElem!:HTMLElement;
  searchIcon = "search";
  isOpen :boolean = false;
  myControl:FormControl = new FormControl();
  options:string[]=[];
  filteredOptions!: Observable<string[]>;

  ngOnInit(): void {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value || ' ')),
    );

  }
  private _filter(value: string): string[] {
    let filterValue = value;
    this.movieservice.searchMovie(filterValue, 1).subscribe(resp=>{
      let movies = resp.movieList;
      if(movies){
        this.options = [];
        movies.forEach(movie=>{this.options.push(movie.title)});
      }
      else this.options=[];

    });
    return this.options.filter(option =>  option.toLowerCase().includes(filterValue));
  }


  toggle(elem:HTMLElement){
    this.searchElem = elem;
    elem.classList.toggle("hide");
    if(this.searchIcon == "search") {
      this.searchIcon = "visibility_off";
      this.addKeyEvent(elem);
    }
    else {
      this.searchIcon = "search";
      this.searchTerm = '';
      this.removeKeyEvent(elem);

    }
  }
  searchFilm(param:string){
    //this.toggle(elem);
    // posticipando, sottoscrivo in SearchResult prima di eseguire Subject.next() in nextParam().
    setTimeout(()=>{this.searchService.nextParam(param); },0);
  }
  drawerEventFire(){
    this.drawerEvent.emit("DrawerToggleEvent");
  }



  fun = (event:KeyboardEvent) => {
    if(event.key == 'Enter'){
      this.router.navigate(["search"]);
      //this.toggle(this.searchElem);
      setTimeout(()=>{this.searchService.nextParam(this.searchTerm); },0);

    }
  };
  addKeyEvent(ele:HTMLElement){
    ele.addEventListener("keydown" , this.fun)}

  removeKeyEvent(ele:HTMLElement){
    ele.removeEventListener("keydown", this.fun);
  }


  logOut(){
    sessionStorage.clear();
    localStorage.clear();
    this.util.username = null;
    this.util.role = null;
  }
}
