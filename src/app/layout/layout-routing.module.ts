import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { CustomerComponent } from './customer/customer.component';
import { MachineComponent } from './machine/machine.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path: 'layout',
    component: LayoutComponent,
    children: [
      { path: 'customer', component: CustomerComponent },
      { path: 'machine', component: MachineComponent },
      { path: 'products', component: ProductsComponent },
      { path: '', redirectTo: 'customer', pathMatch: 'full' }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
