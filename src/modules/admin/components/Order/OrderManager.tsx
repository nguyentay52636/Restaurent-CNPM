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

// Interfaces based on the database schema
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface OrderItem {
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  product: Product;
}

interface User {
  id: number;
  full_name: string;
  address: string;
}

interface Order {
  id: number;
  user_id: number;
  status: "New Order" | "Processed" | "Canceled";
  created_at: string;
  user: User;
  order_items: OrderItem[];
}

export default function OrderManager() {
  // Sample data
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1001,
      user_id: 1,
      status: "New Order",
      created_at: "2023-04-29",
      user: {
        id: 1,
        full_name: "Devon Lane",
        address: "3517 W. Gray St. Utica, Pennsylvania 57867",
      },
      order_items: [
        {
          order_id: 1001,
          product_id: 1,
          quantity: 1,
          price: 293,
          product: {
            id: 1,
            name: "RISTRETTO BIANCO",
            description: "A strong coffee",
            price: 293,
          },
        },
      ],
    },
    {
      id: 1002,
      user_id: 2,
      status: "New Order",
      created_at: "2023-04-29",
      user: {
        id: 2,
        full_name: "Arlene McCoy",
        address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
      },
      order_items: [
        {
          order_id: 1002,
          product_id: 1,
          quantity: 2,
          price: 293,
          product: {
            id: 1,
            name: "RISTRETTO BIANCO",
            description: "A strong coffee",
            price: 293,
          },
        },
        {
          order_id: 1002,
          product_id: 2,
          quantity: 3,
          price: 188,
          product: {
            id: 2,
            name: "ICED CREAMY LATTE",
            description: "A refreshing latte",
            price: 188,
          },
        },
      ],
    },
    {
      id: 1003,
      user_id: 3,
      status: "New Order",
      created_at: "2023-04-29",
      user: {
        id: 3,
        full_name: "Leslie Alexander",
        address: "2715 Ash Dr. San Jose, South Dakota 83475",
      },
      order_items: [
        {
          order_id: 1003,
          product_id: 1,
          quantity: 2,
          price: 293,
          product: {
            id: 1,
            name: "RISTRETTO BIANCO",
            description: "A strong coffee",
            price: 293,
          },
        },
        {
          order_id: 1003,
          product_id: 3,
          quantity: 2,
          price: 100,
          product: {
            id: 3,
            name: "CAPPUCINO",
            description: "A classic cappuccino",
            price: 100,
          },
        },
      ],
    },
    {
      id: 1004,
      user_id: 4,
      status: "Processed",
      created_at: "2023-04-29",
      user: {
        id: 4,
        full_name: "Savannah Nguyen",
        address: "3517 W. Gray St. Utica, Pennsylvania 57867",
      },
      order_items: [
        {
          order_id: 1004,
          product_id: 1,
          quantity: 1,
          price: 293,
          product: {
            id: 1,
            name: "RISTRETTO BIANCO",
            description: "A strong coffee",
            price: 293,
          },
        },
        {
          order_id: 1004,
          product_id: 2,
          quantity: 2,
          price: 188,
          product: {
            id: 2,
            name: "ICED CREAMY LATTE",
            description: "A refreshing latte",
            price: 188,
          },
        },
      ],
    },
    {
      id: 1005,
      user_id: 5,
      status: "Processed",
      created_at: "2023-04-29",
      user: {
        id: 5,
        full_name: "Courtney Henry",
        address: "4140 Parker Rd. Allentown, New Mexico 31134",
      },
      order_items: [
        {
          order_id: 1005,
          product_id: 1,
          quantity: 1,
          price: 293,
          product: {
            id: 1,
            name: "RISTRETTO BIANCO",
            description: "A strong coffee",
            price: 293,
          },
        },
        {
          order_id: 1005,
          product_id: 3,
          quantity: 2,
          price: 100,
          product: {
            id: 3,
            name: "CAPPUCINO",
            description: "A classic cappuccino",
            price: 100,
          },
        },
      ],
    },
    {
      id: 1006,
      user_id: 6,
      status: "Canceled",
      created_at: "2023-04-29",
      user: {
        id: 6,
        full_name: "Darrell Steward",
        address: "1901 Thornridge Cir.",
      },
      order_items: [
        {
          order_id: 1006,
          product_id: 1,
          quantity: 1,
          price: 293,
          product: {
            id: 1,
            name: "RISTRETTO BIANCO",
            description: "A strong coffee",
            price: 293,
          },
        },
        {
          order_id: 1006,
          product_id: 2,
          quantity: 1,
          price: 489,
          product: {
            id: 2,
            name: "ICED CREAMY LATTE",
            description: "A refreshing latte",
            price: 489,
          },
        },
      ],
    },
  ]);

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

      {/* Table Section */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox />
              </TableHead>
              <TableHead>Mã hoá đơn</TableHead>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Sản phẩm</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="w-[50px]">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <div>#00{order.id}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </TableCell>
                <TableCell>
                  <div>{order.user.full_name}</div>
                  <div className="text-sm text-muted-foreground">{order.user.address}</div>
                </TableCell>
                <TableCell>{order.order_items.length}</TableCell>
                <TableCell>${calculateTotalAmount(order.order_items)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "New Order"
                        ? "default"
                        : order.status === "Processed"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleViewDetails(order)}>
                        Xem chi tiết
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(order.id)}>
                        Xoá yêu cầu
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-4xl p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column: Order Details and Products */}
              <div className="md:col-span-2 space-y-6">
                {/* Order Details */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge
                        variant={
                          selectedOrder.status === "New Order"
                            ? "default"
                            : selectedOrder.status === "Processed"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {selectedOrder.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Transaction Date</p>
                      <p className="font-medium">
                        {new Date(selectedOrder.created_at).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Payment Method</p>
                      <p className="font-medium">
                        {/* Replace with selectedOrder.payment_method if available */}
                        Credit or Debit Card
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ship Method</p>
                      <p className="font-medium">
                        {/* Replace with selectedOrder.ship_method if available */}
                        Free Shipping (7-10 Days)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Product List */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Your Order</h3>
                  <div className="space-y-4">
                    {selectedOrder.order_items.map((item) => (
                      <div
                        key={`${item.order_id}-${item.product_id}`}
                        className="flex items-center border rounded-lg p-4"
                      >
                        <img
                          src={
                            // Replace with item.product.image_url if available
                            "https://via.placeholder.com/80"
                          }
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded mr-4"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.product.description}
                          </p>
                          <p className="text-sm">
                            {item.quantity} x ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <p className="font-medium">
                          ${(item.quantity * item.price).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Customer Details */}
              <div className="space-y-4 bg-muted/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">Customer Detail</h3>
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedOrder.user.full_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Account</p>
                  <p className="font-medium">
                    {/* Replace with selectedOrder.user.email if available */}
                    {selectedOrder.user.full_name.toLowerCase().replace(" ", ".") + "@mail.com"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium">{selectedOrder.user.address}</p>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-xl font-semibold">
                    ${calculateTotalAmount(selectedOrder.order_items).toFixed(2)}
                  </p>
                </div>
                <Button
                  variant="default"
                  className="w-full"
                // Customize theme in tailwind.config.js to match image's brown color
                >
                  Process Order
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Pagination Section */}
      <div className="flex justify-between items-center mt-6">
        <div>
          <span className="text-gray-600">Rows per page: {rowsPerPage}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-gray-600">
            {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            answeredNext
          </Button>
        </div>
      </div>
    </div>
  );
}