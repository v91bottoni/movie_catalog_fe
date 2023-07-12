import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/service/movie.service';
import { SearchService } from 'src/app/service/search.service';
import  { UtilityService } from 'src/app/service/utility.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent {
  movieList!:Movie[];
  movie!: Movie;
  title :string|undefined = undefined;
  maxPage = 0;
  page = 1;
  displayedColumns: string[] = ['title', 'plot', 'writer' ,'imdbrating'];
  cardView:boolean = true;
  constructor(private service:MovieService, private router: Router,
    private searchService:SearchService, public dialog: MatDialog,public utilityService:UtilityService) {
      this.utilityService.backpage = "search";
      setTimeout(()=>{
        if(this.title == undefined){
          // this.title = this.searchService.oldSearch;
          // this.page = this.searchService.oldSearchPage;
          this.title = " ";
          this.renderList();
        }
      }, 200);
      this.searchService.getObservableSearch().subscribe(param=>{
        //console.log("Searching for \"" + param + "\"");
        this.page = 1;
        (param == "")? this.title=" ": this.title = param;
        this.renderList();
      });
  }


  renderList(){
    this.service.searchMovie(this.title+ "", this.page)
      .subscribe(resp=>{
        if(resp != null){
        this.movieList = resp.movieList;
        this.maxPage = resp.maxPageNumber;
        }else{
          this.router.navigate(["searchError"]);
        }
      });
  }

  switchView(){
    this.cardView = !this.cardView;
  }
  navigatePage(page:number){
    this.page = page;
    //this.searchService.oldSearchPage = page;
    this.renderList();
  }
  openMovieDetails(movieId: string): void {
    this.router.navigate(['/movies', movieId]);
  }


  openDialog(imdbid: string){
    this.service.movieid = imdbid;
    const dialogRef = this.dialog.open(MovieDetailsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
