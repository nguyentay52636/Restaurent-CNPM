import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Order } from "../../DataOrder";

interface DialogViewDetailsProps {
  order: Order | null;
  onClose: () => void;
}

export default function DialogViewDetails({ order, onClose }: DialogViewDetailsProps) {
  const calculateTotalAmount = (orderItems: Order['order_items']) => {
    return orderItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (!order) return null;

  return (
    <Dialog open={!!order} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">Chi Tiết Đơn Hàng</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Left Column: Order Details and Products */}
          <div className="space-y-6 md:col-span-2">
            {/* Order Details */}
            <section className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Trạng thái</p>
                  <Badge variant="default" className="mt-1 bg-orange-500 text-white">
                    Đơn mới
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Ngày giao dịch</p>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(order.created_at)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Phương thức thanh toán</p>
                  <p className="mt-1 text-sm text-gray-900">Thẻ tín dụng hoặc ghi nợ</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-semibold">Phương thức vận chuyển</p>
                  <p className="mt-1 text-sm text-gray-900">Miễn phí vận chuyển (7-10 ngày)</p>
                </div>
              </div>
            </section>

            {/* Product List */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Đơn hàng của bạn</h3>
              <div className="space-y-4">
                {order.order_items.map((item) => (
                  <div
                    key={`${item.order_id}-${item.product_id}`}
                    className="flex justify-between items-start border-b border-gray-200 py-4"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 uppercase">{item.product.name}</p>
                      <p className="text-sm text-gray-500">{item.product.description}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.quantity} x {item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                      </p>
                    </div>
                    <p className="text-sm text-gray-900">
                      {(item.quantity * item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Customer Details */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Thông tin khách hàng</h3>
            <div>
              <p className="text-sm text-gray-500 font-semibold">Họ tên</p>
              <p className="mt-1 text-sm text-gray-900">{order.user.full_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-semibold">Tài khoản</p>
              <p className="mt-1 text-sm text-gray-900">
                {order.user.full_name.toLowerCase().replace(/\s+/g, '.') + '@mail.com'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-semibold">Địa chỉ</p>
              <p className="mt-1 text-sm text-gray-900">{order.user.address}</p>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-500 font-semibold">Tổng cộng</p>
              <p className="text-lg font-semibold text-gray-900">
                {calculateTotalAmount(order.order_items).toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </p>
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="default" className="bg-orange-500 hover:bg-orange-600 text-white cursor-pointer">
                Xử lý đơn hàng
              </Button>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}