import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie';
import { response } from '../models/response';
import { MovieDetailsDTO } from '../models/dto/movie-details-dto';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  
  movieid : string = '';
  apiUrl = environment.apiUrl + "movies/";
  categories: String[] = ["Action", "Adventure", "Animation", "Comedy", "Crime", 
                            "Drama", "Documentary", "Fantasy", "Romance", "Thriller"];

                            chipsCategory: string[] = [ "Action", "Adventure", "Animation", "Comedy", "Crime", 
                           "Drama", "Documentary", "Fantasy", "Romance", "Thriller"];


  searchMovie(title:string, page:number = 1):Observable<response>{
    return this.http.get<response>(this.apiUrl + 'title/' + title + '/' + page);
  }

  searchMoviePagination(title: string, page: number = 1,  size: number = 10): Observable<response> {
    return this.http.get<response>(this.apiUrl +'title/'+title+'/'+page+'/'+size);

  }

  getMovieById(id: string): Observable<MovieDetailsDTO>{
    return this.http.get<MovieDetailsDTO>(this.apiUrl + 'details/' + id);
  }

  getAllMovies(page: number = 1, sort: string = 'rating'): Observable<response>{
    return this.http.get<response>(this.apiUrl + 'all/' + page + '/' + sort);
  }

  saveMovie(movie: MovieDetailsDTO): Observable<MovieDetailsDTO>{
    return this.http.post<MovieDetailsDTO>(this.apiUrl + 'add/', movie);
  }

  updateMovie(movie: MovieDetailsDTO): Observable<MovieDetailsDTO>{
    return this.http.post<MovieDetailsDTO>(this.apiUrl + 'update', movie);
  }

  getAllMoviesWithPagination(page: number = 1, sort: string = 'rating', size: number = 10): Observable<response> {
    return this.http.get<response>(this.apiUrl + 'all/' + page + '/' + sort + '/' + size);

  }

  getMovieByGenre(idGenre:number, page:number = 1):Observable<response>{
    return this.http.get<response>(this.apiUrl + 'genre/' + idGenre + '/' + page);
  }

  getMoviesByGenreWithPagination(idGenre: number, page: number = 1, size: number = 10): Observable<response> {
    return this.http.get<response>(this.apiUrl + 'size/' + idGenre + '/' + page + '/' + size);
  }

  constructor(private http: HttpClient) { }
}
