import { Component, HostListener, OnInit, VERSION ,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { response } from 'src/app/models/response';
import { MovieService } from 'src/app/service/movie.service';
import { UtilityService } from 'src/app/service/utility.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-cards-display',
  templateUrl: './cards-display.component.html',
  styleUrls: ['./cards-display.component.scss']
})
export class CardsDisplayComponent implements OnInit{

  response!: response;
  page!: number;
  maxPage!: number;
  cardView: boolean = true;
  movies!: Movie[];
  displayedColumns: string[] = ['title', 'plot', 'writer' ,'imdbrating', 'button', 'edit'];
  home: boolean= false;
  gerne: boolean= false;
  search: boolean= false;
  keyword!: string;
  category!:String;
  currentChipsValue: String = "-1"
  hover: boolean = true;
  idHover!: string;
  gridCols!: number;
  colsNumber!: number;


  chipsCategory: String[] = this.movieService.categories;


  ngOnInit(): void {

    this.updateGridCols();
    this.updateColsNumber();

    let bool: string = sessionStorage.getItem("cardView") as string

    if(bool === 'true'){
      this.cardView=true;
    }
    if(bool === 'false'){
      this.cardView=false;
    }

    // this.route.snapshot.paramMap.get("pag")

    if (sessionStorage.getItem("chipsValue")) {
      this.currentChipsValue = sessionStorage.getItem("chipsValue") as string;
    }


    this.route.params.subscribe(params => {

      if(params['gerne']){
        this.page=Number(params['page']);


        this.category=params ['gerne'];
        if(this.currentChipsValue!= this.category) this.currentChipsValue = this.category;
        this.movieService.getMovieByGenre(params['gerne'], params['page']).subscribe(res=>{


          this.maxPage=res.maxPageNumber;
          this.movies=res.movieList;
          this.response=res;


          this.home=false;
          this.gerne= true;
          this.search=false;

        })
      }

      else if(params['pag']){
        this.currentChipsValue = "-1";
        this.page=Number(params['pag'])
        this.movieService.getAllMovies(params['pag'] , 'imdbrating').subscribe(res=>{

          this.maxPage=res.maxPageNumber;
          this.movies=res.movieList
          this.response=res;

          this.home=true;
          this.gerne= false;
          this.search=false;


          console.log(this.response);
        })

      } else if(params['keyword']){
        this.page=Number(params['pg']);


        this.keyword=params['keyword'];
        this.currentChipsValue = "-1";
        this.movieService.searchMovie(params['keyword'], params['pg']).subscribe(res=>{
          if(res){
            this.maxPage=res.maxPageNumber;
            this.movies=res.movieList;
            this.response=res;


            this.home=false;
            this.gerne= false;
            this.search=true;
          }else{
            this.router.navigate(["searchError"]);
          }



        })
      }

      else{
        this.currentChipsValue = "-1";
        this.router.navigate(['/home/page/1'])
      }

  });


  }

  constructor(private movieService: MovieService,public dialog: MatDialog, private route: ActivatedRoute, private router: Router, private util:UtilityService) {
    this.util.backpage = "home";
   }

   openDialog(imdbid: string){
    this.movieService.movieid = imdbid;
    const dialogRef = this.dialog.open(MovieDetailsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  navigatePage(pag: number){
    this.util.backpage = '/home/page/'+pag;
    if(this.home) this.router.navigate(['/home/page/'+pag]);
    if(this.gerne) this.router.navigate(['/home/gerne/'+ this.category+'/'+pag]);
    if(this.search) this.router.navigate(['/home/search/'+ this.keyword+'/'+pag]);
  }

  switchView(){

    if(this.cardView){
      this.cardView=false;
      sessionStorage.setItem('cardView', 'false');
    }
    else{
      this.cardView=true;
      sessionStorage.setItem('cardView', 'true');
    }
  }


  openMovieDetails(movieId: string): void {
    this.router.navigate(['/movies', movieId]);
  }

  goToCategory(chips:String){

    sessionStorage.setItem('chipsValue', String(chips));
    this.router.navigateByUrl('/home/gerne/'+chips+'/1')
  }

  goHome(){
    this.currentChipsValue = "-1"
    this.router.navigateByUrl('/home/page/1')
  }

  setHover(value: boolean, id:string) {
    this.hover = value;
    this.idHover = id;
  }

  goUpdate(imdbid:string){
    this.router.navigate(['/updateMovie/'+imdbid])
  }

  updateGridCols() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 400) {
      this.gridCols = 1;
    } else if (screenWidth < 600) {
      this.gridCols = 2;
    } else if (screenWidth < 800) {
      this.gridCols = 3;
    } else {
      this.gridCols = 4;
    }
  }

  updateColsNumber(){
    const screenWidth = window.innerWidth;
    if (screenWidth < 400) {
      this.colsNumber = 1;
    } else {
      this.colsNumber = 2;
    }
  }



  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateGridCols();
    this.updateColsNumber();
}

}
