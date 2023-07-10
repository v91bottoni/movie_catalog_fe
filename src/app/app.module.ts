import { NgModule, importProvidersFrom } from '@angular/core';
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
import { LoginComponent } from './components/login/login.component'
import { HomeComponent } from './components/home/home.component';
import { UpdateMovieComponent } from './components/update-movie/update-movie.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ErrorComponent } from './components/error/error.component';
import { DrowerButtonComponent } from './components/drower-button/drower-button.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import {MatGridListModule} from '@angular/material/grid-list'
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ROUTES, provideRouter } from '@angular/router';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { RegisterComponent } from './components/register/register.component';
import { UserUpdateDialogComponent } from './dialogs/user-update-dialog/user-update-dialog.component';
import { MatDialogModule} from '@angular/material/dialog';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SpinnerDialogComponent } from './dialogs/spinner-dialog/spinner-dialog.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgotPasswordSuccessfulDialogComponent } from './dialogs/forgot-password-successful-dialog/forgot-password-successful-dialog.component';
import { ForgotPasswordUnsuccessfulDialogComponent } from './dialogs/forgot-password-unsuccessful-dialog/forgot-password-unsuccessful-dialog.component';
import { ChangePasswordSuccessfulDialogComponent } from './dialogs/change-password-successful-dialog/change-password-successful-dialog.component';
import { ChangePasswordUnsuccessfulDialogComponent } from './dialogs/change-password-unsuccessful-dialog/change-password-unsuccessful-dialog.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UpdateMovieComponent,
    NavbarComponent,
    DrowerButtonComponent,
    SearchResultComponent,
    ErrorComponent,
    UserInfoComponent,
    MovieDetailsComponent,
    RegisterComponent,
    UserUpdateDialogComponent,
    ForgotPasswordComponent,
    SpinnerDialogComponent,
    ChangePasswordComponent,
    ForgotPasswordSuccessfulDialogComponent,
    ForgotPasswordUnsuccessfulDialogComponent,
    ChangePasswordSuccessfulDialogComponent,
    ChangePasswordUnsuccessfulDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    MatInputModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatRippleModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatAutocompleteModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatGridListModule,
    MatPaginatorModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatMenuModule,
    MatExpansionModule,
  ],
  providers: [
    importProvidersFrom(HttpClientModule),
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true
    },
    MatNativeDateModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
