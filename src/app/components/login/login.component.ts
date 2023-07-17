import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginStates } from 'src/app/enums/loginStates';
import { AuthService } from 'src/app/service/auth.service';
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

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private util:UtilityService) { }

  ngOnInit(): void {

    localStorage.clear();

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
      console.log(res);
      localStorage.setItem('refreshToken', res.refreshToken || '');
        localStorage.setItem('role', res.user.role.role || '');
        localStorage.setItem('userID', res.user.id.toString() || '');
        localStorage.setItem('userName', res.user.name || '');
        localStorage.setItem('token', res.token || '');
        this.router.navigateByUrl('/home');
        this.util.username = res.user.name;
        this.util.role = res.user.role.role;
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
