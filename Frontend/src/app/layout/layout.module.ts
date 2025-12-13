import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { CustomerComponent } from './customer/customer.component';
import { MachineComponent } from './machine/machine.component';
import { NgUIModule } from '../shared/ng-ui.module';
import { MachineStatusInfoComponent } from './machine-status-info/machine-status-info.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatRecycleRows } from "@angular/material/table";
import { CategoryComponent } from './category/category.component';
import { CategoryFormComponent } from './category/category-form/category-form.component';
import { CustomerFormComponent } from './customer/customer-form/customer-form.component';
import { MachineFormComponent } from './machine/machine-form/machine-form.component';
import { MachineStatusInfoFormComponent } from './machine-status-info/machine-status-info-form/machine-status-info-form.component';
import { UsersRoutingModule } from './users/users-routing.module';

@NgModule({
  declarations: [
    LayoutComponent,
    CustomerComponent,
    MachineComponent,
    MachineStatusInfoComponent,
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
    UsersRoutingModule,
    MatRecycleRows,
    NgUIModule
]
})
export class LayoutModule { }
