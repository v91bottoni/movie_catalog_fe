import { Component, HostListener, OnInit, VERSION ,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { response } from 'src/app/models/response';
import { MovieService } from 'src/app/service/movie.service';
import { UtilityService } from 'src/app/service/utility.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-cards-display',
  templateUrl: './cards-display.component.html',
  styleUrls: ['./cards-display.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter, :leave', [
        animate(400)
      ])
    ])
  ]
})
export class CardsDisplayComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  currentPage = 0; 
  pageSize = 10; 
  response!: response;
  page!: number;
  maxPage!: number;
  totalItems = 70;
  cardView: boolean = true;
  movies!: Movie[];
  displayedColumns: string[] = ['title', 'plot', 'writer', 'imdbrating', 'button', 'edit'];
  home: boolean = false;
  gerne: boolean = false;
  search: boolean = false;
  keyword!: string;
  category!: string;
  currentChipsValue: string = "-1";
  hover: boolean = true;
  idHover!: string;
  gridCols!: number;
  colsNumber!: number;


  chipsCategory: string[] = this.movieService.chipsCategory.map(category => category.toString());

  constructor(
    private movieService: MovieService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private util: UtilityService
  ) {
    this.util.backpage = "home";
  }

  ngOnInit(): void {

    this.goTop();

    this.updateGridCols();
    this.updateColsNumber();

    let bool: string = sessionStorage.getItem("cardView") as string

    if(bool === 'true'){
      this.cardView=true;
    }
    if (bool === 'false') {
      this.cardView = false;
    }

    // this.route.snapshot.paramMap.get("pag")

    if (sessionStorage.getItem("chipsValue")) {
      this.currentChipsValue = sessionStorage.getItem("chipsValue") as string;
    }
    

    this.route.params.subscribe(params => {
      if (params['gerne']) {
        this.page = Number(params['page']);
        this.category = params['gerne'];
        if (this.currentChipsValue != this.category) this.currentChipsValue = this.category;
        this.movieService.getMovieByGenre(params['gerne'], 1).subscribe(res => {
          this.maxPage = res.maxPageNumber;
          this.movies = res.movieList;
          this.response = res;
          this.home = false;
          this.gerne = true;
          this.search = false;
        });
      } else if (params['pag']) {
        this.page = Number(params['pag']);
        this.loadMovies();
      } else if (params['keyword']) {
        this.page = Number(params['pg']);
        this.keyword = params['keyword'];
        this.currentChipsValue = "-1";
        this.movieService.searchMovie(params['keyword'], params['pg']).subscribe(res => {
          this.maxPage = res.maxPageNumber;
          this.movies = res.movieList;
          this.response = res;
          this.home = false;
          this.gerne = false;
          this.search = true;
        });
      } else {
        this.currentChipsValue = "-1";
        this.loadMovies();
      }
    });

    this.paginator.page.subscribe((event: PageEvent) => {
       this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
      this.page = event.pageIndex + 1;
      this.loadMovies();
    });
  }

loadMovies() {
this.route.params.subscribe(params=> {

if(params['gerne']){
  const pageSize = this.paginator.pageSize;
  this.movieService.getMoviesByGenreWithPagination(params['gerne'],this.page, pageSize).subscribe(res => {
    this.maxPage = res.maxPageNumber;
    this.movies = res.movieList;
    this.response = res;
  });
  

}
else{
  const pageSize = this.paginator.pageSize;
  this.movieService.getAllMoviesWithPagination(this.page, 'imdbrating', pageSize).subscribe(res => {
    this.maxPage = res.maxPageNumber;
    this.movies = res.movieList;
    this.response = res;
  });

  this.goTop()
}

})


  
}


   openDialog(imdbid: string){
    this.movieService.movieid = imdbid;
    const dialogRef = this.dialog.open(MovieDetailsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  paginatorPageChange(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.maxPage = Math.ceil(this.totalItems / this.pageSize);
    this.loadMovies();
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
  goToCategory(chips: string) {
    if (chips === "All") {
      this.currentChipsValue = chips;
      this.router.navigateByUrl('/home/gerne/'+ this.currentChipsValue );
      this.goTop()
    } else {
      this.currentChipsValue = chips;
    }
    sessionStorage.setItem('chipsValue', this.currentChipsValue);
    this.router.navigateByUrl('/home/gerne/' + this.currentChipsValue);
    this.goTop()
    
  }
  
  goTop(){
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
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
