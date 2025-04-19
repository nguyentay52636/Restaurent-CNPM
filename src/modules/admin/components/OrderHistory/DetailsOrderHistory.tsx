import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

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
    product: Product;
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

interface DetailsOrderHistoryProps {
    order: Order;
}

const DetailsOrderHistory: React.FC<DetailsOrderHistoryProps> = ({ order }) => {
    const [showInvoice, setShowInvoice] = useState(false);

    const handlePrintInvoice = () => {
        setShowInvoice(true);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const calculateTotal = (items: OrderItem[]) => {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    return (
        <div className="w-2/3 p-4 bg-white shadow-lg">
            <Card>
                <CardHeader>
                    <CardTitle>Đơn hàng #{order.id}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <p className="text-sm text-gray-600">Bàn số</p>
                            <p className="font-medium">{order.tableNo}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Số khách</p>
                            <p className="font-medium">{order.guestCount}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Khách hàng</p>
                            <p className="font-medium">{order.customer}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Thanh toán</p>
                            <p className="font-medium">{order.paymentMethod}</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {order.items.map((item, index) => (
                            <div key={index} className="flex items-center space-x-4">
                                <img
                                    src={`/images/images_foot/foot_${item.product_id}.png`}
                                    alt={item.product.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <p className="font-medium">{item.product.name}</p>
                                    <p className="text-sm text-gray-600">x {item.quantity}</p>
                                </div>
                                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 pt-4 border-t">
                        <Button
                            className="w-full bg-orange-500 hover:bg-orange-600"
                            onClick={handlePrintInvoice}
                        >
                            In hóa đơn
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Invoice Dialog */}
            <Dialog open={showInvoice} onOpenChange={setShowInvoice}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Hóa đơn #{order.id}</DialogTitle>
                    </DialogHeader>

                    <div className="p-4">
                        <div className="flex justify-between mb-6">
                            <div>
                                <h3 className="text-xl font-bold">Nhà hàng của chúng tôi</h3>
                                <p>123 Đường ABC, Quận XYZ</p>
                                <p>Điện thoại: 0123 456 789</p>
                            </div>
                            <div className="text-right">
                                <p>Ngày: {formatDate(order.created_at)}</p>
                                <p>Hóa đơn: #{order.id}</p>
                            </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="mb-6">
                            <h4 className="font-semibold mb-2">Thông tin khách hàng</h4>
                            <p>Tên: {order.customer}</p>
                            <p>Bàn số: {order.tableNo}</p>
                            <p>Số khách: {order.guestCount}</p>
                            <p>Phương thức thanh toán: {order.paymentMethod}</p>
                        </div>

                        <Separator className="my-4" />

                        <div className="mb-6">
                            <h4 className="font-semibold mb-2">Chi tiết đơn hàng</h4>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Sản phẩm</TableHead>
                                        <TableHead className="text-right">Số lượng</TableHead>
                                        <TableHead className="text-right">Đơn giá</TableHead>
                                        <TableHead className="text-right">Thành tiền</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {order.items.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.product.name}</TableCell>
                                            <TableCell className="text-right">{item.quantity}</TableCell>
                                            <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                                            <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-right font-bold">Tổng cộng:</TableCell>
                                        <TableCell className="text-right font-bold">${calculateTotal(order.items).toFixed(2)}</TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </div>

                        <Separator className="my-4" />

                        <div className="text-center mb-6">
                            <p>Cảm ơn quý khách đã ghé thăm nhà hàng của chúng tôi!</p>
                            <p>Hẹn gặp lại quý khách!</p>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            onClick={() => window.print()}
                            className="bg-orange-500 hover:bg-orange-600"
                        >
                            In hóa đơn
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setShowInvoice(false)}
                        >
                            Đóng
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default DetailsOrderHistory;
