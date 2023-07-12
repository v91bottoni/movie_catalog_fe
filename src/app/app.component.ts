import { Component } from '@angular/core';
import { UtilityService } from './service/utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movie-catalog-fe';
  drawer!:HTMLElement;
  constructor(protected util :UtilityService){}

  toggle(drawer:HTMLElement){
    this.drawer=drawer;
    if(drawer.classList.contains('hide')){
      drawer.classList.remove('hide');
      document.addEventListener('click', this.close);
    }else{
      drawer.classList.add('hide');
      document.removeEventListener('click', this.close);
    }
    

  }
  close = ()=>{ this.drawer.classList.add('hide'); };
}
