import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UpdateMovieComponent } from './components/update-movie/update-movie.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { RoleGuardService } from './service/role-guard.service';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { InsertMovieComponent } from './components/insert-movie/insert-movie.component';
import { RootComponent } from './components/root/root.component';
import { CardsDisplayComponent } from './components/cards-display/cards-display.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

const routes: Routes = [

  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent
  },
  {
    path: 'forgot-password/:token',
    component: ChangePasswordComponent
  },
  {
    path:'',
    component: RootComponent,
    canActivate: [RoleGuardService],
    data:{
        expectedRoles: ['super_admin', 'admin', 'public']
      },
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: "home/all",
        component: CardsDisplayComponent
      },
      {
        path: "home/gerne/:gerne",
        component: CardsDisplayComponent
      },
      {
        path: 'home/search/:keyword',
        component: CardsDisplayComponent,
      },
      {
        path: 'userInfo',
        component: UserInfoComponent
      },
      {
        path: 'updateMovie/:idMovie',
        component: UpdateMovieComponent,
        canActivate: [RoleGuardService],
        data:{
            expectedRoles: ['super_admin', 'admin']
        }
      },
      {
        path: 'insertMovie',
        component:InsertMovieComponent,
        canActivate: [RoleGuardService],
        data:{
            expectedRoles: ['super_admin', 'admin']
        }
      },

      {
        path: 'management',
        component: UserManagementComponent,
        canActivate: [RoleGuardService],
        data:{
            expectedRoles: ['super_admin']
        }
      },
      {
        path: 'errorPage',
        component: ErrorComponent
      },
      {
        path: 'noContent',
        component: ErrorComponent
      },
      {
        path: 'searchError',
        component: ErrorComponent
      },
      {
        path: 'about_us',
        component: AboutUsComponent
      },
      {
        path: 'factory',
        component: AboutUsComponent
      },
      {
        path: 'contacts',
        component: AboutUsComponent
      },
      {
        path: 'values',
        component: AboutUsComponent
      },
      {
        path: '**',
        component: HomeComponent
      }
    ]
  },

];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
