import { ChangeDetectionStrategy, Component, inject, Inject } from '@angular/core';
import { NgUIModule } from '../../../shared/ng-ui.module';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../core/models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { hotToastObserve } from '../../../core/utils/toast-observer';

@Component({
  selector: 'app-product-form',
  standalone: false,
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {

  readonly dialog = inject(MatDialog);
  products: Product[] = [];
  existingIds: number[] = [];
  productForm: FormGroup;
  productId!: number;
  isUpdate = false;

  private buildForm(): FormGroup {
    return this.fb.group({
      productId: ['', Validators.required],
      productName: ['', Validators.required],
      categoryId: ['', Validators.required],
      isActive: [true],
      description: [''],
      createdDate: [new Date()],
      updatedDate: [new Date()],
      productCode: ['']
    })
  }

  private createProduct(product: Product) {
    this.productService.addProduct(product).pipe(
      hotToastObserve(this.toast, {
        loading: "Just a Second....",
        success: (res: any) => `${res.productName} Successfully Saved!`,
        error: err => {
          if (err.status === 0) return "Server Sleeping!";
          if (err.status === 401) return "Invalid Data!";
          return "Something Crashed!";
        }
      }),
    ).subscribe(() => {
      this.existingIds.push(product.productId);
      this.productForm.reset();
      this.generateId();   // fresh ID for next user
      this.router.navigate(['products']);
    });
  }

  protected generateId() {
    const newId = this.productService.newProductId(this.existingIds);
    this.productForm.patchValue({
      productId: newId
    });
    console.log('generated ID :', newId);
  }

  private updateProductData(product: Product) {
    this.productService.updateProduct(this.productId, product).pipe(
      hotToastObserve(this.toast, {
        loading: "Updating data....",
        success: () => `data Updated successfully`,
        error: err => {
          if (err.status === 0) return "Server Sleeping!";
          if (err.status === 401) return "Invalid Data!";
          return "Something Crashed!";
        }
      }),
    ).subscribe(() => {
      this.router.navigate(['products'])
    })
  }

  private loadProductData(id: number) {
    this.productService.getProductById(id).subscribe((product) => {
      this.productForm.patchValue(product)
    })
  }

  private fixDate(date: any) {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().split('T')[0];
  }

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private toast: HotToastService, private productService: ProductService, private router: Router) {
    this.productForm = this.buildForm();
  }

  ngOnInit(): void {
    
  }
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

  confirm() {
    this.dialogRef.close('confirm');
  }

  close() {
    this.dialogRef.close('cancel');
  }
}
