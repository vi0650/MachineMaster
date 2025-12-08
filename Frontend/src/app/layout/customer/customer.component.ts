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
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
})
export class CustomerComponent {

  readonly dialog = inject(MatDialog);
  customerForm: FormGroup;
  customers: Customer[] = [];
  cities = CITIES;
  states = STATES;
  newCustomer = { customerName: '', }

  constructor(private fb: FormBuilder, private toast: HotToastService) {
    this.customerForm = this.fb.group({
      customerName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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

  newCustId(existingId: number[]): number {
    let id: number;
    do {
      const uuid = uuidv4();
      const numeric = uuid.replace(/\D/g, '');
      let sub = numeric.substring(0, 5);
      sub = sub.padStart(5, '0');
      id = Number(sub);
      if (id < 10000) {
        id += 10000;
      }
    } while (existingId.includes(id))
    return id;
  }

  saveForm() {
    const grahak: Customer = this.customerForm.value as Customer;

    if (!this.customerForm.valid) {
      this.toast.error('fill the all fields')
      return
    };

    if (this.customerForm.valid) {
      const newCustomer = { customerId: this.newCustId([]), ...grahak }
      console.log(newCustomer);
      this.toast.success('Successfully saved!!', { dismissible: true, position: 'bottom-center' })
    }
    this.customerForm.reset();

  }

  // openDialog() {
  //   const dialogRef = this.dialog.open(customerDialog);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`dialog result : ${result}`);
  //   })
  // }

}

@Component({
  selector: 'customer-dialog',
  templateUrl: './dialogs/customer-dialog.html',
  imports: [NgUIModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class customerDialog { }
