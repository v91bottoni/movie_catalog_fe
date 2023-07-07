import { NgModule } from '@angular/core';
import { RouterModule, Routes, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UpdateMovieComponent } from './components/update-movie/update-movie.component';
import { SearchResultComponent} from './components/search-result/search-result.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "home",
    component: HomeComponent
  },
  /* PATH TEMPORANEA => TESTING COMPONENT*/  {path: 'updateMovie',     component: UpdateMovieComponent},
{
  path: 'updateMovie/:idMovie',
  component: UpdateMovieComponent,
  /*canActivate: [],
  data:{
      expectedRoles: ['super_admin', 'admin']
  },*/
},
{path: 'search', component: SearchResultComponent},
{path: 'errorPage', component: ErrorComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
