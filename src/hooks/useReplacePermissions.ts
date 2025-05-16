import axiosInstance from '@/lib/apis/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UpdatePermissionsPayload {
  roleId: number;
  permissionIds: number[];
  replace?: boolean;
}

const updateRolePermissions = async ({
  roleId,
  permissionIds,
  replace = true,
}: UpdatePermissionsPayload) => {
  const response = await axiosInstance.post(
    `roles/${roleId}/permissions`,
    { permissionIds },
    { params: { replace } },
  );
  return response.data;
};

export const useReplacePermissions = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, UpdatePermissionsPayload>({
    mutationFn: updateRolePermissions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions'] });
    },
  });
};
