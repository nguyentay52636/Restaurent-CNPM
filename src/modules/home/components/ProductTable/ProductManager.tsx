import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Funnel } from 'lucide-react';
import { Product } from './components/DataProducts';

import DialogAddProduct from './components/Dialog/DialogAddProduct';
import DialogEditProduct from './components/Dialog/DialogEditProduct';
import ProductTable from './components/ProductTable';
import PaginationProduct from './components/PaginationProduct';

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Coffee and Beverage',
    price: 0,
    stock: 0,
    status: true,
    image: '',
  });

  const rowsPerPage = 10;

  // Search and filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [products, searchTerm]);

  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  // Handlers
  const handleStatusToggle = (id: number) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, status: !product.status } : product,
      ),
    );
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEdit = (product: Product) => {
    setEditProduct({ ...product });
  };

  const handleSaveEdit = () => {
    if (editProduct) {
      setProducts(
        products.map((product) => (product.id === editProduct.id ? editProduct : product)),
      );
      setEditProduct(null);
    }
  };

  const handleAddProduct = () => {
    const newId = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    setProducts([...products, { id: newId, ...newProduct }]);
    setNewProduct({
      name: '',
      category: 'Coffee and Beverage',
      price: 0,
      stock: 0,
      status: true,
      image: '',
    });
    setIsAddOpen(false);
  };

  return (
    <div className='p-6 mx-auto bg-white shadow-md rounded-lg min-h-screen'>
      {/* Header Section */}
      <div className='mb-6'>
        <div className='flex justify-between items-center mb-2'>
          <div>
            <h1 className='text-3xl font-bold text-gray-800'>Products</h1>
            <nav className='text-sm text-gray-500'>
              <span>Home</span> / <span>Products</span> / <span>Product List</span>
            </nav>
          </div>
        </div>
        <div className='flex items-center space-x-3'>
          <Input
            placeholder='Search'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='flex-1 border-gray-300 focus:border-[#A27B5C] transition-colors'
          />
          <Button
            variant='outline'
            className='flex items-center border-gray-300 text-gray-600 hover:border-[#A27B5C]'
          >
            <Funnel className='h-4 w-4 mr-2' /> Filter
          </Button>
          <DialogAddProduct
            isOpen={isAddOpen}
            onOpenChange={setIsAddOpen}
            newProduct={newProduct}
            onNewProductChange={setNewProduct}
            onAddProduct={handleAddProduct}
          />
        </div>
      </div>

      {/* Table Section */}
      <ProductTable />

      {/* Pagination Section */}
      <PaginationProduct
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        onPageChange={setCurrentPage}
      />

      {/* Edit Dialog */}
      <DialogEditProduct
        isOpen={!!editProduct}
        onOpenChange={(open: boolean) => !open && setEditProduct(null)}
        editProduct={editProduct}
        onEditProductChange={setEditProduct}
        onSaveEdit={handleSaveEdit}
      />
    </div>
  );
}
