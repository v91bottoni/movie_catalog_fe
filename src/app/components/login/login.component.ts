import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { timeout } from 'rxjs';
import { LoginStates } from 'src/app/enums/loginStates';
import { AuthService } from 'src/app/service/auth.service';
import { DatabaseService } from 'src/app/service/database.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  hidePass: boolean = true;

  constructor(
    private authService: AuthService, 
    private formBuilder: FormBuilder, 
    private router: Router, 
    private util: UtilityService,
    private alert: SnackbarService,
    private translate: TranslateService,
    private dbService: DatabaseService) {}
    
  ngOnInit(): void {

    if(this.authService.isLogged()){
      this.router.navigateByUrl('/home');
      setTimeout(() => {
        this.alert.openError(this.translate.instant("message.error.alreadyLogged"), this.translate.instant("button.ok"));
      }, 1);
    }

    this.loginForm = this.formBuilder.group(
      {
        email: this.formBuilder.control('', [Validators.required, Validators.email]),
        password: this.formBuilder.control('', [Validators.required, Validators.minLength(4)]),
      }
    )
  }

  get email()     { return this.loginForm.get('email')}
  get password()  { return this.loginForm.get('password')}

  onSubmit(){
    this.authService.login(this.loginForm.value).subscribe(res => {
        //logged successfully

        sessionStorage.setItem('refreshToken', res.refreshToken || '');
        sessionStorage.setItem('role', res.user.role.role || '');
        sessionStorage.setItem('userID', res.user.id.toString() || '');
        sessionStorage.setItem('userName', res.user.name || '');
        sessionStorage.setItem('token', res.token || '');
        this.util.username = res.user.name;
        this.util.role = res.user.role.role;
        
        this.dbService.loadTypologicals().then( () => {
          this.router.navigateByUrl('/home');
          this.alert.openSuccess(this.translate.instant("message.loginSuccess"), this.translate.instant("button.ok"));
        }).catch( (err) =>{
          console.log(err);
        })
        
      },
      (res) => {
        if(res.error.msg == LoginStates.badCredentials){
          this.alert.openError(this.translate.instant('message.error.emailPasswordNotRecognized'), this.translate.instant("button.ok"));
        }
        if(res.error.msg == LoginStates.userDisabled){
          this.alert.openError(this.translate.instant('message.error.userDisabled'), this.translate.instant("button.ok"));
        }
      }
    );
  }
}
