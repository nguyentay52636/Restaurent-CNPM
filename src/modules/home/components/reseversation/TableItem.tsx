import { Button } from '@/components/ui/button';
import { Calendar, Clock, DollarSign, FileText, XCircle } from 'lucide-react';
import { useState } from 'react';
import TableDetailDialog from './TableDetailDialog';
import DeleteReservationConfirmModal from '@/modules/admin/components/SetATable/DeleteReservationConfirmModal';
import { useDeleteReservation } from '@/hooks/useDeleteReservation';

export default function TableItem({ tableData }: { tableData: any }) {
  const [open, setOpen] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState<number | null>(null);
  const [openTableDetail, setOpenTableDetail] = useState(false);
  const { mutate: deleteReservation, isPending } = useDeleteReservation();

  const latestReservation: any = tableData.reservations?.[0];
  const reservedStatuses: any[] = ['pending', 'confirmed', 'checked_in'];
  const isReserved: boolean =
    latestReservation && reservedStatuses.includes(latestReservation.status);

  const lockedInfo = JSON.parse(localStorage.getItem(`lockedTable-${tableData.id}`) || 'null');
  const isLocked = lockedInfo?.status === 'locked';

  const statusText: string = isLocked ? 'Đang khóa' : isReserved ? 'Đã đặt' : 'Trống';
  const statusColor: string = isLocked
    ? 'bg-yellow-100 text-yellow-800'
    : isReserved
      ? 'bg-red-100 text-red-800'
      : 'bg-green-100 text-green-800';
  const statusDot: string = isLocked ? 'bg-yellow-500' : isReserved ? 'bg-red-500' : 'bg-green-500';

  let totalPrice = 0;
  if (latestReservation?.orders?.length) {
    totalPrice = latestReservation.orders.reduce((orderAcc: number, order: any) => {
      const orderItemsTotal = order.orderItems.reduce((itemAcc: number, item: any) => {
        return itemAcc + Number(item.price) * item.quantity;
      }, 0);
      return orderAcc + orderItemsTotal;
    }, 0);
  }

  const handleConfirmDelete = () => {
    if (selectedReservationId) {
      deleteReservation(selectedReservationId, {
        onSuccess: () => {
          setOpen(false);
        },
      });
    }
  };

  const lockTable = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const lockedTable = {
      tableId: tableData.id,
      userId: currentUser.id,
      status: 'locked',
    };
    localStorage.setItem(`lockedTable-${tableData.id}`, JSON.stringify(lockedTable));
    window.location.reload();
  };

  const unlockTable = () => {
    const lockedTableStr = localStorage.getItem(`lockedTable-${tableData.id}`);
    if (!lockedTableStr) return;

    const lockedTable = JSON.parse(lockedTableStr);
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    if (lockedTable.userId === currentUser.id) {
      localStorage.removeItem(`lockedTable-${tableData.id}`);
      window.location.reload();
    } else {
      alert('Bạn không có quyền mở khóa bàn này.');
    }
  };

  return (
    <div
      className={`p-5 rounded-2xl shadow-lg w-full border transition-all duration-300 hover:shadow-xl ${
        isReserved ? 'bg-orange-200' : 'bg-orange-100'
      }`}
    >
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-xl font-bold text-gray-800'>Bàn số {tableData.id}</h3>
        <span
          className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 ${statusColor}`}
        >
          <div className={`w-2 h-2 rounded-full ${statusDot}`} />
          {statusText}
        </span>
      </div>

      <div className='mb-4 text-sm text-gray-600'>
        <span className='font-medium'>Sức chứa: </span> {tableData.seats} người
      </div>

      <div className='bg-white/60 rounded-xl p-4 space-y-3'>
        {latestReservation && (
          <div className='flex items-center gap-3 text-gray-700'>
            <Calendar className='w-5 h-5 text-gray-500' />
            <div className='flex flex-col'>
              <span className='text-sm text-gray-500'>Thời gian đặt</span>
              <span className='font-medium'>
                {new Date(latestReservation.reservationTime).toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {isReserved && (
          <div className='flex items-center gap-3 text-gray-700'>
            <DollarSign className='w-5 h-5 text-gray-500' />
            <div className='flex flex-col'>
              <span className='text-sm text-gray-500'>Tổng tiền</span>
              <span className='font-semibold text-gray-900'>
                {totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
              </span>
            </div>
          </div>
        )}
      </div>

      {latestReservation && (
        <div className='mt-4 p-3 bg-gray-50 rounded-lg space-y-1.5'>
          <div className='flex items-center gap-2 text-xs text-gray-500'>
            <Clock className='w-4 h-4' />
            <span>Tạo: {new Date(latestReservation.createdAt).toLocaleString()}</span>
          </div>
          <div className='flex items-center gap-2 text-xs text-gray-500'>
            <Clock className='w-4 h-4' />
            <span>Cập nhật: {new Date(latestReservation.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      )}

      <div className='mt-4 flex gap-2'>
        {isReserved && (
          <>
            <Button
              onClick={() => setOpenTableDetail(true)}
              className='flex-1 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2'
            >
              <FileText className='w-4 h-4' />
              Chi tiết
            </Button>
            <Button
              onClick={() => {
                setOpen(!open);
                setSelectedReservationId(latestReservation.id);
              }}
              className='flex-1 px-4 py-2 rounded-lg bg-destructive hover:bg-red-700 text-white text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2'
            >
              <XCircle className='w-4 h-4' />
              Huỷ
            </Button>
            <TableDetailDialog
              onClose={() => setOpenTableDetail(false)}
              open={openTableDetail}
              tableData={tableData}
            />
          </>
        )}

        {!isReserved && !isLocked && (
          <Button
            onClick={lockTable}
            className='w-full px-4 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2'
          >
            🔒 Khóa bàn
          </Button>
        )}

        {!isReserved && isLocked && (
          <Button
            onClick={unlockTable}
            className='w-full px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2'
          >
            🔓 Mở khóa
          </Button>
        )}
      </div>

      <DeleteReservationConfirmModal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirmDelete}
        reservationId={selectedReservationId || undefined}
        loading={isPending}
      />
    </div>
  );
}
