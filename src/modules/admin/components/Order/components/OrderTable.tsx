import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Order } from "../DataOrder";

interface OrderTableProps {
    paginatedOrders: Order[];
    calculateTotalAmount: (orderItems: any[]) => number;
    handleViewDetails: (order: Order) => void;
    handleDelete: (id: number) => void;
}

export default function OrderTable({ paginatedOrders, calculateTotalAmount, handleViewDetails, handleDelete }: OrderTableProps) {
    return (

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

    )
}
