import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Regex } from 'src/app/enums/regex';
import { RegisterStates } from 'src/app/enums/registerStates';
import { AuthService } from 'src/app/service/auth.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit{

  registerForm!: FormGroup;
  hidePass: boolean = true;
  hideCPass: boolean = true;
  
  emailAlreadyUsed: boolean = false;
  cfAlreadyUsed: boolean = false;
  invalidAge: boolean = false;

   constructor(
    private authService: AuthService, 
    private formBuilder: FormBuilder, 
    private router: Router,
    private alert: SnackbarService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    
    this.registerForm = this.formBuilder.group(
      {
        name: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
        surname: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
        cf: this.formBuilder.control('', [Validators.required, Validators.minLength(15), Validators.pattern(Regex.cf)]),
        email: this.formBuilder.control('', [Validators.required, Validators.email]),
        password: this.formBuilder.control('', [Validators.required, Validators.minLength(4)]),
        confirmpassword: this.formBuilder.control('', [Validators.required, Validators.minLength(4)]),
        birthdate: this.formBuilder.control('', [Validators.required]),
        role: this.formBuilder.group(
          {
            id: this.formBuilder.control(2, [Validators.required])
          }
        )
      }
    )
  }

  get name()              { return this.registerForm.get('name') }
  get surname()           { return this.registerForm.get('surname') }
  get cf()                { return this.registerForm.get('cf') }
  get email()             { return this.registerForm.get('email') }
  get password()          { return this.registerForm.get('password') }
  get confirmpassword()   { return this.registerForm.get('confirmpassword') }
  get birthdate()         { return this.registerForm.get('birthdate') }

  onSubmit(){
    this.invalidAge = false;
    this.cfAlreadyUsed = false;
    this.emailAlreadyUsed = false;
    
    this.authService.registerUser(this.registerForm.value).subscribe( res => {
      
      if(res != null){
        setTimeout(() => this.router.navigateByUrl('/login'), 2500);
        this.alert.openSuccess(this.translate.instant('message.registrationSuccess'), this.translate.instant('button.ok'));
      }
    }, 
    (res) => {
      if(res.error.msg == RegisterStates.invalidAge){
        this.invalidAge = true;
      }
      if(res.error.msg == RegisterStates.emailAlreadyUsed){
        this.emailAlreadyUsed = true;
      }
      if(res.error.msg == RegisterStates.cfAlreadyUsed){
        this.cfAlreadyUsed = true;
      }
    }
    );
  }
}
