import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { DatabaseService } from 'src/app/service/database.service';
import { MovieService } from 'src/app/service/movie.service';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent{

  title = 'movie-catalog-fe';
  drawer!:HTMLElement;
  constructor(
    protected util: UtilityService
  ){}

  toggle(drawer:HTMLElement){
    this.drawer=drawer;
    if(drawer.classList.contains('hide')){
      drawer.classList.remove('hide');
      setTimeout(() => {
        document.addEventListener('click', this.close);
        document.addEventListener('scroll', this.closeScrollFun);
      }, 1);
    }else{
      drawer.classList.add('hide');
      document.removeEventListener('click', this.close);
      document.removeEventListener('scroll', this.closeScrollFun);
    }


  }
  close = ()=>{
      if(!this.drawer.classList.contains('hide')){
        this.drawer.classList.add('hide');
        document.removeEventListener('click', this.close);
        document.removeEventListener('scroll', this.closeScrollFun);
      }
    }
  closeScrollFun = ()=>{
    if(window.scrollY>400){
      if(!this.drawer.classList.contains('hide')){
        this.drawer.classList.add('hide');
        document.removeEventListener('click', this.close);
        document.removeEventListener('scroll', this.closeScrollFun);
      }
    }
  }


}
