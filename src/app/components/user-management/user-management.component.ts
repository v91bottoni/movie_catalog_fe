import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { user } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit{

  userList!: user[];
  pageNumber: number = 1;
  maxPageNumber!: number;
  dataSource!: MatTableDataSource<user>;

  displayedColumns: string[] = ['id', 'name', 'surname', 'email', 'role', 'disabledAt'];

  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.fetchAllUsers();
  }

  fetchAllUsers(){
    this.userService.getAllUsers(this.pageNumber).subscribe( (res) =>{
      this.userList = res.userList;
      this.maxPageNumber = res.maxPageNumber;

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
    if(this.pageNumber < this.maxPageNumber){
      this.pageNumber++;
      this.fetchAllUsers();
    }
  }
  
  decrementPage(){
    if(this.pageNumber > 1){
      this.pageNumber--;
      this.fetchAllUsers();
    }
  }

  changePage(page: number){
      this.pageNumber = page;
      this.fetchAllUsers();
  }

  generatePages(){
    let indexes = [];
    for(let i = 1; i <= this.maxPageNumber; i++){
      indexes.push(i);
    }
    return indexes;
  }

  async disableUser(user: user){  
    if(user.disabledAt == null){
        this.userService.disableUser(user).subscribe( () => {
          this.fetchAllUsers();
        },
        () => {console.log("Unable to disable user");
        })
      }
    if(user.disabledAt != null){
        this.userService.disableUser(user).subscribe( () => {
          this.fetchAllUsers();
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
        },
        () => {console.log("Unable to update user");
        })
    } else this.fetchAllUsers();
  }

}
