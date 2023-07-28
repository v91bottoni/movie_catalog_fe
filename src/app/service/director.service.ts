import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DirectorDTO } from '../models/dto/director-dto';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  apiUrl = environment.apiUrl + "directors/";

  constructor(private http: HttpClient) { }

  getAllDirectors():Observable<DirectorDTO[]>{
    return this.http.get<DirectorDTO[]>(this.apiUrl + 'all');
  }

  saveDirector(director: DirectorDTO): Observable<DirectorDTO>{
    return this.http.post<DirectorDTO>(this.apiUrl + 'add', director);
  }
}