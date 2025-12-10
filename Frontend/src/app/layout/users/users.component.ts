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
import { USER_COL } from '../../core/data/tabledata/userColumns';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  standalone: false,
  styleUrl: './users.component.scss',
})
export class UsersComponent {

  readonly dialog = inject(MatDialog);
  private userService = inject(UserService);
  private toast = inject(HotToastService);
  private router = inject(Router);

  dataSource = new MatTableDataSource<User>();
  displayColumns = USER_COL;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // faster filtering
    this.dataSource.filterPredicate = (data, filter) =>
      data.userName.toLowerCase().includes(filter) ||
      data.userId.toString().includes(filter) ||
      data.role.toString().includes(filter)
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(users => {
      // direct data update - no datasource recreation
      this.dataSource.data = users;
    });
  }

  applyFilter(event: any) {
    const value = event.target.value.trim().toLowerCase();
    this.dataSource.filter = value;
  }

  editUser(row: User) {
    this.router.navigate(['/users-form', row.userId]);
  }

  deleteUser(row: User) {
    this.userService.deleteUser(row.userId).pipe(
      hotToastObserve(this.toast, {
        loading: "user deleting...",
        success: () => `${row.userName} Deleted!`,
        error: (err) => {
          if (err.status === 0) return "server offline!";
          if (err.status === 401) return "api misunderstood";
          return "Something Crashed! 😱";
        }
      }),
    ).subscribe(() => this.loadUsers());
  }

  addUser() {
    this.router.navigate(['/users-form']);
  }
}
