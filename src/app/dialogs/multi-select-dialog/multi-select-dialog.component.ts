import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    switch(this.path){
      case 'actors':
        if(this.listOut.includes(option))
          this.listOut = this.listOut.filter(actor=>{return (actor.idActor != option.idActor)});
        else
          this.listOut.push(option);
        break;
      case 'country':
        if(this.listOut.includes(option))
        this.listOut = this.listOut.filter(country=>{return (country.idCountry != option.idCountry)});
      else
        this.listOut.push(option);
        break;
      case 'language':
        if(this.listOut.includes(option))
        this.listOut = this.listOut.filter(language=>{return (language.idLanguage != option.idLanguage)});
      else
        this.listOut.push(option);
        break;
      case 'director':
        if(this.listOut.includes(option))
        this.listOut = this.listOut.filter(director=>{return (director.idDirector != option.idDirector)});
      else
        this.listOut.push(option);
        break;
      case 'genre':
        if(this.listOut.includes(option))
        this.listOut = this.listOut.filter(genre=>{return (genre.idGenre != option.idGenre)});
      else
        this.listOut.push(option);
        break;
      case 'production':
        if(this.listOut.includes(option))
        this.listOut = this.listOut.filter(production=>{return (production.idProduction != option.idProduction)});
      else
        this.listOut.push(option);
        break;
      case 'writer':
        if(this.listOut.includes(option))
        this.listOut = this.listOut.filter(writer=>{return (writer.idWriter != option.idWriter)});
      else
        this.listOut.push(option);
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
        return option.first_name + " "+ option.last_name;
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
