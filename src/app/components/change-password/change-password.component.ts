import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ChangePasswordSuccessfulDialogComponent } from 'src/app/dialogs/change-password-successful-dialog/change-password-successful-dialog.component';
import { ChangePasswordUnsuccessfulDialogComponent } from 'src/app/dialogs/change-password-unsuccessful-dialog/change-password-unsuccessful-dialog.component';
import { AuthService } from 'src/app/service/auth.service';

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
    private dialog: MatDialog) { }

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
      this.openSuccessDialog('200ms', '1000ms');
      
    }, () => {
      this.openFalureDialog('200ms', '1000ms');
    })
  }

  openSuccessDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ChangePasswordSuccessfulDialogComponent, {
      width: '30%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openFalureDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ChangePasswordUnsuccessfulDialogComponent, {
      width: '30%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
