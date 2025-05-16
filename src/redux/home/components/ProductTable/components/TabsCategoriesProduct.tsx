import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Coffee, Utensils, Cake, CupSoda } from 'lucide-react';
import { getCategories } from '@/lib/apis/categoriesApi';
import { getAllProducts, deleteProduct, updateProduct } from '@/lib/apis/productApi';
import ProductTable from './ProductTable';
import PaginationProduct from './PaginationProduct';
import { Category, ProductWithId } from '@/lib/apis/types.';

// Define product categories based on API response
const CATEGORIES = {
    ALL: 'all',
    COFFEE: 'Cà phê',
    TEA: 'Trà',
    FOOD: 'Đồ ăn',
    DESSERT: 'Tráng miệng',
    SNACK: 'Đồ ăn nhẹ'
};

type CategoryTab = 'all' | 'Cà phê' | 'Trà' | 'Đồ ăn' | 'Tráng miệng' | 'Đồ ăn nhẹ';



interface TabsCategoriesProductProps {
    onEditProduct: (product: ProductWithId) => void;
    onProductAdded?: () => void;
    onProductUpdated?: () => void;
    onProductDeleted?: () => void;
    isLoading?: boolean;
    searchTerm?: string;
    searchField?: string;
}

export default function TabsCategoriesProduct({
    onEditProduct,
    onProductUpdated,
    onProductDeleted,
    searchTerm = '',
    searchField = 'name'
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

    // Get category ID by name
    const getCategoryIdByName = (categoryName: string): number | undefined => {
        return categories.find(c => c.name === categoryName)?.id;
    };

    // Filter products based on active tab and search term/field
    const filteredProducts = products.filter((product) => {
        const matchesCategory = activeTab === CATEGORIES.ALL || getCategoryIdByName(activeTab) === product.categoryId;
        let matchesSearch = true;
        if (searchTerm !== '') {
            switch (searchField) {
                case 'name':
                    matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
                    break;
                case 'category':
                    const categoryName = categories.find(c => c.id === product.categoryId)?.name || '';
                    matchesSearch = categoryName.toLowerCase().includes(searchTerm.toLowerCase());
                    break;
                case 'status':
                    matchesSearch = product.status.toLowerCase().includes(searchTerm.toLowerCase());
                    break;
                case 'id':
                    matchesSearch = product.id.toString().includes(searchTerm);
                    break;
                case 'price':
                    matchesSearch = product.price.toString().includes(searchTerm);
                    break;
                default:
                    matchesSearch = true;
            }
        }
        return matchesCategory && matchesSearch;
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
        [CATEGORIES.COFFEE]: products.filter(p => getCategoryIdByName(CATEGORIES.COFFEE) === p.categoryId).length,
        [CATEGORIES.TEA]: products.filter(p => getCategoryIdByName(CATEGORIES.TEA) === p.categoryId).length,
        [CATEGORIES.FOOD]: products.filter(p => getCategoryIdByName(CATEGORIES.FOOD) === p.categoryId).length,
        [CATEGORIES.DESSERT]: products.filter(p => getCategoryIdByName(CATEGORIES.DESSERT) === p.categoryId).length,
        [CATEGORIES.SNACK]: products.filter(p => getCategoryIdByName(CATEGORIES.SNACK) === p.categoryId).length,
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Tabs defaultValue={CATEGORIES.ALL} value={activeTab} onValueChange={handleTabChange} className="mb-6">
            <TabsList className="grid grid-cols-6 mb-4 bg-gray-100 p-1 rounded-xl">
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
                        {CATEGORIES.COFFEE}
                        <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">
                            {productCounts[CATEGORIES.COFFEE]}
                        </span>
                    </span>
                </TabsTrigger>
                <TabsTrigger
                    value={CATEGORIES.TEA}
                    className="flex items-center justify-center gap-2 data-[state=active]:bg-white data-[state=active]:text-green-700 data-[state=active]:shadow-sm rounded-lg py-2 cursor-pointer transition-all"
                >
                    <CupSoda className="h-4 w-4" />
                    <span className="flex items-center gap-1.5">
                        {CATEGORIES.TEA}
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                            {productCounts[CATEGORIES.TEA]}
                        </span>
                    </span>
                </TabsTrigger>
                <TabsTrigger
                    value={CATEGORIES.FOOD}
                    className="flex items-center justify-center gap-2 data-[state=active]:bg-white data-[state=active]:text-orange-700 data-[state=active]:shadow-sm rounded-lg py-2 cursor-pointer transition-all"
                >
                    <Utensils className="h-4 w-4" />
                    <span className="flex items-center gap-1.5">
                        {CATEGORIES.FOOD}
                        <span className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full">
                            {productCounts[CATEGORIES.FOOD]}
                        </span>
                    </span>
                </TabsTrigger>
                <TabsTrigger
                    value={CATEGORIES.DESSERT}
                    className="flex items-center justify-center gap-2 data-[state=active]:bg-white data-[state=active]:text-pink-700 data-[state=active]:shadow-sm rounded-lg py-2 cursor-pointer transition-all"
                >
                    <Cake className="h-4 w-4" />
                    <span className="flex items-center gap-1.5">
                        {CATEGORIES.DESSERT}
                        <span className="bg-pink-100 text-pink-700 text-xs px-2 py-0.5 rounded-full">
                            {productCounts[CATEGORIES.DESSERT]}
                        </span>
                    </span>
                </TabsTrigger>
                <TabsTrigger
                    value={CATEGORIES.SNACK}
                    className="flex items-center justify-center gap-2 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-lg py-2 cursor-pointer transition-all"
                >
                    <Utensils className="h-4 w-4" />
                    <span className="flex items-center gap-1.5">
                        {CATEGORIES.SNACK}
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                            {productCounts[CATEGORIES.SNACK]}
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

