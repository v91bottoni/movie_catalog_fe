import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/service/movie.service';
import { UtilityService } from 'src/app/service/utility.service';


@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.scss']
})
export class UpdateMovieComponent {
  movie:Movie| null = null;
  submitted = false;
  updateForm: FormGroup = this.formbuilder.group({    actors :['', Validators.required],    awards :['', Validators.required],    boxoffice :['', Validators.required],    country:['', Validators.required],    director :['', Validators.required],    dvd :['', Validators.required],    genre :['', Validators.required],    imdbid :['', Validators.required],    imdbrating :['', Validators.required],    imdbvotes :['', Validators.required],    language :['', Validators.required],    metascore :['', Validators.required],    plot :['', Validators.required],    poster :['', Validators.required],    production :['', Validators.required],    rated :['', Validators.required],    released :['', Validators.required],    response :['', Validators.required],    runtime :['', Validators.required],    title :['', Validators.required],    totalseasons:['', Validators.required],    type :['', Validators.required],    website :['', Validators.required],    writer :['', Validators.required],    year :['', Validators.required]  });

  constructor(  private formbuilder:FormBuilder, private service:MovieService,
    private route :Router, private activatedRoute:ActivatedRoute, private util:UtilityService){
      let idMovie = this.activatedRoute.snapshot.paramMap.get('idMovie') + "";
this.service.getMovieById(idMovie).subscribe(resp =>{
  this.movie = resp;
  console.log(this.movie);
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
    released : [this.movie?.released,{validators:[Validators.required],updateOn:"change"}],
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
            //console.log(movie);
            this.service.updateMovie(movie).subscribe(resp =>{
              if(resp != null){
                alert("Update Successfull");
                this.route.navigate(['movies/'+this.movie?.imdbid]);
              }
            });
          }
        }
        exit(){
          console.log(this.util.backpage);
          this.route.navigate([this.util.backpage]);
        }


}



