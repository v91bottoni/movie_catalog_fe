import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MovieService } from 'src/app/service/movie.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { Movie } from 'src/app/models/movie';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter, :leave', [
        animate(150)
      ])
    ])
  ]
})

export class MovieCardComponent implements OnInit {

  @Input() imdbid: string = '';
  movie!: Movie;
  hover: boolean = true;
  isHovered: boolean = false;
  idHover!: string;
  timeout!: any;

  ngOnInit(): void {
    this.movieService.getMovieById(this.imdbid).subscribe(res => {
      this.movie = res;
    })
  }

  constructor(private movieService: MovieService, public dialog: MatDialog, private router: Router) { }

  openDialog(imdbid: string) {
    this.movieService.movieid = imdbid;
    const dialogRef = this.dialog.open(MovieDetailsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // setHover(value: boolean, id: string) {
  //   if (value == false)
  //     setTimeout(() => {
  //       this.isHovered = true;
  //     },300);
  //   if (value == true)
  //     this.isHovered = false;

  //   this.hover = value;
  //   this.idHover = id;
  // }

  poster: boolean = true;
  info: boolean = false;

  hoverSet(type:string){
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if(type==='poster'){
        this.poster=false;
        setTimeout(() => { 
          if(!this.poster){
            this.info=true;
          }
         }, 155);
      }

      if(type==='info'){
        this.info=false;
        setTimeout(() => {
          if(!this.info){
            this.poster=true;
          }
        }, 155);
      };
    }, 156);
        
  }

  goUpdate(imdbid: string) {
    this.router.navigate(['/updateMovie/' + imdbid])
  }

}
