import React, { useState, useRef, useEffect } from 'react';
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
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link, Plus, Upload, Loader2 } from 'lucide-react';
import { ProductType } from '@/lib/apis/types.';
import { getCategories } from '@/lib/apis/categoriesApi';

interface Category {
  id: number;
  name: string;
}

interface DialogAddProductProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newProduct: ProductType;
  onNewProductChange: (product: ProductType) => void;
  onAddProduct: () => Promise<void>;
  isLoading?: boolean;
}

// Helper để lấy base URL từ biến môi trường và ghép đường dẫn ảnh
const getBaseUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL as string;
  return apiUrl.replace(/\/api\/?$/, '');
};

const getFullImageUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${getBaseUrl()}${path}`;
};

const DialogAddProduct: React.FC<DialogAddProductProps> = ({
  isOpen,
  onOpenChange,
  newProduct,
  onNewProductChange,
  onAddProduct,
  isLoading = false,
}) => {
  const [imageTab, setImageTab] = useState<'url' | 'upload'>('url');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const response = await getCategories();
        // Ensure we're working with an array
        const categoriesData = Array.isArray(response) ? response : response.data || [];
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]); // Set empty array on error
      } finally {
        setIsLoadingCategories(false);
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Tạo form data để upload file
      const formData = new FormData();
      formData.append('file', file);

      try {
        // Gọi API upload file
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();

        // Lấy đường dẫn ảnh từ backend trả về
        const imageUrl = result.data?.image;
        if (imageUrl) {
          setPreviewImage(imageUrl);
          onNewProductChange({ ...newProduct, image: imageUrl });
        }
      } catch (error) {
        console.error('Upload failed:', error);
      }
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

  const handleSubmit = async () => {
    try {
      await onAddProduct();
      setPreviewImage(null);
      setImageTab('url');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const isFormValid = () => {
    return (
      newProduct.name.trim() !== '' &&
      newProduct.description.trim() !== '' &&
      newProduct.price > 0 &&
      newProduct.image.trim() !== ''
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          className='cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2'
          disabled={isLoading}
        >
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
              Tên Sản Phẩm <span className="text-red-500">*</span>
            </Label>
            <Input
              id='name'
              value={newProduct.name}
              onChange={(e) => onNewProductChange({ ...newProduct, name: e.target.value })}
              placeholder='Nhập tên sản phẩm'
              className='border-gray-300 focus:border-orange-500 focus:ring-orange-500 transition-colors rounded-md shadow-sm'
              disabled={isLoading}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='description' className='text-sm font-medium text-gray-700'>
              Mô tả <span className="text-red-500">*</span>
            </Label>
            <Input
              id='description'
              value={newProduct.description}
              onChange={(e) => onNewProductChange({ ...newProduct, description: e.target.value })}
              placeholder='Nhập mô tả sản phẩm'
              className='border-gray-300 focus:border-orange-500 focus:ring-orange-500 transition-colors rounded-md shadow-sm'
              disabled={isLoading}
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='category' className='text-sm font-medium text-gray-700'>
              Danh Mục <span className="text-red-500">*</span>
            </Label>
            <Select
              value={newProduct.categoryId.toString()}
              onValueChange={(value) => onNewProductChange({ ...newProduct, categoryId: parseInt(value) })}
              disabled={isLoading || isLoadingCategories}
            >
              <SelectTrigger className='border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm cursor-pointer'>
                <SelectValue placeholder='Chọn danh mục' />
              </SelectTrigger>
              <SelectContent>
                {isLoadingCategories ? (
                  <SelectItem value="loading" disabled>
                    <span className="flex items-center">
                      <Loader2 className="h-4 w-4 animate-spin text-orange-500 mr-2" />
                      Đang tải danh mục...
                    </span>
                  </SelectItem>
                ) : categories.length > 0 ? (
                  categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                      className='cursor-pointer'
                    >
                      {category.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-categories" disabled>
                    Không có danh mục nào
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='price' className='text-sm font-medium text-gray-700'>
              Giá <span className="text-red-500">*</span>
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
              disabled={isLoading}
            />
          </div>

          {/* Image Upload Section */}
          <div className='space-y-3'>
            <Label className='text-sm font-medium text-gray-700'>
              Hình ảnh sản phẩm <span className="text-red-500">*</span>
            </Label>

            <Tabs defaultValue="url" value={imageTab} onValueChange={(value) => setImageTab(value as 'url' | 'upload')} className="w-full">
              <TabsList className="grid grid-cols-2 mb-2">
                <TabsTrigger value="url" className="flex items-center gap-1 cursor-pointer" disabled={isLoading}>
                  <Link className="h-4 w-4" /> URL
                </TabsTrigger>
                <TabsTrigger value="upload" className="flex items-center gap-1 cursor-pointer" disabled={isLoading}>
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
                  disabled={isLoading}
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
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={triggerFileInput}
                    className="w-full h-24 border-dashed border-2 border-gray-300 hover:border-orange-500 flex flex-col items-center justify-center gap-2 cursor-pointer"
                    disabled={isLoading}
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
                    src={getFullImageUrl(previewImage || newProduct.image)}
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
            <Select
              value={newProduct.status}
              onValueChange={(value) => onNewProductChange({ ...newProduct, status: value })}
              disabled={isLoading}
            >
              <SelectTrigger className='border-gray-300 focus:border-orange-500 focus:ring-orange-500 rounded-md shadow-sm cursor-pointer'>
                <SelectValue placeholder='Chọn trạng thái' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='active' className='cursor-pointer'>Còn hàng</SelectItem>
                <SelectItem value='inactive' className='cursor-pointer'>Hết hàng</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleSubmit}
            className='w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md shadow-sm transition-colors duration-200 cursor-pointer'
            disabled={isLoading || !isFormValid()}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang thêm sản phẩm...
              </>
            ) : (
              'Thêm Sản Phẩm'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddProduct;
