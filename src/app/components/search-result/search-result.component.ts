import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/service/movie.service';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {
  movieList!:Movie[];
  title = "";
  maxpage = 0;
  page = 1;
  timeOut = false;
  constructor(private service:MovieService, private router: Router,
    private searchService:SearchService){
    setTimeout(()=>{
      if(!this.movieList){
        this.router.navigate(["errorPage"]);
      }
    }, 10000);
      this.searchService.getObservableSearch().subscribe(param=>{
        console.log("Searching for \"" + param + "\"");
        this.title = param;
        this.renderList();
      });
  }

  renderList(){
    this.service.searchMovie(this.title, this.page)
      .subscribe(resp=>{
        this.movieList = resp.movieList;
        this.maxpage = resp.maxPageNumber;
      });
  }

}
