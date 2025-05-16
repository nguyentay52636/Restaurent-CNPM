import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useEffect, useState } from 'react';
import { useFetchAllPermissions } from '@/hooks/useFetchAllPermissions';

interface AddPermissionModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (roleId: number, selectedPermissionIds: number[]) => void; // sửa param thành permissionIds số
  roleId: number | null;
  loadingAddPermissionModal?: boolean;
}

export default function AddPermissionModal({
  open,
  onClose,
  onAdd,
  roleId,
  loadingAddPermissionModal = false,
}: AddPermissionModalProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]); // lưu id
  const [currentPage, setCurrentPage] = useState(1);

  const {
    permissions: paginatedData = [],
    totalItems = 0,
    totalPages = 1,
    isLoading,
    error,
  } = useFetchAllPermissions(currentPage, 7);

  // reset selected khi đóng modal
  useEffect(() => {
    if (!open) {
      setSelectedIds([]);
    }
  }, [open]);

  // khi mở modal, chọn các permission hiện có của role
  useEffect(() => {
    if (open && paginatedData && roleId !== null) {
      const matchedPermissionIds = paginatedData
        .filter((permission) => permission.roles.some((role: any) => role.id === roleId))
        .map((p) => p.id);

      setSelectedIds(matchedPermissionIds);
    }
  }, [open, paginatedData, roleId]);

  // toggle chọn permission theo id
  const togglePermission = (permissionId: number) => {
    setSelectedIds((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId],
    );
  };

  const handleSubmit = () => {
    if (roleId !== null) {
      onAdd(roleId, selectedIds);
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDialogOpenChange = (openState: boolean) => {
    if (loadingAddPermissionModal && !openState) {
      return;
    }
    if (!openState) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Thêm chức năng cho vai trò</DialogTitle>
        </DialogHeader>

        <div className='space-y-3 max-h-64 overflow-y-auto'>
          {isLoading && <div>Loading permissions...</div>}
          {error && <div>Error loading permissions!</div>}

          {paginatedData.map((permission) => (
            <div key={permission.id} className='flex items-center space-x-2'>
              <Checkbox
                id={`permission-${permission.id}`}
                checked={selectedIds.includes(permission.id)}
                onCheckedChange={() => togglePermission(permission.id)}
              />
              <label htmlFor={`permission-${permission.id}`} className='text-sm text-gray-700'>
                {permission.description || permission.name}
              </label>
            </div>
          ))}
        </div>

        <div className='flex justify-between mt-3'>
          <Button
            variant='outline'
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <div className='flex items-center'>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
          </div>
          <Button
            variant='outline'
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={onClose} disabled={loadingAddPermissionModal}>
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            variant='default'
            size='sm'
            disabled={selectedIds.length === 0 || loadingAddPermissionModal}
          >
            {loadingAddPermissionModal ? 'Đang cập nhật...' : 'Thêm chức năng'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
