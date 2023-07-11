import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movie-catalog-fe';

  toggle(drawer:HTMLElement){
    if(drawer.classList.contains('hide')){
      drawer.classList.remove('hide');
    }else{
      drawer.classList.add('hide');
    }

  }
}
