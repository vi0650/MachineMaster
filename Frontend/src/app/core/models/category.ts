export interface Category {
  categoryId: number;
  categoryName: string | any;
  isActive: boolean | null;
  description?: string | any;
  createdDate?: Date | any;
  updatedDate?: Date | any;
}