import axiosInstance from '@/lib/apis/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteRole = async (roleId: number): Promise<void> => {
  await axiosInstance.delete(`roles/${roleId}`);
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
};
