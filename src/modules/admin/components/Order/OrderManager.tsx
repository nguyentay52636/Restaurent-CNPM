import React, { useState, useMemo, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Order, OrderItem } from './DataOrder';
import OrderTable from './components/OrderTable';
import PaginationOrder from './components/PaginationOrder';
import DialogViewDetails from './components/Dialog/DialogViewDetails';
import OrderActions from './components/OrderActions';
import { useUsers } from '@/hooks/useUsers';
import { useDeleteOrderItem } from '@/hooks/useDeleteOrder';
import { toast } from 'sonner';
import { useProducts } from '@/hooks/useProducts';
import { useDeletePaymentItem, usePayments } from '@/hooks/usePayment';
import { RobotoRegular } from './fontRoboto';

export default function OrderManager() {
  // Sample data
  const [payments, setPayments] = useState<Order[]>([]);
  console.log('payments :>> ', payments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const rowsPerPage = 5;
  const dataPayment = usePayments();
  console.log('dataPayment :>> ', dataPayment);
  useEffect(() => {
    if (dataPayment) {
      setPayments(dataPayment.orders);
    }
  }, [dataPayment]);
  // Calculate total amount for an order
  const calculateTotalAmount = (orderItems: OrderItem[]) => {
    return orderItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };


  const filteredpayments = useMemo(() => {
    console.log('payments :>> ', payments);
    // return payments.map((order) => {
    //   const user = userMap.get(order.userId);

    //   const orderItemsWithProduct = order?order?.orderItems.map((item) => {
    //     const product = ProductMap.get(item.productId);
    //     return {
    //       ...item,
    //       product: product || null,
    //     };
    //   });

    //   return {
    //     ...order,
    //     user: user || null,
    //     orderItems: orderItemsWithProduct,
    //   };
    // });
  }, []);
  const deletePaymentItemMutation = useDeletePaymentItem();
  const totalPages = Math.ceil(payments.length / rowsPerPage);
  const paginatedpayments = payments.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  // Handlers
  const handleDelete = (id: number) => {
    deletePaymentItemMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Xoá đơn hàng thành công');
      },
      onError: (error) => {
        toast.error('Xoá đơn hàng thất bại');
        console.error('Lỗi khi xoá đơn hàng:', error);
      },
    });
    // setPayments(payments.filter((order) => order.id !== id));
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
  };
const exportBill = () => {
  console.log('exportBill :>> ');
  const doc = new jsPDF();
  doc.addFileToVFS('Roboto-Regular.ttf', RobotoRegular); 
  doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
  doc.setFont('Roboto');
  paginatedpayments.forEach((order, orderIndex) => {
    
    doc.setFontSize(14);
    doc.text(`HÓA ĐƠN #${order.id}`, 14, 15);
    doc.setFontSize(11);
    doc.text(`Khách hàng: ${order?.order?.user?.fullName || 'N/A'}`, 14, 25);
    doc.text(`Địa chỉ: ${order?.order?.user?.address || 'N/A'}`, 14, 32);
    doc.text(`Ngày tạo: ${new Date(order.createdAt ).toLocaleDateString()}`, 14, 39);
    doc.text(`Trạng thái: ${order.status==="ThanhToanThanhCong"?"Thanh toán thành công":""}`, 14, 46);

    
    const columns = ['STT', 'Tên sản phẩm', 'SL', 'Giá', 'Thành tiền'];
    const rows = order?.order?.orderItems.map((item, index) => {
      const product = item.product || {};
      const quantity = item.quantity;
      const price = parseFloat(
        typeof product.price === 'number'
          ? product.price.toString()
          : product.price || (typeof item.price === 'number' ? item.price.toString() : item.price) || '0'
      );
      const total = quantity * price;

      return [
        index + 1,
        product.name || 'Không rõ',
        quantity,
        `${price.toLocaleString()} đ`,
        `${total.toLocaleString()} đ`,
      ];
    });

    const totalAmount = order?.order?.orderItems.reduce((acc, item) => {
      const price = parseFloat(
        typeof item.product?.price === 'number'
          ? item.product?.price.toString()
          : item.product?.price || (typeof item.price === 'number' ? item.price.toString() : item.price) || '0'
      );
      return acc + item.quantity * price;
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

  
    if (orderIndex < payments.length - 1) {
      doc.addPage();
    }
  });

  doc.save('danh_sach_hoa_don.pdf');
  toast.success('Xuất hóa đơn thành công');
};
  return (
    <div className='p-6 mx-auto bg-white shadow-md rounded-lg min-h-screen'>
    
      <OrderActions
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        exportBill={exportBill}
      />

      <OrderTable
        paginatedpayments={paginatedpayments}
        calculateTotalAmount={calculateTotalAmount}
        handleViewDetails={handleViewDetails}
        handleDelete={handleDelete}
      />

      <DialogViewDetails order={selectedOrder} onClose={() => setSelectedOrder(null)} />

      {/* Pagination Section */}
      <PaginationOrder
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
