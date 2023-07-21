import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/service/movie.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter, :leave', [
        animate(400)
      ])
    ])
  ]
})
export class SliderComponent implements OnInit {
  

  @Input() title: string ='';
  @Input() category: string ='';
  @Input() type: string ='';

  movies!: Movie[];
  maxPage!: number;
  current: number = 1

  hover: boolean = true;
  idHover!: string;

  gridCols!: number;

  right:boolean=true;
  left:boolean=false;
  animationState: string = 'left'
  
  ngOnInit(): void {
    
    this.updateGridCols();

      if(this.type=="all"){
        this.movieService.getAllMoviesWithPagination(1,'imdbrating',4).subscribe(res=>{
          this.maxPage=res.maxPageNumber;
          this.movies=res.movieList

          if(this.maxPage==1){
            this.right=false
          }
          // this.movies=res.movieList.slice(0,4)
        });
      }

      if(this.type=="category"){
        this.movieService.getMoviesByGenreWithPagination( this.category, 1 ,4).subscribe(res=>{
          this.maxPage=res.maxPageNumber;
          this.movies=res.movieList

          if(this.maxPage==1){
            this.right=false
          }
          // this.movies=res.movieList.slice(0,4)
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
      this.router.navigate(['/home/all']);
    else
      this.router.navigate(['/home/gerne/'+title])
  }

  updateGridCols() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 400) {
      this.gridCols = 1;
    } else if (screenWidth < 600) {
      this.gridCols = 2;
    } else if (screenWidth < 800) {
      this.gridCols = 3;
    } else {
      this.gridCols = 4;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateGridCols();
  }

  slide(direction:string){

    let page:number = 0;
    
    if(this.type=="all"){
      if(direction=="right"){

        page=this.current+1
        console.log(page);
        
        this.movieService.getAllMoviesWithPagination(page,'imdbrating',4).subscribe(res=>{

          this.right=true;
          this.left=true
          this.animationState = 'right';

          this.movies=res.movieList
          this.maxPage=res.maxPageNumber;
          this.current=this.current+1;

          if(page+1>=this.maxPage){
            this.right=false;
          }
          // this.movies=res.movieList.slice(0,4)
        });
      }
    }

    if(this.type=="all"){
      if(direction=="left"){
        page=this.current-1;
        this.movieService.getAllMoviesWithPagination( page ,'imdbrating',4).subscribe(res=>{

          this.right=true;
          this.left=true
          this.animationState = 'left';

          this.movies=res.movieList
          this.maxPage=res.maxPageNumber;
          this.current=this.current-1;

          if(page-1<=0){
            this.left=false;
          }
          // this.movies=res.movieList.slice(0,4)
        });
      }
    }

    if(this.type=="category"){
      if(direction=="right"){
        page=this.current+1
        console.log(page);
        
        this.movieService.getMoviesByGenreWithPagination( this.category, page ,4).subscribe(res=>{

          this.right=true;
          this.left=true
          this.animationState = 'right';

          this.movies=res.movieList
          this.maxPage=res.maxPageNumber;
          this.current=this.current+1;

          if(page+1>=this.maxPage){
            this.right=false;
          }
          // this.movies=res.movieList.slice(0,4)
        });
      }
    }

    if(this.type=="category"){
      if(direction=="left"){
        page=this.current-1;
        this.movieService.getMoviesByGenreWithPagination( this.category, page ,4).subscribe(res=>{

          this.right=true;
          this.left=true
          this.animationState = 'left';

          this.movies=res.movieList
          this.maxPage=res.maxPageNumber;
          this.current=this.current-1;
          // this.movies=res.movieList.slice(0,4)

          if(page-1<=0){
            this.left=false;
          }
        });
      }
    }

    if (direction === 'left') {
      
    } else if (direction === 'right') {
      
    }
  }

  

}
