import React, { useState, useMemo, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Order, OrderItem, User } from './DataOrder';
import OrderTable from './components/OrderTable';
import PaginationOrder from './components/PaginationOrder';
import DialogViewDetails from './components/Dialog/DialogViewDetails';
import OrderActions from './components/OrderActions';
import { toast } from 'sonner';
import { getAllOrders, deleteOrder } from '@/lib/apis/orderApi';
import { RobotoRegular } from './fontRoboto';

export default function OrderManager() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      // Transform the API response to match our Order interface
      const transformedOrders = Array.isArray(data) ? data.map((order: Order) => {
        const defaultUser: User = {
          id: 0,
          email: '',
          fullName: '',
          address: ''
        };

        return {
          id: order.id || 0,
          userId: order.user?.id || 0,
          status: order.status || 'ChoDuyet',
          createdAt: order.createdAt || new Date().toISOString(),
          user: order.user ? {
            id: order.user.id,
            email: order.user.email || '',
            fullName: order.user.fullName || '',
            address: order.user.address || ''
          } : defaultUser,
          orderItems: (order.orderItems || []).map(item => ({
            orderId: item.id || 0,
            productId: item.productId || 0,
            quantity: item.quantity || 0,
            price: Number(item.price) || 0,
            product: item.product ? {
              id: item.product.id,
              name: item.product.name || '',
              description: item.product.description || '',
              price: Number(item.product.price) || 0
            } : {
              id: 0,
              name: '',
              description: '',
              price: 0
            }
          }))
        };
      }) : [];
      setOrders(transformedOrders);
    } catch (error) {
      toast.error('Failed to fetch orders');
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Calculate total amount for an order
  const calculateTotalAmount = (orderItems: OrderItem[]) => {
    return orderItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = order.id.toString().includes(searchTerm) ||
        order.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  // Handlers
  const handleDelete = async (id: number) => {
    try {
      await deleteOrder(id);
      setOrders(orders.filter(order => order.id !== id));
      toast.success('Order deleted successfully');
    } catch (error) {
      toast.error('Failed to delete order');
      console.error('Error deleting order:', error);
    }
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      // Update the order status in the local state
      setOrders(orders.map(order =>
        order.id === orderId
          ? { ...order, status: newStatus }
          : order
      ));
      // Refresh the orders data from the server
      await fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  const exportBill = () => {
    const doc = new jsPDF();
    doc.addFileToVFS('Roboto-Regular.ttf', RobotoRegular);
    doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
    doc.setFont('Roboto');
    paginatedOrders.forEach((order, orderIndex) => {
      doc.setFontSize(14);
      doc.text(`HÓA ĐƠN #${order.id}`, 14, 15);
      doc.setFontSize(11);
      doc.text(`Khách hàng: ${order.user?.fullName || 'N/A'}`, 14, 25);
      doc.text(`Địa chỉ: ${order.user?.address || 'N/A'}`, 14, 32);
      doc.text(`Ngày tạo: ${new Date(order.createdAt).toLocaleDateString()}`, 14, 39);
      doc.text(`Trạng thái: ${order.status}`, 14, 46);

      const columns = ['STT', 'Tên sản phẩm', 'SL', 'Giá', 'Thành tiền'];
      const rows = order.orderItems.map((item: OrderItem, index: number) => {
        const product = item.product || {};
        const quantity = item.quantity;
        const price = item.price;
        const total = quantity * price;

        return [
          index + 1,
          product.name || 'Không rõ',
          quantity,
          `${price.toLocaleString()} đ`,
          `${total.toLocaleString()} đ`,
        ];
      });

      const totalAmount = order.orderItems.reduce((acc: number, item: OrderItem) => {
        return acc + item.quantity * item.price;
      }, 0);

      autoTable(doc, {
        head: [columns],
        body: rows,
        startY: 55,
        styles: { font: 'Roboto' },
        headStyles: { font: 'Roboto' },
      });

      const finalY = (doc as any).lastAutoTable.finalY + 10;
      doc.setFontSize(12);
      doc.text(`Tổng cộng: ${totalAmount.toLocaleString()} đ`, 14, finalY);

      if (orderIndex < orders.length - 1) {
        doc.addPage();
      }
    });

    doc.save('danh_sach_hoa_don.pdf');
    toast.success('Xuất hóa đơn thành công');
  };

  return (
    <div className="space-y-4">
      <OrderActions
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        exportBill={exportBill}
      />
      <OrderTable
        paginatedpayments={paginatedOrders}
        calculateTotalAmount={calculateTotalAmount}
        handleViewDetails={handleViewDetails}
        handleDelete={handleDelete}
        onStatusChange={handleStatusChange}
      />
      <PaginationOrder
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        totalItems={filteredOrders.length}
      />
      {selectedOrder && (
        <DialogViewDetails
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
