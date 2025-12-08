import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { CustomerComponent } from './customer/customer.component';
import { ProductsComponent } from './products/products.component';
import { MachineComponent } from './machine/machine.component';
import { NgUIModule } from '../shared/ng-ui.module';
import { MachineStatusInfoComponent } from './machine-status-info/machine-status-info.component';
import { UsersComponent } from './users/users.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserFormComponent } from './users/user-form/user-form.component';
import { MatRecycleRows } from "@angular/material/table";
import { BooleanTextPipe } from '../core/pipes/boolean-text.pipe';


@NgModule({
  declarations: [
    LayoutComponent,
    CustomerComponent,
    ProductsComponent,
    MachineComponent,
    MachineStatusInfoComponent,
    UsersComponent,
    UserFormComponent,
    BooleanTextPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutRoutingModule,
    NgUIModule,
    MatRecycleRows
]
})
export class LayoutModule { }
