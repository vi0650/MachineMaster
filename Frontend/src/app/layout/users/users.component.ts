import { Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../core/models/user';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from '../../core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngxpert/hot-toast';
import { Router } from '@angular/router';
import { hotToastObserve } from '../../core/utils/toast-observer';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {

  readonly dialog = inject(MatDialog);
  dataSource = new MatTableDataSource<User>();
  displayColumns: string[] = [
    'userId',
    'userName',
    'password',
    'role',
    'email',
    'description',
    'isActive',
    'createdDate',
    'updatedDate',
    'actions'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private toast: HotToastService, private router: Router) {
    console.log('users list');
    
   }

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort=this.sort
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.dataSource.data = users;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: any) {
    const filterValue = event.target.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  editUser(row:User){
    this.router.navigate(['/users-form',row.userId]);
  }

  deleteUser(row: User) {
    this.userService.deleteUser(row.userId).pipe(
      hotToastObserve(this.toast, {
        loading: "user deleting...",
        success: () => `${row.userName} Deleted!`,
        error: (err) => {
          if (err.status === 0) return "server offline!";
          if (err.status === 401) return "api misunderstood"
          return "Something Crashed! 😱";
        }
      }),
    ).subscribe({
      next: (res: any) => {
        // this.router.navigate([this.router.url], { onSameUrlNavigation: 'reload' });
        this.loadUsers();
      }
    })
  }

  addUser() {
    this.router.navigate(['users-form']);
  }
}