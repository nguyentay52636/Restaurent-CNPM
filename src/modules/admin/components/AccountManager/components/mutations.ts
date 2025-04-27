import { IAPIResponseWrapper, IUserDataType } from '@/lib/apis/types.';
import { deleteUserAPI } from '@/lib/apis/userApi';
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

      // Sử dụng setQueryData thay vì setQueriesData
      queryClient.setQueriesData<IAPIResponseWrapper<IUserDataType[]>>(queryFilter, (oldData) => {
        if (!oldData) return;
        return {
          ...oldData,
          data: oldData.data.filter((user) => user.id != userId),
        };
      });
    },
  });

  return mutation;
};
