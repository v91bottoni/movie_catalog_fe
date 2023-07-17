import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/service/movie.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  

  @Input() title: string ='';
  @Input() category: string ='';
  @Input() type: string ='';

  movies!: Movie[];
  maxPage!: number;

  hover: boolean = true;
  idHover!: string;
  
  ngOnInit(): void {
      if(this.type=="all"){
        this.movieService.getAllMovies().subscribe(res=>{
          this.maxPage=res.maxPageNumber;
          this.movies=res.movieList.slice(0,4)
        });
      }

      if(this.type=="category"){
        this.movieService.getMovieByGenre(this.category).subscribe(res=>{
          this.maxPage=res.maxPageNumber;
          this.movies=res.movieList.slice(0,4)
        });
      }
  }

  constructor(private movieService: MovieService, public dialog: MatDialog, private router: Router){}

  openDialog(imdbid: string){
    this.movieService.movieid = imdbid;
    const dialogRef = this.dialog.open(MovieDetailsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  setHover(value: boolean, id:string) {
    this.hover = value;
    this.idHover = id;
  }

  viewAll(title:string){
    if(title==='For You')
      this.router.navigate(['/home/page/1']);
    else
      this.router.navigate(['/home/gerne/'+title+'/1'])
  }
}
