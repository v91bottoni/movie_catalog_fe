import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CountryDTO } from '../models/dto/country-dto';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  apiUrl = environment.apiUrl + "countries/";

  constructor(private http: HttpClient) { }

  getAllCountries():Observable<CountryDTO[]>{
    return this.http.get<CountryDTO[]>(this.apiUrl + 'all');
  }

  saveCountry(country: CountryDTO): Observable<CountryDTO>{
    return this.http.post<CountryDTO>(this.apiUrl + 'add', country);
  }
}
