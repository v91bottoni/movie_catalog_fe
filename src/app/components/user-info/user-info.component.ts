import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserUpdateDialogComponent } from 'src/app/dialogs/user-update-dialog/user-update-dialog.component';
import { UpdateStates } from 'src/app/enums/updateStates';
import { user } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { UserService } from 'src/app/service/user.service';
import { UtilityService } from 'src/app/service/utility.service';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit{

  userForm!: FormGroup;
  user!: user;
  invalidAge: boolean = false;
  invalidInput: boolean = false;
  gridCols!: number;
  colSpan!: number;

  ngOnInit(): void {

    this.updateGridCols();

    this.userService.getUserById( Number(sessionStorage.getItem("userID")) ).subscribe(res=>{

      this.user=res;
      console.log(res);
      this.userForm = this.formBuilder.group(
        {
          name: this.formBuilder.control(this.user.name, [Validators.required, Validators.minLength(3)]),
          surname: this.formBuilder.control(this.user.surname, [Validators.required, Validators.minLength(3)]),
          cf: this.formBuilder.control(this.user.cf, [Validators.required, Validators.minLength(16),Validators.maxLength(16)]),
          email: this.formBuilder.control(this.user.email, [Validators.required, Validators.email]),
          birthdate: this.formBuilder.control(this.user.birthdate, [Validators.required]),
          role: this.formBuilder.control(this.user.role.role, [Validators.required, Validators.minLength(3)]),
        }
      )
    })



  }

  get name()      { return this.userForm.get('name')}
  get surname()   { return this.userForm.get('surname')}
  get cf()        { return this.userForm.get('cf')}
  get email()     { return this.userForm.get('email')}
  get birthdate() { return this.userForm.get('birthdate')}
  get role()      { return this.userForm.get('role')}

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserService, 
    private authService: AuthService, 
    public dialog: MatDialog,
    private router: Router, 
    private util:UtilityService,
    private alert: SnackbarService,
    private translate: TranslateService) { }

  onSubmit(){

    let userRes: user = this.user;

    userRes.name=this.userForm.value.name;
    userRes.surname=this.userForm.value.surname;
    userRes.email=this.userForm.value.email;
    userRes.birthdate=this.userForm.value.birthdate;
    userRes.role=this.user.role;

    console.log(userRes);


    this.authService.updateUser(userRes).subscribe(res=>{
      
      sessionStorage.setItem('userName', res.user.name);
      this.alert.openSuccess(this.translate.instant('message.updateSuccess'), this.translate.instant('button.ok'));


    },
    (res) => {

      if(res.error.msg == UpdateStates.invalidAge){
        this.invalidAge = true;
        this.alert.openError(this.translate.instant('message.error.invalidAge'), this.translate.instant('button.ok'));
      }
      if(res.error.msg == UpdateStates.invalidInput){
        this.invalidInput = true;
        this.alert.openError(this.translate.instant('message.error.invalidInput'), this.translate.instant('button.ok'));
      }
    }
    )

  }

  goBack(){
    this.router.navigate([this.util.backpage]);
  }

  updateGridCols() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 400) {
      this.gridCols = 1;
      this.colSpan = 1;
    } else {
      this.gridCols = 2;
      this.colSpan = 2;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateGridCols();
  }



}
