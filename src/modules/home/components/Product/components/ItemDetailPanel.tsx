import React, { useState } from 'react';
import { MenuItem as MenuItemType } from './MenuData';
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

interface Props {
  item: MenuItemType;
  onClose: () => void;
  onAddToCart: (item: MenuItemType, quantity: number) => void;
}

const ItemDetailPanel: React.FC<Props> = ({ item, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSide, setSelectedSide] = useState(true);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  // Hàm để hiển thị các sao đánh giá sử dụng SVG
  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex items-center mb-4">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-4 h-4 ${index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {rating.toFixed(1)} {/* Hiển thị rating với 1 chữ số thập phân */}
        </span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-xs flex items-center justify-center z-50">     
      <div className="bg-white rounded-lg w-[420px] shadow-xl relative">
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
            <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-semibold text-base">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.description || "Không có mô tả."}</p>
              <p className="text-right text-red-600 font-semibold mt-1">
                {item.price.toLocaleString('vi-VN')}đ
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="mb-4">
            <p className="text-sm font-medium">Đánh giá:</p>
            {renderRatingStars(item.rating || 0)} {/* Sử dụng hàm renderRatingStars */}
          </div>

          {/* Quantity */}
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-sm font-medium">Số lượng</span>
            <div className="flex items-center border rounded overflow-hidden">
              <button onClick={() => handleQuantityChange(-1)} className="px-3 py-1 bg-gray-200 hover:bg-gray-300">−</button>
              <span className="px-4">{quantity}</span>
              <button onClick={() => handleQuantityChange(1)} className="px-3 py-1 bg-gray-200 hover:bg-gray-300">+</button>
            </div>
          </div>

          {/* Side dish */}
          <div className="mb-4">
            <p className="text-sm font-medium text-red-600 mb-1">Món kèm (tùy chọn)</p>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedSide}
                onChange={() => setSelectedSide(!selectedSide)}
              />
              <span className="text-sm">Rau củ (Vegetables)</span>
            </label>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-4">
            <Button
              className="w-full bg-orange-500 hover:bg-orange-600 text-white text-base py-2 rounded"
              onClick={() => {
                onAddToCart(item, quantity);
                onClose();
              }}
            >
              🛒 Thêm {quantity} món – {(item.price * quantity).toLocaleString('vi-VN')}đ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPanel;
