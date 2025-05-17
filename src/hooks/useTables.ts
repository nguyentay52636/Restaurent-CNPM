import axiosInstance from '@/lib/apis/axiosInstance';
import { useQuery } from '@tanstack/react-query';

type SortBy = 'id' | 'name';
type Order = 'ASC' | 'DESC';

interface UseTablesParams {
  page: number;
  pageSize: number;
  sortBy?: SortBy;
  order?: Order;
  search?: string;
}

async function fetchTables() {
  const res = await axiosInstance.get<any>('tables');
  return res.data.data;
}

export function useTables({
  page,
  pageSize,
  sortBy = 'id',
  order = 'ASC',
  search = '',
}: UseTablesParams) {
  const { data, isLoading, error } = useQuery<any, Error>({
    queryKey: ['tables'],
    queryFn: fetchTables,
    staleTime: 1000 * 60 * 5,
  });

  const tables = data ?? [];

  const filteredTables = tables.filter((table: any) =>
    table.name.toLowerCase().includes(search.toLowerCase()),
  );

  const sortedTables = [...filteredTables].sort((a: any, b: any) => {
    let compare = 0;
    if (sortBy === 'id') {
      compare = a.id - b.id;
    } else if (sortBy === 'name') {
      compare = a.name.localeCompare(b.name);
    }
    return order === 'ASC' ? compare : -compare;
  });

  const paginatedTables = sortedTables.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredTables.length / pageSize);

  return {
    tables: paginatedTables,
    totalPages,
    isLoading,
    error: error?.message ?? null,
  };
}
