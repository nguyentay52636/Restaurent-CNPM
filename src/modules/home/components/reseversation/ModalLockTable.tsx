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

interface ModalLockTableProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  tables: { id: number; name: string }[];
  userId: number;
}

export default function ModalLockTable({
  open,
  onOpenChange,
  tables,
  userId,
}: ModalLockTableProps) {
  const [selectedTableIds, setSelectedTableIds] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelectedTableIds((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id],
    );
  };

  const handleConfirm = () => {
    const lockedTables = selectedTableIds.map((tableId) => ({
      tableId,
      userId,
      status: 'lock',
    }));

    const existing = JSON.parse(localStorage.getItem('lockedTables') || '[]');
    const updated = [...existing, ...lockedTables];

    localStorage.setItem('lockedTables', JSON.stringify(updated));

    setSelectedTableIds([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Khoá bàn</DialogTitle>
        </DialogHeader>

        <div className='space-y-2 max-h-[200px] overflow-auto mt-4'>
          {tables.map((table) => (
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
          <Button onClick={handleConfirm} disabled={selectedTableIds.length === 0}>
            Xác nhận khoá
          </Button>
          <DialogClose asChild>
            <Button variant='outline'>Huỷ</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
