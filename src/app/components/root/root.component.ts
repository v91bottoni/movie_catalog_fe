import { Component } from '@angular/core';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent {

  title = 'movie-catalog-fe';
  drawer!:HTMLElement;
  constructor(protected util :UtilityService){}

  toggle(drawer:HTMLElement){
    this.drawer=drawer;
    if(drawer.classList.contains('hide')){
      drawer.classList.remove('hide');
      setTimeout(() => {
        document.addEventListener('click', this.close);
      }, 1);
    }else{
      drawer.classList.add('hide');
        document.removeEventListener('click', this.close);
    }
    

  }
  close = (event:MouseEvent)=>{ 
      if(!this.drawer.classList.contains('hide')){
        this.drawer.classList.add('hide'); 
        document.removeEventListener('click', this.close);
      }
    }
}
