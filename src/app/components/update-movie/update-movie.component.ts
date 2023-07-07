import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/service/movie.service';


@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.css']
})
export class UpdateMovieComponent {
  movie:Movie| null = null;
  submitted = false;
  updateForm: FormGroup = this.formbuilder.group({    actors :[],    awards :[],    boxoffice :[],    country:[],    director :[],    dvd :[],    genre :[],    imdbid :[],    imdbrating :[],    imdbvotes :[],    language :[],    metascore :[],    plot :[],    poster :[],    production :[],    rated :[],    released :[],    response :[],    runtime :[],    title :[],    totalseasons:[],    type :[],    website :[],    writer :[],    year :[]  });

  constructor(  private formbuilder:FormBuilder, private service:MovieService,
    private route :Router, private activatedRoute:ActivatedRoute,){
      let idMovie = this.activatedRoute.snapshot.paramMap.get('idMovie') + "";
this.service.getMovieById(idMovie).subscribe(resp =>{
  this.movie = resp;
  this.updateForm = this.formbuilder.group({
    actors : [this.movie?.actors,{validators:[Validators.required],updateOn:"change"}],
    awards : [this.movie?.awards,{validators:[Validators.required],updateOn:"change"}],
    boxoffice : [this.movie?.boxoffice,{validators:[Validators.required],updateOn:"change"}],
    country: [this.movie?.country,{validators:[Validators.required],updateOn:"change"}],
    director : [this.movie?.director,{validators:[Validators.required],updateOn:"change"}],
    dvd : [this.movie?.dvd,{validators:[Validators.required],updateOn:"change"}],
    genre : [this.movie?.genre,{validators:[Validators.required],updateOn:"change"}],
    imdbrating : [this.movie?.imdbrating,{validators:[Validators.required],updateOn:"change"}],
    imdbvotes : [this.movie?.imdbvotes,{validators:[Validators.required],updateOn:"change"}],
    language : [this.movie?.language,{validators:[Validators.required],updateOn:"change"}],
    metascore : [this.movie?.metascore,{validators:[Validators.required],updateOn:"change"}],
    plot : [this.movie?.plot,{validators:[Validators.required],updateOn:"change"}],
    poster : [this.movie?.poster,{validators:[Validators.required],updateOn:"change"}],
    production : [this.movie?.production,{validators:[Validators.required],updateOn:"change"}],
    rated : [this.movie?.rated,{validators:[Validators.required],updateOn:"change"}],
    released : [this.movie?.release,{validators:[Validators.required],updateOn:"change"}],
    response : [this.movie?.response?'True':'False',{validators:[Validators.required],updateOn:"change"}],
    runtime : [this.movie?.runtime,{validators:[Validators.required],updateOn:"change"}],
    title : [this.movie?.title,{validators:[Validators.required],updateOn:"change"}],
    totalseasons : [this.movie?.totalseasons],
    type : [this.movie?.type,{validators:[Validators.required],updateOn:"change"}],
    website : [this.movie?.website,{validators:[Validators.required],updateOn:"change"}],
    writer : [this.movie?.writer,{validators:[Validators.required],updateOn:"change"}],
    year : [this.movie?.year,{validators:[Validators.required],updateOn:"change"}],
  });
});

      }


        updateData() {
          this.submitted = true;
          if(this.updateForm.valid){
            let movie :Movie = this.updateForm.value;
            movie.imdbid = this.movie?.imdbid+"";
            console.log(movie);
            this.service.saveMovie(movie).subscribe(resp =>{
              if(resp != null){
                console.log(movie);
              }
            });
          }
        }

        exit() {
          this.route.navigate(["home"]);
        }
}

