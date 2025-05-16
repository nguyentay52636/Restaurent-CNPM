import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/apis/axiosInstance';

export interface Role {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

type SortBy = 'id' | 'name';
type Order = 'ASC' | 'DESC';

interface UseRolesParams {
  page: number;
  pageSize: number;
  sortBy?: SortBy;
  order?: Order;
  search?: string; // thêm search
}

async function fetchRoles(): Promise<Role[]> {
  const res = await axiosInstance.get<{ statusCode: number; message: string; data: Role[] }>(
    'roles',
  );
  return res.data.data;
}

export function useRoles({
  page,
  pageSize,
  sortBy = 'id',
  order = 'ASC',
  search = '',
}: UseRolesParams) {
  const { data, isLoading, error } = useQuery<Role[], Error>({
    queryKey: ['roles'],
    queryFn: fetchRoles,
    staleTime: 1000 * 60 * 5,
  });

  const roles = data ?? [];

  // Filter theo search
  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(search.toLowerCase()),
  );

  // Sắp xếp
  const sortedRoles = [...filteredRoles].sort((a, b) => {
    let compare = 0;
    if (sortBy === 'id') {
      compare = a.id - b.id;
    } else if (sortBy === 'name') {
      compare = a.name.localeCompare(b.name);
    }
    return order === 'ASC' ? compare : -compare;
  });

  // Phân trang
  const paginatedRoles = sortedRoles.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredRoles.length / pageSize);

  return {
    roles: paginatedRoles,
    totalPages,
    isLoading,
    error: error?.message ?? null,
  };
}
