import axiosInstance from '@/lib/apis/axiosInstance';
import {
  IAPIResponseWrapper,
  ILoginDataType,
  IRefreshTokenDataType,
  IUserDataType,
} from './types.';

export const registerAPI = async ({ email, password }: { email: string; password: string }) => {
  try {
    const newUser = {
      email,
      password,
    };
    const { data } = await axiosInstance.post<IAPIResponseWrapper<IUserDataType>>(
      '/auth/register',
      newUser,
    );
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};
export const loginAPI = async ({ email, password }: { email: string; password: string }) => {
  try {
    const { data } = await axiosInstance.post<IAPIResponseWrapper<ILoginDataType>>('/auth/login', {
      email,
      password,
    });
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const refreshTokenAPI = async (refreshToken: string) => {
  try {
    const { data } = await axiosInstance.post<IAPIResponseWrapper<IRefreshTokenDataType>>(
      '/auth/refresh-token',
      { refreshToken },
    );

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllUserAPI = async () => {
  try {
    const { data } = await axiosInstance.get<IAPIResponseWrapper<IUserDataType[]>>('/users');
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteUserAPI = async (id: number) => {
  try {
    const { data } = await axiosInstance.delete<IAPIResponseWrapper<IUserDataType>>('/users/' + id);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};

export const addUserAPI = async ({
  fullName,
  email,
  password,
  phone,
  address,
  roleId,
  points,
}: IUserDataType) => {
  try {
    const userData = {
      fullName,
      email,
      password,
      phone,
      address,
      roleId,
      points,
    };

    const { data } = await axiosInstance.post<IAPIResponseWrapper<IUserDataType>>(
      '/users',
      userData,
    );
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateUserAPI = async ({
  id,
  fullName,
  email,
  phone,
  address,
  roleId,
  points,
}: IUserDataType) => {
  try {
    const userData = {
      fullName,
      email,
      phone,
      address,
      points,
      roleId,
    };
    const { data } = await axiosInstance.patch<IAPIResponseWrapper<IUserDataType>>(
      `/users/${id}`,
      userData,
    );
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getUserByIdAPI = async (id: number) => {
  try {
    const { data } = await axiosInstance.get<IAPIResponseWrapper<IUserDataType>>(`/users/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
