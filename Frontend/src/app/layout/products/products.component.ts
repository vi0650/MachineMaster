import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../../core/services/product.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { PRODUCT_COL } from '../../core/data/tabledata/productColumns';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Product } from '../../core/models/product';
import { hotToastObserve } from '../../core/utils/toast-observer';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  readonly dialog = inject(MatDialog);
  private productService = inject(ProductService);
  private toast = inject(HotToastService);
  private router = inject(Router);

  productDataSource = new MatTableDataSource<Product>();
  displayColumns = PRODUCT_COL

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadProduct();
  } 

  ngAfterViewInit(): void {
    this.productDataSource.paginator = this.paginator;
    this.productDataSource.sort = this.sort;

    // faster filtering
    this.productDataSource.filterPredicate = (data, filter) =>
      data.productId.toString().includes(filter) ||
      data.productName.toLowerCase().includes(filter);
  }

  loadProduct() {
    this.productService.getAllProducts().subscribe(product => {
      // direct data update - no datasource recreation
      this.productDataSource.data = product;
    });
  }

  applyFilter(event: any) {
    const value = event.target.value.trim().toLowerCase();
    this.productDataSource.filter = value;
  }

  editProduct(row: Product) {
    this.router.navigate(['category-form', row.productId]);
  }

  deleteProduct(row: Product) {
    this.productService.deleteProduct(row.productId).pipe(
      hotToastObserve(this.toast, {
        loading: "Category deleting...",
        success: () => `${row.productName} Deleted!`,
        error: (err) => {
          if (err.status === 0) return "server offline!";
          if (err.status === 401) return "api misunderstood";
          return "Something Crashed! 😱";
        }
      }),
    ).subscribe(() => this.loadProduct());
  }

  addProduct() {
    this.router.navigate(['products/products-form']);
  }
}
