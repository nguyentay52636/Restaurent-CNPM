import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Funnel } from 'lucide-react';
import DialogAddProduct from '../components/Dialog/DialogAddProduct';
import DialogEditProduct from '../components/Dialog/DialogEditProduct';
import TabsCategoriesProduct from '../components/TabsCategoriesProduct';
import { ProductType } from '@/lib/apis/types.';
import { createProduct, updateProduct } from '@/lib/apis/productApi';
import { toast } from 'sonner';

interface ProductWithId extends ProductType {
  id: number;
}

export default function ProductManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [editProduct, setEditProduct] = useState<ProductWithId | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    categoryId: 1,
    price: 0,
    image: 'https://placehold.co/200x200/A27B5C/FFF?text=Coffee',
    status: 'active',
  });

  const handleAddProduct = async () => {
    try {
      setIsLoading(true);
      await createProduct(newProduct);
      toast.success('Thêm sản phẩm thành công ✅', {
        description: 'Sản phẩm mới đã được thêm vào danh sách',
        duration: 3000,
        position: 'top-center',
        style: { background: '#4CAF50', color: 'white', border: 'none' },
      });
      setIsAddOpen(false);
      setNewProduct({
        name: '',
        description: '',
        categoryId: 1,
        price: 0,
        image: 'https://placehold.co/200x200/A27B5C/FFF?text=Coffee',
        status: 'active',
      });
    } catch (error: any) {
      toast.error('Lỗi khi thêm sản phẩm ❌', {
        description: error?.response?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại.',
        duration: 3000,
        position: 'top-center',
        style: { background: '#F44336', color: 'white', border: 'none' },
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editProduct) return;

    try {
      setIsLoading(true);
      await updateProduct(editProduct.id, {
        name: editProduct.name,
        description: editProduct.description,
        price: editProduct.price,
        image: editProduct.image,
        categoryId: editProduct.categoryId,
        status: editProduct.status,
      });
      toast.success('Cập nhật sản phẩm thành công ✅', {
        description: 'Thông tin sản phẩm đã được cập nhật',
        duration: 3000,
        position: 'top-center',
        style: { background: '#4CAF50', color: 'white', border: 'none' },
      });
      setEditProduct(null);
    } catch (error: any) {
      toast.error('Lỗi khi cập nhật sản phẩm ❌', {
        description: error?.response?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại.',
        duration: 3000,
        position: 'top-center',
        style: { background: '#F44336', color: 'white', border: 'none' },
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProduct = (product: ProductWithId) => {
    setEditProduct(product);
  };

  return (
    <div className='p-6 mx-auto bg-white shadow-md rounded-lg min-h-screen'>
      {/* Header Section */}
      <div className='mb-6'>
        <div className='flex justify-between items-center mb-2'>
          <div>
            <h1 className='text-3xl font-bold text-gray-800'>Sản phẩm</h1>
            <nav className='text-sm text-gray-500'>
              <span>Trang chủ</span> / <span>Sản phẩm</span> / <span>Danh sách sản phẩm</span>
            </nav>
          </div>
        </div>
        <div className='flex items-center space-x-3'>
          <Input
            placeholder='Tìm kiếm'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='flex-1 border-gray-300 focus:border-orange-500 focus:ring-orange-500 transition-colors'
            disabled={isLoading}
          />
          <Button
            variant='outline'
            className='flex items-center border-gray-300 text-gray-600 hover:border-orange-500 cursor-pointer'
            disabled={isLoading}
          >
            <Funnel className='h-4 w-4 mr-2' /> Lọc
          </Button>
          <DialogAddProduct
            isOpen={isAddOpen}
            onOpenChange={setIsAddOpen}
            newProduct={newProduct}
            onNewProductChange={setNewProduct}
            onAddProduct={handleAddProduct}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Tabs and Table Section */}
      <TabsCategoriesProduct
        onEditProduct={handleEditProduct}
        onProductAdded={handleAddProduct}
        onProductUpdated={handleSaveEdit}
        isLoading={isLoading}
      />

      {/* Edit Dialog */}
      <DialogEditProduct
        isOpen={!!editProduct}
        onOpenChange={(open: boolean) => !open && setEditProduct(null)}
        editProduct={editProduct}
        onEditProductChange={setEditProduct}
        onSaveEdit={handleSaveEdit}
        isLoading={isLoading}
      />
    </div>
  );
}
