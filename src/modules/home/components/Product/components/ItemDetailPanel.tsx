import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import { ProductWithId } from '@/lib/apis/types';

interface Props {
  item: ProductWithId;
  onClose: () => void;
  onAddToCart: (item: ProductWithId, quantity: number, selectedSize?: { name: string, price: number }) => void;
}

const ItemDetailPanel: React.FC<Props> = ({ item, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<{ name: string, price: number } | undefined>(undefined);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[700px] h-[300px] shadow-xl relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-2">
          <span className="font-semibold text-lg">Chi tiết món ăn</span>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Image and Basic Info */}
          <div className="flex space-x-4 mb-4">
            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-semibold text-base">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.description || "Không có mô tả."}</p>
              <p className="text-right text-red-600 font-semibold mt-1">
                {item.price.toLocaleString('vi-VN')}đ
              </p>
            </div>
          </div>

          {/* Size Options */}
          {item.selectedSize && item.selectedSize.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-red-600 mb-1">Chọn kích thước (tùy chọn)</p>
              {item.selectedSize.map((size) => (
                <label key={size.name} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    checked={selectedSize?.name === size.name}
                    onChange={() => setSelectedSize(size)}
                  />
                  <span className="text-sm">{size.name} – {size.price.toLocaleString('vi-VN')}đ</span>
                </label>
              ))}
            </div>
          )}

          {/* Quantity */}
          <div className="flex justify-end items-center space-x-3 mb-4">
            <span className="text-sm font-medium">Số lượng</span>
            <div className="flex items-center border rounded overflow-hidden">
              <button onClick={() => handleQuantityChange(-1)} className="px-3 py-1 bg-gray-200 hover:bg-gray-300">−</button>
              <span className="px-4">{quantity}</span>
              <button onClick={() => handleQuantityChange(1)} className="px-3 py-1 bg-gray-200 hover:bg-gray-300">+</button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-4">
            <Button
              className="w-full bg-orange-500 hover:bg-orange-600 text-white text-base py-2 rounded"
              onClick={() => {
                onAddToCart(item, quantity, selectedSize);
                onClose();
              }}
            >
              🛒 Thêm {quantity} món – {(selectedSize ? selectedSize.price : item.price) * quantity}đ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPanel;
