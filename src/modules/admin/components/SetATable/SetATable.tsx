import TableItem from './TableItem';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTables } from '@/hooks/useTables';
import PaginationTable from '@/modules/admin/components/SetATable/PaginationTable';
import { Button } from '@/components/ui/button';
import ModalBookTable from '@/modules/admin/components/SetATable/ModalBookTable';
import { useUsers } from '@/hooks/useUsers';
import { useOrders } from '@/hooks/useOrders';
import { useCreateReservation } from '@/hooks/useCreateReservation';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';

export default function SetATable() {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'id' | 'name'>('id');
  const [order, setOrder] = useState<'ASC' | 'DESC'>('ASC');
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'booked'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { orderId } = useParams<{ orderId?: string }>();
  const dataTables = useTables({
    page,
    pageSize,
    search,
    sortBy,
    order,
  });
  const dataUsers = useUsers();
  const createReseversation = useCreateReservation();
  const usersNotRole2 = dataUsers.users.filter((user) => user.roleId === 2);

  const filteredTables = dataTables?.tables?.filter((table) => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'available') return table.reservations.length === 0;
    if (filterStatus === 'booked') return table.reservations.length > 0;
    return true;
  });

  const handleSubmit = (payload: any) => {
    createReseversation.mutate(payload, {
      onSuccess: (data) => {
        toast.success('Đặt bàn thành công');
        console.log('Tạo reservation thành công:', data);
      },
      onError: (error) => {
        toast.error('Đặt bàn thất bại');
        console.error('Tạo reservation thất bại:', error);
      },
    });
  };
  const checkOrderId = () => {
    if (orderId) {
      setIsModalOpen(true);
    } else {
      navigate('/admin/orders');
      toast.error('Không tìm thấy orderId trên URL, vui lòng chọn lại đơn hàng.');
    }
  };

  return (
    <div className='w-full p-2'>
      <h1 className='text-3xl bg-transparent font-bold mb-6'>Đặt bàn</h1>

      {/* Table Filter */}
      <div className='mb-6 flex items-center justify-between'>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className='w-[200px]'>
            <SelectValue placeholder='Lọc theo trạng thái' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>Tất cả</SelectItem>
            <SelectItem value='available'>Còn trống</SelectItem>
            <SelectItem value='booked'>Đã đặt</SelectItem>
          </SelectContent>
        </Select>

        <Button
          onClick={() => checkOrderId()}
          className='bg-orange-500 hover:bg-orange-600 text-white'
        >
          + Đặt bàn
        </Button>
      </div>

      {/* tables */}
      <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4'>
        {dataTables.isLoading ? (
          <div className='col-span-full text-center py-10 text-gray-500'>Đang tải dữ liệu...</div>
        ) : (
          filteredTables?.map((table) => <TableItem key={table.id} tableData={table} />)
        )}
      </div>

      <ModalBookTable
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        users={usersNotRole2}
        onSubmit={handleSubmit}
      />

      <PaginationTable
        currentPage={page}
        totalPages={dataTables?.totalPages || 1}
        onPageChange={setPage}
      />
    </div>
  );
}
