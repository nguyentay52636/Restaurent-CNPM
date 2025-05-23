import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, X, Minus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DialogNewCustomer from '../components/DialogNewCustomer';
import SelectPayment from '../components/SelectPayment';
import { getAllUserAPI } from '@/lib/apis/userApi';
import { toast } from '@/components/ui/use-toast';
import { IUserDataType } from '@/lib/apis/types.';
import { generatePDF } from '../utils/pdfGenerator';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import DiglogListProduct from '../components/Dialog/DiglogListProduct';
import { updateUserPoints } from '@/lib/apis/paymentsApi';

interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface InvoiceData {
    invoiceNumber: number;
    items: OrderItem[];
    subtotal: number;
    tax: number;
    charges: number;
    finalTotal: number;
    selectedCustomer: {
        id: number;
        name: string;
        address: string;
        spent: number;
    } | null;
    pointsToAdd: number;
}

interface DetailsOrderHomeProps {
    cartItems: OrderItem[];
    subtotal: number;
    tax: number;
    total: number;
    onReset?: () => void;
    onRemoveItem?: (itemId: number) => void;
    onUpdateQuantity?: (itemId: number, newQuantity: number) => void;
    setIsCartOpen?: (isOpen: boolean) => void;
    onPaymentMethodSelect: (method: string, id: number) => void;
}

export default function DetailsOrderHome({
    cartItems,
    subtotal,
    tax,
    total,
    onReset,
    onRemoveItem,
    onUpdateQuantity,
    onPaymentMethodSelect,
    setIsCartOpen,
}: DetailsOrderHomeProps) {
    const [selectedMethod, setSelectedMethod] = useState<string>("");
    const [users, setUsers] = useState<IUserDataType[]>([]);
    const [selectedUser, setSelectedUser] = useState<IUserDataType | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [showInvoiceDialog, setShowInvoiceDialog] = useState(false);
    const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
    const [showBackConfirmDialog, setShowBackConfirmDialog] = useState(false);
    const [isProductListOpen, setIsProductListOpen] = useState(false);
    const [availableProducts, setAvailableProducts] = useState<OrderItem[]>([]);

    // Fetch users with role_id = 2 (customers)
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllUserAPI();
                const customers = response.data.filter((user: IUserDataType) =>
                    user.roleId === 2
                );
                setUsers(customers);
            } catch (error) {
                console.error('Error fetching users:', error);
                toast({
                    title: "Lỗi",
                    description: "Không thể tải danh sách khách hàng",
                    variant: "destructive"
                });
            }
        };

        fetchUsers();
    }, []);

    // Filter users based on search term
    const filteredUsers = useMemo(() => {
        return users.filter(user =>
            user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.phone?.includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    // Calculate points to be added (1 point per 10,000 VND)
    const pointsToAdd = Math.floor(total / 10000);

    const handleUserSelect = (userId: string) => {
        const user = users.find(u => u.id?.toString() === userId);
        setSelectedUser(user || null);
    };

    const handleNewCustomer = async (customerData: IUserDataType) => {
        try {
            // Add the new customer to the users list
            setUsers(prevUsers => [...prevUsers, customerData]);

            // Select the newly created customer
            setSelectedUser(customerData);

            // Close the dialog
            setIsDialogOpen(false);
        } catch (error) {
            console.error('Error handling new customer:', error);
        }
    };

    const handlePayment = () => {
        if (!selectedUser) {
            toast({
                title: "Cảnh báo",
                description: "Vui lòng chọn khách hàng trước khi thanh toán",
                variant: "destructive"
            });
            return;
        }
        setIsPaymentModalOpen(true);
    };

    const handlePaymentMethodSelect = (method: string) => {
        if (!selectedUser?.id) {
            toast({
                title: "Lỗi",
                description: "Không tìm thấy thông tin khách hàng",
                variant: "destructive"
            });
            return;
        }

        setIsPaymentModalOpen(false);
        onPaymentMethodSelect(method, selectedUser.id);
        setSelectedMethod(method);

        // Update user points
        const currentPoints = selectedUser.points || 0;
        updateUserPoints(selectedUser.id, {
            points: currentPoints + pointsToAdd,
            email: selectedUser.email,
            roleId: selectedUser.roleId
        })
            .then(() => {
                // Update local state to reflect new points
                setSelectedUser(prev => prev ? { ...prev, points: currentPoints + pointsToAdd } : null);
            })
            .catch((error) => {
                console.error('Error updating points:', error);
                toast({
                    title: "Lỗi",
                    description: "Không thể cập nhật điểm tích lũy",
                    variant: "destructive"
                });
            });

        // Generate invoice number (you might want to get this from your backend)
        const invoiceNumber = Math.floor(Math.random() * 1000000);

        // Prepare data for PDF generation
        const data = {
            invoiceNumber,
            items: cartItems,
            subtotal,
            tax,
            charges: 0, // Add any additional charges if needed
            finalTotal: total,
            selectedCustomer: selectedUser ? {
                id: selectedUser.id || 0,
                name: selectedUser.fullName || '',
                address: selectedUser.address || '',
                spent: total
            } : null,
            pointsToAdd
        };

        // Show success message and ask about invoice
        toast({
            title: "Thanh toán thành công",
            description: `Đã thanh toán bằng ${method}. Điểm tích lũy: +${pointsToAdd}`,
        });

        // Store invoice data and show dialog
        setInvoiceData(data);
        setShowInvoiceDialog(true);
    };

    const handlePrintInvoice = () => {
        if (invoiceData) {
            try {
                generatePDF(invoiceData);
                toast({
                    title: "Thành công",
                    description: "Hóa đơn đã được tạo",
                });
            } catch (error) {
                console.error('Error generating invoice:', error);
                toast({
                    title: "Lỗi",
                    description: "Không thể tạo hóa đơn. Vui lòng liên hệ nhân viên.",
                    variant: "destructive"
                });
            }
        }
        setShowInvoiceDialog(false);
        if (onReset) onReset();
    };

    const handleSkipInvoice = () => {
        setShowInvoiceDialog(false);
        if (onReset) onReset();
    };

    const handleBackClick = () => {
        setShowBackConfirmDialog(true);
    };

    const handleConfirmBack = () => {
        setShowBackConfirmDialog(false);
        if (onReset) {
            onReset();

            if (cartItems.length > 0 && setIsCartOpen) {
                setIsCartOpen(true);
            }
            toast({
                title: "Thành công",
                description: "Đã quay lại trang chọn món. Các món đã chọn vẫn được giữ nguyên.",
            });
        }
    };

    // Add this useEffect to fetch products (you'll need to implement the actual API call)
    useEffect(() => {
        // This is a placeholder - replace with your actual API call
        const fetchProducts = async () => {
            try {
                // Replace this with your actual API call
                const response = await fetch('/api/products');
                const data = await response.json();
                setAvailableProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
                toast({
                    title: "Lỗi",
                    description: "Không thể tải danh sách sản phẩm",
                    variant: "destructive"
                });
            }
        };

        fetchProducts();
    }, []);

    const handleAddProduct = (product: OrderItem) => {
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            onUpdateQuantity?.(product.id, existingItem.quantity + 1);
        } else {
            onUpdateQuantity?.(product.id, 1);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Card className="w-full max-w-[1400px] mx-auto">
                <CardHeader className="border-b pb-4">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-2xl font-bold">Chi tiết đơn hàng</CardTitle>
                        <Button
                            onClick={() => setIsProductListOpen(true)}
                            className="bg-orange-500 hover:bg-orange-600 text-white"
                        >
                            Thêm sản phẩm
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    {/* Customer Selection */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Chọn khách hàng</h3>
                            <Button
                                onClick={() => setIsDialogOpen(true)}
                                className="bg-orange-500 hover:bg-orange-600 text-white"
                            >
                                Khách hàng mới
                            </Button>
                        </div>
                        <div className="relative mb-4">
                            <Input
                                type="text"
                                placeholder="Tìm kiếm khách hàng..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                        <Select onValueChange={handleUserSelect}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Chọn khách hàng" />
                            </SelectTrigger>
                            <SelectContent>
                                {filteredUsers.map((user) => (
                                    <SelectItem key={user.id} value={user.id?.toString() || ''}>
                                        {user.fullName} - {user.phone || 'Chưa có số điện thoại'} (Điểm: {user.points || 0})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {selectedUser && (
                            <div className="mt-4 p-4 bg-orange-50 rounded-lg">
                                <p className="font-medium">Khách hàng: {selectedUser.fullName}</p>
                                <p className="text-sm text-gray-600">Điểm hiện tại: {selectedUser.points || 0}</p>
                                <p className="text-sm text-orange-600">Điểm sẽ được cộng: +{pointsToAdd}</p>
                            </div>
                        )}
                    </div>

                    <Separator className="my-6" />

                    {/* Order Items */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4">Danh sách món ăn</h3>
                        <div className="border rounded-lg overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[40%]">Sản phẩm</TableHead>
                                        <TableHead className="text-right">Số lượng</TableHead>
                                        <TableHead className="text-right">Đơn giá</TableHead>
                                        <TableHead className="text-right">Thành tiền</TableHead>
                                        <TableHead className="w-[50px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {cartItems.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-16 h-16 object-cover rounded"
                                                    />
                                                    <span>{item.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center justify-end space-x-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() => onUpdateQuantity?.(item.id, Math.max(1, item.quantity - 1))}
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                    <span className="w-8 text-center">{item.quantity}</span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {item.price.toLocaleString('vi-VN')} đ
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => onRemoveItem?.(item.id)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>

                    <Separator className="my-6" />

                    {/* Order Summary */}
                    <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">Tổng kết đơn hàng</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Tạm tính</span>
                                <span className="font-medium">{subtotal.toLocaleString('vi-VN')} đ</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Thuế VAT (10%)</span>
                                <span className="font-medium">{tax.toLocaleString('vi-VN')} đ</span>
                            </div>
                            <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                                <span>Tổng cộng</span>
                                <span>{total.toLocaleString('vi-VN')} đ</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end space-x-4">
                        <Button
                            variant="outline"
                            onClick={handleBackClick}
                            className="border-orange-500 text-orange-500 hover:bg-orange-50"
                        >
                            Quay lại
                        </Button>
                        <Button
                            className="bg-orange-500 hover:bg-orange-600 text-white px-8"
                            onClick={handlePayment}
                        >
                            Thanh toán
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Modals */}
            <SelectPayment
                open={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                onSelectPayment={handlePaymentMethodSelect}
                cart={cartItems}
                total={total}
            />

            <DialogNewCustomer
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSubmit={handleNewCustomer}
            />

            {/* Invoice Dialog */}
            <AlertDialog open={showInvoiceDialog} onOpenChange={setShowInvoiceDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>In hóa đơn</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có muốn in hóa đơn cho đơn hàng này không?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleSkipInvoice}>Bỏ qua</AlertDialogCancel>
                        <AlertDialogAction onClick={handlePrintInvoice}>In hóa đơn</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Back Confirmation Dialog */}
            <AlertDialog open={showBackConfirmDialog} onOpenChange={setShowBackConfirmDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Xác nhận quay lại</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bạn có muốn quay lại trang chọn món để thêm món mới không? Các món đã chọn sẽ được giữ nguyên.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Hủy</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmBack}>Xác nhận</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Add the DiglogListProduct component */}
            <DiglogListProduct
                open={isProductListOpen}
                onClose={() => setIsProductListOpen(false)}
                onAddProduct={handleAddProduct}
                products={availableProducts}
            />
        </div>
    );
}