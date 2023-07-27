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
  chipsCategory = ['action', 'adventure', 'animation', 'comedy', 'crime', 'drama', 'documentary', 'fantasy', 'romance', 'thriller'];
  smallList: boolean = false;

  constructor(
    private movieService: MovieService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private util: UtilityService,
    private exportService: ExportService
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
    
    // Se esiste un valore nella sessionStorage con chiave "chipsValue", assegna il valore a this.currentChipsValue
    if (sessionStorage.getItem("chipsValue")) { this.currentChipsValue = sessionStorage.getItem("chipsValue") as string; }

    // Sottoscrivi al cambiamento dei parametri dell'URL
    this.route.params.subscribe(params => {
        // Se il parametro 'gerne' è presente, chiama il metodo firstLoadCategory()
        if (params['gerne']) { 
            this.firstLoadCategory(); 
        } 
        // Se il parametro 'keyword' è presente, chiama il metodo firstLoadSearch()
        else if (params['keyword']) { 
            this.firstLoadSearch(); 
        } 
        // Altrimenti, imposta la variabile currentChipsValue su "-1" e chiama il metodo loadMovies()
        else { 
            this.currentChipsValue = "-1"; 
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
        this.movieService.getAllMoviesWithPagination(this.page, 'imdbrating', pageSize || 10).subscribe(res => {
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
        this.category = params['gerne'];
        // Controlla se il valore corrente di 'currentChipsValue' è diverso dalla categoria corrente
        // Se è diverso, aggiorna 'currentChipsValue' con il valore della categoria
        if (this.currentChipsValue != this.category) {
            this.currentChipsValue = this.category;
        }
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
  // Sottoscrive ai parametri della rotta
  this.route.params.subscribe(params => {
      // Assegna il valore del parametro 'keyword' alla variabile 'keyword'
      this.keyword = params['keyword'];
      // Imposta il valore di 'currentChipsValue' a "-1"
      this.currentChipsValue = "-1";
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
      title: x.title,
      plot: x.plot,
      writer: x.writer,
      rating: x.imdbrating
    }));
    return filteredTable;
  }
}