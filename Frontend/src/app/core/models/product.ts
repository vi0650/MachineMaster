export interface Product {
  productId: number;
  productName: string | any;
  categoryId?: number | any;
  isActive: boolean | any;
  description?: string | any;
  createdDate?: Date | any;
  updatedDate?: Date | any;
  productCode?: string | any;
}