import { Component, Inject } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActorDTO } from 'src/app/models/dto/actor-dto';
import { Movie } from 'src/app/models/movie';
import { DatabaseService } from 'src/app/service/database.service';

@Component({
  selector: 'app-multi-select-dialog',
  templateUrl: './multi-select-dialog.component.html',
  styleUrls: ['./multi-select-dialog.component.scss']
})
export class MultiSelectDialogComponent {


  listElement:any[]=[];
  listOut:any[]=[];
  path:string;
  movie!:Movie;
  constructor(
    private dataService : DatabaseService,
    public dialogRef: MatDialogRef<MultiSelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { path: string, movie: Movie }){
    this.path = data.path;
    this.movie = data.movie;
    console.log(this.path, this.movie);
    this.load();
  }
  renderOut(option:any){
    console.log('renderOut OPTION:');
    console.log(option);
    switch(this.path){
      case 'actors':
        if(this.listOut.includes(option)){
          console.log('tolgo');
          this.listOut = this.listOut.filter(act=>{return (act.idActor != option.idActor)});
        }else{ console.log('metto');
              this.listOut.push(option);
        }
        console.log('renderOut LIST');
        console.log(this.listOut);
        break;
      case 'country':
        break;
      case 'language':
        break;
      case 'director':
        break;
      case 'genre':
        break;
      case 'production':
        break;
      case 'writer':
        break;
    }

  }



  check(option:any):boolean{
    switch(this.path){
      case 'actors':
        for(let actor of this.movie.actors){
          if((actor.idActor) == option.idActor) return true;
        }
        break;
      case 'country':
        for(let country of this.movie.country){
          if((country.idCountry) == option.idCountry) return true;
        }
        break;
      case 'language':
        for(let language of this.movie.language){
          if((language.idLanguage) == option.idLanguage) return true;
        }
        break;
      case 'director':
        for(let director of this.movie.director){
          if((director.idDirector) == option.idDirector) return true;
        }
        break;
      case 'genre':
        for(let genre of this.movie.genre){
          if((genre.idGenre) == option.idGenre) return true;
        }
        break;
      case 'production':
        for(let production of this.movie.production){
          if((production.idProduction) == option.idProduction) return true;
        }
        break;
      case 'writer':
        for(let writer of this.movie.writer){
          if((writer.idWriter) == option.idWriter) return true;
        }
        break;
    }
    return false;
  }

  load(){
    this.listElement=[];
    switch(this.path){
      case 'actors':
        this.listElement = this.dataService.actors;
        break;
      case 'country':
        this.listElement = this.dataService.countries;
        break;
      case 'language':
        this.listElement = this.dataService.languages;
        break;
      case 'director':
        this.listElement = this.dataService.directors;
        break;
      case 'genre':
        this.listElement = this.dataService.genres;
        break;
      case 'production':
        this.listElement = this.dataService.productions;
        break;
      case 'writer':
        this.listElement = this.dataService.writers;
        break;
    }
  }
  stringify(option:any) : string{
    switch(this.path){
      case 'actors':
        return option.first_name + " "+ option.last_name;
      case 'country':
        return option.countries;
      case 'language':
        return option.language;
      case 'director':
        return option.director;
      case 'genre':
        return option.genre;
      case 'production':
        return option.name;
      case 'writer':
        return option.first_name + " "+ option.last_name;
      default:
        return "";
    }
  }
}
