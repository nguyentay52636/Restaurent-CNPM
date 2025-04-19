import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import SelectPayment from '../components/SelectPayment';

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

export default function DetailsOrderHome({ cartItems, subtotal, tax, total }: DetailsOrderHomeProps) {
    const [items, setItems] = useState<OrderItem[]>(cartItems);
    const charges = 24000; // Fixed charges in VND
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [cart, setCart] = useState<OrderItem[]>(cartItems);

    // Handle removing an item
    const handleRemoveItem = (id: number) => {
        setItems(items.filter((item) => item.id !== id));
        setCart(cart.filter((item) => item.id !== id));
    };

    // Handle print action (placeholder)
    const handlePrint = () => {
        console.log('In hóa đơn...');
        // Add print functionality here, e.g., trigger a print dialog
    };

    // Handle place order action (placeholder)
    const handlePlaceOrder = () => {
        console.log('Đặt món...');
        setIsPaymentModalOpen(true);
    };

    // Handle payment method selection
    const handlePaymentMethodSelect = (method: string) => {
        console.log(`Selected payment method: ${method}`);
        setIsPaymentModalOpen(false);
        // Add payment processing logic here
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            {/* Order Header */}
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Hóa đơn #{Math.floor(Math.random() * 1000000)}</h2>

            {/* Customer Information */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                    <Label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">
                        Họ và tên:
                    </Label>
                    <Input
                        id="recipient"
                        placeholder="Nhập họ tên"
                        className="w-full border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <Label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                        Giới tính:
                    </Label>
                    <Input
                        id="gender"
                        placeholder="Nhập giới tính"
                        className="w-full border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <Label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        Thành phố:
                    </Label>
                    <Input
                        id="city"
                        placeholder="Nhập thành phố"
                        className="w-full border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Số điện thoại:
                    </Label>
                    <Input
                        id="phone"
                        placeholder="Nhập số điện thoại"
                        className="w-full border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email:
                    </Label>
                    <Input
                        id="email"
                        placeholder="Nhập email"
                        className="w-full border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <Label htmlFor="customerId" className="block text-sm font-medium text-gray-700 mb-1">
                        Mã khách hàng:
                    </Label>
                    <Input
                        id="customerId"
                        placeholder="Nhập mã khách hàng"
                        className="w-full border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="col-span-3">
                    <Label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Địa chỉ:
                    </Label>
                    <Input
                        id="address"
                        placeholder="Nhập địa chỉ"
                        className="w-full border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

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
                                <p className="text-orange-500 font-semibold">{item.price.toLocaleString('vi-VN')}đ</p>
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
                        <span className="font-semibold text-gray-800">{subtotal.toLocaleString('vi-VN')}đ</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Thuế</span>
                        <span className="font-semibold text-gray-800">{tax.toLocaleString('vi-VN')}đ</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Phí dịch vụ</span>
                        <span className="font-semibold text-gray-800">{charges.toLocaleString('vi-VN')}đ</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between">
                        <span className="text-gray-600">Tổng cộng</span>
                        <span className="font-bold text-lg text-gray-800">{total.toLocaleString('vi-VN')}đ</span>
                    </div>
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
                    onClick={handlePlaceOrder}
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