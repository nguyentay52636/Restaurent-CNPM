import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/apis/axiosInstance';

async function fetchUsers(): Promise<any[]> {
  const res = await axiosInstance.get<{ statusCode: number; message: string; data: any[] }>(
    'users',
  );
  return res.data.data;
}

export function useUsers() {
  const { data, isLoading, error } = useQuery<any[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5,
  });

  return {
    users: data ?? [],
    isLoading,
    error: error?.message ?? null,
  };
}
