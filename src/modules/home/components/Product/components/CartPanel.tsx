import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { ProductWithId } from '@/lib/apis/types';

interface CartItem extends ProductWithId {
    quantity: number;
    selectedSize?: { name: string, price: number };
}
interface CartPanelProps {
    isCartOpen: boolean;
    closeCart: () => void;
    cart: any[];
    subtotal: number;
    tax: number;
    total: number;
    decrementQuantity: (id: number, sizeName?: string) => void;
    incrementQuantity: (id: number, sizeName?: string) => void;
    removeFromCart: (id: number, sizeName?: string) => void;
    handlePayment: () => void;
}
const getFullImageUrl = (path: string) => {
    if (!path) return '';
    if (/^https?:\/\//.test(path)) return path;
    // Lấy base url từ biến môi trường, loại bỏ /api nếu có
    const apiUrl = import.meta.env.VITE_API_URL as string;
    console.log(apiUrl)
    const baseUrl = apiUrl.replace(/\/api\/?$/, '');
    console.log(baseUrl)
    console.log(`${baseUrl}${path}`)
    return `${baseUrl}${path}`;
};
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
        <div
            className={`fixed right-0 h-[90vh] w-80 bg-white shadow-lg transform transition-all duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            style={{ zIndex: 40 }}
        >
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
                                 key={item.selectedSize ? `${item.id}-${item.selectedSize.name}` : item.id}
                                className="flex items-center space-x-4 border-b py-2"
                            >
                                <img
                                    src={getFullImageUrl(item.image)}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <h4 className="text-sm font-medium">
                                        {item.name}
                                        {item.selectedSize && (
                                            <span className="text-xs ml-1 text-gray-500">
                                                (Size {item.selectedSize.name})
                                            </span>
                                        )}
                                    </h4>
                                    <p className="text-gray-600 text-sm">
                                        {item.price.toLocaleString('vi-VN')} đ
                                    </p>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <Button
                                            className='cursor-pointer'
                                            variant="outline"
                                            size="icon"
                                            onClick={() => decrementQuantity(item.id, item.selectedSize?.name)}
                                        >
                                            <Minus className="w-4 h-4" />
                                        </Button>
                                        <span className="text-sm">{item.quantity}</span>
                                        <Button
                                            className='bg-orange-500 hover:bg-orange-600 cursor-pointer'
                                            size="icon"
                                            onClick={() => incrementQuantity(item.id, item.selectedSize?.name)}
                                        >
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => removeFromCart(item.id, item.selectedSize?.name)}
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
                            <span className="text-gray-600">Tạm tính</span>
                            <span className="font-medium">{subtotal.toLocaleString('vi-VN')} đ</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Thuế VAT</span>
                            <span className="font-medium">{tax.toLocaleString('vi-VN')} đ</span>
                        </div>
                        <div className="flex justify-between mb-4">
                            <span className="text-gray-600 font-semibold">Tổng cộng</span>
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