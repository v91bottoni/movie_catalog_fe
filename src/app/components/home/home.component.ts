import { Component, OnInit, VERSION, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/service/movie.service';
import { UtilityService } from 'src/app/service/utility.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { AuthService } from 'src/app/service/auth.service';
import { MovieDetailsDTO } from 'src/app/models/dto/movie-details-dto';
import { GenreDTO } from 'src/app/models/dto/genre-dto';
import { GenreService } from 'src/app/service/genre.service';
import { DatabaseService } from 'src/app/service/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categories!: GenreDTO[]; /*= [{idGenre: 1, genre: 'Action'}, {idGenre: 4, genre: 'Animation'},
                            {idGenre: 7, genre: 'Comedy'}, {idGenre: 3, genre: 'Drama'},
                            {idGenre: 6, genre: 'Fantasy'}, {idGenre: 14, genre: 'Romance'},];*/

  movies!: MovieDetailsDTO[];

  hover: boolean = true;
  idHover!: string;

  category!: number;
  title!: string;
  type!: string;


  ngOnInit(): void {

    sessionStorage.removeItem('currentChips')

    this.categories= this.databaseService.genres.filter(o=> o.idGenre==1 || o.idGenre==4 || o.idGenre==7 || 
                                                            o.idGenre==3 || o.idGenre==6 || o.idGenre==14);

  }

  constructor(
    private movieService: MovieService,
    public dialog: MatDialog, 
    private router: Router, 
    private util: UtilityService, 
    private databaseService: DatabaseService) {
      
      this.util.backpage = "home";
  }

  openDialog(imdatabaseServiceid: string){
    this.movieService.movieid = imdatabaseServiceid;
    const dialogRef = this.dialog.open(MovieDetailsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  goToCategory(chips:number){

    localStorage.setItem('chipsValue', String(chips));
    this.router.navigateByUrl('/home/gerne/'+chips)
  }

  setHover(value: boolean, id:string) {
    this.hover = value;
    this.idHover = id;
  }

}
