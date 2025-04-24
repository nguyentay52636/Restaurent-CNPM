import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';

interface ProductFormData {
  name: string;
  category: string;
  price: number;
  stock: number;
  status: boolean;
  image: string;
  size: string | null;
}

interface DialogAddProductProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newProduct: ProductFormData;
  onNewProductChange: (product: ProductFormData) => void;
  onAddProduct: () => void;
}

const DialogAddProduct: React.FC<DialogAddProductProps> = ({
  isOpen,
  onOpenChange,
  newProduct,
  onNewProductChange,
  onAddProduct,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className='cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2'>
          <span className='text-lg'>+</span> Thêm Sản Phẩm Mới
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md p-6 bg-white rounded-lg shadow-lg'>
        <DialogHeader>
          <DialogTitle className='text-xl font-bold text-gray-900'>Thêm Sản Phẩm Mới</DialogTitle>
        </DialogHeader>
        <div className='space-y-5 mt-4'>
          <div className='space-y-2'>
            <Label htmlFor='name' className='text-sm font-medium text-gray-700'>
              Tên Sản Phẩm
            </Label>
            <Input
              id='name'
              value={newProduct.name}
              onChange={(e) => onNewProductChange({ ...newProduct, name: e.target.value })}
              placeholder='Nhập tên sản phẩm'
              className='border-gray-300 focus:border-orange-500 focus:ring-orange-500 transition-colors rounded-md shadow-sm'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='category' className='text-sm font-medium text-gray-700'>
              Danh Mục
            </Label>
            <Select
              value={newProduct.category}
              onValueChange={(value) => onNewProductChange({ ...newProduct, category: value })}
            >
              <SelectTrigger className='border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm'>
                <SelectValue placeholder='Chọn danh mục' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Coffee and Beverage'>Cà Phê và Đồ Uống</SelectItem>
                <SelectItem value='Food and Snack'>Đồ Ăn và Đồ Ăn Nhẹ</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {newProduct.category === 'Coffee and Beverage' && (
            <div className='space-y-2'>
              <Label htmlFor='size' className='text-sm font-medium text-gray-700'>
                Size
              </Label>
              <Select
                value={newProduct.size || ''}
                onValueChange={(value) => onNewProductChange({ ...newProduct, size: value })}
              >
                <SelectTrigger className='border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm'>
                  <SelectValue placeholder='Chọn size' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='S'>Size S</SelectItem>
                  <SelectItem value='M'>Size M</SelectItem>
                  <SelectItem value='L'>Size L</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <div className='space-y-2'>
            <Label htmlFor='price' className='text-sm font-medium text-gray-700'>
              Giá
            </Label>
            <Input
              id='price'
              type='number'
              value={newProduct.price}
              onChange={(e) =>
                onNewProductChange({ ...newProduct, price: parseFloat(e.target.value) })
              }
              placeholder='Nhập giá'
              className='border-gray-300 focus:border-orange-500 focus:ring-orange-500 transition-colors rounded-md shadow-sm'
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='stock' className='text-sm font-medium text-gray-700'>
              Số Lượng
            </Label>
            <Input
              id='stock'
              type='number'
              value={newProduct.stock}
              onChange={(e) =>
                onNewProductChange({ ...newProduct, stock: parseInt(e.target.value) })
              }
              placeholder='Nhập số lượng'
              className='border-gray-300 focus:border-orange-500 focus:ring-orange-500 transition-colors rounded-md shadow-sm'
            />
          </div>
          <div className='flex items-center space-x-3'>
            <Switch
              checked={newProduct.status}
              onCheckedChange={(checked) => onNewProductChange({ ...newProduct, status: checked })}
              className='data-[state=checked]:bg-orange-500 focus:ring-orange-500'
            />
            <Label className='text-sm font-medium text-gray-700'>Trạng Thái</Label>
          </div>
          <Button
            onClick={onAddProduct}
            className='w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md shadow-sm transition-colors duration-200'
          >
            Thêm Sản Phẩm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddProduct;
