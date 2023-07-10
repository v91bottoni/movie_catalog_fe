import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerDialogComponent } from 'src/app/dialogs/spinner-dialog/spinner-dialog.component';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private dialog: MatDialog) { }

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
    this.openDialog('200ms', '500ms');
    this.authService.recoverPassword(this.passwordResetForm.value.email).subscribe( res => {
      setTimeout(() => window.location.reload(), 2500);
      alert("Email recovery successful");
    }, (res) => {
      console.log(res);
      setTimeout(() => window.location.reload(), 2500);
      alert("Email recovery unsuccessful");
    })
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(SpinnerDialogComponent, {
      width: 'auto',
      height: 'auto',
      disableClose: true,
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
