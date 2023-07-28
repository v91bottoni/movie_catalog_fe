import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TypeDTO } from '../models/dto/type-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  apiUrl = environment.apiUrl + "types/";

  constructor(private http: HttpClient) { }

  getAllTypes(): Observable<TypeDTO[]> {
    return this.http.get<TypeDTO[]>(this.apiUrl + 'all');
  }
}
