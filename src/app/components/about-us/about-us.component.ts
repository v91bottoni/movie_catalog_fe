import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
  constructor(private router:ActivatedRoute){
   this.router.url.subscribe(val =>{
    let id=val[0].path;
    if(innerWidth<=1100) id += "Mobile";
    setTimeout(()=>{document.getElementById(id)?.scrollIntoView({behavior:'smooth'})},0);
   });
  }
}
