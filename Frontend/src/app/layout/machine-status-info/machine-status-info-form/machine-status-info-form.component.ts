import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { NgUIModule } from '../../../shared/ng-ui.module';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngxpert/hot-toast';
import { hotToastObserve } from '../../../core/utils/toast-observer';
import { ActivatedRoute, Router } from '@angular/router';
import { MachineStatusInfo } from '../../../core/models/machine-status-info';
import { MachineStatusInfoService } from '../../../core/services/machine-status-info.service';
import { pId } from '../../../core/data/productId';

@Component({
  selector: 'app-machine-status-info-form',
  standalone: false,
  templateUrl: './machine-status-info-form.component.html',
  styleUrl: './machine-status-info-form.component.scss'
})
export class MachineStatusInfoFormComponent {

  readonly dialog = inject(MatDialog);
  private machine_status_Service = inject(MachineStatusInfoService);
  machine_status: MachineStatusInfo[] = [];
  existingIds: number[] = [];
  machine_statusForm: FormGroup;
  machine_statusId!: number;
  isUpdate = false;
  pId = pId;

  private buildForm(): FormGroup {
    return this.fb.group({
      id: [''],
      machineId: ['', Validators.pattern('^[0-9]+$')],
      customerId: ['',Validators.pattern('^[0-9]+$')],
      isOnline: [true],
      isActive: [true],
      description: [''],
      createdDate: [new Date()],
      updatedDate: [new Date()],
      ipAddress: [''],
      location: [''],
      machineCode: [''],
    });
  }

  protected generateId() {
    const newId = this.machine_status_Service.newMachineStatusId(this.existingIds);
    this.machine_statusForm.patchValue({
      id: newId
    });
  }

  private createMachineStatus(machine_status: MachineStatusInfo) {
    this.machine_status_Service.addMachineStatus(machine_status).pipe(
      hotToastObserve(this.toast, {
        loading: "Just a Second....",
        success: (res: any) => `${res.id} Successfully Saved!`,
        error: err => {
          if (err.status === 0) return "Server Sleeping!";
          if (err.status === 401) return "Invalid Data!";
          return "Something Crashed!";
        }
      }),
    ).subscribe(() => {
      this.existingIds.push(machine_status.id);
      this.machine_statusForm.reset();
      this.generateId();
      this.router.navigate(['machine_status_info'])
    })
  }

  private editMachineStatus(machine_status: MachineStatusInfo) {
    this.machine_status_Service.updateMachineStatus(this.machine_statusId, machine_status).pipe(
      hotToastObserve(this.toast, {
        loading: "Updating data....",
        success: () => `data Updated successfully`,
        error: err => {
          if (err.status === 0) return "Server Sleeping!";
          if (err.status === 401) return "Invalid Data!";
          return "Something Crashed!";
        }
      }),
    ).subscribe(() => {
      this.router.navigate(['machine_status_info']);
    })
  }

  private loadMachineStatusData(id: number) {
    this.machine_status_Service.getMachineStatusById(id).subscribe((machine_status => {
      this.machine_statusForm.patchValue(machine_status);
    }))
  }

  // private fixDate(date: any) {
  //   const d = new Date(date);
  //   d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  //   return d.toISOString().split('T')[0];
  // }

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private toast: HotToastService, private router: Router) {
    this.machine_statusForm = this.buildForm()
  }

  ngOnInit(): void {
    this.machine_statusId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.machine_statusId) {
      this.isUpdate = true;
      this.loadMachineStatusData(this.machine_statusId)
    } else {
      this.generateId();
    }
  }

  saveMachine_status() {
    const machine_status: MachineStatusInfo = this.machine_statusForm.value as MachineStatusInfo;

    if (!this.machine_statusForm.valid) {
      this.toast.error('fill the all fields')
      return
    };
    const dialogRef = this.dialog.open(machine_statusDialog, {
      width: '400px',
      data: machine_status.id,
    });
    dialogRef.afterClosed().subscribe((result => {
      if (result !== 'confirm') return;
      const newMachine_status = { ...machine_status }
      // newMachine_status.createdDate = this.fixDate(machine_status.createdDate);
      // newMachine_status.updatedDate = this.fixDate(machine_status.updatedDate);
      if (this.isUpdate) {
        this.editMachineStatus(newMachine_status);
      } else {
        this.createMachineStatus(newMachine_status);
      }
    }))
  }

  cancel() {
    this.router.navigate(['machine_status_info']);
  }
}


@Component({
  selector: 'machine-status-dialog',
  templateUrl: './dialogs/machine_status-dialog.html',
  imports: [NgUIModule],
  standalone:true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class machine_statusDialog {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<machine_statusDialog>
  ) {
    console.log(this.data);
  }

  confirm() {
    this.dialogRef.close('confirm');
  }

  close() {
    this.dialogRef.close('cancel');
  }

}
