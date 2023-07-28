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

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  actors!: ActorDTO[];
  directors!: DirectorDTO[];
  genres!: GenreDTO[];
  productions!: ProductionDTO[];
  writers!: WriterDTO[];

  constructor(
    private actorService: ActorService,
    private directorService: DirectorService,
    private genreService: GenreService,
    private productionService: ProductionService,
    private writerService: WriterService
    ) { }

  public loadTypologicals(){
    this.actorService.getAllActors().subscribe( res =>{
      this.actors = res;
    });
    this.directorService.getAllDirectors().subscribe( res =>{
      this.directors = res;
    });
    this.genreService.getAllGenre().subscribe( res =>{
      this.genres = res;
    });
    this.productionService.getAllProductions().subscribe( res =>{
      this.productions = res;
    });
    this.writerService.getAllWriters().subscribe( res =>{
      this.writers = res;
    });
  }

}
