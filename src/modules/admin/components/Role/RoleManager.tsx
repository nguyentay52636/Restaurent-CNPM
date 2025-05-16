import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import PaginationRole from '@/modules/admin/components/Role/components/PaginationRole';
import { useRoles } from '@/hooks/useFetchAllRoles';
import CreateRoleModal from '@/modules/admin/components/Role/components/CreateRoleModal';
import AddPermissionModal from '@/modules/admin/components/Role/components/AddPermissionModal';
import EditRoleModal from '@/modules/admin/components/Role/components/EditRoleModal';
import { useCreateRole } from '@/hooks/useCreateRole';
import { toast } from 'sonner';
import { useReplacePermissions } from '@/hooks/useReplacePermissions';
import { useUpdateRole } from '@/hooks/useUpdateRole';
import DeleteRoleConfirmModal from '@/modules/admin/components/Role/components/DeleteRoleConfirmModal';
import { useDeleteRole } from '@/hooks/useDeleteRole';

type SortBy = 'id' | 'name';
type Order = 'ASC' | 'DESC';

export default function RoleManager() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [sortBy, setSortBy] = useState<SortBy>('id');
  const [order, setOrder] = useState<Order>('ASC');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editRoleId, setEditRoleId] = useState<number | null>(null);
  const [editRoleName, setEditRoleName] = useState('');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRoleName, setSelectedRoleName] = useState('');
  const [selectedRoleIdToDelete, setSelectedRoleIdToDelete] = useState<number | null>(null);

  const { roles, totalPages, isLoading, error } = useRoles({
    page: currentPage,
    pageSize: rowsPerPage,
    sortBy,
    order,
    search: search.toLowerCase(),
  });

  const createRoleMutation = useCreateRole();
  const replacePermissionsMutation = useReplacePermissions();
  const updateRoleMutation = useUpdateRole();
  const deleteRoleMutation = useDeleteRole();

  const handleEdit = (role: any) => {
    setEditRoleId(role.id);
    setEditRoleName(role.name);
    setIsEditModalOpen(true);
  };

  const handleDelete = (role: any) => {
    setSelectedRoleIdToDelete(role.id);
    setSelectedRoleName(role.name);
    setIsDeleteModalOpen(true);
  };

  const handleCreateRole = (roleName: string) => {
    createRoleMutation.mutate(
      { name: roleName },
      {
        onSuccess: () => {
          toast.success('Tạo role thành công');
          setIsModalOpen(false);
        },
        onError: (error) => {
          toast.error('Tạo role thất bại');
          console.error('Tạo role thất bại:', error);
        },
      },
    );
  };

  const handleAddPermission = (roleId: number) => {
    setSelectedRoleId(roleId);
    setIsPermissionModalOpen(true);
  };

  const handlePermissionSubmit = (roleId: number, permissionIds: number[]) => {
    replacePermissionsMutation.mutate(
      { roleId, permissionIds, replace: true },
      {
        onSuccess: () => {
          toast.success('Cập nhật quyền thành công');
          setIsPermissionModalOpen(false);
          setSelectedRoleId(null);
        },
        onError: (error) => {
          toast.error('Cập nhật quyền thất bại');
          console.error(error);
        },
      },
    );
  };

  const handleUpdateRole = (roleId: number, newName: string) => {
    updateRoleMutation.mutate(
      { roleId, name: newName },
      {
        onSuccess: () => {
          toast.success('Cập nhật vai trò thành công');
          setIsEditModalOpen(false);
        },
        onError: (error) => {
          toast.error('Cập nhật vai trò thất bại');
          console.error('Lỗi khi cập nhật vai trò:', error);
        },
      },
    );
  };

  const handleConfirmDelete = () => {
    if (!selectedRoleIdToDelete) return;
    deleteRoleMutation.mutate(selectedRoleIdToDelete, {
      onSuccess: () => {
        toast.success('Xoá vai trò thành công');
        setIsDeleteModalOpen(false);
      },
      onError: (error) => {
        toast.error('Xoá vai trò thất bại');
        console.error('Lỗi khi xoá vai trò:', error);
      },
    });
  };

  const handleSort = (column: SortBy) => {
    if (sortBy === column) {
      setOrder(order === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortBy(column);
      setOrder('ASC');
    }
    setCurrentPage(1);
  };

  if (isLoading) return <div className='p-6'>Đang tải dữ liệu...</div>;
  if (error) return <div className='p-6 text-red-500'>Lỗi khi tải danh sách vai trò.</div>;

  return (
    <div className='p-6 bg-white rounded-xl shadow-sm'>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <h1 className='text-3xl font-bold text-gray-800'>Danh Sách Quyền</h1>
          <nav className='text-sm text-gray-500'>
            <span>Trang chủ</span> / <span>Tài khoản</span> / <span>Danh sách quyền</span>
          </nav>
        </div>
        <div className='flex space-x-4'>
          <Input
            placeholder='Tìm kiếm vai trò...'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className='w-64'
          />
          <Button
            onClick={() => setIsModalOpen(true)}
            className='bg-orange-500 hover:bg-orange-600 text-white'
          >
            + Tạo quyền
          </Button>
        </div>
      </div>

      <div className='overflow-auto rounded-lg border'>
        <table className='w-full text-sm text-left'>
          <thead className='bg-gray-100 text-gray-700 uppercase'>
            <tr>
              <th className='cursor-pointer px-4 py-3 select-none' onClick={() => handleSort('id')}>
                ID{' '}
                {sortBy === 'id' &&
                  (order === 'ASC' ? (
                    <ChevronUp className='inline-block w-4 h-4' />
                  ) : (
                    <ChevronDown className='inline-block w-4 h-4' />
                  ))}
              </th>
              <th
                className='cursor-pointer px-4 py-3 select-none'
                onClick={() => handleSort('name')}
              >
                Tên vai trò{' '}
                {sortBy === 'name' &&
                  (order === 'ASC' ? (
                    <ChevronUp className='inline-block w-4 h-4' />
                  ) : (
                    <ChevronDown className='inline-block w-4 h-4' />
                  ))}
              </th>
              <th className='px-4 py-3 text-right'>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {roles.length > 0 ? (
              roles.map((role) => {
                const isFixedRole = role.name === 'Người dùng' || role.name === 'Quản trị';

                return (
                  <tr key={role.id} className='border-t hover:bg-gray-50'>
                    <td className='px-4 py-2'>{role.id}</td>
                    <td className='px-4 py-2'>{role.name}</td>
                    <td className='px-4 py-2 text-right space-x-2'>
                      {!isFixedRole && (
                        <>
                          <Button
                            variant='default'
                            size='sm'
                            onClick={() => handleAddPermission(role.id)}
                          >
                            + Thêm chức năng
                          </Button>
                          <Button variant='outline' size='sm' onClick={() => handleEdit(role)}>
                            <Pencil className='w-4 h-4 mr-1' /> Chỉnh sửa
                          </Button>
                          <Button
                            variant='destructive'
                            size='sm'
                            onClick={() => handleDelete(role)}
                          >
                            <Trash2 className='w-4 h-4 mr-1' /> Xoá
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={3} className='text-center py-4 text-gray-500'>
                  Không tìm thấy vai trò nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <CreateRoleModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateRole}
        loadingCreateRoleModal={createRoleMutation.isPending}
      />

      <AddPermissionModal
        open={isPermissionModalOpen}
        onClose={() => setIsPermissionModalOpen(false)}
        onAdd={handlePermissionSubmit}
        loadingAddPermissionModal={replacePermissionsMutation.isPending}
        roleId={selectedRoleId}
      />

      <EditRoleModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdateRole}
        roleId={editRoleId}
        currentName={editRoleName}
        loadingEditRoleModal={updateRoleMutation.isPending}
      />

      <DeleteRoleConfirmModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        roleName={selectedRoleName}
        loading={deleteRoleMutation.isPending}
      />

      <div className='mt-4'>
        <PaginationRole
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
