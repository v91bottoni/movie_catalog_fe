import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LanguageDTO } from '../models/dto/language-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  apiUrl = environment.apiUrl + "languages/";

  constructor(private http: HttpClient) { }

  getAllLanguages():Observable<LanguageDTO[]>{
    return this.http.get<LanguageDTO[]>(this.apiUrl + 'all');
  }

  saveLanguage(language: LanguageDTO): Observable<LanguageDTO>{
    return this.http.post<LanguageDTO>(this.apiUrl + 'add', language);
  }
}
