import { Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngxpert/hot-toast';
import { Router } from '@angular/router';
import { hotToastObserve } from '../../core/utils/toast-observer';
import { MachineStatusInfoService } from '../../core/services/machine-status-info.service';
import { MachineStatusInfo } from '../../core/models/machine-status-info';
import { MACHINE_STATUS_INFO_COL } from '../../core/data/tabledata/machine_status_infoColumns';

@Component({
  selector: 'app-machine-status-info',
  standalone: false,
  templateUrl: './machine-status-info.component.html',
  styleUrl: './machine-status-info.component.scss'
})
export class MachineStatusInfoComponent {

  readonly dialog = inject(MatDialog);
  private machineStatusService = inject(MachineStatusInfoService);
  private toast = inject(HotToastService);
  private router = inject(Router);

  machineStatusDataSource = new MatTableDataSource<MachineStatusInfo>();
  displayColumns = MACHINE_STATUS_INFO_COL

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadMachineStatus();
  }

  ngAfterViewInit(): void {
    this.machineStatusDataSource.paginator = this.paginator;
    this.machineStatusDataSource.sort = this.sort;

    // faster filtering
    this.machineStatusDataSource.filterPredicate = (data, filter) =>
      data.id.toString().includes(filter) ||
      data.machineId.toString().includes(filter);
  }

  loadMachineStatus() {
    this.machineStatusService.getAllMachineStatus().subscribe(machineStatus => {
      // direct data update - no datasource recreation
      this.machineStatusDataSource.data = machineStatus;
    });
  }

  applyFilter(event: any) {
    const value = event.target.value.trim().toLowerCase();
    this.machineStatusDataSource.filter = value;
  }

  editMachineStatus(row: MachineStatusInfo) {
    this.router.navigate(['machine_status_info-form', row.id]);
  }

  deleteMachineStatus(row: MachineStatusInfo) {
    this.machineStatusService.deleteMachineStatus(row.id).pipe(
      hotToastObserve(this.toast, {
        loading: "Machine deleting...",
        success: () => `${row.id} Deleted!`,
        error: (err) => {
          if (err.status === 0) return "server offline!";
          if (err.status === 401) return "api misunderstood";
          return "Something Crashed! 😱";
        }
      }),
    ).subscribe(() => this.loadMachineStatus());
  }

  addMachineStatus() {
    this.router.navigate(['machine_status_info-form']);
  }
}
