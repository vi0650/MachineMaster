import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
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
export class CategoryFormComponent {

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
        success: (res: any) => `${res.userName} Successfully Saved!`,
        error: err => {
          if (err.status === 0) return "Server Sleeping!";
          if (err.status === 401) return "Invalid Data!";
          return "Something Crashed!";
        }
      }),
    ).subscribe(() => {
      this.existingIds.push(category.categoryId);
      this.categoryForm.reset();
      this.generateId();   // fresh ID for next user
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

  private updateUserData(category: Category) {
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

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private toast: HotToastService, private CategoryService: CategoryService, private router: Router) {
    this.categoryForm = this.buildForm();
  }


}
