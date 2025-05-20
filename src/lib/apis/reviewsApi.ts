import axiosInstance from '@/lib/apis/axiosInstance';

export const getReviewsAPI = async () => {
  try {
    const { data } = await axiosInstance.get('/reviews');
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getReviewByIdAPI = async (id: number) => {
  try {
    const { data } = await axiosInstance.get(`/reviews/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
