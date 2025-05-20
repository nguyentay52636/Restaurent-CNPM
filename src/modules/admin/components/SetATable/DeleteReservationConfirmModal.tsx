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

interface DeleteReservationConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  reservationId?: number;
  loading: boolean;
}

export default function DeleteReservationConfirmModal({
  open,
  onClose,
  onConfirm,
  reservationId,
  loading,
}: DeleteReservationConfirmModalProps) {
  const handleOpenChange = (openState: boolean) => {
    if (openState && !loading) {
      onClose();
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xác nhận xoá đặt bàn</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn muốn xoá đặt bàn với ID
            <strong className='mx-1'>{reservationId}</strong>
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
            {loading ? 'Đang xoá...' : 'Xoá đặt bàn'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
