import axiosInstance from '@/lib/apis/axiosInstance';
import { categoryType } from './types.';

export const getCategories = async () => {
  try {
    const { data } = await axiosInstance.get('/categories');
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/categories/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createCategory = async ({ name }: categoryType) => {
  try {
    const newCategory = { name };
    const { data } = await axiosInstance.post('/categories', newCategory);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateCategory = async (id: string, { name }: categoryType) => {
  try {
    const newCategory = { name };
    const { data } = await axiosInstance.patch(`/categories/${id}`, newCategory);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
