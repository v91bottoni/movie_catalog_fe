import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MovieService } from 'src/app/service/movie.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { Movie } from 'src/app/models/movie';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MovieDetailsDTO } from 'src/app/models/dto/movie-details-dto';

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

  @Input() movie!: MovieDetailsDTO;
  hover: boolean = true;
  isHovered: boolean = false;
  idHover!: string;
  timeout!: any;

  ngOnInit(): void { }

  constructor(private movieService: MovieService, public dialog: MatDialog, private router: Router) { }

  openDialog(imdbid: string) {
    this.movieService.movieid = imdbid;
    const dialogRef = this.dialog.open(MovieDetailsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  poster: boolean = true;
  info: boolean = false;

  hoverSet(type: string) {
    clearTimeout(this.timeout); // Cancella il timeout precedente
    this.timeout = setTimeout(() => { // Imposta un nuovo timeout
      // Se il tipo è 'poster'
      if (type === 'poster') {
        // Imposta la variabile 'poster' su false
        this.poster = false;
        setTimeout(() => {
          // Se 'poster' è ancora false dopo 155 millisecondi
          if (!this.poster) {
            // Imposta la variabile 'info' su true
            this.info = true;
          }
        }, 155);
      }
  
      // Se il tipo è 'info'
      if (type === 'info') {
        // Imposta la variabile 'info' su false
        this.info = false;
        setTimeout(() => {
          // Se 'info' è ancora false dopo 155 millisecondi
          if (!this.info) {
            // Imposta la variabile 'poster' su true
            this.poster = true;
          }
        }, 155);
      };
    }, 156);
  }

  goUpdate(imdbid: string) {
    this.router.navigate(['/updateMovie/' + imdbid])
  }

}
