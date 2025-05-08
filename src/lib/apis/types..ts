export interface IAPIResponseWrapper<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface IUserDataType {
  id: number;
  email: string;
  password: string;
  points: number;
  roleId: Role | null;
  fullName?: string;
  phone?: string;
  address?: string;
}

interface Role {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
