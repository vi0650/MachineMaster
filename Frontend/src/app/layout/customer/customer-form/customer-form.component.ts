import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { NgUIModule } from '../../../shared/ng-ui.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../../../core/models/customer';

@Component({
  selector: 'app-customer-form',
  standalone: false,
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent {

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