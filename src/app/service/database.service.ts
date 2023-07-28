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
import { Observable, forkJoin, map, tap } from 'rxjs';
import { TypeDTO } from '../models/dto/type-dto';
import { TypeService } from './type.service';

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
  types!: TypeDTO[];

  constructor(
    private actorService: ActorService,
    private countryService: CountryService,
    private directorService: DirectorService,
    private genreService: GenreService,
    private languageService: LanguageService,
    private productionService: ProductionService,
    private writerService: WriterService,
    private typeService: TypeService
    ) { }

  public loadTypologicals(): Promise<any>{
    // this.actorService.getAllActors().subscribe( res =>{
    //   this.actors = res;
    // });
    // this.countryService.getAllCountries().subscribe( res =>{
    //   this.countries = res;
    // })
    // this.directorService.getAllDirectors().subscribe( res =>{
    //   this.directors = res;
    // });
    // this.genreService.getAllGenre().subscribe( res =>{
    //   this.genres = res;
    // });
    // this.languageService.getAllLanguages().subscribe( res =>{
    //   this.languages = res;
    // })
    // this.productionService.getAllProductions().subscribe( res =>{
    //   this.productions = res;
    // });
    // this.writerService.getAllWriters().subscribe( res =>{
    //   this.writers = res;
    // });

    return forkJoin({
      actors : this.actorService.getAllActors(),
      countries : this.countryService.getAllCountries(),
      directors : this.directorService.getAllDirectors(),
      genres : this.genreService.getAllGenre(),
      languages : this.languageService.getAllLanguages(),
      productions : this.productionService.getAllProductions(),
      writers : this.writerService.getAllWriters(),
      types: this.typeService.getAllTypes()
    })
    .toPromise().then( (res) => {
      if(res){
        // const elem = Object.keys(res);
        // elem.forEach( e => {
        //   const index = e as keyof typeof res;
        //   const value = res[index];
        //   if(value){
        //     this[index] = value;
        //   }
        // })
        this.actors = res.actors;
        this.countries = res.countries;
        this.directors = res.directors;
        this.genres = res.genres;
        this.languages = res.languages;
        this.productions = res.productions;
        this.writers = res.writers;
        this.types = res.types;
      }
    }).catch( (err) => {
      console.log("ERRORE: " + err);
    })
  }

}
