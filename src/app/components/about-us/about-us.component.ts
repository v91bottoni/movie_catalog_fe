import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/service/movie.service';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnDestroy{
  nMovie=0;
  nVisitors=0;
  nEmployees=0;
  nSubscribers=0;
  constructor(private service:MovieService, private util:UtilityService){
    this.service.getAllMovies().subscribe(res=>{
      if(res){
        this.nMovie = res.totalElements;
      }

    });

    this.util.getEventNumberByType('visitor').subscribe(res=>{
      if(res){
        console.log('Numero Visite: ',res);
        this.nVisitors=res;
      }
    });

    document.addEventListener('scroll',this.scrollFun);
  }

  scrollFun = ()=>{
    if(window.scrollY+window.innerHeight+500 > document.documentElement.scrollHeight){
      if(!document.getElementById('waContact')?.classList.contains('pop'))
      document.getElementById('waContact')?.classList.add('pop');
    }else{
      if(document.getElementById('waContact')?.classList.contains('pop'))
      document.getElementById('waContact')?.classList.remove('pop');
    }
  }

  ngOnDestroy(): void {
    document.removeEventListener('scroll',this.scrollFun);
  }
}
