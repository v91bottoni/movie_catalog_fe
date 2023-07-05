import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateMovieComponent } from './components/update-movie/update-movie.component';

const routes: Routes = [
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
