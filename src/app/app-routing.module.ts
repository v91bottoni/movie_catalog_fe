import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
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
    path: "home/page/:pag",
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
