import { Role } from '@/hooks/useFetchAllRoles';
import axiosInstance from '@/lib/apis/axiosInstance';
import { useQuery } from '@tanstack/react-query';

export interface Permission {
  id: number;
  name: string;
  description: string;
  roles: Role[];
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  statusCode: number;
  message: string;
  data: Permission[];
}

const fetchPermissions = async (): Promise<ApiResponse> => {
  const response = await axiosInstance.get<ApiResponse>('permissions');
  return response.data;
};

export const useFetchAllPermissions = (currentPage: number, rowsPerPage: number) => {
  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ['permissions'],
    queryFn: fetchPermissions,
    staleTime: 5 * 60 * 1000,
  });

  const allPermissions = data?.data || [];
  const totalItems = allPermissions.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);

  const paginatedData = allPermissions.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return {
    permissions: paginatedData,
    totalItems,
    totalPages,
    isLoading,
    error,
  };
};
