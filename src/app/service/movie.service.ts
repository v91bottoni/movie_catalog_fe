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

    getAllMoviesWithPagination(page: number = 1, sort: string = 'imdbrating', size: number = 10): Observable<response> {
      return this.http.get<response>(this.apiUrl + `${page}/${sort}/${size}`);

    }

    getMoviesByGenreWithPagination(genre: string, page: number = 1, size: number = 10): Observable<response> {
      return this.http.get<response>(`${this.apiUrl}size/${genre}/${page}/${size}`);
    }

  constructor(private http: HttpClient) { }
}
