import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgUIModule } from '../../shared/ng-ui.module';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../../core/models/customer';
import { CITIES } from '../../core/data/city';
import { STATES } from '../../core/data/state';
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
      mobileNo: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      address: [''],
      city: [''],
      state: [''],
      gstIn: [''],
      isActive: [true],
      createdDate: [new Date()],
      updatedDate: [new Date()],
    });
  }

  customers: Customer[] = [];
  cities = CITIES;
  states = STATES;
  newCustomer = { customerName: '', }

  readonly dialog = inject(MatDialog);

  generatedCustId(existingId: number[]): number {
    let id: number;
    do {
      const uuid = uuidv4();
      const numeric = uuid.replace(/\D/g, '');
      id = Number(numeric.substring(0, 5) || Math.floor(1000 + Math.random() * 9000));
    } while (existingId.includes(id))
    return id;
  }

  saveForm() {
    const grahak: Customer = this.machineForm.value as Customer;

    if (!this.machineForm.valid) {
      this.toast.error('fill the all fields')
      return
    };

    if (this.machineForm.valid) {
      const newCustomer = { customerId: this.generatedCustId([]), ...grahak }
      console.log(newCustomer);
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
