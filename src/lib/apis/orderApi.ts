import axiosInstance from '@/lib/apis/axiosInstance';
import { OrderType } from './types.';

export const getAllOrders = async () => {
  try {
    const { data } = await axiosInstance.get('/orders');
    return data;
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const createOrder = async ({ userId, status, orderItems }: OrderType) => {
  try {
    const newOrder: OrderType = {
      userId,
      status,
      orderItems,
    };
    const { data } = await axiosInstance.post('/orders', newOrder);
    return data;
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const updateOrder = async (id: number, { userId, status, orderItems }: OrderType) => {
  try {
    const updatedOrder: OrderType = {
      userId,
      status,
      orderItems,
    };
    const { data } = await axiosInstance.patch(`/orders/${id}`, updatedOrder);
    return data;
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const deleteOrder = async (id: number) => {
  try {
    const { data } = await axiosInstance.delete(`/orders/${id}`);
    return data;
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const getOrderById = async (id: number) => {
  try {
    const { data } = await axiosInstance.get(`/orders/${id}`);
    return data;
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const getOrdersByUserId = async (userId: number) => {
  try {
    const { data } = await axiosInstance.get(`/orders/user/${userId}`);
    return data;
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
