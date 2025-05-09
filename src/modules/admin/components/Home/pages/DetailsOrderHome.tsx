import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Search, Download, CheckCircle } from 'lucide-react';
import SelectPayment from '../components/SelectPayment';
import { dataCustomers, Customer } from '../../AccountManager/components/AcountData';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import DialogNewCustomer from '../components/DialogNewCustomer';
import { toast } from '@/components/ui/use-toast';
// Import the PDF generator and interfaces
import { generatePDF, OrderItem as PDFOrderItem } from '../utils/pdfGenerator';

// Define the OrderItem interface
interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface DetailsOrderHomeProps {
    cartItems: OrderItem[];
    subtotal: number;
    tax: number;
    total: number;
}

export default function DetailsOrderHome({
    cartItems,
    subtotal,
    tax,
    total,
}: DetailsOrderHomeProps) {
    const [items, setItems] = useState<OrderItem[]>(cartItems);
    const [cart, setCart] = useState<OrderItem[]>(cartItems);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isPaid, setIsPaid] = useState(false);
    const charges = 24000; // Fixed charges in VND

    // Generate random invoice number (in actual app this would come from the server)
    const invoiceNumber = useMemo(() => Math.floor(Math.random() * 1000000), []);

    // Calculate the final total with charges
    const finalTotal = total + charges;

    // Filter customers with role "Khách hàng" (Customer)
    const customerRoleCustomers = useMemo(
        () =>
            dataCustomers.filter((customer) =>
                customer.roles_id.some((role) => role.name === 'Khách hàng')
            ),
        []
    );

    // Filter customers based on search term
    const filteredCustomers = useMemo(
        () =>
            customerRoleCustomers.filter(
                (customer) =>
                    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    customer.address.toLowerCase().includes(searchTerm.toLowerCase())
            ),
        [searchTerm, customerRoleCustomers]
    );

    // Calculate points to be added (1 point per 10,000 VND spent)
    const pointsToAdd = Math.floor(finalTotal / 10000);

    // Handle customer selection
    const handleCustomerSelect = (customerId: string) => {
        if (customerId === 'guest') {
            setSelectedCustomer(null);
        } else {
            const customer = customerRoleCustomers.find((c) => c.id.toString() === customerId);
            if (customer) {
                setSelectedCustomer(customer);
            }
        }
    };

    // Handle removing an item
    const handleRemoveItem = (id: number) => {
        if (isPaid) {
            toast({
                title: "Không thể chỉnh sửa",
                description: "Đơn hàng đã được thanh toán, không thể xóa sản phẩm.",
                variant: "destructive"
            });
            return;
        }

        setItems(items.filter((item) => item.id !== id));
        setCart(cart.filter((item) => item.id !== id));
    };

    // Handle PDF generation
    const handlePrint = () => {
        try {
            // Prepare data for PDF generation
            const invoiceData = {
                invoiceNumber,
                items,
                subtotal,
                tax,
                charges,
                finalTotal,
                selectedCustomer,
                pointsToAdd
            };

            // Generate the PDF
            generatePDF(invoiceData);

            toast({
                title: "Xuất hóa đơn thành công",
                description: `Đã tạo file PDF hóa đơn #${invoiceNumber}`,
                variant: "default"
            });
        } catch (error) {
            console.error("Error generating PDF:", error);
            toast({
                title: "Lỗi xuất hóa đơn",
                description: "Không thể tạo file PDF. Vui lòng thử lại sau.",
                variant: "destructive"
            });
        }
    };

    // Handle payment method selection
    const handlePaymentMethodSelect = (method: string) => {
        console.log(`Selected payment method: ${method}`);
        setIsPaymentModalOpen(false);

        // Simulate payment processing
        setTimeout(() => {
            setIsPaid(true);
            toast({
                title: "Thanh toán thành công",
                description: `Đã thanh toán đơn hàng bằng ${method}`,
                variant: "default"
            });

            // If customer is selected, update their points
            if (selectedCustomer) {
                // This would normally call an API to update the customer's points
                console.log(`Cộng ${pointsToAdd} điểm cho khách hàng ${selectedCustomer.name}`);
            }
        }, 1500);
    };

    const handleCustomerSubmit = (customerData: any) => {
        console.log('New customer data:', customerData);
        setIsDialogOpen(false);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            {/* Order Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                    Hóa đơn #{invoiceNumber}
                </h2>

                {isPaid && (
                    <div className="flex items-center text-green-600">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span className="font-medium">Đã thanh toán</span>
                    </div>
                )}
            </div>

            {/* Customer Selection */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Chọn khách hàng để tích điểm</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <Label htmlFor="customerSelect" className="block text-sm font-medium text-gray-700 mb-1">
                            Tìm kiếm khách hàng
                        </Label>
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Tìm theo tên hoặc địa chỉ..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 w-full mb-2"
                                disabled={isPaid}
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>

                    </div>

                    {/* Customer Details Form (Read-Only) */}
                    <div className="my-8 flex items-center justify-between">
                        <div className="">
                            <Select
                                onValueChange={handleCustomerSelect}
                                value={selectedCustomer?.id.toString() || 'guest'}
                                disabled={isPaid}
                            >
                                <SelectTrigger id="customerSelect">
                                    <SelectValue placeholder="Chọn khách hàng" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="guest">Danh sách khách hàng</SelectItem>
                                    {filteredCustomers.map((customer) => (
                                        <SelectItem key={customer.id} value={customer.id.toString()}>
                                            {customer.name} - {customer.spent.toLocaleString('vi-VN')}đ
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="">
                            <DialogNewCustomer
                                open={isDialogOpen}
                                onClose={() => setIsDialogOpen(false)}
                                onSubmit={handleCustomerSubmit}
                            />
                        </div>

                    </div>
                    {selectedCustomer && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-md">
                            <h3 className="font-medium text-gray-900">{selectedCustomer.name}</h3>
                            <p className="text-sm text-gray-600">Địa chỉ: {selectedCustomer.address}</p>
                            <p className="text-sm text-gray-600">
                                Điểm hiện tại: {selectedCustomer.spent.toLocaleString('vi-VN')}đ
                            </p>
                            <p className="text-sm text-orange-500 font-medium">
                                Điểm sẽ được cộng: +{pointsToAdd.toLocaleString('vi-VN')}đ
                            </p>
                            <p className="text-sm font-bold">
                                Tổng điểm sau khi cộng:{' '}
                                {isPaid
                                    ? (selectedCustomer.spent + pointsToAdd).toLocaleString('vi-VN')
                                    : (selectedCustomer.spent).toLocaleString('vi-VN')
                                }đ
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Order Items and Summary */}
            <div className="flex flex-col md:flex-row justify-between mb-6">
                <div className="w-full md:w-2/3 space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 rounded-md object-cover"
                            />
                            <div className="flex-1">
                                <p className="font-medium text-gray-800">{item.name}</p>
                                <p className="text-orange-500 font-semibold">
                                    {item.price.toLocaleString('vi-VN')}đ
                                </p>
                                <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                            </div>
                            {!isPaid && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="w-full md:w-1/3 text-right space-y-2 mt-6 md:mt-0">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Tạm tính</span>
                        <span className="font-semibold text-gray-800">
                            {subtotal.toLocaleString('vi-VN')}đ
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Thuế</span>
                        <span className="font-semibold text-gray-800">{tax.toLocaleString('vi-VN')}đ</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Phí dịch vụ</span>
                        <span className="font-semibold text-gray-800">
                            {charges.toLocaleString('vi-VN')}đ
                        </span>
                    </div>
                    <div className="border-t pt-2 flex justify-between">
                        <span className="text-gray-600">Tổng cộng</span>
                        <span className="font-bold text-lg text-gray-800">
                            {finalTotal.toLocaleString('vi-VN')}đ
                        </span>
                    </div>
                    {selectedCustomer && isPaid && (
                        <div className="mt-2 p-2 bg-orange-50 rounded-md">
                            <p className="text-sm text-orange-600 font-medium">
                                Điểm tích lũy: +{pointsToAdd.toLocaleString('vi-VN')}đ
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3">
                {isPaid ? (
                    <Button
                        onClick={handlePrint}
                        className="flex items-center bg-green-600 hover:bg-green-700 text-white rounded-md px-6 py-2 cursor-pointer"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Xuất PDF
                    </Button>
                ) : (
                    <Button
                        onClick={() => setIsPaymentModalOpen(true)}
                        className="bg-orange-500 hover:bg-orange-600 text-white rounded-md px-6 py-2 cursor-pointer"
                    >
                        Thanh toán
                    </Button>
                )}
                <SelectPayment
                    onSelectPayment={handlePaymentMethodSelect}
                    onClose={() => setIsPaymentModalOpen(false)}
                    open={isPaymentModalOpen}
                    cart={cart}
                    total={finalTotal}
                />
            </div>
        </div>
    );
}