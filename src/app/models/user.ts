export interface User {
  userId: number;
  userName: string | null;
  password?: string | null;
  email?: string | null;
  role?: UserRole | string | null;
  isActive: boolean | null;
  description?: string | null;
  createdDate?: Date | null;
  updatedDate?: Date | null;
}

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
  Manager = 'Manager',
}
