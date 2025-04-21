import { tableData } from './tableData';
import TableItem from './TableItem';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function SetATable() {
  const [data, setData] = useState(tableData);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredData =
    filterStatus === 'all' ? data : data.filter((table) => table.status === filterStatus);

  useEffect(() => {
    if (filterStatus === 'available') {
      setData(tableData.filter((table) => table.status === 'available'));
    } else if (filterStatus === 'booked') {
      setData(tableData.filter((table) => table.status === 'booked'));
    } else {
      setData(tableData);
    }
  }, [filterStatus]);

  return (
    <div className='w-full p-2'>
      <h1 className='text-3xl bg-transparent font-bold mb-6'>Đặt bàn</h1>

      {/* Table Filter */}
      <div className='mb-6'>
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
      </div>

      {/* tables */}
      <div className='grid grid-cols-1 lg:grid-cols-3  md:grid-cols-2 gap-4 '>
        {filteredData.map((table) => (
          <TableItem key={table.id} tableData={table} />
        ))}
      </div>
    </div>
  );
}
