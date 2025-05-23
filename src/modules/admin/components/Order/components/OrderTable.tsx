import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { MoreVertical, Info, Image as ImageIcon, Eye, ChevronDown } from 'lucide-react';
import { Order, OrderItem } from '../DataOrder';
import DialogOrderProduct from './Dialog/DialogOrderProduct';
import { updateOrder } from '@/lib/apis/orderApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

interface OrderTableProps {
  paginatedpayments: Order[];
  calculateTotalAmount: (orderItems: any[]) => number;
  handleViewDetails: (order: Order) => void;
  handleDelete: (id: number) => void;
  onStatusChange?: (orderId: number, newStatus: string) => void;
}

export default function OrderTable({
  paginatedpayments,
  calculateTotalAmount,
  handleViewDetails,
  handleDelete,
  onStatusChange,
}: OrderTableProps) {
  const [selectedOrderItems, setSelectedOrderItems] = useState<OrderItem[] | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const getFullImageUrl = (path: string, productName: string = '') => {
    if (!path || path.trim() === '') {
      const encodedName = encodeURIComponent(productName || 'Product');
      return `https://placehold.co/200x200/A27B5C/FFF?text=${encodedName}`;
    }
    if (/^https?:\/\//.test(path)) return path;
    const apiUrl = import.meta.env.VITE_API_URL as string;
    const baseUrl = apiUrl.replace(/\/api\/?$/, '');
    return `${baseUrl}${path}`;
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ChoDuyet':
        return 'Chờ Duyệt';
      case 'DaDuyet':
        return 'Đã Duyệt';
      case 'DaHuy':
        return 'Đã Hủy';
      default:
        return status;
    }
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      setIsUpdating(true);
      await updateOrder(orderId, { status: newStatus });
      toast.success('Cập nhật trạng thái đơn hàng thành công!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      if (onStatusChange) {
        onStatusChange(orderId, newStatus);
      }
    } catch (error) {
      toast.error('Cập nhật trạng thái đơn hàng thất bại!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error('Error updating order status:', error);
    } finally {
      setIsUpdating(false);
    }
  };
  console.log(paginatedpayments);

  return (
    <div className='border rounded-lg overflow-hidden'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[50px]'>
              <Checkbox />
            </TableHead>

            <TableHead>Mã hoá đơn</TableHead>
            <TableHead>Khách hàng</TableHead>
            <TableHead>Sản phẩm</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className='w-[50px]'>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedpayments.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                <div>{order.id}</div>
                <div className='text-sm text-muted-foreground'>
                  {new Date(order.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
              </TableCell>
              <TableCell>
                <div>{order.user?.email}</div>
                <div className='text-sm text-muted-foreground'>{order.user?.address}</div>
              </TableCell>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <span>{order.orderItems?.length} sản phẩm</span>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => setSelectedOrderItems(order.orderItems)}
                  >
                    <Eye className='h-4 w-4' />
                  </Button>
                </div>
              </TableCell>
              <TableCell>${calculateTotalAmount(order.orderItems)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' size='sm' className='flex items-center gap-2'>
                      <Badge
                        variant={
                          order.status === 'ChoDuyet'
                            ? 'default'
                            : order.status === 'DaDuyet'
                              ? 'secondary'
                              : 'destructive'
                        }
                      >
                        {getStatusLabel(order.status)}
                      </Badge>
                      <ChevronDown className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <div className='flex flex-col gap-2 p-2'>
                      <div className='flex items-center space-x-2'>
                        <Checkbox
                          id='choduyet'
                          checked={order.status === 'ChoDuyet'}
                          onCheckedChange={() => handleStatusChange(order.id, 'ChoDuyet')}
                          disabled={isUpdating}
                        />
                        <label htmlFor='choduyet'>Chờ Duyệt</label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Checkbox
                          id='daduyet'
                          checked={order.status === 'DaDuyet'}
                          onCheckedChange={() => handleStatusChange(order.id, 'DaDuyet')}
                          disabled={isUpdating}
                        />
                        <label htmlFor='daduyet'>Đã Duyệt</label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Checkbox
                          id='dahuy'
                          checked={order.status === 'DaHuy'}
                          onCheckedChange={() => handleStatusChange(order.id, 'DaHuy')}
                          disabled={isUpdating}
                        />
                        <label htmlFor='dahuy'>Đã Hủy</label>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell>
                <Link to={`/admin/settable/${order.id}`}>Đặt bàn</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DialogOrderProduct
        selectedOrderItems={selectedOrderItems || []}
        setSelectedOrderItems={setSelectedOrderItems}
      />
    </div>
  );
}
