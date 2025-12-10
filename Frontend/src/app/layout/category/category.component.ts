import { Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngxpert/hot-toast';
import { Router } from '@angular/router';
import { hotToastObserve } from '../../core/utils/toast-observer';
import { Category } from '../../core/models/category';
import { CATEGORY_COL } from '../../core/data/tabledata/categoryColumns';
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

  readonly dialog = inject(MatDialog);
  private categoryService = inject(CategoryService);
  private toast = inject(HotToastService);
  private router = inject(Router);

  categoryDataSource = new MatTableDataSource<Category>();
  displayColumns = CATEGORY_COL

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadCategory();
  }

  ngAfterViewInit(): void {
    this.categoryDataSource.paginator = this.paginator;
    this.categoryDataSource.sort = this.sort;

    // faster filtering
    this.categoryDataSource.filterPredicate = (data, filter) =>
      data.categoryId.toString().includes(filter) ||
      data.categoryName.toLowerCase().includes(filter);
  }

  loadCategory() {
    this.categoryService.getAllCategories().subscribe(category => {
      // direct data update - no datasource recreation
      this.categoryDataSource.data = category;
    });
  }

  applyFilter(event: any) {
    const value = event.target.value.trim().toLowerCase();
    this.categoryDataSource.filter = value;
  }

  editCategory(row: Category) {
    this.router.navigate(['category-form', row.categoryId]);
  }

  deleteCategory(row: Category) {
    this.categoryService.deleteCategory(row.categoryId).pipe(
      hotToastObserve(this.toast, {
        loading: "Category deleting...",
        success: () => `${row.categoryName} Deleted!`,
        error: (err) => {
          if (err.status === 0) return "server offline!";
          if (err.status === 401) return "api misunderstood";
          return "Something Crashed! 😱";
        }
      }),
    ).subscribe(() => this.loadCategory());
  }

  addCategory() {
    this.router.navigate(['category-form']);
  }

}
