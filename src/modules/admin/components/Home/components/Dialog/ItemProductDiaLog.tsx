import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ItemProductDiaLogProps {
    item: {
        id: number;
        name: string;
        price: number;
        image: string;
        description?: string;
    };
    onAddToCart: (item: any) => void;
}

export default function ItemProductDiaLog({ item, onAddToCart }: ItemProductDiaLogProps) {
    return (
        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center w-full transition hover:shadow-lg">
            <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-md mb-3 bg-gray-100"
            />
            <div className="font-semibold text-base text-center mb-1 truncate w-full">{item.name}</div>
            <div className="text-orange-600 font-bold mb-2">{item.price.toLocaleString('vi-VN')} đ</div>
            {item.description && (
                <div className="text-gray-500 text-sm text-center mb-3 line-clamp-2">{item.description}</div>
            )}
            <Button
                variant="default"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-auto cursor-pointer"
                onClick={() => onAddToCart(item)}
            >
                <Plus className="h-4 w-4 mr-2 cursor-pointer hover:scale-110 transition-all duration-300" /> Thêm vào giỏ hàng
            </Button>
        </div>
    );
}
