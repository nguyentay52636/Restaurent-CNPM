import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, Pencil, Trash2 } from 'lucide-react';
import { IUserDataType } from '@/lib/apis/types.';

type SortField = 'email' | 'fullName' | 'phone' | 'address' | 'points' | 'roleId';
type SortDirection = 'asc' | 'desc';

interface AccountTableProps {
  customers: IUserDataType[];
  onEdit: (customer: IUserDataType) => void;
  onDelete: (customer: IUserDataType) => void;
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

export default function AccountTable({
  customers,
  onEdit,
  onDelete,
  sortField,
  sortDirection,
  onSort
}: AccountTableProps) {

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null;

    return sortDirection === 'asc'
      ? <ArrowUp className="h-4 w-4 ml-1 inline" />
      : <ArrowDown className="h-4 w-4 ml-1 inline" />;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead
            className='text-gray-500 font-semibold cursor-pointer'
            onClick={() => onSort('email')}
          >
            Email {renderSortIcon('email')}
          </TableHead>
          <TableHead
            className='text-gray-500 font-semibold cursor-pointer'
            onClick={() => onSort('fullName')}
          >
            Họ và tên {renderSortIcon('fullName')}
          </TableHead>
          <TableHead
            className='text-gray-500 font-semibold cursor-pointer'
            onClick={() => onSort('phone')}
          >
            Số điện thoại {renderSortIcon('phone')}
          </TableHead>
          <TableHead
            className='text-gray-500 font-semibold cursor-pointer'
            onClick={() => onSort('address')}
          >
            Địa chỉ {renderSortIcon('address')}
          </TableHead>
          <TableHead
            className='text-gray-500 font-semibold cursor-pointer'
            onClick={() => onSort('points')}
          >
            Điểm tích lũy {renderSortIcon('points')}
          </TableHead>
          <TableHead
            className='text-gray-500 font-semibold cursor-pointer'
            onClick={() => onSort('roleId')}
          >
            Vai trò {renderSortIcon('roleId')}
          </TableHead>
          <TableHead className='text-gray-500 font-semibold cursor-default'>Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.length > 0 ? (
          customers.map((customer) => (
            <TableRow key={customer.id} className='hover:bg-gray-50'>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.fullName || 'Chưa cập nhật'}</TableCell>
              <TableCell>{customer.phone || 'Chưa cập nhật'}</TableCell>
              <TableCell>{customer.address || 'Chưa cập nhật'}</TableCell>
              <TableCell>{customer.points}</TableCell>
              <TableCell>
                <span className='inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full'>
                  {customer.roleId?.name || 'Không xác định'}
                </span>
              </TableCell>
              <TableCell>
                <div className='flex space-x-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    className='text-green-600 border-green-600 hover:bg-green-50'
                    onClick={() => onEdit(customer)}
                  >
                    <Pencil className='h-4 w-4 mr-1' />
                    Sửa
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    className='text-orange-600 border-orange-600 hover:bg-orange-50'
                    onClick={() => onDelete(customer)}
                  >
                    <Trash2 className='h-4 w-4 mr-1' />
                    Xóa
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className='text-center text-gray-500'>
              Không tìm thấy người dùng nào
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
