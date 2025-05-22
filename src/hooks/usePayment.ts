import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/apis/axiosInstance';

async function fetchPayments(): Promise<any[]> {
  const res = await axiosInstance.get<{ statusCode: number; message: string; data: any[] }>(
    'payments',
  );
  return res.data.data;
}

export function usePayments() {
  const { data, isLoading, error } = useQuery<any[], Error>({
    queryKey: ['payments'],
    queryFn: fetchPayments,
    staleTime: 1000 * 60 * 5, 
  });

  return {
    orders: data ?? [],
    isLoading,
    error: error?.message ?? null,
  };
}

const deletePaymentItem = async (paymentId: number): Promise<void> => {
  await axiosInstance.delete(`payments/${paymentId}`);
};

export const useDeletePaymentItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePaymentItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
    },
  });
};
