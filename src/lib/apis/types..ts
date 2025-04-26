export interface IAPIResponseWrapper<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface IUserDataType {
  email: string;
  password: string;
  fullName: null | string;
  phone: null | number;
  address: null | number;
  id: number;
  points: number;
  createdAt: string;
  updatedAt: string;
  roleId: Role | null;
}

interface Role {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
