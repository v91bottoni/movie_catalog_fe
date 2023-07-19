import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePasswordSuccessfulDialogComponent } from 'src/app/dialogs/change-password-successful-dialog/change-password-successful-dialog.component';
import { ChangePasswordUnsuccessfulDialogComponent } from 'src/app/dialogs/change-password-unsuccessful-dialog/change-password-unsuccessful-dialog.component';
import { AuthService } from 'src/app/service/auth.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit{

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router, 
    private route: ActivatedRoute,
    private alert: SnackbarService) { }

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
      this.alert.openError("Password recovery token expired", "Ok");
    })
  }

  get password()  { return this.passwordResetForm.get('password') }
  get confirmPassword()  { return this.passwordResetForm.get('confirmPassword') }

  onSubmit(){
    this.authService.changePassword(this.token, this.passwordResetForm.value.password).subscribe( (res) => {
      this.alert.openSuccess("Password changed successfully", "Ok");
      
    }, () => {
      this.alert.openError("Error changing password", "Ok");
    })
  }
}
