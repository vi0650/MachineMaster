export interface Product {
  productId: number;
  productName: string | null;
  categoryId?: number | null;
  isActive: boolean | null;
  description?: string | null;
  createdDate?: Date | null;
  updatedDate?: Date | null;
  productCode?: string | null;
}