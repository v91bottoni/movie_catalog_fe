import { Component, OnInit, VERSION, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
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

  categories: string[] = ["action", "animation", "comedy", "drama", "fantasy", "romance"];

  movies!: Movie[];

  currentChipsValue: String = "-1"

  hover: boolean = true;
  idHover!: string;
  chipsCategory = ['action', 'adventure', 'animation', 'comedy', 'crime', 'drama', 'documentary', 'fantasy', 'romance', 'thriller'];


  category!: string;
  title!: string;
  type!: string;


  ngOnInit(): void {
    console.log(this.movies);
        this.currentChipsValue = "-2";


  }

  constructor(
    private movieService: MovieService,
    public dialog: MatDialog, 
    private route: ActivatedRoute, 
    private router: Router, 
    private util: UtilityService, 
    private authService:AuthService) {
      
      this.util.backpage = "home";
  }

  openDialog(imdbid: string){
    this.movieService.movieid = imdbid;
    const dialogRef = this.dialog.open(MovieDetailsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  goToCategory(chips:String){

    localStorage.setItem('chipsValue', String(chips));
    this.router.navigateByUrl('/home/gerne/'+chips)
  }

  setHover(value: boolean, id:string) {
    this.hover = value;
    this.idHover = id;
  }

}
