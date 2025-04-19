import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DetailsOrderHistory from './DetailsOrderHistory';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  supplier_id: number;
  category_id: number | null;
  status: string;
  created_at: string;
  updated_at: string;
}

interface OrderItem {
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
  product: Product; // Joined product details
}

interface Order {
  id: number;
  user_id: number;
  status: 'Đã thanh toán' | 'Chưa thanh toán';
  created_at: string;
  updated_at: string;
  tableNo: number;
  guestCount: number;
  customer: string;
  paymentMethod: string;
  items: OrderItem[];
}

// Sample data based on the database schema
const orders: Order[] = [
  {
    id: 920235,
    user_id: 1,
    status: 'Đã thanh toán',
    created_at: '2025-04-18T10:00:00Z',
    updated_at: '2025-04-18T10:05:00Z',
    tableNo: 20,
    guestCount: 4,
    customer: 'Moones',
    paymentMethod: 'Tiền mặt',
    items: [
      {
        order_id: 920235,
        product_id: 1,
        quantity: 2,
        price: 30.0,
        created_at: '2025-04-18T10:00:00Z',
        updated_at: '2025-04-18T10:00:00Z',
        product: {
          id: 1,
          name: 'Bánh mì nướng',
          description: 'Củ dền, khoai tây, ớt chuông, gia vị bánh mì',
          price: 30.0,
          supplier_id: 1,
          category_id: 1,
          status: 'Có sẵn',
          created_at: '2025-04-01T00:00:00Z',
          updated_at: '2025-04-01T00:00:00Z',
        },
      },
      {
        order_id: 920235,
        product_id: 2,
        quantity: 3,
        price: 20.0,
        created_at: '2025-04-18T10:00:00Z',
        updated_at: '2025-04-18T10:00:00Z',
        product: {
          id: 2,
          name: 'Gà Popoyes',
          description: 'Củ dền, khoai tây, ớt chuông, gia vị bánh mì',
          price: 20.0,
          supplier_id: 1,
          category_id: 1,
          status: 'Có sẵn',
          created_at: '2025-04-01T00:00:00Z',
          updated_at: '2025-04-01T00:00:00Z',
        },
      },
      {
        order_id: 920235,
        product_id: 3,
        quantity: 4,
        price: 50.0,
        created_at: '2025-04-18T10:00:00Z',
        updated_at: '2025-04-18T10:00:00Z',
        product: {
          id: 3,
          name: 'Burger Bison',
          description: 'Củ dền, khoai tây, ớt chuông, gia vị bánh mì',
          price: 50.0,
          supplier_id: 1,
          category_id: 1,
          status: 'Có sẵn',
          created_at: '2025-04-01T00:00:00Z',
          updated_at: '2025-04-01T00:00:00Z',
        },
      },
      {
        order_id: 920235,
        product_id: 1,
        quantity: 2,
        price: 30.0,
        created_at: '2025-04-18T10:00:00Z',
        updated_at: '2025-04-18T10:00:00Z',
        product: {
          id: 1,
          name: 'Bánh mì nướng',
          description: 'Củ dền, khoai tây, ớt chuông, gia vị bánh mì',
          price: 30.0,
          supplier_id: 1,
          category_id: 1,
          status: 'Có sẵn',
          created_at: '2025-04-01T00:00:00Z',
          updated_at: '2025-04-01T00:00:00Z',
        },
      },
    ],
  },
  {
    id: 920236,
    user_id: 2,
    status: 'Chưa thanh toán',
    created_at: '2025-04-18T11:00:00Z',
    updated_at: '2025-04-18T11:05:00Z',
    tableNo: 20,
    guestCount: 4,
    customer: 'Nguyễn Văn A',
    paymentMethod: 'Thẻ',
    items: [],
  },
  {
    id: 920237,
    user_id: 3,
    status: 'Đã thanh toán',
    created_at: '2025-04-18T12:00:00Z',
    updated_at: '2025-04-18T12:05:00Z',
    tableNo: 20,
    guestCount: 4,
    customer: 'Trần Thị B',
    paymentMethod: 'Tiền mặt',
    items: [],
  },
  {
    id: 920238,
    user_id: 4,
    status: 'Chưa thanh toán',
    created_at: '2025-04-18T13:00:00Z',
    updated_at: '2025-04-18T13:05:00Z',
    tableNo: 20,
    guestCount: 4,
    customer: 'Lê Văn C',
    paymentMethod: 'Thẻ',
    items: [],
  },
  {
    id: 920239,
    user_id: 5,
    status: 'Đã thanh toán',
    created_at: '2025-04-18T14:00:00Z',
    updated_at: '2025-04-18T14:05:00Z',
    tableNo: 20,
    guestCount: 4,
    customer: 'Phạm Thị D',
    paymentMethod: 'Tiền mặt',
    items: [],
  },
];

const OrderHistoryManager: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const displayDetailsOrderHistory = (order: Order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Left Panel: Order List */}
      <div className="w-1/3 p-4">
        <h2 className="text-xl font-semibold mb-4">Tất cả đơn hàng</h2>
        <div className="space-y-2">
          {orders.map((order) => (
            <Card
              key={order.id}
              className={`cursor-pointer ${selectedOrder?.id === order.id ? 'border-blue-500' : ''
                }`}
              onClick={() => displayDetailsOrderHistory(order)}
            >
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">Đơn hàng #{order.id}</p>
                  <p className="text-sm text-gray-600">
                    Bàn số {order.tableNo} • Khách {order.guestCount}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold">
                    ${order.items
                      .reduce((sum, item) => sum + item.price * item.quantity, 0)
                      .toFixed(2)}
                  </span>
                  <Badge
                    variant={
                      order.status === 'Đã thanh toán' ? 'default' : 'secondary'
                    }
                    className={
                      order.status === 'Đã thanh toán'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-500 text-white'
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Panel: Order Details */}
      {selectedOrder ? (
        <DetailsOrderHistory order={selectedOrder} />
      ) : (
        <div className="w-2/3 p-4 flex items-center justify-center">
          <p className="text-gray-500">Vui lòng chọn một đơn hàng để xem chi tiết</p>
        </div>
      )}
    </div>
  );
};

export default OrderHistoryManager;