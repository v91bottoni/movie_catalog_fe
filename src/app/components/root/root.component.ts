import { Component } from '@angular/core';
import { Scroll } from '@angular/router';
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
      this.util.drawerOpen=true;
      setTimeout(() => {
        document.addEventListener('click', this.close);
        document.addEventListener('scroll', this.closeScrollFun);
      }, 1);
    }else{
      drawer.classList.add('hide');
      this.util.drawerOpen=false;
      document.removeEventListener('click', this.close);
      document.removeEventListener('scroll', this.closeScrollFun);
    }


  }
  close = (event:MouseEvent)=>{
      if(!this.drawer.classList.contains('hide')){
        this.drawer.classList.add('hide');
        this.util.drawerOpen=false;
        document.removeEventListener('click', this.close);
        document.removeEventListener('scroll', this.closeScrollFun);
      }
    }
  closeScrollFun = ()=>{
    if(window.scrollY>400){
      if(!this.drawer.classList.contains('hide')){
        this.drawer.classList.add('hide');
        this.util.drawerOpen = false;
        document.removeEventListener('click', this.close);
        document.removeEventListener('scroll', this.closeScrollFun);
      }
    }
  }
}
