import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Search } from 'lucide-react';
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
    const charges = 24000; // Fixed charges in VND

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
    const pointsToAdd = Math.floor(total / 10000);

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
        setItems(items.filter((item) => item.id !== id));
        setCart(cart.filter((item) => item.id !== id));
    };

    // Handle print action (placeholder)
    const handlePrint = () => {
        console.log('In hóa đơn...');
        // Add print functionality here
    };

    // Handle payment method selection
    const handlePaymentMethodSelect = (method: string) => {
        console.log(`Selected payment method: ${method}`);
        setIsPaymentModalOpen(false);
        // Add payment processing logic here
    };

    const handleCustomerSubmit = (customerData: any) => {
        console.log('New customer data:', customerData);
        setIsDialogOpen(false);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            {/* Order Header */}
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Hóa đơn #{Math.floor(Math.random() * 1000000)}
            </h2>

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
                                {(selectedCustomer.spent + pointsToAdd).toLocaleString('vi-VN')}đ
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Order Items and Summary */}
            <div className="flex justify-between mb-6">
                <div className="w-2/3 space-y-4">
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
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="w-1/3 text-right space-y-2">
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
                            {total.toLocaleString('vi-VN')}đ
                        </span>
                    </div>
                    {selectedCustomer && (
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
                <Button
                    onClick={handlePrint}
                    className="bg-black hover:bg-gray-900 text-white rounded-md px-6 py-2 cursor-pointer"
                >
                    In hóa đơn
                </Button>
                <Button
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-md px-6 py-2 cursor-pointer"
                >
                    Đặt món
                </Button>
                <SelectPayment
                    onSelectPayment={handlePaymentMethodSelect}
                    onClose={() => setIsPaymentModalOpen(false)}
                    open={isPaymentModalOpen}
                    cart={cart}
                    total={total}
                />
            </div>
        </div>
    );
}