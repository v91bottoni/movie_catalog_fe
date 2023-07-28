import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductionDTO } from '../models/dto/production-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductionService {

  apiUrl = environment.apiUrl + "productions/";

  constructor(private http: HttpClient) { }

  getAllProductions():Observable<ProductionDTO[]>{
    return this.http.get<ProductionDTO[]>(this.apiUrl + 'all');
  }

  saveProduction(production: ProductionDTO): Observable<ProductionDTO>{
    return this.http.post<ProductionDTO>(this.apiUrl + 'add', production);
  }
}