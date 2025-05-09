import baseApi from './baseApi';
import { IAPIResponseWrapper, IUserDataType } from './types.';

export const registerAPI = async ({ email, password }:{ email: string; password: string }) => {
  try {
    const newUser = {
      email,
      password,
    } 
    const { data } = await baseApi.post<IAPIResponseWrapper<IUserDataType>>('/auth/register', newUser);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};
export const loginAPI = async ({ email, password }: { email: string; password: string }) => { 
   try { 
    const {data} = await baseApi.post<IAPIResponseWrapper<IUserDataType>>('/auth/login', {
      email,
      password,
    });
    return data;
   }catch(error: any) { 
    throw new Error(error);
  } 
 } 

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

export const addUserAPI = async ({fullName, email, password, phone, address, roleId, points}: IUserDataType) => {
  try {
    const userData = { 
      fullName,
      email,
      password,
      phone,
      address,
      roleId,
      points,
    }  
    const { data } = await baseApi.post<IAPIResponseWrapper<IUserDataType>>('/users', userData);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateUserAPI = async ({id, fullName, email, phone, address, roleId, points}: IUserDataType) => {
  try {
    const userData = { 
      fullName,
      email,
      phone,
      address,
      roleId,
      points,
    } 
    const { data } = await baseApi.patch<IAPIResponseWrapper<IUserDataType>>(`/users/${id}`, userData);
    return data;
    
  } catch (error: any) {
    throw new Error(error);
  }
};
