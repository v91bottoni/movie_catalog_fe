import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HomeComponent } from './components/home/home.component';
import { UpdateMovieComponent } from './components/update-movie/update-movie.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { DrowerButtonComponent } from './components/drower-button/drower-button.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ErrorComponent } from './components/error/error.component';
import {MatRippleModule} from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UpdateMovieComponent,
    NavbarComponent,
    DrowerButtonComponent,
    SearchResultComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSidenavModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatRippleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
