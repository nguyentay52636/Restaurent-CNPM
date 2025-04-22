import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartPanelProps {
    isCartOpen: boolean;
    closeCart: () => void;
    cart: any[];
    subtotal: number;
    tax: number;
    total: number;
    decrementQuantity: (id: number) => void;
    incrementQuantity: (id: number) => void;
    removeFromCart: (id: number) => void;
    handlePayment: () => void;
}

export default function CartPanel({
    isCartOpen,
    closeCart,
    cart,
    subtotal,
    tax,
    total,
    decrementQuantity,
    incrementQuantity,
    removeFromCart,
    handlePayment
}: CartPanelProps) {
    return (
        <div className={`fixed top-0 right-0 h-screen w-80 bg-white shadow-lg transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
            <div className="p-4 h-full flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                        Đơn hàng #{Math.floor(Math.random() * 1000000)}
                    </h3>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={closeCart}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </Button>
                </div>

                {cart.length === 0 ? (
                    <p className="text-gray-500">Chưa có sản phẩm nào trong giỏ hàng.</p>
                ) : (
                    <div className="flex-1 space-y-4 overflow-y-auto">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center space-x-4 border-b py-2"
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <h4 className="text-sm font-medium">{item.name}</h4>
                                    <p className="text-gray-600 text-sm">
                                        {item.price.toLocaleString('vi-VN')} đ
                                    </p>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <Button
                                            className="cursor-pointer"
                                            variant="outline"
                                            size="icon"
                                            onClick={() => decrementQuantity(item.id)}
                                        >
                                            <Minus className="w-4 h-4" />
                                        </Button>
                                        <span className="text-sm">{item.quantity}</span>
                                        <Button
                                            className="bg-orange-500 hover:bg-orange-600 cursor-pointer"
                                            size="icon"
                                            onClick={() => incrementQuantity(item.id)}
                                        >
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {cart.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-500">Tạm tính</span>
                            <span className="font-medium">{subtotal.toLocaleString('vi-VN')} đ</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-500">Thuế VAT</span>
                            <span className="font-medium">{tax.toLocaleString('vi-VN')} đ</span>
                        </div>
                        <div className="flex justify-between mb-4">
                            <span className="text-gray-500 font-semibold">Tổng cộng</span>
                            <span className="font-semibold text-lg">{total.toLocaleString('vi-VN')} đ</span>
                        </div>
                        <Button
                            className="w-full bg-orange-500 hover:bg-orange-600"
                            onClick={handlePayment}
                        >
                            Thanh toán
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}