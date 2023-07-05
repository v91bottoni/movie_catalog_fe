import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UpdateMovieComponent } from './components/update-movie/update-movie.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: 'updateMovie',
    component: UpdateMovieComponent,
    /*canActivate: [],
    data:{
        expectedRoles: ['super_admin', 'admin']
    },*/
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
