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

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate:[AuthGuard],
    children: [
      { path: 'customer', component: CustomerComponent },
      { path: 'machine', component: MachineComponent },
      { path: 'machine_status_info', component: MachineStatusInfoComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'users-form', component: UserFormComponent },
      { path: 'users', component: UsersComponent },
      { path: '', redirectTo: 'customer', pathMatch: 'full' }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
