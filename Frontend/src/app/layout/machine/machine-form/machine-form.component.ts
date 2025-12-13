import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { NgUIModule } from '../../../shared/ng-ui.module';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngxpert/hot-toast';
import { Machine } from '../../../core/models/machine';
import { pId } from '../../../core/data/productId';
import { MachineService } from '../../../core/services/machine.service';
import { hotToastObserve } from '../../../core/utils/toast-observer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-machine-form',
  standalone: false,
  templateUrl: './machine-form.component.html',
  styleUrl: './machine-form.component.scss'
})
export class MachineFormComponent {

  readonly dialog = inject(MatDialog);
  machine: Machine[] = [];
  existingIds: number[] = [];
  machineId!: number;
  machineForm: FormGroup;
  pId = pId;

  isUpdate = false;
  private buildForm(): FormGroup {
    return this.fb.group({
      machineId:[''],
      machineName: ['', Validators.required],
      productId: [''],
      description: [''],
      isActive: [true],
      createdDate: [new Date()],
      updatedDate: [new Date()],
    });
  }

  protected generateId() {
    const newId = this.MachineService.newMachineId(this.existingIds);
    this.machineForm.patchValue({
      machineId: newId
    });
    console.log('generated ID :', newId);
  }

  private createMachine(machine: Machine) {
    this.MachineService.addMachine(machine).pipe(
      hotToastObserve(this.toast, {
        loading: "Just a Second....",
        success: (res: any) => `${res.machineName} Successfully Saved!`,
        error: err => {
          if (err.status === 0) return "Server Sleeping!";
          if (err.status === 401) return "Invalid Data!";
          return "Something Crashed!";
        }
      }),
    ).subscribe(() => {
      this.existingIds.push(machine.machineId);
      this.machineForm.reset();
      this.generateId();   // fresh ID for next machineid
      this.router.navigate(['machine']);
    });
  }

  private updateMachineData(machine: Machine) {
    this.MachineService.updateMachine(this.machineId, machine).pipe(
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
      this.router.navigate(['machine'])
    })
  }

  private loadMachineData(id: number) {
    this.MachineService.getMachineById(id).subscribe((machine) => {
      this.machineForm.patchValue(machine);
    });
  }

  private fixDate(date: any) {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().split('T')[0];
  }

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private toast: HotToastService, private router: Router, private MachineService: MachineService) {
    this.machineForm = this.buildForm();
  }

  ngOnInit(): void {
    this.machineId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.machineId) {
      this.isUpdate = true;
      this.loadMachineData(this.machineId)
    } else {
      this.generateId()
    }
  }

  saveMachine() {
    const machine: Machine = this.machineForm.value as Machine;
    if (this.machineForm.invalid) {
      this.toast.error('Form is Empty')
      return
    };
    const dialogRef = this.dialog.open(machineDialog, {
      width: '400px',
      data: machine.machineName,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`dialog result : ${result}`);
      if (result !== 'confirm') return;
      const newMachine = { ...machine }
      newMachine.updatedDate = this.fixDate(machine.updatedDate);
      newMachine.createdDate = this.fixDate(machine.createdDate);
      console.log(newMachine)
      if (this.isUpdate) {
        this.updateMachineData(newMachine);
      } else {
        this.createMachine(newMachine)
      }
    })
  }

  cancel() {
    this.router.navigate(['machine']);
  }
}

@Component({
  selector: 'machine-dialog',
  templateUrl: './dialogs/machine-dialog.html',
  standalone: true,
  imports: [NgUIModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class machineDialog {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<machineDialog>
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
