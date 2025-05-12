import { getAllUserAPI } from '@/lib/apis/userApi';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getRolesAPI } from '@/lib/apis/rolesApi';

// Define role interface
export interface Role {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export const useGetAllUserQuery = () => {
  const handleGetAllUser = async () => {
    try {
      const data = await getAllUserAPI();
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
    }
  };

  const query = useQuery({
    queryKey: ['users'],
    queryFn: handleGetAllUser,
  });

  return query;
};

export const useGetRolesQuery = () => {
  const handleGetRoles = async () => {
    try {
      const data = await getRolesAPI();
      return data;
    } catch (error) {
      console.error("Failed to fetch roles:", error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ['roles'],
    queryFn: handleGetRoles,
  });
};
