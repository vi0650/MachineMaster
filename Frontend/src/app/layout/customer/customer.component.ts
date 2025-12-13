import { Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngxpert/hot-toast';
import { Router } from '@angular/router';
import { hotToastObserve } from '../../core/utils/toast-observer';
import { Customer } from '../../core/models/customer';
import { CustomerService } from '../../core/services/customer.service';
import { CUSTOMER_COL } from '../../core/data/tabledata/customerColumns';


@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
})

export class CustomerComponent {

  readonly dialog = inject(MatDialog);
  private toast = inject(HotToastService);
  private router = inject(Router);
  private customerService = inject(CustomerService);

  dataSource = new MatTableDataSource<Customer>();
  displayColumns: string[] = CUSTOMER_COL;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadCustomers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (data, filter) =>
      data.customerName.toLowerCase().includes(filter) ||
      data.customerId.toString().includes(filter) ||
      data.mobileNo.toString().includes(filter)
  }

  loadCustomers() {
    this.customerService.getAllCustomers().subscribe(customers => {
      this.dataSource.data = customers;
    });
  }

  applyFilter(event: any) {
    const value = event.target.value.trim().toLowerCase();
    this.dataSource.filter = value;
  }

  editCustomer(row: Customer) {
    this.router.navigate(['customer-form', row.customerId])
  }

  deleteCustomer(row: Customer) {
    this.customerService.deleteCustomer(row.customerId).pipe(
      hotToastObserve(this.toast, {
        loading: "user deleting...",
        success: () => `${row.customerName} Deleted!`,
        error: (err) => {
          if (err.status === 0) return "server offline!";
          if (err.status === 401) return "api misunderstood";
          return "Something Crashed! 😱";
        }
      }),
    ).subscribe(() => this.loadCustomers())
  }

  addCustomer(){
    this.router.navigate(['customer-form']);
  }
}