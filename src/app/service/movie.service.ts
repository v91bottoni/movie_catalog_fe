import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie';
import { response } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  apiUrl = environment.apiUrl + "movies/";

  searchMovie(title:string, page:number = 1):Observable<response>{
    return this.http.get<response>(this.apiUrl + 'title/' + title + '/' + page);
  }

  getMovieByGenre(genre:string, page:number = 1):Observable<response>{
    return this.http.get<response>(this.apiUrl + 'genre/' + genre + '/' + page);
  }

  getMovieById(id: string): Observable<Movie>{
    return this.http.get<Movie>(this.apiUrl + 'details/' + id);
  }

  getAllMovies(page: number = 1, sort: string = 'imdbrating'): Observable<response>{
    return this.http.get<response>(this.apiUrl + page + '/' + sort);
  }

  saveMovie(movie: Movie): Observable<Movie>{
    return this.http.post<Movie>(this.apiUrl + 'add/', movie);
  }

  updateMovie(movie: Movie): Observable<Movie>{
    return this.http.post<Movie>(this.apiUrl + 'update', movie);
  }

  constructor(private http: HttpClient) { }
}
