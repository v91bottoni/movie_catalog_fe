import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { MovieService } from 'src/app/service/movie.service';
import { SearchService } from 'src/app/service/search.service';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent {
  searchTerm = '';
  //searchElem!:HTMLElement;
  myControl:FormControl = new FormControl();
  options:string[]=[];
  filteredOptions!: Observable<string[]>;
  inFocus:boolean=false;

  title = 'movie-catalog-fe';
  drawer!:HTMLElement;
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

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value || ' ')),
    );
  }

  toggle(drawer:HTMLElement){
    this.drawer=drawer;
    if(drawer.classList.contains('hide')){
      drawer.classList.remove('hide');
      this.util.drawerOpen=true;
      setTimeout(() => {
        document.addEventListener('click', this.close);
        document.addEventListener('scroll', this.closeScrollFun);
      }, 1);
    }else{
      drawer.classList.add('hide');
      this.util.drawerOpen=false;
      document.removeEventListener('click', this.close);
      document.removeEventListener('scroll', this.closeScrollFun);
    }


  }
  close = (event:MouseEvent)=>{
      if(!this.drawer.classList.contains('hide')){
        this.drawer.classList.add('hide');
        this.util.drawerOpen=false;
        document.removeEventListener('click', this.close);
        document.removeEventListener('scroll', this.closeScrollFun);
      }
    }
  closeScrollFun = ()=>{
    if(window.scrollY>400){
      if(!this.drawer.classList.contains('hide')){
        this.drawer.classList.add('hide');
        this.util.drawerOpen = false;
        document.removeEventListener('click', this.close);
        document.removeEventListener('scroll', this.closeScrollFun);
      }
    }
  }

  searchFilm(param:string){
    // posticipando, sottoscrivo in SearchResult prima di eseguire Subject.next() in nextParam().
    setTimeout(()=>{this.searchService.nextParam(param); },0);
  }

  focusSearchBar(elem:HTMLElement){
    //this.searchElem = elem;
    this.inFocus = !this.inFocus;
    if(this.inFocus) {
      this.addKeyEvent(elem);
    }
    else {
      this.removeKeyEvent(elem);

    }
  }
  keyPressSearch = (event:KeyboardEvent) => {
    if(event.key == 'Enter'){
      this.router.navigate(["search"]);
      //this.toggle(this.searchElem);
      setTimeout(()=>{this.searchService.nextParam(this.searchTerm); },0);

    }
  }
  addKeyEvent(ele:HTMLElement){
    ele.addEventListener("keydown" , this.keyPressSearch)}

    removeKeyEvent(ele:HTMLElement){
      ele.removeEventListener("keydown", this.keyPressSearch);
    }


  private _filter(value: string): string[] {
    let filterValue = value.toLowerCase();
      this.movieservice.searchMovie(filterValue, 1).subscribe(resp=>{
        if(resp){
          let movies = resp.movieList;
          if(movies){
            this.options = [];
            movies.forEach(movie=>{this.options.push(movie.title)});
          }
          else this.options=[];
        }
    });

    return this.options.filter(option =>  option.toLowerCase().includes(filterValue));
  }
}
