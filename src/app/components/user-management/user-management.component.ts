import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { UserUpdateDialogComponent } from 'src/app/dialogs/user-update-dialog/user-update-dialog.component';
import { Movie } from 'src/app/models/movie';
import { user } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';
import { ExportService } from 'src/app/service/export.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
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

  constructor(
    private authService: AuthService,
    private userService: UserService, 
    private dialog: MatDialog,
    private alert: SnackbarService,
    private translate: TranslateService,
    private exportService: ExportService) {}

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
          this.alert.openSuccess(this.translate.instant('message.updateSuccess'), this.translate.instant('button.ok'));
        },
        () => {console.log("Unable to disable user");
        })
      }
    if(user.disabledAt != null){
        this.userService.disableUser(user).subscribe( () => {
          this.fetchAllUsers();
          this.alert.openSuccess(this.translate.instant('message.updateSuccess'), this.translate.instant('button.ok'));
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
          this.alert.openSuccess(this.translate.instant('message.updateSuccess'), this.translate.instant('button.ok'));
        },
        () => {this.alert.openError(this.translate.instant('message.error.error'),  this.translate.instant('button.ok'));
        })
    } else this.fetchAllUsers();
  }

  exportToCSV(){
    //TODO:da eliminare nel momento in cui i filtri vengono settati dal DB
    const filteredTable = this.createFilteredTable();
    this.exportService.exportAsExcelFile(filteredTable, 'excel');
  }

  exportToPDF(){
    const filteredTable = this.createFilteredTable();
    this.exportService.exportAsPDFFile(filteredTable, 'pdf');
  }

  createFilteredTable() : Partial<user>[]{
    const filteredTable: Partial<any>[] = this.userList.map(x => ({
      id: x.id,
      name: x.name,
      surname: x.surname,
      email: x.email,
      role: x.role.role,
      disabledAt: x.disabledAt
    }));
    return filteredTable;
  }
}
