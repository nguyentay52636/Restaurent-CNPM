import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { X, Plus, Edit, Save } from 'lucide-react';
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
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [orderList, setOrderList] = useState<Order[]>(orders);
  const [editedItems, setEditedItems] = useState<OrderItem[]>([]);
  const [editedCustomerInfo, setEditedCustomerInfo] = useState({
    customer: '',
    tableNo: 0,
    guestCount: 0,
    paymentMethod: ''
  });
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [orderToChangeStatus, setOrderToChangeStatus] = useState<Order | null>(null);

  // When an order is selected for editing, initialize the editing state
  useEffect(() => {
    if (editingOrder) {
      setEditedItems([...editingOrder.items]);
      setEditedCustomerInfo({
        customer: editingOrder.customer,
        tableNo: editingOrder.tableNo,
        guestCount: editingOrder.guestCount,
        paymentMethod: editingOrder.paymentMethod
      });
    }
  }, [editingOrder]);

  const displayDetailsOrderHistory = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleEditOrder = (order: Order) => {
    setEditingOrder(order);
    setIsEditModalOpen(true);
  };

  const handleUpdateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedItems = [...editedItems];
    updatedItems[index].quantity = newQuantity;
    setEditedItems(updatedItems);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = [...editedItems];
    updatedItems.splice(index, 1);
    setEditedItems(updatedItems);
  };

  const handleCustomerInfoChange = (field: string, value: string | number) => {
    setEditedCustomerInfo({
      ...editedCustomerInfo,
      [field]: value
    });
  };

  const handleSaveChanges = () => {
    if (!editingOrder) return;

    // Create the updated order with edited information
    const updatedOrder: Order = {
      ...editingOrder,
      customer: editedCustomerInfo.customer,
      tableNo: editedCustomerInfo.tableNo,
      guestCount: editedCustomerInfo.guestCount,
      paymentMethod: editedCustomerInfo.paymentMethod,
      items: editedItems
    };

    // Update the order list with the changes
    const updatedOrderList = orderList.map(order =>
      order.id === updatedOrder.id ? updatedOrder : order
    );

    setOrderList(updatedOrderList);

    // If this was the selected order, update that as well
    if (selectedOrder && selectedOrder.id === updatedOrder.id) {
      setSelectedOrder(updatedOrder);
    }

    // Close the edit modal
    setIsEditModalOpen(false);
    setEditingOrder(null);

    // Show success toast
    toast.success('Đơn hàng đã được cập nhật thành công!');
  };

  const calculateTotal = (items: OrderItem[]) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleStatusChange = (order: Order) => {
    setOrderToChangeStatus(order);
    setIsStatusModalOpen(true);
  };

  const confirmStatusChange = () => {
    if (!orderToChangeStatus) return;

    // Toggle the status
    const newStatus = orderToChangeStatus.status === 'Đã thanh toán' ? 'Chưa thanh toán' : 'Đã thanh toán';

    // Create updated order with new status
    const updatedOrder: Order = {
      ...orderToChangeStatus,
      status: newStatus
    };

    // Update the order list
    const updatedOrderList = orderList.map(order =>
      order.id === updatedOrder.id ? updatedOrder : order
    );

    setOrderList(updatedOrderList);

    // If this was the selected order, update that as well
    if (selectedOrder && selectedOrder.id === updatedOrder.id) {
      setSelectedOrder(updatedOrder);
    }

    // Close the status modal
    setIsStatusModalOpen(false);
    setOrderToChangeStatus(null);

    // Show success toast
    toast.success(`Trạng thái đơn hàng đã được chuyển thành "${newStatus}"`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Left Panel: Order List */}
      <div className="w-1/3 p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Danh sách đơn hàng</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="bg-green-50 text-green-600 hover:bg-green-100">
              Đã thanh toán
            </Button>
            <Button variant="outline" size="sm" className="bg-gray-50 text-gray-600 hover:bg-gray-100">
              Chưa thanh toán
            </Button>
          </div>
        </div>
        <div className="space-y-3">
          {orderList.map((order) => (
            <Card
              key={order.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${selectedOrder?.id === order.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                }`}
              onClick={() => displayDetailsOrderHistory(order)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-semibold text-lg">#{order.id}</p>
                      <Badge
                        variant={order.status === 'Đã thanh toán' ? 'default' : 'secondary'}
                        className={`${order.status === 'Đã thanh toán'
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(order);
                        }}
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {new Date(order.created_at).toLocaleString('vi-VN')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600">
                      ${calculateTotal(order.items).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-3">
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {order.guestCount} khách
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Bàn {order.tableNo}
                      </span>
                    </div>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      {order.paymentMethod}
                    </span>
                  </div>
                  <div className="flex justify-between mt-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        displayDetailsOrderHistory(order);
                      }}
                    >
                      Xem chi tiết
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditOrder(order);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Chỉnh sửa
                    </Button>
                  </div>
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

      {/* Edit Order Dialog */}
      {editingOrder && (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Chỉnh sửa đơn hàng #{editingOrder.id}</DialogTitle>
            </DialogHeader>

            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Khách hàng</label>
                  <Input
                    value={editedCustomerInfo.customer}
                    onChange={(e) => handleCustomerInfoChange('customer', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phương thức thanh toán</label>
                  <Select
                    value={editedCustomerInfo.paymentMethod}
                    onValueChange={(value) => handleCustomerInfoChange('paymentMethod', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn phương thức" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tiền mặt">Tiền mặt</SelectItem>
                      <SelectItem value="Thẻ">Thẻ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bàn số</label>
                  <Input
                    type="number"
                    value={editedCustomerInfo.tableNo}
                    onChange={(e) => handleCustomerInfoChange('tableNo', parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Số khách</label>
                  <Input
                    type="number"
                    value={editedCustomerInfo.guestCount}
                    onChange={(e) => handleCustomerInfoChange('guestCount', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-2">Danh sách sản phẩm</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sản phẩm</TableHead>
                      <TableHead>Đơn giá</TableHead>
                      <TableHead>Số lượng</TableHead>
                      <TableHead>Thành tiền</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {editedItems.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <img
                              src={`/images/images_foot/foot_${item.product_id}.png`}
                              alt={item.product.name}
                              className="w-10 h-10 object-cover rounded"
                            />
                            <span>{item.product.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleUpdateQuantity(index, item.quantity - 1)}
                            >
                              -
                            </Button>
                            <Input
                              className="w-16 h-8 text-center"
                              value={item.quantity}
                              onChange={(e) => handleUpdateQuantity(index, parseInt(e.target.value) || 1)}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleUpdateQuantity(index, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleRemoveItem(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="mt-4 flex justify-between items-center">
                  <div className="text-lg font-bold">
                    Tổng cộng: ${calculateTotal(editedItems).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Hủy
              </Button>
              <Button
                className="bg-blue-500 hover:bg-blue-600"
                onClick={handleSaveChanges}
              >
                <Save className="h-4 w-4 mr-1" /> Lưu thay đổi
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Status Change Confirmation Dialog */}
      <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Xác nhận thay đổi trạng thái</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            {orderToChangeStatus && (
              <p>
                Bạn có chắc chắn muốn thay đổi trạng thái đơn hàng #{orderToChangeStatus.id} từ{' '}
                <strong>{orderToChangeStatus.status}</strong> sang{' '}
                <strong>
                  {orderToChangeStatus.status === 'Đã thanh toán' ? 'Chưa thanh toán' : 'Đã thanh toán'}
                </strong>?
              </p>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStatusModalOpen(false)}>
              Hủy
            </Button>
            <Button
              variant="default"
              className={orderToChangeStatus?.status === 'Đã thanh toán' ? 'bg-gray-500' : 'bg-green-500'}
              onClick={confirmStatusChange}
            >
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderHistoryManager;