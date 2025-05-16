// CreateRoleModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';

interface CreateRoleModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (roleName: string) => void;
  loadingCreateRoleModal: boolean;
}

export default function CreateRoleModal({
  open,
  onClose,
  onCreate,
  loadingCreateRoleModal = false,
}: CreateRoleModalProps) {
  const [roleName, setRoleName] = useState('');

  const handleSubmit = () => {
    if (roleName.trim() === '') return;
    onCreate(roleName);
  };

  useEffect(() => {
    if (!open) {
      setRoleName('');
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen && !loadingCreateRoleModal) {
          setRoleName('');
          onClose();
        }
      }}
    >
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-xl font-semibold'>Tạo Vai Trò Mới</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <Input
            placeholder='Nhập tên vai trò...'
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />
        </div>
        <DialogFooter className='mt-4'>
          <Button
            variant='outline'
            onClick={() => {
              if (!loadingCreateRoleModal) {
                setRoleName('');
                onClose();
              }
            }}
            disabled={loadingCreateRoleModal}
          >
            Huỷ
          </Button>
          <Button onClick={handleSubmit} disabled={loadingCreateRoleModal}>
            {loadingCreateRoleModal ? 'Đang tạo...' : 'Tạo'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
