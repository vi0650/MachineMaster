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


@NgModule({
  declarations: [
    LayoutComponent,
    CustomerComponent,
    ProductsComponent,
    MachineComponent,
    MachineStatusInfoComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutRoutingModule,
    NgUIModule
]
})
export class LayoutModule { }
