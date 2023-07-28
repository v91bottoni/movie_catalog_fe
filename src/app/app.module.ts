import { APP_INITIALIZER, NgModule, importProvidersFrom } from '@angular/core';
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
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { MAT_DATE_LOCALE, MatNativeDateModule, MatRippleModule } from '@angular/material/core';
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
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import { UserManagementComponent } from './components/user-management/user-management.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import {MatSnackBarModule, matSnackBarAnimations} from '@angular/material/snack-bar';
import { InsertMovieComponent } from './components/insert-movie/insert-movie.component';
import { InsertMovieDialogComponent } from './dialogs/insert-movie-dialog/insert-movie-dialog.component';
import {MatChipsModule} from '@angular/material/chips';
import { RootComponent } from './components/root/root.component';
import { UpdateMovieSuccessfullDialogComponent } from './dialogs/update-movie-successfull-dialog/update-movie-successfull-dialog.component';
import { CardsDisplayComponent } from './components/cards-display/cards-display.component';
import { SliderComponent } from './components/slider/slider.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import {MatStepperModule} from '@angular/material/stepper';
import { ExpiredialogComponent } from './dialogs/expiredialog/expiredialog.component';
import { FooterComponent } from './components/footer/footer.component';
import {MatListModule} from '@angular/material/list';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { LanguagePickerComponent } from './components/language-picker/language-picker.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MapDialogComponent } from './dialogs/map-dialog/map-dialog.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { MultiSelectButtonComponent } from './components/multi-select-button/multi-select-button.component';
import { MultiSelectDialogComponent } from './dialogs/multi-select-dialog/multi-select-dialog.component';
import { CategoryChipsComponent } from './components/category-chips/category-chips.component';
import { DatabaseService } from './service/database.service';
import { AuthService } from './service/auth.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UpdateMovieComponent,
    NavbarComponent,
    DrowerButtonComponent,
    ErrorComponent,
    UserInfoComponent,
    MovieDetailsComponent,
    RegisterComponent,
    UserUpdateDialogComponent,
    ForgotPasswordComponent,
    SpinnerDialogComponent,
    ChangePasswordComponent,
    UserManagementComponent,
    InsertMovieComponent,
    InsertMovieDialogComponent,
    RootComponent,
    UpdateMovieSuccessfullDialogComponent,
    ExpiredialogComponent,
    CardsDisplayComponent,
    SliderComponent,
    MovieCardComponent,
    FooterComponent,
    LanguagePickerComponent,
    SearchBarComponent,
    MapDialogComponent,
    SpinnerComponent,
    AboutUsComponent,
    MultiSelectButtonComponent,
    MultiSelectDialogComponent,
    CategoryChipsComponent,
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
    MatCheckboxModule,
    MatSortModule,
    MatStepperModule,
    MatChipsModule,
    MatStepperModule,
    MatSnackBarModule,
    MatListModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    }),
    ShareButtonsModule.withConfig({
      debug:true
    }),
    ShareIconsModule,
  ],
  providers: [
    importProvidersFrom(HttpClientModule),
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeDB,
      deps: [DatabaseService, AuthService],
      multi: true
    },
    MatNativeDateModule,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

export function initializeDB(dbService: DatabaseService, authService: AuthService): () => Promise<void> {
  return () =>
    new Promise((resolve) =>{
      if(authService.isLogged()){
        dbService.loadTypologicals().then( () => {
          console.log(dbService.actors);
          
          resolve();
        });
      }else{
        resolve();
      }
    })
}
