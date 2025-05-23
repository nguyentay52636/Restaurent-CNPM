import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/apis/axiosInstance';

async function fetchUser(id: number): Promise<any> {
  const res = await axiosInstance.get<{ statusCode: number; message: string; data: any }>(
    `users/${id}`,
  );
  return res.data.data;
}

export function useUser(id: number) {
  const { data, isLoading, error } = useQuery<any, Error>({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
    enabled: !!id, // Chỉ chạy khi id hợp lệ
    staleTime: 1000 * 60 * 5,
  });

  return {
    user: data ?? null,
    isLoading,
    error: error?.message ?? null,
  };
}
