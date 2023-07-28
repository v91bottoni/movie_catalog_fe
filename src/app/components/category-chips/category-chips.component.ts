import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenreDTO } from 'src/app/models/dto/genre-dto';
import { DatabaseService } from 'src/app/service/database.service';
import { GenreService } from 'src/app/service/genre.service';

@Component({
  selector: 'app-category-chips',
  templateUrl: './category-chips.component.html',
  styleUrls: ['./category-chips.component.scss']
})
export class CategoryChipsComponent implements OnInit {
  
  currentChips: GenreDTO = {idGenre : -2, genre : 'null'};
  currentChipsID: number = -1;
  chipsCategory : GenreDTO[] = this.databaseService.genres;

  constructor(
    private genreService: GenreService,
    private router: Router,
    private databaseService: DatabaseService
    ){}
  
  
  ngOnInit(): void {

    console.log(this.currentChips.genre);
    

    if (sessionStorage.getItem('currentChips')){
      this.currentChips = JSON.parse(sessionStorage.getItem('currentChips') || '' );
    }
    else {
      this.currentChips = {idGenre : -2, genre : 'null'};
    }   

      // this.chipsCategory = res;
    
  }

  goToCategory(id_chips: number, chips: string = '-1') {
    if(chips!='-1'){
      this.currentChips = {idGenre: id_chips, genre: chips};
      sessionStorage.setItem('currentChips', JSON.stringify(this.currentChips));
      this.router.navigate(['/home/gerne/' + id_chips]);
    }
    else{
      this.currentChips = {idGenre: -1, genre: 'all'};
      sessionStorage.setItem('currentChips', JSON.stringify(this.currentChips));
      this.router.navigate(['/home/all']);
    }
  }

  goTop(){
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

}
