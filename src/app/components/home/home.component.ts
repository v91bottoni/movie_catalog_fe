import { Component, OnInit, VERSION } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { response } from 'src/app/models/response';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  response!: response;
  page!: number;
  maxPage!: number;
  cardView: boolean = true;
  movies!: Movie[];
  displayedColumns: string[] = ['title', 'plot', 'writer' ,'imdbrating'];

  // ngVersion: string = VERSION.full;
  // matVersion: string = '5.1.0';
  // breakpoint!: number;


  ngOnInit(): void {

    // this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;

    // this.route.snapshot.paramMap.get("pag")


    this.route.params.subscribe(params => {

      if(params['pag']){
        this.page=Number(params['pag'])
        this.movieService.getAllMovies(params['pag'] , 'imdbrating').subscribe(res=>{

          this.maxPage=res.maxPageNumber;
          this.movies=res.movieList

          this.response=res
          console.log(this.response);
        })

      }

      else{
        this.router.navigate(['/home/page/1'])
        // this.page=1;
        // this.movieService.getAllMovies().subscribe(res=>{

        //   this.maxPage=res.maxPageNumber;
        //   this.movies=res.movieList

        //   this.response=res
        //   console.log(this.response);
        // })
      }

  });


  }

  constructor(private movieService: MovieService, private route: ActivatedRoute, private router: Router) { }

  navigatePage(pag: number){
    this.router.navigate(['/home/page/'+pag])
  }

  switchView(){
    if(this.cardView) this.cardView=false;
    else this.cardView=true;
  }


  openMovieDetails(movieId: string): void {
    this.router.navigate(['/movies', movieId]);
  }
  // onResize(event: UIEvent) {
  //   const target = event.target as Window;
  //   this.breakpoint = (target.innerWidth <= 400) ? 1 : 6;
  // }




}
