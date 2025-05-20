import axiosInstance from '@/lib/apis/axiosInstance';
import { Role } from '@/modules/admin/components/AccountManager/components/AcountData';

export const getRolesAPI = async () => {
  try {
    const { data } = await axiosInstance.get('/roles');
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getRoleByIdAPI = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/roles/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createRoleAPI = async ({ name }: Role) => {
  try {
    const { data } = await axiosInstance.post('/roles', { name });
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateRoleAPI = async ({ id, name }: Role) => {
  try {
    const { data } = await axiosInstance.patch(`/roles/${id}`, { name });
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteRoleAPI = async (id: number) => {
  try {
    const { data } = await axiosInstance.delete(`/roles/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
