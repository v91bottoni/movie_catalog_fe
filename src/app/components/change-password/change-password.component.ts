import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute ) { }

  token!: string;
  passwordResetForm!: FormGroup;
  hidePass: boolean = true;
  hideCPass: boolean = true;

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token') || "";
    this.authService.recoverPasswordTok(this.token).subscribe( () => {
      
      this.passwordResetForm = this.formBuilder.group(
        {
          password: this.formBuilder.control('', [Validators.required, Validators.minLength(4)]),
          confirmPassword: this.formBuilder.control('', [Validators.required, Validators.minLength(4)]),
        }
      )

    },
    () => {
      setTimeout(() => this.router.navigateByUrl("/"), 2500);
      alert("Password recovery token expired");
    })
  }

  get password()  { return this.passwordResetForm.get('password') }
  get confirmPassword()  { return this.passwordResetForm.get('confirmPassword') }

  onSubmit(){
    this.authService.changePassword(this.token, this.passwordResetForm.value.password).subscribe( (res) => {
      setTimeout(() => this.router.navigateByUrl("/"), 1500);
      alert(res.user.name);
      
      alert("Password recovery successful");
      
    }, () => {
      setTimeout(() => this.router.navigateByUrl("/"), 2500);
      alert("Password recovery unsuccessful");
    })
  }
}
