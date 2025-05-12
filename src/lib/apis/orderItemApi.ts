import baseApi from "./baseApi";
import { OrderItemType } from "./types.";

export const getAllOrderItems = async () => {
    try {
        const { data } = await baseApi.get("/order-items");
        return data;
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : String(error));
    }
}

export const createOrderItem = async ({ orderId, productId, quantity, price }: OrderItemType) => {
    try {
        const newOrderItem: OrderItemType = {
            orderId,
            productId,
            quantity,
            price
        }
        const { data } = await baseApi.post("/order-items", newOrderItem);
        return data;
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : String(error));
    }
}

export const updateOrderItem = async (id: number, { orderId, productId, quantity, price }: OrderItemType) => {
    try {
        const updatedOrderItem: OrderItemType = {
            orderId,
            productId,
            quantity,
            price
        }
        const { data } = await baseApi.patch(`/order-items/${id}`, updatedOrderItem);
        return data;
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : String(error));
    }
}

export const deleteOrderItem = async (id: number) => {
    try {
        const { data } = await baseApi.delete(`/order-items/${id}`);
        return data;
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : String(error));
    }
}

export const getOrderItemById = async (id: number) => {
    try {
        const { data } = await baseApi.get(`/order-items/${id}`);
        return data;
    } catch (error: unknown) {
        throw new Error(error instanceof Error ? error.message : String(error));
    }
}
