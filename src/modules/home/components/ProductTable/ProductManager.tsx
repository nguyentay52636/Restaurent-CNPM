import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Funnel, Plus, Coffee, Utensils, Cake, CupSoda } from 'lucide-react';
import { Product, dataProducts } from './components/DataProducts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import DialogAddProduct from './components/Dialog/DialogAddProduct';
import DialogEditProduct from './components/Dialog/DialogEditProduct';
import ProductTable from './components/ProductTable';
import PaginationProduct from './components/PaginationProduct';

// Define product categories
const CATEGORIES = {
  ALL: 'all',
  COFFEE: 'coffee',
  TEA: 'tea',
  FOOD: 'food',
  DESSERT: 'dessert',
};

type CategoryTab = 'all' | 'coffee' | 'tea' | 'food' | 'dessert';

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>(dataProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<CategoryTab>('all');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Coffee',
    price: 0,
    stock: 0,
    status: true,
    image: 'https://placehold.co/200x200/A27B5C/FFF?text=Coffee',
    size: null as string | null,
  });

  // Search and filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // First filter by search term
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());

      // Then filter by category tab
      if (activeTab === CATEGORIES.ALL) return matchesSearch;

      const category = product.category.toLowerCase();
      return matchesSearch && (
        (activeTab === CATEGORIES.COFFEE && category === 'coffee') ||
        (activeTab === CATEGORIES.TEA && category === 'tea') ||
        (activeTab === CATEGORIES.FOOD && category === 'food') ||
        (activeTab === CATEGORIES.DESSERT && category === 'dessert')
      );
    });
  }, [products, searchTerm, activeTab]);

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
    // @ts-ignore - Ignore the size property if it's not part of the Product interface
    setProducts([...products, { id: newId, ...newProduct }]);
    setNewProduct({
      name: '',
      category: 'Coffee',
      price: 0,
      stock: 0,
      status: true,
      image: 'https://placehold.co/200x200/A27B5C/FFF?text=Coffee',
      size: null,
    });
    setIsAddOpen(false);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as CategoryTab);
    setCurrentPage(1); // Reset to first page when changing tabs
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  // Count products by category for tab badges
  const productCounts = {
    all: products.length,
    coffee: products.filter(p => p.category.toLowerCase() === 'coffee').length,
    tea: products.filter(p => p.category.toLowerCase() === 'tea').length,
    food: products.filter(p => p.category.toLowerCase() === 'food').length,
    dessert: products.filter(p => p.category.toLowerCase() === 'dessert').length,
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
          />
          <Button
            variant='outline'
            className='flex items-center border-gray-300 text-gray-600 hover:border-orange-500 cursor-pointer'
          >
            <Funnel className='h-4 w-4 mr-2' /> Lọc
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

      {/* Category Tabs */}
      <Tabs defaultValue={CATEGORIES.ALL} value={activeTab} onValueChange={handleTabChange} className="mb-6">
        <TabsList className="grid grid-cols-5 mb-4 bg-gray-100 p-1 rounded-xl">
          <TabsTrigger
            value={CATEGORIES.ALL}
            className="flex items-center justify-center gap-2 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm rounded-lg py-2 cursor-pointer transition-all"
          >
            <span className="flex items-center gap-1.5">
              Tất cả
              <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                {productCounts.all}
              </span>
            </span>
          </TabsTrigger>
          <TabsTrigger
            value={CATEGORIES.COFFEE}
            className="flex items-center justify-center gap-2 data-[state=active]:bg-white data-[state=active]:text-amber-700 data-[state=active]:shadow-sm rounded-lg py-2 cursor-pointer transition-all"
          >
            <Coffee className="h-4 w-4" />
            <span className="flex items-center gap-1.5">
              Cà phê
              <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">
                {productCounts.coffee}
              </span>
            </span>
          </TabsTrigger>
          <TabsTrigger
            value={CATEGORIES.TEA}
            className="flex items-center justify-center gap-2 data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm rounded-lg py-2 cursor-pointer transition-all"
          >
            <CupSoda className="h-4 w-4" />
            <span className="flex items-center gap-1.5">
              Trà
              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                {productCounts.tea}
              </span>
            </span>
          </TabsTrigger>
          <TabsTrigger
            value={CATEGORIES.FOOD}
            className="flex items-center justify-center gap-2 data-[state=active]:bg-white data-[state=active]:text-orange-700 data-[state=active]:shadow-sm rounded-lg py-2 cursor-pointer transition-all"
          >
            <Utensils className="h-4 w-4" />
            <span className="flex items-center gap-1.5">
              Đồ ăn
              <span className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full">
                {productCounts.food}
              </span>
            </span>
          </TabsTrigger>
          <TabsTrigger
            value={CATEGORIES.DESSERT}
            className="flex items-center justify-center gap-2 data-[state=active]:bg-white data-[state=active]:text-pink-700 data-[state=active]:shadow-sm rounded-lg py-2 cursor-pointer transition-all"
          >
            <Cake className="h-4 w-4" />
            <span className="flex items-center gap-1.5">
              Tráng miệng
              <span className="bg-pink-100 text-pink-700 text-xs px-2 py-0.5 rounded-full">
                {productCounts.dessert}
              </span>
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          {/* Table Section */}
          <ProductTable
            products={paginatedProducts}
            onStatusToggle={handleStatusToggle}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />

          {/* Pagination Section */}
          {filteredProducts.length > 0 && (
            <PaginationProduct
              currentPage={currentPage}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              onPageChange={setCurrentPage}
              onRowsPerPageChange={handleRowsPerPageChange}
              totalItems={filteredProducts.length}
            />
          )}
        </TabsContent>
      </Tabs>

      {/* Add Dialog */}


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
