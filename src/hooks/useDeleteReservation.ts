import axiosInstance from '@/lib/apis/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteReservation = async (reservationId: number): Promise<void> => {
  await axiosInstance.delete(`reservations/${reservationId}`);
};

export const useDeleteReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tables'] });
    },
  });
};
