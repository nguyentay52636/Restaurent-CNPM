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
import { useGetRolesQuery, Role } from './querys';

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
  // Lấy dữ liệu vai trò từ API
  const { data: rolesData } = useGetRolesQuery();

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null;

    return sortDirection === 'asc'
      ? <ArrowUp className="h-4 w-4 ml-1 inline" />
      : <ArrowDown className="h-4 w-4 ml-1 inline" />;
  };

  // Hàm lấy tên vai trò dựa vào ID
  const getRoleName = (roleId: number | undefined) => {
    if (!roleId || !rolesData?.data) return 'Không xác định';

    const role = rolesData.data.find((r: Role) => r.id === roleId);
    return role?.name || 'Không xác định';
  };

  // Hàm lấy màu sắc cho từng loại vai trò
  const getRoleColor = (roleId: number | undefined) => {
    if (!roleId) return 'bg-gray-100 text-gray-800';
    if (roleId === 1) return 'bg-red-100 text-red-800'; // Admin
    if (roleId === 2) return 'bg-blue-100 text-blue-800'; // Người dùng
    if (roleId === 3) return 'bg-green-100 text-green-800'; // Nhân viên bán hàng
    if (roleId === 5) return 'bg-purple-100 text-purple-800'; // Bếp
    return 'bg-gray-100 text-gray-800'; // Vai trò khác
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
                {(() => {
                  const roleId = typeof customer.roleId === 'object' ? customer.roleId?.id : customer.roleId;
                  const roleName = typeof customer.roleId === 'object'
                    ? customer.roleId?.name
                    : getRoleName(roleId);

                  return (
                    <span className={`inline-block ${getRoleColor(roleId)} text-xs px-2 py-1 rounded-full`}>
                      {roleName}
                    </span>
                  );
                })()}
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
