import { Injectable } from '@angular/core';
import { ActorService } from './actor.service';
import { ActorDTO } from '../models/dto/actor-dto';
import { DirectorDTO } from '../models/dto/director-dto';
import { GenreDTO } from '../models/dto/genre-dto';
import { ProductionDTO } from '../models/dto/production-dto';
import { WriterDTO } from '../models/dto/writer-dto';
import { DirectorService } from './director.service';
import { GenreService } from './genre.service';
import { ProductionService } from './production.service';
import { WriterService } from './writer.service';
import { CountryService } from './country.service';
import { CountryDTO } from '../models/dto/country-dto';
import { LanguageDTO } from '../models/dto/language-dto';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  actors!: ActorDTO[];
  countries!: CountryDTO[];
  directors!: DirectorDTO[];
  genres!: GenreDTO[];
  languages!: LanguageDTO[];
  productions!: ProductionDTO[];
  writers!: WriterDTO[];

  constructor(
    private actorService: ActorService,
    private countryService: CountryService,
    private directorService: DirectorService,
    private genreService: GenreService,
    private languageService: LanguageService,
    private productionService: ProductionService,
    private writerService: WriterService
    ) { }

  public loadTypologicals(){
    this.actorService.getAllActors().subscribe( res =>{
      this.actors = res;
    });
    this.countryService.getAllCountries().subscribe( res =>{
      this.countries = res;
    })
    this.directorService.getAllDirectors().subscribe( res =>{
      this.directors = res;
    });
    this.genreService.getAllGenre().subscribe( res =>{
      this.genres = res;
    });
    this.languageService.getAllLanguages().subscribe( res =>{
      this.languages = res;
    })
    this.productionService.getAllProductions().subscribe( res =>{
      this.productions = res;
    });
    this.writerService.getAllWriters().subscribe( res =>{
      this.writers = res;
    });
  }

}
