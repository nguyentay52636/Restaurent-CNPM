import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowDownToLine, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Order, OrderItem, orders as sampleOrders } from "./DataOrder";
import OrderTable from "./components/OrderTable";
import PaginationOrder from "./components/PaginationOrder";
import DialogViewDetails from "./components/Dialog/DialogViewDetails";


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
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
            <nav className="text-sm text-gray-500">
              <span>Home</span> / <span>Orders</span>
            </nav>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">ALL</SelectItem>
              <SelectItem value="New Order">New Order</SelectItem>
              <SelectItem value="Processed">Processed</SelectItem>
              <SelectItem value="Canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="text"
            placeholder="10 Apr - 20 Apr"
            className="w-[180px]"
            disabled
          />
          <Button className="bg-[#3F4E4F] hover:bg-gray-600 text-white flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M20.53 8.47L14.53 2.47C14.389 2.329 14.199 2.25 14 2.25H8C5.582 2.25 4.25 3.582 4.25 6V18C4.25 20.418 5.582 21.75 8 21.75H17C19.418 21.75 20.75 20.418 20.75 18V9C20.75 8.801 20.671 8.61 20.53 8.47ZM14.75 4.811L18.189 8.25H17C15.423 8.25 14.75 7.577 14.75 6V4.811ZM17 20.25H8C6.423 20.25 5.75 19.577 5.75 18V6C5.75 4.423 6.423 3.75 8 3.75H13.25V6C13.25 8.418 14.582 9.75 17 9.75H19.25V18C19.25 19.577 18.577 20.25 17 20.25ZM13.53 14.47C13.823 14.763 13.823 15.238 13.53 15.531L11.53 17.531C11.461 17.6 11.3779 17.655 11.2859 17.693C11.1939 17.731 11.097 17.751 10.999 17.751C10.901 17.751 10.8039 17.731 10.7119 17.693C10.6199 17.655 10.537 17.6 10.468 17.531L8.46802 15.531C8.17502 15.238 8.17502 14.763 8.46802 14.47C8.76102 14.177 9.23605 14.177 9.52905 14.47L10.249 15.19V12C10.249 11.586 10.585 11.25 10.999 11.25C11.413 11.25 11.749 11.586 11.749 12V15.189L12.469 14.469C12.763 14.177 13.237 14.177 13.53 14.47Z"
                fill="white"
              />
            </svg>
            Xuất hoá đơn
            <ArrowDownToLine />
          </Button>
        </div>
      </div>

      <OrderTable
        paginatedOrders={paginatedOrders}
        calculateTotalAmount={calculateTotalAmount}
        handleViewDetails={handleViewDetails}
        handleDelete={handleDelete}
      />

      <DialogViewDetails
        order={selectedOrder}
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