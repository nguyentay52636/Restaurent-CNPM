import React from 'react';
import { ProductWithId } from '@/lib/apis/types';
import { ProductType } from '@/lib/apis/types.';

interface MenuItemProps {
  item: ProductWithId;
  onAddToCart: (item: ProductWithId, quantity: number) => void;
  onClickDetail: (item: ProductType) => void; 
}

const MenuItem: React.FC<MenuItemProps> = ({ item, onAddToCart, onClickDetail }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded" />
      <h3 className="text-xl font-semibold mt-2">{item.name}</h3>
      <p className="text-gray-500 text-sm mt-1">{item.description}</p>
      <p className="text-red-600 font-semibold mt-2">{item.price.toLocaleString('vi-VN')}đ</p>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => onAddToCart(item, 1)} 
          className="px-4 py-2 bg-orange-500 text-white rounded"
        >
          Thêm vào giỏ
        </button>
        <button
          onClick={() => onClickDetail(item)} 
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
