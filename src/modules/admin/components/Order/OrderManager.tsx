import React, { useState, useMemo } from "react";

import { Order, OrderItem, orders as sampleOrders } from "./DataOrder";
import OrderTable from "./components/OrderTable";
import PaginationOrder from "./components/PaginationOrder";
import DialogViewDetails from "./components/Dialog/DialogViewDetails";
import OrderActions from "./components/OrderActions";


export default function OrderManager() {
  // Sample data
  const [orders, setOrders] = useState<Order[]>(sampleOrders);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const rowsPerPage = 5;

  // Calculate total amount for an order
  const calculateTotalAmount = (orderItems: OrderItem[]) => {
    return orderItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  // Search and filter orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toString().includes(searchTerm);
      const matchesStatus = statusFilter === "ALL" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handlers
  const handleDelete = (id: number) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="p-6 mx-auto bg-white shadow-md rounded-lg min-h-screen">
      {/* Header Section */}
      <OrderActions
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <OrderTable
        paginatedOrders={paginatedOrders}
        calculateTotalAmount={calculateTotalAmount}
        handleViewDetails={handleViewDetails}
        handleDelete={handleDelete}
      />

      <DialogViewDetails
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />


      {/* Pagination Section */}
      <PaginationOrder
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}