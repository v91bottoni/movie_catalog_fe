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
  
    this.updateGridCols(); //Aggiorna il numore di collonne in base alla grandezza dello schermo
  
    // Se il tipo è "all"
    if(this.type=="all"){
      // Ottieni tutti i film con paginazione
      this.movieService.getAllMoviesWithPagination(1,'imdbrating',4).subscribe(res=>{
        this.maxPage=res.maxPageNumber;
        this.movies=res.movieList
  
        // Se c'è solo una pagina, disabilita il pulsante "Avanti"
        if(this.maxPage==1){
          this.right=false
        }
      });
    }
  
    // Se il tipo è "category"
    if(this.type=="category"){
      // Ottieni i film per genere con paginazione
      this.movieService.getMoviesByGenreWithPagination(this.category, 1 ,4).subscribe(res=>{
        this.maxPage=res.maxPageNumber;
        this.movies=res.movieList
  
        // Se c'è solo una pagina, disabilita il pulsante "Avanti"
        if(this.maxPage==1){
          this.right=false
        }
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
    if (screenWidth < 600) {
      this.gridCols = 1;
    } else if (screenWidth < 850) {
      this.gridCols = 2;
    } else if (screenWidth < 1040) {
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
    
    // Se il tipo è "all" e la direzione è "right"
    if(this.type=="all" && direction=="right"){
      // Incrementa la pagina corrente
      page=this.current+1
      console.log(page);
      // Ottieni tutti i film con paginazione
      this.movieService.getAllMoviesWithPagination(page,'imdbrating',4).subscribe(res=>{
        this.right=true;
        this.left=true
        this.animationState = 'right';
        this.movies=res.movieList
        this.maxPage=res.maxPageNumber;
        this.current=this.current+1;
        // Se siamo sull'ultima pagina, disabilita il pulsante "Avanti"
        if(page+1>=this.maxPage){
          this.right=false;
        }
      });
    }
  
    // Se il tipo è "all" e la direzione è "left"
    if(this.type=="all" && direction=="left"){
      // Decrementa la pagina corrente
      page=this.current-1;
      // Ottieni tutti i film con paginazione
      this.movieService.getAllMoviesWithPagination( page ,'imdbrating',4).subscribe(res=>{
        this.right=true;
        this.left=true
        this.animationState = 'left';
        this.movies=res.movieList
        this.maxPage=res.maxPageNumber;
        this.current=this.current-1;
        // Se siamo sulla prima pagina, disabilita il pulsante "Indietro"
        if(page-1<=0){
          this.left=false;
        }
      });
    }
  
    // Se il tipo è "category" e la direzione è "right"
    if(this.type=="category" && direction=="right"){
      // Incrementa la pagina corrente
      page=this.current+1
      console.log(page);
      // Ottieni i film per genere con paginazione
      this.movieService.getMoviesByGenreWithPagination( this.category, page ,4).subscribe(res=>{
        this.right=true;
        this.left=true
        this.animationState = 'right';
        this.movies=res.movieList
        this.maxPage=res.maxPageNumber;
        this.current=this.current+1;
        // Se siamo sull'ultima pagina, disabilita il pulsante "Avanti"
        if(page+1>=this.maxPage){
          this.right=false;
        }
      });
    }
  
    // Se il tipo è "category" e la direzione è "left"
    if(this.type=="category" && direction=="left"){
      // Decrementa la pagina corrente
      page=this.current-1;
      // Ottieni i film per genere con paginazione
      this.movieService.getMoviesByGenreWithPagination( this.category, page ,4).subscribe(res=>{
        this.right=true;
        this.left=true
        this.animationState = 'left';
        this.movies=res.movieList
        this.maxPage=res.maxPageNumber;
        this.current=this.current-1;
        // Se siamo sulla prima pagina, disabilita il pulsante "Indietro"
        if(page-1<=0){
          this.left=false;
        }
      });
    }
  }
  

}
