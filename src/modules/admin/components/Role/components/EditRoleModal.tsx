import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

interface EditRoleModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (roleId: number, newName: string) => void;
  roleId: number | null;
  currentName: string;
  loadingEditRoleModal: boolean;
}

export default function EditRoleModal({
  open,
  onClose,
  onSubmit,
  roleId,
  currentName,
  loadingEditRoleModal = false,
}: EditRoleModalProps) {
  const [name, setName] = useState('');

  // Cập nhật lại input khi tên hiện tại thay đổi
  useEffect(() => {
    setName(currentName);
  }, [currentName]);

  // Reset khi đóng modal
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen && !loadingEditRoleModal) {
      setName('');
      onClose();
    }
  };

  const handleSubmit = () => {
    if (roleId !== null && name.trim()) {
      onSubmit(roleId, name.trim());
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa tên quyền</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <Input
            placeholder='Nhập tên mới cho quyền...'
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loadingEditRoleModal}
          />
        </div>
        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => {
              if (!loadingEditRoleModal) {
                setName('');
                onClose();
              }
            }}
            disabled={loadingEditRoleModal}
          >
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            variant='default'
            size='sm'
            disabled={loadingEditRoleModal}
          >
            {loadingEditRoleModal ? 'Đang lưu...' : 'Lưu'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
