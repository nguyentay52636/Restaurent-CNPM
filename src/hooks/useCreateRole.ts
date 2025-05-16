import { Role } from '@/hooks/useFetchAllRoles';
import axiosInstance from '@/lib/apis/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CreateRolePayload {
  name: string;
}

const createRole = async (newRole: CreateRolePayload): Promise<Role> => {
  const response = await axiosInstance.post('roles', newRole);
  return response.data;
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
    },
  });
};
