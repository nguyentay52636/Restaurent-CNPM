import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface DeleteRoleConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  roleName?: string;
  loading: boolean;
}

export default function DeleteRoleConfirmModal({
  open,
  onClose,
  onConfirm,
  roleName,
  loading,
}: DeleteRoleConfirmModalProps) {
  const handleOpenChange = (openState: boolean) => {
    if (openState && !loading) {
      onClose();
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xác nhận xoá vai trò</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn muốn xoá vai trò
            <strong className='mx-1'>{roleName}</strong>
            không? Hành động này sẽ không thể hoàn tác.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading} onClick={onClose}>
            Huỷ
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={loading}
            className='bg-red-600 text-white hover:bg-red-700'
          >
            {loading ? 'Đang xoá...' : 'Xoá vai trò'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
