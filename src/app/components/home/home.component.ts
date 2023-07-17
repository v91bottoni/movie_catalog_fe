import { Component, OnInit, VERSION, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { response } from 'src/app/models/response';
import { MovieService } from 'src/app/service/movie.service';
import { UtilityService } from 'src/app/service/utility.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { SliderComponent } from '../slider/slider.component';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categories: string[] = ["Action", "Animation", "Comedy", "Drama", "Fantasy", "Romance"];

  movies!: Movie[];

  currentChipsValue: String = "-1"

  hover: boolean = true;
  idHover!: string;

  chipsCategory: String[] = this.movieService.categories;

  category!: string;
  title!: string;
  type!: string;


  ngOnInit(): void {
        this.currentChipsValue = "-2";


  }

  constructor(private movieService: MovieService,public dialog: MatDialog, private route: ActivatedRoute, private router: Router, private util:UtilityService, private authService:AuthService) {
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
    this.router.navigateByUrl('/home/gerne/'+chips+'/1')
  }

  setHover(value: boolean, id:string) {
    this.hover = value;
    this.idHover = id;
  }

}
