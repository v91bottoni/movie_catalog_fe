import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, from, map, startWith,  } from 'rxjs';
import { MovieService } from 'src/app/service/movie.service';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit{

  constructor( private movieservice:MovieService, protected util: UtilityService,
    private router:Router){

  }
  searchTerm = '';
  myControl:FormControl = new FormControl();
  options:string[]=[];
  filteredOptions!: Observable<string[]>;
  inFocus:boolean=false;

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {this.loadOptions(value); return this._filter(value || ' ')})
    );
  }

  searchFilm(){
    this.router.navigate(['home/search/'+this.searchTerm+'/1']);
  }

  focusSearchBar(elem:HTMLElement){
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
      this.searchFilm();
    }
  }
  addKeyEvent(ele:HTMLElement){
    ele.addEventListener("keydown" , this.keyPressSearch)}

    removeKeyEvent(ele:HTMLElement){
      ele.removeEventListener("keydown", this.keyPressSearch);
    }

  private _filter(value: string): string[] {
    let filterValue = value.toLowerCase();
    this.loadOptions(filterValue);
    //console.log(this.options);

    return this.options.filter(option =>  option.toLowerCase().includes(filterValue));
  }

  loadOptions(filterValue:string){
    if(filterValue != ''){
      this.movieservice.searchMovie(filterValue, 1).subscribe(resp=>{
        if(resp){
          let movies = resp.movieList;
          if(movies){
            this.options = [];
            movies.forEach(movie=>{if(!this.options.includes(movie.title))this.options.push(movie.title)});
          }
          else this.options=[];
        }
      });
    }
  }
}



