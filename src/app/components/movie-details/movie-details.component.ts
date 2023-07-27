import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/service/movie.service';
import  { UtilityService } from 'src/app/service/utility.service';
import { MovieMapperService } from 'src/app/util/movie-mapper.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movie!: Movie;
  passedValue: string = '';
  moviePosterUrl: string = ''; 
  movies: any; 
  currentChipsValue: string | number = '-1'; 
  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    protected utilityService : UtilityService,
    private router:Router,
    private movieMapperService: MovieMapperService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.passedValue = params['id'];
      this.getMovieById();
    });
  }


  getMovieById() {
    this.movieService.getMovieById(this.movieService.movieid).subscribe(
      (response) => {
        this.movie = this.movieMapperService.movieDetailsDTOtoMovie(response);
        this.moviePosterUrl = response.movieDto.poster; // Assegna l'URL del poster a moviePosterUrl

      },
      () => {
        console.log("Errore");
      }
    );
  }
}
