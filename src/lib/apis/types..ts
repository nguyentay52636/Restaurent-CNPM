export interface IAPIResponseWrapper<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface IUserDataType {
  id?: number;
  fullName?: string;
  email: string;
  roleId: number | Role;
  phone?: string;
  password?: string;
  address?: string;
  points?: number;
}

export interface Role {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}
