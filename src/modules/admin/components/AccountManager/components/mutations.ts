import { IAPIResponseWrapper, IUserDataType } from '@/lib/apis/types.';
import { addUserAPI, deleteUserAPI, updateUserAPI } from '@/lib/apis/userApi';
import { QueryFilters, useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  const handleDeleteUser = async (id: number) => {
    try {
      const { data } = await deleteUserAPI(id);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
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
    roleId: number;
    points?: number;
  }) => {
    try {
      // Always set points to 0 for new users regardless of what was provided
      const formattedData = {
        ...userData,
        points: 0
      };
      
      const response = await addUserAPI(formattedData);
      return response;
    } catch (error) {
      console.error("Add user API error:", error);
      throw error;
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
      
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return mutation;
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  const handleUpdateUser = async (userData: {
    id: number;
    fullName?: string;
    email: string;
    phone?: string;
    address?: string;
    roleId: number;
    points?: number;
  }) => {
    try {
      const { data } = await updateUserAPI(userData);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const mutation = useMutation({
    mutationKey: ['update-user'],
    mutationFn: handleUpdateUser,
    onSuccess: (updatedUser) => {
      const queryFilter: QueryFilters = {
        queryKey: ['users'],
      };
      queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<IAPIResponseWrapper<IUserDataType[]>>(queryFilter, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.map((user) => 
            user.id === (updatedUser as IUserDataType).id ? (updatedUser as IUserDataType) : user
          ),
        };
      });
    },
  });

  return mutation;
};
