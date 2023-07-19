import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoginStates } from 'src/app/enums/loginStates';
import { AuthService } from 'src/app/service/auth.service';
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

  badCredentials: boolean = false;
  userDisabled: boolean = false;

  constructor(
    private authService: AuthService, 
    private formBuilder: FormBuilder, 
    private router: Router, 
    private util: UtilityService,
    private alert: SnackbarService,
    private translate: TranslateService) {}
    
  ngOnInit(): void {

    sessionStorage.clear();

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
    this.badCredentials = false;
    this.userDisabled = false;
    this.authService.login(this.loginForm.value).subscribe(res => {
        //logged successfully

        sessionStorage.setItem('refreshToken', res.refreshToken || '');
        sessionStorage.setItem('role', res.user.role.role || '');
        sessionStorage.setItem('userID', res.user.id.toString() || '');
        sessionStorage.setItem('userName', res.user.name || '');
        sessionStorage.setItem('token', res.token || '');
        this.router.navigateByUrl('/home');
        this.util.username = res.user.name;
        this.util.role = res.user.role.role;

        this.alert.openSuccess(this.translate.instant("message.loginSuccess"), this.translate.instant("button.ok"));
      },
      (res) => {
        if(res.error.msg == LoginStates.badCredentials){
          this.badCredentials = true;
        }
        if(res.error.msg == LoginStates.userDisabled){
          this.userDisabled = true;
        }
      }
    );
  }
}
