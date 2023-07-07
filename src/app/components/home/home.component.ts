import { Component, OnInit } from '@angular/core';
import { response } from 'src/app/models/response';
import { MovieService } from 'src/app/service/movie.service';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  response!: response

  ngOnInit(): void {
      this.movieService.getAllMovies().subscribe(res=>{
        this.response=res
        console.log(this.response);
      })
  }

  constructor(private movieService: MovieService, private router: Router) { }
  
  
  openMovieDetails(movieId: string): void {
    this.router.navigate(['/movies', movieId]);
  }

}
