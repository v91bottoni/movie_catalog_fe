import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenreDTO } from 'src/app/models/dto/genre-dto';
import { GenreService } from 'src/app/service/genre.service';

@Component({
  selector: 'app-category-chips',
  templateUrl: './category-chips.component.html',
  styleUrls: ['./category-chips.component.scss']
})
export class CategoryChipsComponent implements OnInit {
  
  currentChipsValue: number = Number(sessionStorage.getItem('currentChipsValue')) || -1;
  chipsCategory! : GenreDTO[];

  constructor(
    private genreService: GenreService,
    private router: Router,
    ){}
  
  
  ngOnInit(): void {

    if (sessionStorage.getItem('currentChipsValue')) 
      this.currentChipsValue = Number(sessionStorage.getItem('currentChipsValue'));
    else 
      this.currentChipsValue = -1;
      
    console.log('Chips Value '+this.currentChipsValue);
    console.log('Type currentChipsValue: '+ typeof this.currentChipsValue);
    
    

    this.genreService.getAllGenre().subscribe(res =>{
      this.chipsCategory = res;
    });

    // this.currentChipsValue = Number(sessionStorage.getItem('currentChipsValue'));
    // console.log('Chips value: '+ this.currentChipsValue);
    
  }

  goToCategory(chips: number) {
    this.currentChipsValue = chips;
    sessionStorage.setItem('currentChipsValue', String(this.currentChipsValue))

    if(chips!=-1){
      this.router.navigate(['/home/gerne/' + chips]);
    }
    else{
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
