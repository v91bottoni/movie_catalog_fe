import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserUpdateDialogComponent } from 'src/app/dialogs/user-update-dialog/user-update-dialog.component';
import { user } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit{

  userList!: user[];
  page: number = 1;
  maxPage!: number;
  dataSource!: MatTableDataSource<user>;

  displayedColumns: string[] = ['id', 'name', 'surname', 'email', 'role', 'disabledAt'];

  constructor(private authService: AuthService, private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchAllUsers();
  }

  fetchAllUsers(){
    this.userService.getAllUsers(this.page).subscribe( (res) =>{
      this.userList = res.userList;
      this.maxPage = res.maxPageNumber;

      this.dataSource = new MatTableDataSource(this.userList);
    },
    () => {console.log("Unable to fetch users");
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  incrementPage(){
    if(this.page < this.maxPage){
      this.page++;
      this.fetchAllUsers();
    }
  }
  
  decrementPage(){
    if(this.page > 1){
      this.page--;
      this.fetchAllUsers();
    }
  }

  changePage(page: number){
      this.page = page;
      this.fetchAllUsers();
  }

  generatePages(){
    let indexes = [];
    for(let i = 1; i <= this.maxPage; i++){
      indexes.push(i);
    }
    return indexes;
  }

  async disableUser(user: user){  
    if(user.disabledAt == null){
        this.userService.disableUser(user).subscribe( () => {
          this.fetchAllUsers();
          this.openDialog('200ms', '1000ms');
        },
        () => {console.log("Unable to disable user");
        })
      }
    if(user.disabledAt != null){
        this.userService.disableUser(user).subscribe( () => {
          this.fetchAllUsers();
          this.openDialog('200ms', '1000ms');
        },
        () => {console.log("Unable to enable user");
        })
    }
  }

  async changeRole(user: user, role: number){

    if(user.role.id != role){
        user.role.id = role;
        this.authService.updateUser(user).subscribe ( () =>{
          this.fetchAllUsers();
          this.openDialog('200ms', '1000ms');
        },
        () => {console.log("Unable to update user");
        })
    } else this.fetchAllUsers();
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(UserUpdateDialogComponent, {
      width: '30%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}
