import { IAPIResponseWrapper, IUserDataType } from '@/lib/apis/types.';
import { addUserAPI, deleteUserAPI } from '@/lib/apis/userApi';
import { QueryFilters, useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  const handleDeleteUser = async (id: number) => {
    try {
      const { data } = await deleteUserAPI(id);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const mutation = useMutation({
    mutationKey: ['delete-user'],
    mutationFn: handleDeleteUser,
    onSuccess: (_, userId) => {
      const queryFilter: QueryFilters = {
        queryKey: ['users'],
      };
      queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<IAPIResponseWrapper<IUserDataType[]>>(queryFilter, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.filter((user) => user.id != userId),
        };
      });
    },
  });

  return mutation;
};

export const useAddUserMutation = () => {
  const queryClient = useQueryClient();

  const handleAddUser = async (userData: {
    fullName?: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    role_id?: number;
    points?: number;
  }) => {
    try {
      const { data } = await addUserAPI(userData);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const mutation = useMutation({
    mutationKey: ['add-user'],
    mutationFn: handleAddUser,
    onSuccess: (newUser) => {
      const queryFilter: QueryFilters = {
        queryKey: ['users'],
      };
      queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<IAPIResponseWrapper<IUserDataType[]>>(queryFilter, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: [...oldData.data, newUser as IUserDataType],
        };
      });
    },
  });

  return mutation;
};
