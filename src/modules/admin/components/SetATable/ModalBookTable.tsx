import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { useTables } from '@/hooks/useTables';
import { toast } from 'sonner';

export default function ModalBookTable({
  open,
  onOpenChange,
  onSubmit,
  users,
  orders,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  users: { id: number; email: string }[];
  orders: { id: number; code: string }[];
  onSubmit: (tableIds: number[]) => void;
}) {
  const [selectedTableIds, setSelectedTableIds] = useState<number[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  const { tables: allTables } = useTables({
    page: 1,
    pageSize: 1000,
  });

  const reservedStatuses = ['pending', 'confirmed', 'checked_in'];

  const tables =
    allTables?.filter((table: any) => {
      const latestReservation = table.reservations?.[0];
      const isReserved = latestReservation && reservedStatuses.includes(latestReservation.status);
      return !isReserved;
    }) ?? [];

  const toggleSelect = (id: number) => {
    setSelectedTableIds((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id],
    );
  };

  const handleConfirm = () => {
    if (selectedUserId && selectedOrderId) {
      onSubmit({
        tableIds: selectedTableIds,
        userId: selectedUserId,
        orderId: selectedOrderId,
      });
    } else {
      toast.error('Chọn đủ các thông tin');
    }
    setSelectedTableIds([]);
    setSelectedUserId(null);
    setSelectedOrderId(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chọn bàn để đặt</DialogTitle>
        </DialogHeader>

        {/* Select User */}
        {/* Select User */}
        <div className='space-y-2'>
          <label className='block font-medium'>Chọn người dùng</label>
          <select
            className='w-full border border-gray-300 rounded-md p-2'
            value={selectedUserId ?? ''}
            onChange={(e) => setSelectedUserId(Number(e.target.value))}
          >
            <option value='' disabled>
              Chọn người dùng
            </option>
            <option key={users.id} value={users.id}>
              {users.email}
            </option>
          </select>
        </div>

        {/* Select Order */}
        <div className='space-y-2'>
          <label className='block font-medium'>Chọn đơn hàng</label>
          <select
            className='w-full border border-gray-300 rounded-md p-2'
            value={selectedOrderId ?? ''}
            onChange={(e) => setSelectedOrderId(Number(e.target.value))}
          >
            <option value='' disabled>
              Chọn đơn hàng
            </option>
            {orders.map((order) => (
              <option key={order.id} value={order.id}>
                Đơn #{order.code || order.id}
              </option>
            ))}
          </select>
        </div>

        {/* List Tables */}
        <div className='space-y-2 max-h-[200px] overflow-auto mt-4'>
          {tables?.map((table) => (
            <div key={table.id} className='flex items-center gap-2'>
              <Checkbox
                id={`table-${table.id}`}
                checked={selectedTableIds.includes(table.id)}
                onCheckedChange={() => toggleSelect(table.id)}
              />
              <label htmlFor={`table-${table.id}`}>Bàn {table.name || table.id}</label>
            </div>
          ))}
        </div>

        <DialogFooter className='mt-4'>
          <Button onClick={handleConfirm}>Xác nhận</Button>
          <DialogClose asChild>
            <Button variant='outline'>Hủy</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
