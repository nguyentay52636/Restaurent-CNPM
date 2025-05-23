import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/useUser';
import { Loader2 } from 'lucide-react';

interface LockedUserInfoModalProps {
  open: boolean;
  onClose: () => void;
  lockedInfo: {
    tableId: number;
    userId: number;
    status: string;
  } | null;
}

export default function LockedUserInfoModal({
  open,
  onClose,
  lockedInfo,
}: LockedUserInfoModalProps) {
  const { user, isLoading, error } = useUser(lockedInfo?.userId);
  console.log(user);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-sm'>
        <DialogHeader>
          <DialogTitle>Thông tin người khóa bàn</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className='flex items-center justify-center text-gray-500'>
            <Loader2 className='animate-spin w-5 h-5 mr-2' />
            Đang tải...
          </div>
        ) : error ? (
          <div className='text-red-500'>Không thể tải thông tin người dùng.</div>
        ) : lockedInfo && user ? (
          <div className='space-y-4 text-sm text-gray-700'>
            <div>
              <span className='font-medium'>ID Bàn:</span> {lockedInfo.tableId}
            </div>
            <div>
              <span className='font-medium'>Họ tên:</span> {user.fullname || 'Không có'}
            </div>
            <div>
              <span className='font-medium'>Email:</span> {user.email || 'Không có'}
            </div>
            <div>
              <span className='font-medium'>SĐT:</span> {user.phone || 'Không có'}
            </div>
            <div>
              <span className='font-medium'>Trạng thái:</span> {lockedInfo.status}
            </div>
          </div>
        ) : (
          <div className='text-gray-500'>Không có thông tin khóa bàn.</div>
        )}

        <div className='pt-4'>
          <Button onClick={onClose} className='w-full'>
            Đóng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
