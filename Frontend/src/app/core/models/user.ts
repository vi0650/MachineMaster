export interface User {
  userId: number;
  userName: string | any;
  password?: string | any;
  email?: string | any;
  role?: UserRole | string | any;
  isActive: boolean | null;
  description?: string | any;
  createdDate?: Date | any;
  updatedDate?: Date | any;
}

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
  Manager = 'Manager',
}
