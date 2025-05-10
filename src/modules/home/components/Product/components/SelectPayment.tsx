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

// Dữ liệu phương thức thanh toán
const paymentMethods = [
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

    const handleSelect = (value: string) => {
        setSelectedMethod(value);
    };

    const handleConfirmPayment = () => {
        if (selectedMethod) {
            onSelectPayment(selectedMethod);
            onClose();
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent >
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
                                    <img src={method.icon} alt={method.label} className="w-6 h-6" />
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
                        Thanh toán {total.toLocaleString('vi-VN')} đ
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}