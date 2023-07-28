import { Component, ElementRef, HostListener, OnInit, VERSION ,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { response } from 'src/app/models/response';
import { MovieService } from 'src/app/service/movie.service';
import { UtilityService } from 'src/app/service/utility.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ExportService } from 'src/app/service/export.service';
import { DataSource } from '@angular/cdk/collections';
import { MatTable } from '@angular/material/table';
import { MovieMapperService } from 'src/app/util/movie-mapper.service';
import { MovieDetailsDTO } from 'src/app/models/dto/movie-details-dto';
import { GenreService } from 'src/app/service/genre.service';
import { GenreDTO } from 'src/app/models/dto/genre-dto';
import { take } from 'rxjs/operators';

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
  totalItems!: number;
  cardView: boolean = true;
  movies!: MovieDetailsDTO[];
  displayedColumns: string[] = ['title', 'plot', 'imdbrating', 'button', 'edit'];
  home: boolean = false;
  gerne: boolean = false;
  search: boolean = false;
  keyword!: string;
  category!: string;
  // currentChipsValue: string = "-1";
  hover: boolean = true;
  idHover!: string;
  gridCols!: number;
  colsNumber!: number;
  // chipsCategory: GenreDTO[] = this.genreService.allGenres;
  smallList: boolean = false;

  constructor(
    private movieService: MovieService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private util: UtilityService,
    private exportService: ExportService,
    private movieMapperService : MovieMapperService,
    private genreService: GenreService,
  ) {
    this.util.backpage = "home";
  }

  ngOnInit(): void {
    this.goTop(); // Scrolla la pagina verso l'alto
    this.updateGridCols(); // Aggiorna il numero di colonne nella griglia
    this.updateColsNumber(); // Aggiorna il numero di colonne in base alla dimensione dello schermo
    this.updateSmallList();
    
    let bool: string = sessionStorage.getItem("cardView") as string; // Recupera il valore booleano di CardView dalla sessionStorage e lo assegna a bool
    if(bool === 'true') { this.cardView = true; } // Se bool è 'true', imposta this.cardView su true
    if (bool === 'false') { this.cardView = false; } // Se bool è 'false', imposta this.cardView su false
    
    // Sottoscrivi al cambiamento dei parametri dell'URL
    this.route.params.pipe(take(1)).subscribe(params => {
      if (params['gerne']) {
        // Controlla se params['gerne'] è un numero valido prima di effettuare le operazioni
        const genreId = Number(params['gerne']);
        if (!isNaN(genreId)) {
          this.category = String(genreId + 1);
          console.log('1 ' + params['gerne']);
          this.firstLoadCategory();
        } else {
          // Se params['gerne'] non è un numero valido, gestisci il caso adeguatamente
          console.error('Il parametro "gerne" non è un numero valido:', params['gerne']);
        }
      } else if (params['keyword']) {
        this.firstLoadSearch();
      } else {
        this.loadMovies();
      }
    });
    // Sottoscrivi all'evento di cambio pagina del paginatore
    this.paginator.page.subscribe((event: PageEvent) => {
      // Aggiorna le variabili di paginazione
      this.currentPage = event.pageIndex;
      this.pageSize = event.pageSize;
      this.page = event.pageIndex + 1;
      // Carica i film
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
          this.totalItems = res.totalElements;
        });
        // Scrolla la pagina verso l'alto
        this.goTop();
      }
  
      // Se esiste il parametro 'keyword'
      if (params['keyword']) {
        sessionStorage.removeItem('currentChips')
        // Recupera la dimensione della pagina dal paginatore
        const pageSize = this.paginator.pageSize;
        // Cerca i film con paginazione
        this.movieService.searchMoviePagination(params['keyword'], this.page, pageSize || 10).subscribe(res => {
          if(res){
            this.maxPage = res.maxPageNumber;
            this.movies = res.movieList;
            this.response = res;
            this.home = false;
            this.gerne = false;
            this.search = true;
            this.totalItems = res.totalElements;
          }else{
            this.router.navigate(['searchError']);
          }
        });
        // Scrolla la pagina verso l'alto
        this.goTop();
      }
      // Altrimenti
      else if(!params['gerne'] && !params['keyword']) {
        // Recupera la dimensione della pagina dal paginatore
        const pageSize = this.paginator.pageSize;
        // Ottieni tutti i film con paginazione
        this.movieService.getAllMoviesWithPagination(this.page, 'rating', pageSize || 10).subscribe(res => {
          this.maxPage = res.maxPageNumber;
          this.movies = res.movieList;
          this.response = res;
          this.totalItems = res.totalElements;
        });
        // Scrolla la pagina verso l'alto
        this.goTop();
      }
    });
  }

  firstLoadCategory() {
    // Sottoscrive ai parametri della rotta
    this.route.params.subscribe(params => {
      
        // Assegna il valore del parametro 'gerne' alla variabile 'category'
        
        this.category = String(Number(params['gerne']+1));

        console.log('1 '+params['gerne']);
        
        // Chiama il metodo getMovieByGenre del movieService, passando la categoria e il numero di pagina 1
        this.movieService.getMovieByGenre(params['gerne'], 1).subscribe(res => {
            // Assegna il valore di 'maxPageNumber' dalla risposta alla variabile 'maxPage'
            this.maxPage = res.maxPageNumber;
            // Assegna la lista di film dalla risposta alla variabile 'movies'
            this.movies = res.movieList;
            // Assegna la risposta completa alla variabile 'response'
            this.response = res;
            // Assegna il valore di 'totalElements' dalla risposta alla variabile 'totalItems'
            this.totalItems = res.totalElements;
            // Imposta le variabili 'home', 'gerne' e 'search' per controllare la visualizzazione della pagina
            this.home = false;
            this.gerne = true;
            this.search = false;
        });
    });
}

firstLoadSearch() {
  sessionStorage.removeItem('currentChips')
  // Sottoscrive ai parametri della rotta
  this.route.params.subscribe(params => {
      // Assegna il valore del parametro 'keyword' alla variabile 'keyword'
      this.keyword = params['keyword'];
      // Imposta il valore di 'currentChipsValue' a "-1"
      // this.currentChipsValue = "-1";
      // Chiama il metodo searchMoviePagination del movieService, passando la parola chiave, il numero di pagina e il numero di risultati per pagina
      this.movieService.searchMoviePagination(params['keyword'], params['pg'], 10).subscribe(res => {
          // Controlla se la risposta esiste
          if (res) {
              // Assegna il valore di 'maxPageNumber' dalla risposta alla variabile 'maxPage'
              this.maxPage = res.maxPageNumber;
              // Assegna la lista di film dalla risposta alla variabile 'movies'
              this.movies = res.movieList;
              // Assegna la risposta completa alla variabile 'response'
              this.response = res;
              // Assegna il valore di 'totalElements' dalla risposta alla variabile 'totalItems'
              this.totalItems = res.totalElements;
              // Imposta le variabili 'home', 'gerne' e 'search' per controllare la visualizzazione della pagina
              this.home = false;
              this.gerne = false;
              this.search = true;
          } else {
              // Se la risposta non esiste, reindirizza alla pagina di errore di ricerca
              this.router.navigate(['searchError']);
          }
      });
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

  goTop(){
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }


  goHome(){
    // this.currentChipsValue = "-1"
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

  updateSmallList() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 1000) {
      this.smallList = true
    } else {
      this.smallList = false;
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
    this.updateSmallList();
}


  convertNumber(string:string):Number{
    return Number(string);
  }

  @ViewChild('moviesTable') moviesTable!: ElementRef;

  exportToCSV(){
    //TODO:da eliminare nel momento in cui i filtri vengono settati dal DB
    const filteredTable = this.createFilteredTable();
    this.exportService.exportAsExcelFile(filteredTable, 'excel');
  }

  exportToPDF(){
    const filteredTable = this.createFilteredTable();
    this.exportService.exportAsPDFFile(filteredTable, 'pdf');
  }

  createFilteredTable() : Partial<Movie>[]{
    const filteredTable: Partial<Movie>[] = this.movies.map(x => ({
      title: x.movieDto.title,
      plot: x.movieDto.plot,
      rating: x.movieDto.rating
    }));
    return filteredTable;
  }
}