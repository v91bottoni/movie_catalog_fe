import { Component } from '@angular/core';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent {

  title = 'movie-catalog-fe';
  constructor(protected util :UtilityService){}

  toggle(drawer:HTMLElement){
    if(drawer.classList.contains('hide')){
      drawer.classList.remove('hide');
    }else{
      drawer.classList.add('hide');
    }

  }
}
