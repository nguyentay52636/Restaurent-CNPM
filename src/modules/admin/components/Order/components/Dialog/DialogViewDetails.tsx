import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

import { Order, OrderItem } from '../../DataOrder';
import { Image as ImageIcon } from 'lucide-react';

interface DialogViewDetailsProps {
  order: Order | null;
  onClose: () => void;
}

export default function DialogViewDetails({ order, onClose }: DialogViewDetailsProps) {
  const calculateTotalAmount = (orderItems: OrderItem[]) => {
    return orderItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

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

  if (!order) return null;

  return (
    <Dialog open={!!order} onOpenChange={onClose}>
      <DialogContent className='max-w-5xl p-10 rounded-2xl'>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold text-gray-900'>Chi Tiết Đơn Hàng</DialogTitle>
          <DialogDescription>Xem thông tin chi tiết về đơn hàng và sản phẩm</DialogDescription>
        </DialogHeader>
        <div className='grid grid-cols-1 gap-10 md:grid-cols-3'>
          {/* Left Column: Order Details and Products */}
          <div className='space-y-6 md:col-span-2'>
            {/* Order Details */}
            <section className='space-y-4'>
              <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div>
                  <p className='text-sm text-gray-500 font-semibold'>Trạng thái</p>
                  <Badge variant='default' className='mt-1 bg-orange-500 text-white'>
                    {order.status}
                  </Badge>
                </div>
                <div>
                  <p className='text-sm text-gray-500 font-semibold'>Ngày giao dịch</p>
                  <p className='mt-1 text-sm text-gray-900'>{formatDate(order.createdAt)}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-500 font-semibold'>Phương thức thanh toán</p>
                  <p className='mt-1 text-sm text-gray-900'>Thẻ tín dụng hoặc ghi nợ</p>
                </div>
                <div>
                  <p className='text-sm text-gray-500 font-semibold'>Phương thức vận chuyển</p>
                  <p className='mt-1 text-sm text-gray-900'>Miễn phí vận chuyển (7-10 ngày)</p>
                </div>
              </div>
            </section>

            {/* Product List */}
            <section>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>Đơn hàng của bạn</h3>
              <div className='space-y-4'>
                {order.orderItems?.map((item: OrderItem) => (
                  <div
                    key={`${item.orderId}-${item.productId}`}
                    className='flex items-center gap-4 border-b border-gray-200 py-4'
                  >
                    <div className='w-28 h-28 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden'>
                      {item.product?.image ? (
                        <img
                          src={getFullImageUrl(item.product.image, item.product.name)}
                          alt={item.product.name || 'Product image'}
                          className='w-full h-full object-cover'
                          loading='lazy'
                        />
                      ) : (
                        <div className='flex flex-col items-center justify-center text-gray-400'>
                          <ImageIcon className='w-8 h-8 mb-1' />
                          <span className='text-xs'>No Image</span>
                        </div>
                      )}
                    </div>
                    <div className='flex-1'>
                      <p className='text-sm font-semibold text-gray-900 uppercase'>
                        {item.product?.name}
                      </p>
                      <p className='text-sm text-gray-500'>{item.product?.description}</p>
                      <p className='text-sm text-gray-600 mt-1'>
                        {item.quantity} x{' '}
                        {item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                      </p>
                    </div>
                    <p className='text-sm text-gray-900'>
                      {(item.quantity * item.price).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Customer Details */}
          <section className='space-y-4'>
            <h3 className='text-lg font-semibold text-gray-900'>Thông tin khách hàng</h3>
            <div>
              <p className='text-sm text-gray-500 font-semibold'>Họ tên</p>
              <p className='mt-1 text-sm text-gray-900'>{order.user?.fullName}</p>
            </div>
            <div>
              <p className='text-sm text-gray-500 font-semibold'>Tài khoản</p>
              <p className='mt-1 text-sm text-gray-900'>{order.user?.email}</p>
            </div>
            <div>
              <p className='text-sm text-gray-500 font-semibold'>Địa chỉ</p>
              <p className='mt-1 text-sm text-gray-900'>{order.user?.address}</p>
            </div>
            <div className='border-t border-gray-200 pt-4'>
              <p className='text-sm text-gray-500 font-semibold'>Tổng cộng</p>
              <p className='text-lg font-semibold text-gray-900'>
                {calculateTotalAmount(order.orderItems || []).toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </p>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
