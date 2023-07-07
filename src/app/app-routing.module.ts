import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UpdateMovieComponent } from './components/update-movie/update-movie.component';
import { SearchResultComponent} from './components/search-result/search-result.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "*",
    component: HomeComponent
  },
  {
    path: "home",
    component: HomeComponent,
    // children: [
    //   {
    //       path: 'page/:pag',
    //       component: HomeComponent
    //   }
    // ]
  },
  {
    path: "home/page/:pag",  /*PATH TEMPORANEO, NON VANNO I PARAMS CON I CHILDREN DI HOME*/
    component: HomeComponent
  },
  {
    path: "userInfo",
    component: UserInfoComponent
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
{ path: 'movies/:id', component: MovieDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
