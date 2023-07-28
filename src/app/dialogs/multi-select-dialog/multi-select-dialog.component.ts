import { Component, Inject } from '@angular/core';
import { MatChip } from '@angular/material/chips';
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
  renderOut(option:string){
    if(this.listOut.includes(option)){
      this.listOut = this.listOut.filter(val=>val!=option);
    }else{
      this.listOut.push(option);
    }
    console.log(this.listOut);
  }

  check(option:string):boolean{
    switch(this.path){
      case 'actors':
        for(let actor of this.movie.actors){
          if((actor.first_name+" "+actor.last_name) == option) return true;
        }
        break;
      case 'country':
        for(let country of this.movie.country){
          if((country.countries) == option) return true;
        }
        break;
      case 'language':
        for(let language of this.movie.language){
          if((language.language) == option) return true;
        }
        break;
      case 'director':
        for(let director of this.movie.director){
          if((director.first_name+" "+director.last_name) == option) return true;
        }
        break;
      case 'genre':
        for(let genre of this.movie.genre){
          if((genre.genre) == option) return true;
        }
        break;
      case 'production':
        for(let production of this.movie.production){
          if((production.name) == option) return true;
        }
        break;
      case 'writer':
        for(let writer of this.movie.writer){
          if((writer.first_name+" "+writer.last_name) == option) return true;
        }
        break;
    }
    return false;
  }

  load(){
    this.listElement=[];
    switch(this.path){
      case 'actors':
        this.listOut = this.movie.actors;
        this.dataService.actors.forEach(act=>{this.listElement.push(act.first_name+" "+act.last_name)});
        break;
      case 'country':
        this.listOut = this.movie.country;
        //this.dataService.countries.forEach(country=>{this.listElement.push(country.countries)});
        break;
      case 'language':
        this.listOut = this.movie.language;
        //this.dataService.language.forEach(language=>{this.listElement.push(language.language)});
        break;
      case 'director':
        this.listOut = this.movie.director;
        this.dataService.directors.forEach(director=>{this.listElement.push(director.first_name+" "+director.last_name)});
        break;
      case 'genre':
        this.listOut = this.movie.genre;
        this.dataService.genres.forEach(genre=>{this.listElement.push(genre.genre)});
        break;
      case 'production':
        this.listOut = this.movie.production;
        this.dataService.productions.forEach(production=>{this.listElement.push(production.name)});
        break;
      case 'writer':
        this.listOut = this.movie.writer;
        this.dataService.writers.forEach(writer=>{this.listElement.push(writer.first_name+" "+writer.last_name)});
        break;
    }
  }
}
