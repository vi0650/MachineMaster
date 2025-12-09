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
import { ProductFormComponent } from './products/product-form/product-form.component';
import { CategoryComponent } from './category/category.component';
import { CategoryFormComponent } from './category/category-form/category-form.component';
import { CustomerFormComponent } from './customer/customer-form/customer-form.component';
import { MachineFormComponent } from './machine/machine-form/machine-form.component';
import { MachineStatusInfoFormComponent } from './machine-status-info/machine-status-info-form/machine-status-info-form.component';


@NgModule({
  declarations: [
    LayoutComponent,
    CustomerComponent,
    ProductsComponent,
    MachineComponent,
    MachineStatusInfoComponent,
    UsersComponent,
    UserFormComponent,
    BooleanTextPipe,
    ProductFormComponent,
    CategoryComponent,
    CategoryFormComponent,
    CustomerFormComponent,
    MachineFormComponent,
    MachineStatusInfoFormComponent
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
