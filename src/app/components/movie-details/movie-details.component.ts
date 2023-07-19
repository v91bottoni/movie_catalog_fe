import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/service/movie.service';
import  { UtilityService } from 'src/app/service/utility.service';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  movie!: Movie;
  passedValue: string = '';
  moviePosterUrl: string = ''; // Aggiungi questa proprietà per l'URL del poster

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    protected utilityService : UtilityService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.passedValue = params['id'];
      this.getMovieById();
    });
  }

  getMovieById() {
    this.movieService.getMovieById(this.movieService.movieid).subscribe(
      (response) => {
        this.movie = response;
        this.moviePosterUrl = response.poster; // Assegna l'URL del poster a moviePosterUrl

      },
      () => {
        console.log("Errore");
      }
    );
  }
}
