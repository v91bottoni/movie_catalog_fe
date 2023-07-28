import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { WriterDTO } from '../models/dto/writer-dto';

@Injectable({
  providedIn: 'root'
})
export class WriterService {

  apiUrl = environment.apiUrl + "writers/";

  constructor(private http: HttpClient) { }

  getAllWriters():Observable<WriterDTO[]>{
    return this.http.get<WriterDTO[]>(this.apiUrl + 'all');
  }

  saveWriter(writer: WriterDTO): Observable<WriterDTO>{
    return this.http.post<WriterDTO>(this.apiUrl + 'add', writer);
  }
}