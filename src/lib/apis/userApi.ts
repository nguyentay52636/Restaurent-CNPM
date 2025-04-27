import baseApi from './baseApi';
import { IAPIResponseWrapper, IUserDataType } from './types.';

export const registerAPI = async ({ email, password }: { email: string; password: string }) => {
  try {
    const { data } = await baseApi.post<IAPIResponseWrapper<IUserDataType>>('/auth/register', {
      email,
      password,
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllUserAPI = async () => {
  try {
    const { data } = await baseApi.get<IAPIResponseWrapper<IUserDataType[]>>('/users');
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteUserAPI = async (id: number) => {
  try {
    const { data } = await baseApi.delete<IAPIResponseWrapper<IUserDataType>>('/users/' + id);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};
