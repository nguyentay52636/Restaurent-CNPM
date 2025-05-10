import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Coffee, Utensils, Cake, CupSoda } from 'lucide-react';
import { getCategories } from '@/lib/apis/categoriesApi';
import { getAllProducts, deleteProduct, updateProduct } from '@/lib/apis/productApi';
import ProductTable from './ProductTable';
import PaginationProduct from './PaginationProduct';
import { ProductType } from '@/lib/apis/types.';

// Define product categories
const CATEGORIES = {
    ALL: 'all',
    COFFEE: 'coffee',
    TEA: 'tea',
    FOOD: 'food',
    DESSERT: 'dessert',
};

type CategoryTab = 'all' | 'coffee' | 'tea' | 'food' | 'dessert';

interface Category {
    id: number;
    name: string;
}

interface ProductWithId extends ProductType {
    id: number;
}

interface TabsCategoriesProductProps {
    onEditProduct: (product: ProductWithId) => void;
    onProductAdded?: () => void;
    onProductUpdated?: () => void;
    onProductDeleted?: () => void;
    isLoading?: boolean;
}

export default function TabsCategoriesProduct({
    onEditProduct,
    onProductAdded,
    onProductUpdated,
    onProductDeleted
}: TabsCategoriesProductProps) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<ProductWithId[]>([]);
    const [activeTab, setActiveTab] = useState<CategoryTab>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch categories and products
    const fetchData = async () => {
        try {
            setLoading(true);
            const [categoriesResponse, productsResponse] = await Promise.all([
                getCategories(),
                getAllProducts()
            ]);
            setCategories(categoriesResponse.data);
            setProducts(productsResponse.data);
        } catch (err) {
            setError('Failed to fetch data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Filter products based on active tab
    const filteredProducts = products.filter((product) => {
        if (activeTab === CATEGORIES.ALL) return true;
        return product.categoryId.toString().toLowerCase() === activeTab;
    });

    const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    // Handlers
    const handleStatusToggle = async (id: number) => {
        try {
            const product = products.find(p => p.id === id);
            if (!product) return;

            const newStatus = product.status === 'active' ? 'inactive' : 'active';
            await updateProduct(id, { ...product, status: newStatus });

            setProducts(products.map(p =>
                p.id === id ? { ...p, status: newStatus } : p
            ));
            onProductUpdated?.();
        } catch (err) {
            setError('Failed to update product status');
            console.error(err);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteProduct(id);
            setProducts(products.filter(p => p.id !== id));
            onProductDeleted?.();
        } catch (err) {
            setError('Failed to delete product');
            console.error(err);
        }
    };

    const handleEdit = (product: ProductWithId) => {
        onEditProduct(product);
    };

    const handleTabChange = (value: string) => {
        setActiveTab(value as CategoryTab);
        setCurrentPage(1);
    };

    const handleRowsPerPageChange = (rows: number) => {
        setRowsPerPage(rows);
        setCurrentPage(1);
    };

    // Count products by category
    const productCounts = {
        all: products.length,
        coffee: products.filter(p => p.categoryId === 1).length,
        tea: products.filter(p => p.categoryId === 2).length,
        food: products.filter(p => p.categoryId === 3).length,
        dessert: products.filter(p => p.categoryId === 4).length,
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
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
                <ProductTable
                    products={paginatedProducts}
                    onStatusToggle={handleStatusToggle}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />

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
    );
}

