import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute,  Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/service/movie.service';
import { UtilityService } from 'src/app/service/utility.service';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { UpdateMovieSuccessfullDialogComponent } from 'src/app/dialogs/update-movie-successfull-dialog/update-movie-successfull-dialog.component';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { TranslateService } from '@ngx-translate/core';
import { MovieMapperService } from 'src/app/util/movie-mapper.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { GenreService } from 'src/app/service/genre.service';
import { GenreDTO } from 'src/app/models/dto/genre-dto';
import { ProductionDTO } from 'src/app/models/dto/production-dto';
import { ActorDTO } from 'src/app/models/dto/actor-dto';
import { WriterDTO } from 'src/app/models/dto/writer-dto';
import { LanguageDTO } from 'src/app/models/dto/language-dto';
import { DirectorDTO } from 'src/app/models/dto/director-dto';
import { CountryDTO } from 'src/app/models/dto/country-dto';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.scss']
})
export class UpdateMovieComponent implements OnDestroy{
  movie:Movie  = new Movie();
  submitted = false;
  updateForm: FormGroup = this.formbuilder.group({    actors :[''],    awards :[''],    boxoffice :[''],    country:[''],    director :[''],    dvd :[''],    genre :[''],    imdbrating :[''],    imdbvotes :[''],    language :[''],    plot :['', Validators.required],    poster :['', Validators.required],    production :[''],    rated :[''],    released :[''],     runtime :[''],    title :['', Validators.required],    totalseasons:[''],    type :[''],    website :[''],    writer :[''],    year :['', Validators.required]  });
  //controlsNames:string[] = ['actors',    'awards',    'boxoffice',    'countr',    'director',    'dvd',    'genre',   'imdbrating',    'imdbvotes',    'language',    'metascore',    'plot',    'poster',    'production',    'rated',    'released',    'response',    'runtime',    'title',    'totalseason',    'type','website','writer','year'];

  genNames:string[] = [ 'plot',    'released',    'runtime',   'genre',    'title',    'totalseason',    'type', 'year'];
  prodNames:string[] = ['actors',      'country',    'director',    'dvd',     'language',    'poster',    'production','writer'];
  otherNames:string[] = [ 'awards','boxoffice',    'imdbrating',    'imdbvotes',       'rated',  'website'];

  isHorizontal:boolean = !(window.innerWidth<1000);


  listGenre:GenreDTO[]=[];
  resizing = () => {
    if(window.innerWidth<1000)this.isHorizontal=false;
    else this.isHorizontal=true;
  }


  constructor(
    private formbuilder:FormBuilder,
    private service:MovieService,
    private route :Router,
    private activatedRoute:ActivatedRoute,
    private util:UtilityService,
    public dialog: MatDialog,
    private alert: SnackbarService,
    private movieMapperService : MovieMapperService,
    private translate:TranslateService,
    private genreService:GenreService) {
      let idMovie = this.activatedRoute.snapshot.paramMap.get('idMovie') + "";
      this.service.getMovieById(idMovie).subscribe(resp =>{
        this.movie = movieMapperService.movieDetailsDTOtoMovie(resp);
        console.log(this.movie);
        this.reset();
      });
      window.scrollTo({
        top: 0,
        behavior:'smooth'
      });
      window.addEventListener("resize", this.resizing);


      this.genreService.getAllGenre().subscribe(res=>{
        console.log(res);
        if(res){
          this.listGenre=res;
        }
      });
  }


        updateData() {
          this.verifyStepError();
          this.submitted = true;
          if(this.updateForm.valid){
            let movie :Movie = this.updateForm.value;
            movie.imdbid = this.movie?.imdbid+"";
            movie.genre= this.movie.genre;
            movie.actors= this.movie.actors;
            movie.writer= this.movie.writer;
            movie.director= this.movie.director;
            movie.production= this.movie.production;
            movie.country= this.movie.country;
            movie.language= this.movie.language;
            if(movie.boxoffice!= null && !movie.boxoffice.startsWith('$')){
              movie.boxoffice= "$" + movie.boxoffice;
            }
            console.log(this.movieMapperService.movieToMovieDetailsDTO(movie));
            this.service.updateMovie(this.movieMapperService.movieToMovieDetailsDTO(movie)).subscribe(resp =>{
              if(resp != null){
                this.dialog.open(UpdateMovieSuccessfullDialogComponent)
                  .afterClosed().subscribe(result=>{
                    this.route.navigate(['home']);
                    if(result){
                      this.service.movieid = movie.imdbid;
                      this.dialog.open(MovieDetailsComponent);
                    }
                    this.alert.openSuccess(this.translate.instant('updatemovie.updated'), this.translate.instant('updatemovie.ok'));
                  });
              }
            });
          }
        }

        goBack(){
          this.route.navigate([this.util.backpage]);
          this.service.movieid = this.movie?.imdbid+"";
          this.dialog.open(MovieDetailsComponent);

        }

        exit(){
          console.log(this.util.backpage);
          this.route.navigate([this.util.backpage]);
        }



        genOK:boolean = true;
        proOK:boolean = true;
        othOK:boolean = true;
        verifyStepError(){
          this.genOK = true;
          this.proOK = true;
          this.othOK = true;

          if(!this.updateForm.valid) {
            for(let control of this.genNames){
              if(this.updateForm.get(control)?.hasError('required')){
                console.log(control);
                this.genOK = false;
                break;
              }
            }
            for(let control of this.prodNames){
              if(this.updateForm.get(control)?.hasError('required')){
                this.proOK = false;
                break;
              }
            }
            for(let control of this.otherNames){
              if(this.updateForm.get(control)?.hasError('required')){
                this.othOK = false;
                break;
              }
            }
            if(this.movie.genre.length==0)this.genOK = false;
            if(this.movie.actors.length==0)this.proOK=false;
            if(this.movie.writer.length==0)this.proOK=false;
            if(this.movie.director.length==0)this.proOK=false;
            if(this.movie.production.length==0)this.proOK=false;
            if(this.movie.country.length==0)this.proOK=false;
            if(this.movie.language.length==0)this.proOK=false;
          }

         /*if(!this.generalityForm.valid) {this .message = "Generality Step Incomplete!"}
          if(!this.productionForm.valid) {this .message = "Production Info Step Incomplete!"}
          if(!this.otherInfoForm.valid) {this .message = "Other Info Step Incomplete!"}*/


        }
        reset(){
          this.genOK = true;
          this.proOK = true;
          this.othOK = true;
          this.updateForm = this.formbuilder.group({
            actors : [""],
            awards : [this.movie?.awards],
            boxoffice : [this.movie?.boxoffice],
            country: [""],
            director : [""],
            dvd : [this.movie?.dvd],
            genre : [""],
            imdbrating : [this.movie?.rating],
            imdbvotes : [this.movie?.voteNumber],
            language : [""],
            plot : [this.movie?.plot,{validators:[Validators.required],updateOn:"change"}],
            poster : [this.movie?.poster,{validators:[Validators.required],updateOn:"change"}],
            production : [""],
            rated : [this.movie?.rated],
            released : [this.movie?.released],
            runtime : [this.movie?.runtime],
            title : [this.movie?.title,{validators:[Validators.required],updateOn:"change"}],
            totalseasons : [this.movie?.totalseasons],
            type : [this.movie?.type.idType+""],
            website : [this.movie?.website],
            writer : [""],
            year : [this.movie?.year,{validators:[Validators.required],updateOn:"change"}],
          });
          ;

        }


        ngOnDestroy(): void {
          window.removeEventListener("resize", this.resizing);
        }

        setMultiSelectInput(event:any[], path:string){
          switch(path){
            case 'actors':
              this.movie.actors=event;
              break;
            case 'country':
              this.movie.country=event;
              break;
            case 'language':
              this.movie.language=event;
              break;
            case 'director':
              this.movie.director=event;
              break;
            case 'genre':
              this.movie.genre=event;
              break;
            case 'production':
              this.movie.production=event;
              break;
            case 'writer':
              this.movie.writer=event;
              break;
          }
        }

        removeGenre(genreIn: GenreDTO): void {
          this.movie.genre=this.movie?.genre.filter(gen=>gen!=genreIn);
        }
        removeProduction(productionIn: ProductionDTO): void {
          this.movie.production = this.movie?.production.filter(production=>production!=productionIn);
        }
        removeActor(actorIn: ActorDTO): void {
          this.movie.actors = this.movie?.actors.filter(actor=>actor!=actorIn);
        }
        removeWriter(writerIn: WriterDTO): void {
          this.movie.writer = this.movie?.writer.filter(writer=>writer!=writerIn);
        }
        removeLanguage(languageIn: LanguageDTO): void {
          this.movie.language = this.movie?.language.filter(language=>language!=languageIn);
        }
        removeDirector(directorIn: DirectorDTO): void {
          this.movie.director = this.movie?.director.filter(director=>director!=directorIn);
        }
        removeCountry(countryIn: CountryDTO): void {
          this.movie.country = this.movie?.country.filter(country=>country!=countryIn);
        }




       /* add(event: MatChipInputEvent): void {
          const value = (event.value || '').trim();

          // Add our keyword
          if (value) {
            let genre:GenreDTO = new GenreDTO();
            genre.genre=value;
            this.movie?.genre.push(genre);
          }

          // Clear the input value
          event.chipInput!.clear();
        }*/


}



