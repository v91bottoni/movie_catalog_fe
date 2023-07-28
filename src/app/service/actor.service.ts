import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActorDTO } from '../models/dto/actor-dto';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  apiUrl = environment.apiUrl + "actors/";

  constructor(private http: HttpClient) { }

  getAllActors():Observable<ActorDTO[]>{
    return this.http.get<ActorDTO[]>(this.apiUrl + 'all');
  }

  getActorById(id: number): Observable<ActorDTO>{
    return this.http.get<ActorDTO>(this.apiUrl + 'get/' + id);
  }

  saveActor(actor: ActorDTO): Observable<ActorDTO>{
    return this.http.post<ActorDTO>(this.apiUrl + 'add', actor);
  }

}
