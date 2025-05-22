import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/apis/axiosInstance';

async function fetchProducts(): Promise<any[]> {
  const res = await axiosInstance.get<{ statusCode: number; message: string; data: any[] }>(
    'products',
  );
  return res.data.data;
}

export function useProducts() {
  const { data, isLoading, error } = useQuery<any[], Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5, // cache 5 phút
  });

  return {
    orders: data ?? [],
    isLoading,
    error: error?.message ?? null,
  };
}
