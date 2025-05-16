import { Role } from '@/hooks/useFetchAllRoles';
import axiosInstance from '@/lib/apis/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UpdateRolePayload {
  roleId: number;
  name?: string;
}

const updateRole = async ({ roleId, ...data }: UpdateRolePayload): Promise<Role> => {
  const response = await axiosInstance.patch(`roles/${roleId}`, data);
  return response.data;
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
};
