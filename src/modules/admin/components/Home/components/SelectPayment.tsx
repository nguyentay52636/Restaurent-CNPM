import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Banknote } from "lucide-react";
import { QRCodeSVG } from 'qrcode.react';

// Dữ liệu phương thức thanh toán
const paymentMethods = [
    { value: "cash", label: "Thanh toán tiền mặt", icon: "/images/cash-icon.png" },
    { value: "vnpay", label: "Thanh toán qua VNPAY", icon: "/images/vnpay-logo.png" },
    { value: "momo", label: "Thanh toán qua Momo", icon: "/images/momo-logo.png" },
    { value: "bank", label: "Thanh toán qua Ngân hàng", icon: "/images/bank-logo.png" },
];

interface SelectPaymentProps {
    onSelectPayment: (method: string) => void;
    onClose: () => void;
    open: boolean;
    cart: any[];
    total: number;
}

export default function SelectPayment({ onSelectPayment, onClose, open, cart, total }: SelectPaymentProps) {
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    const [showQR, setShowQR] = useState(false);

    const handleSelect = (value: string) => {
        setSelectedMethod(value);
        setShowQR(false);
    };

    const handleConfirmPayment = () => {
        if (selectedMethod) {
            if (selectedMethod === 'cash') {
                onSelectPayment(selectedMethod);
                onClose();
            } else {
                setShowQR(true);
            }
        }
    };

    // Helper to render payment method icon
    const renderMethodIcon = (method: string, iconUrl: string) => {
        if (method === 'cash') {
            return <Banknote className="w-6 h-6 text-green-600" />;
        }
        return <img src={iconUrl} alt={method} className="w-6 h-6" />;
    };

    // Generate payment URL based on method
    const generatePaymentUrl = () => {
        const baseUrl = import.meta.env.VITE_PAYMENT_URL || 'https://your-payment-gateway.com';
        const orderInfo = {
            amount: total,
            orderId: Math.random().toString(36).substring(7),
            method: selectedMethod || 'unknown'
        };
        return `${baseUrl}/pay?data=${encodeURIComponent(JSON.stringify(orderInfo))}`;
    };

    const getPaymentAppName = (method: string | null): string => {
        if (method === 'momo') return 'MoMo';
        if (method === 'vnpay') return 'VNPAY';
        return 'Ngân hàng';
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <div className="p-2 bg-gradient-to-b from-white to-gray-100 rounded-xl shadow-lg max-w-m">
                    {/* Thông tin đơn hàng */}
                    <div className="flex justify-between items-start mb-6">
                        <span className="text-sm font-semibold text-orange-600">
                            Đơn hàng: {cart.length} sản phẩm
                        </span>
                        <div className="text-right">
                            <p className="text-lg font-bold text-orange-600">
                                Tổng tiền: {total.toLocaleString('vi-VN')} đ
                            </p>
                            <p className="text-xs text-gray-500">Đã bao gồm phí VAT</p>
                        </div>
                    </div>

                    {/* Tiêu đề */}
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Phương thức thanh toán
                    </h2>

                    {!showQR ? (
                        <>
                            {/* Dropdown chọn phương thức thanh toán */}
                            <Select onValueChange={handleSelect}>
                                <SelectTrigger className="w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 py-3 text-base shadow-sm transition-all duration-200">
                                    <SelectValue placeholder="Chọn phương thức thanh toán" />
                                </SelectTrigger>
                                <SelectContent className="rounded-lg shadow-lg">
                                    {paymentMethods.map((method) => (
                                        <SelectItem
                                            key={method.value}
                                            value={method.value}
                                            className="flex items-center gap-3 py-3 px-4 hover:bg-blue-50 transition-all duration-200"
                                        >
                                            {renderMethodIcon(method.value, method.icon)}
                                            <span className="text-base text-gray-800">{method.label}</span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Nút Thanh toán */}
                            <Button
                                disabled={!selectedMethod}
                                onClick={handleConfirmPayment}
                                className="mt-6 cursor-pointer w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full py-3 text-base font-semibold shadow-md transition-all duration-200 disabled:bg-gray-300 disabled:text-gray-500"
                            >
                                {selectedMethod === 'cash' ? 'Thanh toán' : 'Hiển thị mã QR'} {total.toLocaleString('vi-VN')} đ
                            </Button>
                        </>
                    ) : (
                        <div className="flex flex-col items-center space-y-4">
                            <div className="bg-white p-4 rounded-lg shadow-md">
                                <QRCodeSVG value={generatePaymentUrl()} size={200} />
                            </div>
                            <p className="text-sm text-gray-600 text-center">
                                Quét mã QR bằng ứng dụng {getPaymentAppName(selectedMethod)} để thanh toán
                            </p>
                            <div className="flex space-x-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowQR(false)}
                                    className="border-orange-500 text-orange-500 hover:bg-orange-50"
                                >
                                    Quay lại
                                </Button>
                                <Button
                                    onClick={() => {
                                        if (selectedMethod) {
                                            onSelectPayment(selectedMethod);
                                            onClose();
                                        }
                                    }}
                                    className="bg-orange-500 hover:bg-orange-600 text-white"
                                >
                                    Xác nhận đã thanh toán
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}