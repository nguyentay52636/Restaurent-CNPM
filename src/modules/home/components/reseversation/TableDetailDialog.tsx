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
export default function TableDetailDialog({
  onClose,
  open,
  tableData,
}: {
  onClose: () => void;
  open: boolean;
  tableData: any;
}) {
  const handleCloseDialog = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  };

  const latestReservation = tableData.reservations?.[0];

  const customer = latestReservation?.user || {
    fullName: 'Chưa có dữ liệu',
    phone: '',
    email: '',
  };

  const orderItems = latestReservation?.orders?.flatMap((order: any) => order.orderItems) || [];

  const totalAmount = orderItems.reduce(
    (sum: number, item: any) => sum + Number(item.price) * item.quantity,
    0,
  );

  return (
    <Dialog open={open} onOpenChange={handleCloseDialog}>
      <DialogContent className='max-w-4xl min-w-5xl'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold'>Chi tiết đặt bàn #{tableData.id}</DialogTitle>
          <DialogDescription>Xem chi tiết thông tin đặt bàn và order</DialogDescription>
        </DialogHeader>

        <div className='mt-6 flex gap-6'>
          {/* Cột trái: Thông tin khách hàng + Thông tin đặt bàn */}
          <div className='flex flex-col gap-6 flex-1'>
            {/* Thông tin khách hàng */}
            <Card>
              <CardHeader>
                <CardTitle className='text-lg font-semibold flex items-center gap-2'>
                  <User className='w-5 h-5' />
                  Thông tin khách hàng
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 gap-4'>
                  <div>
                    <p className='text-sm text-gray-500'>Tên khách hàng</p>
                    <p className='font-medium'>{customer.fullName || 'Chưa có dữ liệu'}</p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Số điện thoại</p>
                    <p className='font-medium'>{customer.phone || '-'}</p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Email</p>
                    <p className='font-medium'>{customer.email || '-'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Thông tin đặt bàn */}
            <Card>
              <CardHeader>
                <CardTitle className='text-lg font-semibold flex items-center gap-2'>
                  <Calendar className='w-5 h-5' />
                  Thông tin đặt bàn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-1 gap-4'>
                  <div>
                    <p className='text-sm text-gray-500'>Thời gian đặt</p>
                    <p className='font-medium'>
                      {latestReservation
                        ? new Date(
                            latestReservation.reservationTime || latestReservation.created_at,
                          ).toLocaleString()
                        : 'Chưa có dữ liệu'}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Trạng thái</p>
                    <p
                      className={`font-medium ${
                        latestReservation?.status === 'available'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {latestReservation?.status === 'available' ? 'Còn trống' : 'Đã đặt'}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Trạng thái thanh toán</p>
                    <p
                      className={`font-medium ${
                        latestReservation?.orders?.some((order: any) =>
                          order.payments?.some(
                            (payment: any) => payment.status === 'ThanhToanThanhCong',
                          ),
                        )
                          ? 'text-green-600'
                          : 'text-orange-600'
                      }`}
                    >
                      {latestReservation?.orders?.some((order: any) =>
                        order.payments?.some(
                          (payment: any) => payment.status === 'ThanhToanThanhCong',
                        ),
                      )
                        ? 'Đã thanh toán'
                        : 'Chưa thanh toán'}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm text-gray-500'>Tổng tiền</p>
                    <p className='font-medium'>{totalAmount.toLocaleString('vi-VN')}đ</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cột phải: Danh sách món ăn */}
          <div className='flex-1'>
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
                    {orderItems.length > 0 ? (
                      orderItems.map((item: any) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.product.name}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>{Number(item.price).toLocaleString('vi-VN')}đ</TableCell>
                          <TableCell className='text-right'>
                            {(Number(item.price) * item.quantity).toLocaleString('vi-VN')}đ
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className='text-center'>
                          Chưa có món ăn
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={3}>Tổng cộng</TableCell>
                      <TableCell className='text-right'>
                        {totalAmount.toLocaleString('vi-VN')}đ
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className='my-6' />

        {/* Thời gian tạo & cập nhật */}
        <div className='space-y-2'>
          <div className='flex items-center gap-2 text-sm text-gray-500'>
            <Clock className='w-4 h-4' />
            <span>Tạo: {new Date(latestReservation.createdAt).toLocaleString('vi-VN')}</span>
          </div>
          <div className='flex items-center gap-2 text-sm text-gray-500'>
            <Clock className='w-4 h-4' />
            <span>Cập nhật: {new Date(latestReservation.updatedAt).toLocaleString('vi-VN')}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
