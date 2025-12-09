import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { NgUIModule } from '../../../shared/ng-ui.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../core/models/product';

@Component({
  selector: 'app-product-form',
  standalone: false,
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {

  constructor(){}

}


@Component({
  selector: 'product-dialog',
  templateUrl: './dialogs/product-dialog.html',
  standalone: true,
  imports: [NgUIModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class productDialog {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<productDialog>
  ) {
    console.log(this.data);
  }

  user: Product[] = []

  confirm() {
    this.dialogRef.close('confirm');
  }

  close() {
    this.dialogRef.close('cancel');
  }
}
