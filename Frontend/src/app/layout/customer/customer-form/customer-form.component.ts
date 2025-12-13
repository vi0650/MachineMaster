import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { NgUIModule } from '../../../shared/ng-ui.module';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../../../core/models/customer';
import { CITIES } from '../../../core/data/city';
import { STATES } from '../../../core/data/state';
import { v4 as uuidv4 } from 'uuid';
import { HotToastService } from '@ngxpert/hot-toast';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../core/services/customer.service';
import { hotToastObserve } from '../../../core/utils/toast-observer';

@Component({
  selector: 'app-customer-form',
  standalone: false,
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent {

  readonly dialog = inject(MatDialog);
  cities = CITIES;
  states = STATES;
  customer: Customer[] = [];
  existingIds: number[] = [];
  customerForm: FormGroup;
  customerId!: number;
  isUpdate = false;
  newCustomer = { customerName: '' }

  private buildForm(): FormGroup {
    return this.fb.group({
      customerId: [''],
      customerName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      address: [''],
      city: [''],
      state: [''],
      gstin: [''],
      isActive: [true],
      createdDate: [new Date()],
      updatedDate: [new Date()],
    });
  }

  protected generateId() {
    const newId = this.CustomerService.newCustomerId(this.existingIds);
    this.customerForm.patchValue({
      customerId: newId
    });
  }

  private createCustomer(customer: Customer) {
    this.CustomerService.addCustomer(customer).pipe(
      hotToastObserve(this.toast, {
        loading: "Just a Second....",
        success: (res: any) => `${res.customerName} Successfully Saved!`,
        error: err => {
          if (err.status === 0) return "Server Sleeping!";
          if (err.status === 401) return "Invalid Data!";
          return "Something Crashed!";
        }
      }),
    ).subscribe(() => {
      this.existingIds.push(customer.customerId);
      this.customerForm.reset();
      this.generateId();
      this.router.navigate(['customer'])
    })
  }

  private updateCustomer(customer: Customer) {
    this.CustomerService.updateCustomer(this.customerId, customer).pipe(
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
      this.router.navigate(['customer']);
    })
  }

  private loadCustomerData(id: number) {
    this.CustomerService.getCustomerById(id).subscribe((customer => {
      this.customerForm.patchValue(customer);
    }))
  }

  private fixDate(date: any) {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().split('T')[0];
  }

  constructor(private CustomerService: CustomerService, private route: ActivatedRoute, private fb: FormBuilder, private toast: HotToastService, private router: Router) {
    this.customerForm = this.buildForm()
  }

  ngOnInit(): void {
    this.customerId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.customerId) {
      this.isUpdate = true;
      this.loadCustomerData(this.customerId)
    } else {
      this.generateId();
    }
  }

  saveCustomer() {
    const customer: Customer = this.customerForm.value as Customer;

    if (!this.customerForm.valid) {
      this.toast.error('fill the all fields')
      return
    };
    const dialogRef = this.dialog.open(customerDialog, {
      width: '400px',
      data: customer.customerName,
    });
    dialogRef.afterClosed().subscribe((result => {
      if (result !== 'confirm') return;
      const newCustomer = { ...customer }
      newCustomer.createdDate = this.fixDate(customer.createdDate);
      newCustomer.updatedDate = this.fixDate(customer.updatedDate);
      if (this.isUpdate) {
        this.updateCustomer(newCustomer);
      } else {
        this.createCustomer(newCustomer);
      }
    }))
  }

  cancel() {
    this.router.navigate(['customer']);
  }
}


@Component({
  selector: 'customer-dialog',
  templateUrl: './dialogs/customer-dialog.html',
  imports: [NgUIModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class customerDialog {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<customerDialog>
  ) {
    console.log(this.data);
  }

  user: Customer[] = []

  confirm() {
    this.dialogRef.close('confirm');
  }

  close() {
    this.dialogRef.close('cancel');
  }
}