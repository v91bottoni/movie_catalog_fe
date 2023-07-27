import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { response } from '../models/response';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GenreDTO } from '../models/dto/genre-dto';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  apiUrl = environment.apiUrl + "genres/";
  allGenres : GenreDTO[] = []

  constructor(private http: HttpClient) { }

  getAllGenre(): Observable<GenreDTO[]> {
    return this.http.get<GenreDTO[]>(this.apiUrl + 'all');
  }
}
