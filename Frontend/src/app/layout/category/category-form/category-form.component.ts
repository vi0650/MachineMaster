import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';
import { NgUIModule } from '../../../shared/ng-ui.module';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngxpert/hot-toast';
import { hotToastObserve } from '../../../core/utils/toast-observer';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../core/models/category';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-category-form',
  standalone: false,
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent implements OnInit {

  readonly dialog = inject(MatDialog);
  category: Category[] = [];
  existingIds: number[] = [];
  categoryForm: FormGroup;
  categoryId!: number;
  isUpdate = false;
  hidePassword = false;

  private buildForm(): FormGroup {
    return this.fb.group({
      categoryId: ['', Validators.required],
      categoryName: ['', Validators.required],
      isActive: [true],
      description: [''],
      createdDate: [new Date()],
      updatedDate: [new Date()]
    });
  }

  private createCategory(category: Category) {
    this.CategoryService.addCategory(category).pipe(
      hotToastObserve(this.toast, {
        loading: "Just a Second....",
        success: (res: any) => `${res.categoryName} Successfully Saved!`,
        error: err => {
          if (err.status === 0) return "Server Sleeping!";
          if (err.status === 401) return "Invalid Data!";
          return "Something Crashed!";
        }
      }),
    ).subscribe(() => {
      this.existingIds.push(category.categoryId);
      this.categoryForm.reset();
      this.generateId();   // fresh ID for next category
      this.router.navigate(['category']);
    });
  }

  protected generateId() {
    const newId = this.CategoryService.newCategoryId(this.existingIds);
    this.categoryForm.patchValue({
      categoryId: newId
    });
    console.log('generated ID :', newId);
  }

  private updateCategoryData(category: Category) {
    this.CategoryService.updateCategory(this.categoryId, category).pipe(
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
      this.router.navigate(['category'])
    })
  }

  private loadCategoryData(id: number) {
    this.CategoryService.getCategoryById(id).subscribe((category) => {
      this.categoryForm.patchValue(category);
    });
  }

  private fixDate(date: any) {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().split('T')[0];
  }

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private toast: HotToastService, private CategoryService: CategoryService, private router: Router) {
    this.categoryForm = this.buildForm();
  }

  ngOnInit(): void {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.categoryId) {
      this.isUpdate = true;
      this.loadCategoryData(this.categoryId)
    } else {
      this.generateId()
    }
  }

  saveCategory() {
    const category: Category = this.categoryForm.value as Category;
    if (this.categoryForm.invalid) {
      this.toast.error('Form is Empty')
      return
    };
    const dialogRef = this.dialog.open(categoryDialog, {
      width: '400px',
      data: category.categoryName,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`dialog result : ${result}`);
      if (result !== 'confirm') return;
      const newCategory = { ...category }
      newCategory.updatedDate = this.fixDate(category.updatedDate);
      newCategory.createdDate = this.fixDate(category.createdDate);
      console.log(newCategory)
      if (this.isUpdate) {
        this.updateCategoryData(newCategory);
      } else {
        this.createCategory(newCategory)
      }
    }
    )
  }

  cancel() {
    this.router.navigate(['category']);
  }

}


@Component({
  selector: 'category-dialog',
  templateUrl: './dialogs/category-dialog.html',
  standalone: true,
  imports: [NgUIModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class categoryDialog {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<categoryDialog>
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