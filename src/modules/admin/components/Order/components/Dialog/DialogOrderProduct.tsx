import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { OrderItem } from '../../DataOrder';
import { Image as ImageIcon } from "lucide-react";

interface DialogOrderProductProps {
    selectedOrderItems: OrderItem[];
    setSelectedOrderItems: (items: OrderItem[] | null) => void;
}

export default function DialogOrderProduct({ selectedOrderItems, setSelectedOrderItems }: DialogOrderProductProps) {
    const [isOpen, setIsOpen] = useState(false);

    // const getFullImageUrl = (path: string) => {
    //     if (!path) return '';
    //     if (/^https?:\/\//.test(path)) return path;
    //     const apiUrl = import.meta.env.VITE_API_URL as string;
    //     const baseUrl = apiUrl.replace(/\/api\/?$/, '');
    //     return `${baseUrl}${path}`;
    // };

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = ''; // Clear the src on error
    };

    React.useEffect(() => {
        if (selectedOrderItems?.length) {
            setIsOpen(true);
        }
    }, [selectedOrderItems]);

    return (
        <>
            <Dialog open={isOpen} onOpenChange={(open) => {
                setIsOpen(open);
                if (!open) {
                    setSelectedOrderItems(null);
                }
            }}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Chi tiết sản phẩm</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        {selectedOrderItems?.map((item) => (
                            <div key={item.productId} className="flex items-center gap-4 p-4 border rounded-lg">
                                <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden">
                                    {item.product?.image ? (
                                        <img
                                            src={(item.product.image)}
                                            className="w-full h-full object-cover"
                                            onError={handleImageError}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <ImageIcon className="w-8 h-8 mb-1" />
                                            <span className="text-xs">No Image</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium">Mã SP: #{item.productId}</div>
                                    <div className="text-lg font-semibold">{item.product?.name}</div>
                                    <div className="text-sm text-muted-foreground">
                                        Số lượng: {item.quantity}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Giá: {item.price.toLocaleString()} đ
                                    </div>
                                </div>
                                <div className="text-lg font-semibold">
                                    {(item.quantity * item.price).toLocaleString()} đ
                                </div>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
