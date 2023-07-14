import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordSuccessfulDialogComponent } from 'src/app/dialogs/forgot-password-successful-dialog/forgot-password-successful-dialog.component';
import { ForgotPasswordUnsuccessfulDialogComponent } from 'src/app/dialogs/forgot-password-unsuccessful-dialog/forgot-password-unsuccessful-dialog.component';
import { SpinnerDialogComponent } from 'src/app/dialogs/spinner-dialog/spinner-dialog.component';
import { AuthService } from 'src/app/service/auth.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit{

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private alert: SnackbarService
    ) { }

  passwordResetForm!: FormGroup;

  ngOnInit(): void {
    
    this.passwordResetForm = this.formBuilder.group(
      {
        email: this.formBuilder.control('', [Validators.required, Validators.email]),
      }
    )
  }

  get email()     { return this.passwordResetForm.get('email')}

  onSubmit(){
    this.openSpinner('200ms', '1000ms');
    this.authService.recoverPassword(this.passwordResetForm.value.email).subscribe( res => {
      this.alert.openNotice("Email sent, check your inbox.", "Ok");
    }, (res) => {
      console.log(res);
      this.alert.openNotice("Double check your email.", "Ok");
    })
  }

  openSpinner(enterAnimationDuration: string, exitAnimationDuration: string): void {
    let dialogRef = this.dialog.open(SpinnerDialogComponent, {
      width: 'auto',
      height: 'auto',
      disableClose: true,
      enterAnimationDuration,
      exitAnimationDuration,
    });

    setTimeout(() => dialogRef.close(), 3000);
  }
}
