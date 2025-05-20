import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/apis/axiosInstance';

async function fetchOrders(): Promise<any[]> {
  const res = await axiosInstance.get<{ statusCode: number; message: string; data: any[] }>(
    'orders',
  );
  return res.data.data;
}

export function useOrders() {
  const { data, isLoading, error } = useQuery<any[], Error>({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    staleTime: 1000 * 60 * 5, // cache 5 phút
  });

  return {
    orders: data ?? [],
    isLoading,
    error: error?.message ?? null,
  };
}
