import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ProductType } from '@/lib/apis/types.';

interface ProductWithId extends ProductType {
  id: number;
}

interface DialogViewProductProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  product: ProductWithId | null;
}

export default function DialogViewProduct({ isOpen, onOpenChange, product }: DialogViewProductProps) {
  if (!product) return null;

  // Function to get category badge color
  const getCategoryBadgeColor = (categoryId: number) => {
    switch (categoryId) {
      case 6:
        return 'bg-amber-100 text-amber-700';
      case 7:
        return 'bg-green-100 text-green-700';
      case 8:
        return 'bg-orange-100 text-orange-700';
      case 9:
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Function to get category name
  const getCategoryName = (categoryId: number) => {
    switch (categoryId) {
      case 6:
        return 'Cà phê';
      case 7:
        return 'Trà';
      case 8:
        return 'Đồ ăn';
      case 9:
        return 'Tráng miệng';
      default:
        return 'Khác';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-6 bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">Chi tiết sản phẩm</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          {/* Product Image */}
          <div className="flex justify-center">
            <div className="relative w-48 h-48 rounded-lg overflow-hidden border border-gray-200">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/200x200/F5F5F5/CCCCCC?text=No+Image';
                }}
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-500">Mã sản phẩm: #{product.id}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Danh mục:</span>
                <Badge className={`${getCategoryBadgeColor(product.categoryId)} font-medium`}>
                  {getCategoryName(product.categoryId)}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Trạng thái:</span>
                <Badge className={product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                  {product.status === 'active' ? 'Còn hàng' : 'Hết hàng'}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Giá:</span>
                <span className="text-sm font-semibold text-gray-900">{product.price.toLocaleString('vi-VN')}đ</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Số lượng:</span>
                {/* <span className="text-sm font-semibold text-gray-900">{product.quantity}</span> */}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-700">Mô tả:</span>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                {product.description || 'Không có mô tả'}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
