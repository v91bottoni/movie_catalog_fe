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

    // Funzione per tornare in cima alla pagina
    this.goTop();

    // Aggiorna il numero di colonne nella griglia
    this.updateGridCols();
    this.updateColsNumber();

    // Recupera il valore della vista delle card dalla sessione
    let bool: string = sessionStorage.getItem("cardView") as string

    // Imposta la vista delle card in base al valore recuperato
    if(bool === 'true'){
      this.cardView=true;
    }
    if (bool === 'false') {
      this.cardView = false;
    }

    // Recupera il valore dei filtri dalle sessione
    if (sessionStorage.getItem("chipsValue")) {
      this.currentChipsValue = sessionStorage.getItem("chipsValue") as string;
    }

    // Gestisce i parametri dell'URL
    this.route.params.subscribe(params => {
      if (params['gerne']) {
        // Se è presente il parametro 'gerne', carica i film del genere specificato e imposta le variabili di stato
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
          // Se è presente il parametro 'pag', carica i film della pagina specificata
          this.page = Number(params['pag']);
          this.loadMovies();
      } else if (params['keyword']) {
        // Se è presente il parametro 'keyword', carica i film corrispondenti alla ricerca e imposta le variabili di stato
        this.page = Number(params['pg']);
        this.keyword = params['keyword'];
        this.currentChipsValue = "-1";
        this.movieService.searchMoviePagination(params['keyword'],params['pg'],10).subscribe(res => {

          if(res){
            this.maxPage = res.maxPageNumber;
            this.movies = res.movieList;
            this.response = res;
            this.home = false;
            this.gerne = false;
            this.search = true;
          }else{
            this.router.navigate(['searchError']);
          }
        });

      } else {
        // Carica i film di default
        this.currentChipsValue = "-1";
        this.loadMovies();
      }
    });

    // Gestisce l'evento di cambio pagina nella paginazione
    this.paginator.page.subscribe((event: PageEvent) => {
       this.currentPage = event.pageIndex;
       this.pageSize = event.pageSize;
       this.page = event.pageIndex + 1;
       this.loadMovies();
    });
}

  loadMovies() {
    // Sottoscrivi al cambio dei parametri dell'URL
    this.route.params.subscribe(params => {
  
      // Se esiste il parametro 'gerne'
      if (params['gerne']) {
        // Recupera la dimensione della pagina dal paginatore
        const pageSize = this.paginator.pageSize;
        // Ottieni i film per genere con paginazione
        this.movieService.getMoviesByGenreWithPagination(params['gerne'], this.page, pageSize || 10).subscribe(res => {
          this.maxPage = res.maxPageNumber;
          this.movies = res.movieList;
          this.response = res;
        });
        // Scrolla la pagina verso l'alto
        this.goTop();
      }
  
      // Se esiste il parametro 'keyword'
      if (params['keyword']) {
        // Recupera la dimensione della pagina dal paginatore
        const pageSize = this.paginator.pageSize;
        // Cerca i film con paginazione
        this.movieService.searchMoviePagination(params['keyword'], this.page, pageSize || 10).subscribe(res => {
          this.maxPage = res.maxPageNumber;
          this.movies = res.movieList;
          this.response = res;
        });
        // Scrolla la pagina verso l'alto
        this.goTop();
      }
      // Altrimenti
      else {
        // Recupera la dimensione della pagina dal paginatore
        const pageSize = this.paginator.pageSize;
        // Ottieni tutti i film con paginazione
        this.movieService.getAllMoviesWithPagination(this.page, 'imdbrating', pageSize || 10).subscribe(res => {
          this.maxPage = res.maxPageNumber;
          this.movies = res.movieList;
          this.response = res;
        });
        // Scrolla la pagina verso l'alto
        this.goTop();
      }
    });
  }


  openDialog(imdbid: string){
    
    this.movieService.movieid = imdbid; // Imposta il movieid nel servizio movieService
    const dialogRef = this.dialog.open(MovieDetailsComponent); // Apre il dialogo per i dettagli del film
    
    // Sottoscrivi all'evento di chiusura del dialogo
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  paginatorPageChange(event: PageEvent) {
    // Aggiorna il numero di pagina corrente
    this.page = event.pageIndex + 1;
    // Calcola il numero massimo di pagine
    this.maxPage = Math.ceil(this.totalItems / this.pageSize);
    // Carica i film in base alla nuova pagina
    this.loadMovies();
  }

  switchView(){
    // Verifica se la visualizzazione corrente è quella a cards
    if(this.cardView){
      // Se sì, cambia la visualizzazione a elenco
      this.cardView=false;
      // Salva la preferenza di visualizzazione nella sessione
      sessionStorage.setItem('cardView', 'false');
    }
    else{
      // Altrimenti, cambia la visualizzazione a cards
      this.cardView=true;
      // Salva la preferenza di visualizzazione nella sessione
      sessionStorage.setItem('cardView', 'true');
    }
  }


  openMovieDetails(movieId: string): void {
    this.router.navigate(['/movies', movieId]);
  }

  goToCategory(chips: string) {
    // Verifica se il valore dei chips è "All"
    if (chips === "All") {
      this.currentChipsValue = chips; // Imposta il valore corrente dei chips
      this.router.navigateByUrl('/home/gerne/' + this.currentChipsValue); // Naviga verso la pagina di genere con il valore dei chips corrente
      this.goTop(); // Scrolla la pagina verso l'alto
    } else {
      // Altrimenti, imposta solo il valore corrente dei chips
      this.currentChipsValue = chips;
    }
    
    sessionStorage.setItem('chipsValue', this.currentChipsValue); // Salva il valore corrente dei chips nella sessione
    this.router.navigateByUrl('/home/gerne/' + this.currentChipsValue); // Naviga verso la pagina di genere con il valore dei chips corrente
    this.goTop(); // Scrolla la pagina verso l'alto
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
    this.router.navigateByUrl('/home')
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
    if (screenWidth < 600) {
      this.gridCols = 1;
    } else if (screenWidth < 850) {
      this.gridCols = 2;
    } else if (screenWidth < 1040) {
      this.gridCols = 3;
    } else {
      this.gridCols = 4;
    }
  }

  updateColsNumber(){
    const screenWidth = window.innerWidth;
    if (screenWidth < 600) {
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


  convertNumber(string:string):Number{
    return Number(string);
  }
}