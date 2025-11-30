import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MachineComponent } from '../machine/machine.component';

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {

  constructor(private dialog:Dialog){

  }

    openDialog() {
    this.dialog.open(MachineComponent, {
      width: '400px',
      panelClass: 'custom-dialog'
    });
  }

}
