import baseApi from "./baseApi";
import { OrderType } from "./types.";

export const getAllOrders = async () => {
    try {
        const { data } = await baseApi.get("/orders");
        return data;
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : String(error));
    }
}

export const createOrder = async ({ userId, totalPrice, status, orderItems, earnedPoints }: OrderType) => {
    try {
        const newOrder: OrderType = {
            userId,
            totalPrice,
            status,
            orderItems,
            earnedPoints
        }
        const { data } = await baseApi.post("/orders", newOrder);
        return data;
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : String(error));
    }
}

export const updateOrder = async (id: number, { userId, totalPrice, status, orderItems, earnedPoints }: OrderType) => {
    try {
        const updatedOrder: OrderType = {
            userId,
            totalPrice,
            status,
            orderItems,
            earnedPoints
        }
        const { data } = await baseApi.patch(`/orders/${id}`, updatedOrder);
        return data;
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : String(error));
    }
}

export const deleteOrder = async (id: number) => {
    try {
        const { data } = await baseApi.delete(`/orders/${id}`);
        return data;
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : String(error));
    }
}

export const getOrderById = async (id: number) => {
    try {
        const { data } = await baseApi.get(`/orders/${id}`);
        return data;
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : String(error));
    }
}

export const getOrdersByUserId = async (userId: number) => {
    try {
        const { data } = await baseApi.get(`/orders/user/${userId}`);
        return data;
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : String(error));
    }
}
