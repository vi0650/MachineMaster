import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgUIModule } from '../../shared/ng-ui.module';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Machine } from '../../core/models/machine';
import { pId } from '../../core/data/productId';
import { v4 as uuidv4 } from 'uuid';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-machine',
  standalone: false,
  templateUrl: './machine.component.html',
  styleUrl: './machine.component.scss'
})
export class MachineComponent {

  machineForm: FormGroup;

  constructor(private fb: FormBuilder, private toast: HotToastService) {
    this.machineForm = this.fb.group({
      machineName: ['', Validators.required],
      productId: ['', [Validators.required, Validators.pattern("^[0-9]{6}$")]],
      description: [''],
      isActive: [true],
      createdDate: [new Date()],
      updatedDate: [new Date()],
    });
  }

  machine: Machine[] = [];
  pId = pId;
  newCustomer = { machineName: '', }

  readonly dialog = inject(MatDialog);

  generatedMachId(existingId: number[]): number {
    let id: number;
    do {
      const uuid = uuidv4();
      const numeric = uuid.replace(/\D/g, '');
      id = Number(numeric.substring(0, 5) || Math.floor(1000 + Math.random() * 9000));
    } while (existingId.includes(id))
    return id;
  }

  saveForm() {
    const machine: Machine = this.machineForm.value as Machine;

    if (!this.machineForm.valid) {
      this.toast.error('fill the all fields')
      return
    };

    if (this.machineForm.valid) {
      const newMachine = { machineId: this.generatedMachId([]), ...machine }
      console.log(newMachine);
      this.toast.success('Successfully saved!!')
    }
    this.machineForm.reset();
  }

  // openDialog() {
  //   const dialogRef = this.dialog.open(customerDialog);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`dialog result : ${result}`);
  //   })
  // }

}

@Component({
  selector: 'machine-dialog',
  templateUrl: './dialogs/machine-dialog.html',
  imports: [NgUIModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class machineDialog { }
