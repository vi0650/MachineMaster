import { Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngxpert/hot-toast';
import { Router } from '@angular/router';
import { hotToastObserve } from '../../core/utils/toast-observer';
import { MachineService } from '../../core/services/machine.service';
import { Machine } from '../../core/models/machine';
import { MACHINE_COL } from '../../core/data/tabledata/machineColumns';

@Component({
  selector: 'app-machine',
  standalone: false,
  templateUrl: './machine.component.html',
  styleUrl: './machine.component.scss'
})
export class MachineComponent {

  readonly dialog = inject(MatDialog);
  private machineService = inject(MachineService);
  private toast = inject(HotToastService);
  private router = inject(Router);

  machineDataSource = new MatTableDataSource<Machine>();
  displayColumns = MACHINE_COL

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadMachine();
  }

  ngAfterViewInit(): void {
    this.machineDataSource.paginator = this.paginator;
    this.machineDataSource.sort = this.sort;

    // faster filtering
    this.machineDataSource.filterPredicate = (data, filter) =>
      data.machineId.toString().includes(filter) ||
      data.productId.toString().includes(filter);
  }

  loadMachine() {
    this.machineService.getAllMachine().subscribe(machine => {
      // direct data update - no datasource recreation
      this.machineDataSource.data = machine;
    });
  }

  applyFilter(event: any) {
    const value = event.target.value.trim().toLowerCase();
    this.machineDataSource.filter = value;
  }

  editMachine(row: Machine) {
    this.router.navigate(['machine-form', row.machineId]);
  }

  deleteMachine(row: Machine) {
    this.machineService.deleteMachine(row.machineId).pipe(
      hotToastObserve(this.toast, {
        loading: "Machine deleting...",
        success: () => `${row.machineName} Deleted!`,
        error: (err) => {
          if (err.status === 0) return "server offline!";
          if (err.status === 401) return "api misunderstood";
          return "Something Crashed! 😱";
        }
      }),
    ).subscribe(() => this.loadMachine());
  }

  addMachine() {
    this.router.navigate(['machine-form']);
  }
}