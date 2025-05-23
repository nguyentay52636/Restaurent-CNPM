import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // ✅ THÊM DÒNG NÀY
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
import { useTables } from '@/hooks/useTables';
import { toast } from 'sonner';

export default function ModalBookTable({
  open,
  onOpenChange,
  onSubmit,
  users,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  users: { id: number; email: string }[];
  onSubmit: (data: { tableIds: number[]; userId: number; orderId: number }) => void;
}) {
  const { orderId } = useParams<{ orderId?: string }>();

  const [selectedTableIds, setSelectedTableIds] = useState<number[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [lockedTableIds, setLockedTableIds] = useState<number[]>([]);

  useEffect(() => {
    if (orderId) {
      setSelectedOrderId(Number(orderId));
    } else {
      toast.warning('Không tìm thấy orderId trên URL, vui lòng chọn lại đơn hàng.');
    }
  }, [orderId]);

  const { tables: allTables } = useTables({ page: 1, pageSize: 1000 });

  const reservedStatuses = ['pending', 'confirmed', 'checked_in'];

  const tables =
    allTables?.filter((table: any) => {
      const latestReservation = table.reservations?.[0];
      const isReserved = latestReservation && reservedStatuses.includes(latestReservation.status);
      return !isReserved;
    }) ?? [];

  useEffect(() => {
    const lockedIds: number[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('lockedTable-')) {
        try {
          const value = localStorage.getItem(key);
          if (value) {
            const obj = JSON.parse(value);
            if (obj.status === 'locked' && typeof obj.tableId === 'number') {
              lockedIds.push(obj.tableId);
            }
          }
        } catch (error) {
          console.error('Lỗi khi parse localStorage key', key, error);
        }
      }
    }
    setLockedTableIds(lockedIds);
  }, []);

  const toggleSelect = (id: number) => {
    if (lockedTableIds.includes(id)) {
      toast.error(`Bàn ${id} đang bị khóa, không thể chọn.`);
      return;
    }
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
      onOpenChange(false);
      setSelectedTableIds([]);
      setSelectedUserId(null);
    } else {
      toast.error('Vui lòng chọn đủ thông tin!');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chọn bàn để đặt</DialogTitle>
        </DialogHeader>

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
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.email}
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
