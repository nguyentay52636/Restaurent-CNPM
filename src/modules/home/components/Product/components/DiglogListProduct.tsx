import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getAllProducts } from '@/lib/apis/productApi';
import { getCategories } from '@/lib/apis/categoriesApi';

import { ProductWithId } from '@/lib/apis/types.';
import ItemProductDiaLog from './ItemProductDiaLog';

import { Button } from "@/components/ui/button";

import SelectCategoryProduct, { CategoryTab } from './SelectCategoryProduct';

interface DiglogListProductProps {
    open: boolean;
    onClose: () => void;
    onAddProduct: (product: ProductWithId) => void;
}

export default function DiglogListProduct({ open, onClose, onAddProduct }: DiglogListProductProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState<ProductWithId[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState('all');
    const [categories, setCategories] = useState<CategoryTab[]>([]);

    useEffect(() => {
        if (!open) return;
        setIsLoading(true);
        setError(null);
        getAllProducts()
            .then((data) => {
                setProducts(data?.data || data || []);
            })
            .catch(() => setError('Không thể tải sản phẩm'))
            .finally(() => setIsLoading(false));
    }, [open]);

    useEffect(() => {
        if (!open) return;
        getCategories()
            .then((res) => {
                const cats = res?.data || res;
                setCategories([
                    { id: 'all', name: 'Tất cả' },
                    ...cats.map((cat: any) => ({ id: cat.id.toString(), name: cat.name }))
                ]);
            })
            .catch(() => setCategories([{ id: 'all', name: 'Tất cả' }]));
    }, [open]);

    // Lọc sản phẩm theo activeCategory
    const filteredProducts = Array.isArray(products)
        ? products.filter(product =>
            (activeCategory === 'all' || product.categoryId?.toString() === activeCategory) &&
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-5xl!">
                <DialogHeader>
                    <DialogTitle>Danh sách sản phẩm</DialogTitle>
                </DialogHeader>
                <SelectCategoryProduct
                    categories={categories}
                    activeCategory={activeCategory}
                    onChange={setActiveCategory}
                />
                <div className="relative mb-4 flex items-center gap-2">
                    <Input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                    <Button
                        variant="outline"
                        className="absolute left-0 top-0 h-full flex items-center px-3 z-10"
                        style={{ pointerEvents: 'none', background: 'transparent', border: 'none' }}
                        tabIndex={-1}
                    >
                        <Search className="w-5 h-5 text-gray-400" />
                    </Button>
                    <Button
                        variant="default"
                        className="ml-2 bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
                        onClick={() => {/* trigger search nếu cần */ }}
                    >
                        Tìm kiếm
                    </Button>
                </div>
                <div className="max-h-[60vh] overflow-y-auto pr-2">
                    {isLoading ? (
                        <div className="text-center py-4">Loading products...</div>
                    ) : error ? (
                        <div className="text-center py-4 text-red-500">{error}</div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="text-center py-4">No products found</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {filteredProducts.map(product => (
                                <ItemProductDiaLog
                                    key={product.id}
                                    item={product}
                                    onAddToCart={onAddProduct}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
