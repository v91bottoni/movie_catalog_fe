import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/service/movie.service';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
  selector: 'app-insert-movie',
  templateUrl: './insert-movie.component.html',
  styleUrls: ['./insert-movie.component.scss']
})
export class InsertMovieComponent {
  movie!:Movie;
  submitted = false;
  insertForm!: FormGroup;

  constructor(  private formbuilder:FormBuilder, private service:MovieService,
    private route :Router, private activatedRoute:ActivatedRoute, private util:UtilityService){

      this.insertForm = this.formbuilder.group({
      actors : ["",{validators:[Validators.required, Validators.minLength(2),  Validators.maxLength(100)]}],
      awards : ["",{validators:[Validators.required, Validators.minLength(2),  Validators.maxLength(100)]}],
      boxoffice : ["",{validators:[Validators.required]}],
      country: ["",{validators:[Validators.required, Validators.minLength(2),  Validators.maxLength(100)]}],
      director : ["",{validators:[Validators.required, Validators.minLength(3),  Validators.maxLength(50)]}],
      dvd : ["",{validators:[Validators.required]}],
      genre : ["",{validators:[Validators.required, Validators.minLength(3),  Validators.maxLength(100)]}],
      imdbrating : ["",{validators:[Validators.required]}],
      imdbvotes : ["",{validators:[Validators.required]}],
      language : ["",{validators:[Validators.required, Validators.minLength(3),  Validators.maxLength(50)]}],
      metascore : ["",{validators:[Validators.required]}],
      plot : ["",{validators:[Validators.required, Validators.minLength(10),  Validators.maxLength(500)]}],
      poster : ["",{validators:[Validators.required, Validators.minLength(2),  Validators.maxLength(200)]}],
      production : ["",{validators:[Validators.required, Validators.minLength(2),  Validators.maxLength(50)]}],
      rated : ["",{validators:[Validators.required]}],
      released : ["",{validators:[Validators.required]}],
      response : ["",{validators:[Validators.required]}],
      runtime : ["",{validators:[Validators.required]}],
      title : ["",{validators:[Validators.required,  Validators.minLength(2),  Validators.maxLength(100)]}],
      totalseasons : [""],
      type : ["",{validators:[Validators.required,Validators.minLength(2),  Validators.maxLength(10)]}],
      website : ["",{validators:[Validators.required, Validators.minLength(2),  Validators.maxLength(50)]}],
      writer : ["",{validators:[Validators.required, Validators.minLength(2),  Validators.maxLength(400)]}],
      year : ["",{validators:[Validators.required]}],
      imdbid : ["",{validators:[Validators.required, Validators.minLength(5)]}]
  });

      }

      get title()      { return this.insertForm.get('title')}
      get actors()      { return this.insertForm.get('actors')}
      get year()      { return this.insertForm.get('year')}
      get director()      { return this.insertForm.get('director')}
      get genre()      { return this.insertForm.get('genre')}
      get plot()      { return this.insertForm.get('plot')}
      get awards()      { return this.insertForm.get('awards')}
      get boxoffice()      { return this.insertForm.get('boxoffice')}
      get country()      { return this.insertForm.get('country')}
      get dvd()      { return this.insertForm.get('dvd')}
      get imdbrating()      { return this.insertForm.get('imdbrating')}
      get imdbvotes()      { return this.insertForm.get('imdbvotes')}
      get language()      { return this.insertForm.get('language')}
      get metascore()      { return this.insertForm.get('metascore')}
      get poster()      { return this.insertForm.get('poster')}
      get production()      { return this.insertForm.get('production')}
      get rated()      { return this.insertForm.get('rated')}
      get released()      { return this.insertForm.get('released')}
      get response()      { return this.insertForm.get('response')}
      get runtime()      { return this.insertForm.get('runtime')}
      get totalseason()      { return this.insertForm.get('totalseason')}
      get type()      { return this.insertForm.get('type')}
      get website()      { return this.insertForm.get('website')}
      get writer()      { return this.insertForm.get('writer')}
      get imdbid()     {return this.insertForm.get('imdbid')}

        onSubmit(){


        }

        exit(){
          console.log(this.util.backpage);
          this.route.navigate([this.util.backpage]);
        }



}
