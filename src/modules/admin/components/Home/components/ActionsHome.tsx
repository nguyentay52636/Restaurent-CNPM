import React, { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Bell } from 'lucide-react'
import { getCategories } from '@/lib/apis/categoriesApi'
import { getAllProducts } from '@/lib/apis/productApi'

interface ActionsHomeProps {
    onCategorySelect: (categoryId: string) => void;
    onSearchChange: (searchTerm: string) => void;
}

export default function ActionsHome({ onCategorySelect, onSearchChange }: ActionsHomeProps) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([
        { id: 'All', name: 'All', icon: '🌐', itemCount: 0 }
    ]);
    const [products, setProducts] = useState<any[]>([]);
    const getIconForCategory = (categoryName: string): string => {
        const name = categoryName.toLowerCase();
        if (name.includes('cà phê') || name.includes('coffee')) return '☕';
        if (name.includes('trà') || name.includes('tea')) return '🫖';
        if (name.includes('đồ ăn nhẹ') || name.includes('snack')) return '🍿';
        if (name.includes('đồ ăn') || name.includes('food')) return '🍽️';
        if (name.includes('tráng miệng') || name.includes('dessert')) return '🍰';
        return '🍽️'; // Default icon
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                const apiCategories = response.data.map((category: any) => ({
                    id: category.id,
                    name: category.name,
                    icon: getIconForCategory(category.name),
                    itemCount: 0
                }));
                setCategories([{ id: 'All', name: 'All', icon: '🌐', itemCount: 0 }, ...apiCategories]);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProducts();
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);
    useEffect(() => {
        const updateItemCounts = () => {
            const updatedCategories = categories.map((category) => {
                if (category.id === 'All') {
                    const itemCount = products.length;
                    return { ...category, itemCount };
                } else {
                    const itemCount = products.filter(
                        (product) => product.categoryId === category.id
                    ).length;
                    return { ...category, itemCount };
                }
            });
            setCategories(updatedCategories);
        };

        updateItemCounts();
    }, [products]);
    const handleCategorySelect = (categoryId: string) => {
        setSelectedCategory(categoryId);
        onCategorySelect(categoryId);
    };
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const searchValue = event.target.value;
  setSearchTerm(searchValue);
  onSearchChange(searchValue);
  console.log(searchValue);
};
    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-6 mt-6">
                <h1 className="text-2xl font-bold text-black m-6">Chọn danh mục</h1>
                <div className="flex items-center space-x-4">
                    <div className="relative w-64">
                        <Input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Tìm kiếm món ăn..."
                            className="pl-10 w-full"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer" />
                    </div>

                    <Button variant="outline" size="icon" className="bg-orange-500 text-white hover:bg-orange-600 cursor-pointer hover:text-white">
                        <Bell className="w-6 h-6" />
                    </Button>
                </div>
            </div>
            <div className="flex justify-center">
                <section className="my-8 flex justify-center items-center">
                    <div className="flex flex-wrap gap-5">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className={`flex flex-col items-center justify-center w-32 h-32 rounded-lg shadow-sm border transition-all duration-200 cursor-pointer
                                    ${selectedCategory === category.id
                                        ? 'border-orange-500 bg-orange-50 shadow-md scale-105'
                                        : 'border-gray-200 bg-white hover:bg-gray-50 hover:border-orange-300'
                                    }`}
                                onClick={() => handleCategorySelect(category.id)}
                                aria-pressed={selectedCategory === category.id}
                            >
                                <span className="text-5xl mb-2">{category.icon}</span>
                                <span className={`text-sm font-semibold ${selectedCategory === category.id
                                    ? 'text-orange-700'
                                    : 'text-gray-800'
                                    }`}>
                                    {category.name}
                                </span>
                                <span className={`text-xs ${selectedCategory === category.id
                                    ? 'text-orange-600'
                                    : 'text-gray-500'
                                    }`}>
                                    {category.itemCount} Item{category.itemCount !== 1 ? 's' : ''}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    )
}
