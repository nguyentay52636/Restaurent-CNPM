import { Reservation } from './tableData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Calendar, Clock, User, Utensils } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

// Mock customer data
const customerData = {
  name: 'Nguyễn Văn A',
  phone: '0123456789',
  email: 'nguyenvana@gmail.com',
};

// Mock order items
const orderItems = [
  {
    id: 1,
    name: 'Phở bò',
    quantity: 2,
    price: 50000,
  },
  {
    id: 2,
    name: 'Cơm rang',
    quantity: 1,
    price: 45000,
  },
  {
    id: 3,
    name: 'Nước ngọt',
    quantity: 3,
    price: 15000,
  },
];

export default function TableDetailDialog({
  tableData,
  open,
  onCloes,
}: {
  tableData: Reservation;
  open: boolean;
  onCloes: () => void;
}) {
  const handleCloseDialog = (isOpen: boolean) => {
    if (!isOpen) {
      onCloes();
    }
  };

  const totalAmount = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Dialog open={open} onOpenChange={handleCloseDialog}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold'>Chi tiết đặt bàn #{tableData.id}</DialogTitle>
          <DialogDescription>Xem chi tiết thông tin đặt bàn và order</DialogDescription>
        </DialogHeader>

        <div className='mt-6 space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle className='text-lg font-semibold flex items-center gap-2'>
                <User className='w-5 h-5' />
                Thông tin khách hàng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-sm text-gray-500'>Tên khách hàng</p>
                  <p className='font-medium'>{customerData.name}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Số điện thoại</p>
                  <p className='font-medium'>{customerData.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='text-lg font-semibold flex items-center gap-2'>
                <Calendar className='w-5 h-5' />
                Thông tin đặt bàn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-sm text-gray-500'>Thời gian đặt</p>
                  <p className='font-medium'>{tableData.reservation_time.toLocaleString()}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Trạng thái</p>
                  <p
                    className={`font-medium ${tableData.status === 'available' ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {tableData.status === 'available' ? 'Còn trống' : 'Đã đặt'}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Trạng thái thanh toán</p>
                  <p
                    className={`font-medium ${tableData.payment_status === 'paid' ? 'text-green-600' : 'text-orange-600'}`}
                  >
                    {tableData.payment_status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-gray-500'>Tổng tiền</p>
                  <p className='font-medium'>{tableData.total_price.toLocaleString()}đ</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='text-lg font-semibold flex items-center gap-2'>
                <Utensils className='w-5 h-5' />
                Danh sách món ăn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên món</TableHead>
                    <TableHead>Số lượng</TableHead>
                    <TableHead>Đơn giá</TableHead>
                    <TableHead className='text-right'>Thành tiền</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.price.toLocaleString()}đ</TableCell>
                      <TableCell className='text-right'>
                        {(item.price * item.quantity).toLocaleString()}đ
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}>Tổng cộng</TableCell>
                    <TableCell className='text-right'>{totalAmount.toLocaleString()}đ</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>

          <Separator />

          <div className='space-y-2'>
            <div className='flex items-center gap-2 text-sm text-gray-500'>
              <Clock className='w-4 h-4' />
              <span>Tạo: {tableData.created_at.toLocaleString()}</span>
            </div>
            <div className='flex items-center gap-2 text-sm text-gray-500'>
              <Clock className='w-4 h-4' />
              <span>Cập nhật: {tableData.updated_at.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
