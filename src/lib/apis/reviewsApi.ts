
import baseApi from "./baseApi";

export const getReviewsAPI = async () => {
    try {
        const { data } = await baseApi.get("/reviews");
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
}
export const getReviewByIdAPI = async (id: number) => {
    try {
        const { data } = await baseApi.get(`/reviews/${id}`);
        return data;
    } catch (error: any) {
        throw new Error(error);
    }
}
