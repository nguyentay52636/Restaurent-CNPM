import React, { useState, useRef } from 'react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageIcon, Link, Plus, Upload } from 'lucide-react';

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
  const [imageTab, setImageTab] = useState<'url' | 'upload'>('url');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a URL for the file
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      onNewProductChange({ ...newProduct, image: imageUrl });
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    onNewProductChange({ ...newProduct, image: url });
    setPreviewImage(url);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className='cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2'>
          <Plus className='h-4 w-4' /> Thêm Sản Phẩm Mới
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
              <SelectTrigger className='border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm cursor-pointer'>
                <SelectValue placeholder='Chọn danh mục' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Coffee' className='cursor-pointer'>Cà Phê</SelectItem>
                <SelectItem value='Tea' className='cursor-pointer'>Trà</SelectItem>
                <SelectItem value='Food' className='cursor-pointer'>Đồ Ăn</SelectItem>
                <SelectItem value='Dessert' className='cursor-pointer'>Tráng Miệng</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {(newProduct.category === 'Coffee' || newProduct.category === 'Tea') && (
            <div className='space-y-2'>
              <Label htmlFor='size' className='text-sm font-medium text-gray-700'>
                Size
              </Label>
              <Select
                value={newProduct.size || ''}
                onValueChange={(value) => onNewProductChange({ ...newProduct, size: value })}
              >
                <SelectTrigger className='border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm cursor-pointer'>
                  <SelectValue placeholder='Chọn size' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='S' className='cursor-pointer'>Size S</SelectItem>
                  <SelectItem value='M' className='cursor-pointer'>Size M</SelectItem>
                  <SelectItem value='L' className='cursor-pointer'>Size L</SelectItem>
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

          {/* Image Upload Section */}
          <div className='space-y-3'>
            <Label className='text-sm font-medium text-gray-700'>Hình ảnh sản phẩm</Label>

            <Tabs defaultValue="url" value={imageTab} onValueChange={(value) => setImageTab(value as 'url' | 'upload')} className="w-full">
              <TabsList className="grid grid-cols-2 mb-2">
                <TabsTrigger value="url" className="flex items-center gap-1 cursor-pointer">
                  <Link className="h-4 w-4" /> URL
                </TabsTrigger>
                <TabsTrigger value="upload" className="flex items-center gap-1 cursor-pointer">
                  <Upload className="h-4 w-4" /> Tải lên
                </TabsTrigger>
              </TabsList>

              <TabsContent value="url" className="mt-2">
                <Input
                  id='image'
                  value={newProduct.image}
                  onChange={handleUrlChange}
                  placeholder='Nhập đường dẫn hình ảnh'
                  className='border-gray-300 focus:border-orange-500 focus:ring-orange-500 transition-colors rounded-md shadow-sm'
                />
              </TabsContent>

              <TabsContent value="upload" className="mt-2">
                <div className="flex flex-col items-center justify-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={triggerFileInput}
                    className="w-full h-24 border-dashed border-2 border-gray-300 hover:border-orange-500 flex flex-col items-center justify-center gap-2 cursor-pointer"
                  >
                    <Upload className="h-6 w-6 text-gray-400" />
                    <span className="text-sm text-gray-500">Chọn ảnh từ máy tính</span>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            {/* Image Preview */}
            {(previewImage || newProduct.image) && (
              <div className="mt-4 flex justify-center">
                <div className="relative w-32 h-32 rounded-md overflow-hidden border border-gray-200">
                  <img
                    src={previewImage || newProduct.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/200x200/F5F5F5/CCCCCC?text=No+Image';
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className='flex items-center space-x-3'>
            <Switch
              checked={newProduct.status}
              onCheckedChange={(checked) => onNewProductChange({ ...newProduct, status: checked })}
              className='data-[state=checked]:bg-orange-500 focus:ring-orange-500 cursor-pointer'
            />
            <Label className='text-sm font-medium text-gray-700'>Còn hàng</Label>
          </div>
          <Button
            onClick={onAddProduct}
            className='w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md shadow-sm transition-colors duration-200 cursor-pointer'
          >
            Thêm Sản Phẩm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddProduct;
