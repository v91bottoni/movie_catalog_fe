import { Component, OnInit, VERSION } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { response } from 'src/app/models/response';
import { MovieService } from 'src/app/service/movie.service';
import { UtilityService } from 'src/app/service/utility.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  response!: response;
  page!: number;
  maxPage!: number;
  cardView: boolean = true;
  movies!: Movie[];
  displayedColumns: string[] = ['title', 'plot', 'writer' ,'imdbrating'];
  home: boolean= false;
  gerne: boolean= false;
  category!:String;
  currentChipsValue: String = "-1"

  chipsCategory: String[] = this.movieService.categories;


  ngOnInit(): void {
    this.refresh();
    // this.route.snapshot.paramMap.get("pag")

    if (localStorage.getItem("chipsValue")) {
      this.currentChipsValue = localStorage.getItem("chipsValue") as string;
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


          console.log(this.response);
        })

      }

      else{
        this.currentChipsValue = "-1";
        this.router.navigate(['/home/page/1'])
      }

  });


  }

  constructor(private movieService: MovieService,public dialog: MatDialog, private route: ActivatedRoute, private router: Router, private util:UtilityService , private authService:AuthService) {
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
  }

  switchView(){
    if(this.cardView) this.cardView=false;
    else this.cardView=true;
  }


  openMovieDetails(movieId: string): void {
    this.router.navigate(['/movies', movieId]);
  }

  goToCategory(chips:String){

    localStorage.setItem('chipsValue', String(chips));
    this.router.navigateByUrl('/home/gerne/'+chips+'/1')
  }

  goHome(){
    this.currentChipsValue = "-1"
    this.router.navigateByUrl('/home/page/1')
  }

  refresh(){
    let token = localStorage.getItem('token');
    if(token){
      this.authService.refreshTok(token).subscribe(res=>{
        if(res != null){
          if(res.token){
           // console.log("Refresh Avvenuto");
            localStorage.setItem('role', res.user.role.role || '');
            localStorage.setItem('userID', res.user.id.toString() || '');
            localStorage.setItem('userName', res.user.name || '');
            localStorage.setItem('token', res.token || '');
            localStorage.setItem('refreshToken', res.refreshToken || '');
            this.util.role = res.user.role.role;
            this.util.username = res.user.name;
          }
        }

      });
    }
  }

}
