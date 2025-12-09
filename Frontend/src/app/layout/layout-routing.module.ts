import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { CustomerComponent } from './customer/customer.component';
import { MachineComponent } from './machine/machine.component';
import { ProductsComponent } from './products/products.component';
import { AuthGuard } from '../guards/auth.guard';
import { MachineStatusInfoComponent } from './machine-status-info/machine-status-info.component';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { CategoryComponent } from './category/category.component';
import { CategoryFormComponent } from './category/category-form/category-form.component';
import { CustomerFormComponent } from './customer/customer-form/customer-form.component';
import { MachineFormComponent } from './machine/machine-form/machine-form.component';
import { MachineStatusInfoFormComponent } from './machine-status-info/machine-status-info-form/machine-status-info-form.component';
import { ProductFormComponent } from './products/product-form/product-form.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'category', component: CategoryComponent },
      { path: 'customer', component: CustomerComponent },
      { path: 'machine', component: MachineComponent },
      { path: 'machine_status_info', component: MachineStatusInfoComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'users', component: UsersComponent },
      
      { path: 'category-form', component: CategoryFormComponent },
      { path: 'customer-form', component: CustomerFormComponent },
      { path: 'machine-form', component: MachineFormComponent },
      { path: 'machine_status_info-form', component: MachineStatusInfoFormComponent },
      { path: 'products-form', component: ProductFormComponent },
      { path: 'users-form', component: UserFormComponent },

      { path: 'category-form/:id', component: CategoryFormComponent },
      { path: 'customer-form/:id', component: CustomerFormComponent },
      { path: 'machine-form/:id', component: MachineFormComponent },
      { path: 'machine_status_info-form/:id', component: MachineStatusInfoFormComponent },
      { path: 'products-form/:id', component: ProductFormComponent },
      { path: 'users-form/:id', component: UserFormComponent },
      { path: '', redirectTo: 'customer', pathMatch: 'full' }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
