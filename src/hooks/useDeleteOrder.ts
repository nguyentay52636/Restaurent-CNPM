import axiosInstance from '@/lib/apis/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteOrderItem = async (orderItemId: number): Promise<void> => {
  await axiosInstance.delete(`orders/${orderItemId}`);
};

export const useDeleteOrderItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOrderItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};
