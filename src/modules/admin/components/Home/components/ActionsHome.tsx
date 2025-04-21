import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Bell } from 'lucide-react'

export default function ActionsHome() {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = [
        { name: 'All', icon: '🌐', itemCount: 0 },
        { name: 'Phổ biến', icon: '⭐', itemCount: 0 },
        { name: 'Nước ép', icon: '🍦', itemCount: 0 },
        { name: 'Cơm', icon: '🍚', itemCount: 0 },
        { name: 'Coffee', icon: '☕', itemCount: 0 },
        { name: 'Đồ ăn', icon: '🍿', itemCount: 0 },
        { name: 'Salad', icon: '🥗', itemCount: 0 },
    ];

    return (
        <>
            <div className="">
                <header className="bg-white shadow-sm p-4 flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center space-x-1">
                        <h1 className="text-2xl font-bold text-black">Point</h1>
                        <h1 className="text-2xl font-bold text-orange-500">sell</h1>
                    </div>

                    {/* Search and Notification */}
                    <div className="flex items-center space-x-4">
                        <div className="relative w-64">
                            <Input
                                type="text"
                                placeholder="Tìm kiếm món ăn..."
                                className="pl-10 w-full"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer" />
                        </div>

                        <Button variant="outline" size="icon" className="bg-orange-500 text-white hover:bg-orange-600 cursor-pointer hover:text-white">
                            <Bell className="w-6 h-6" />
                        </Button>
                    </div>
                </header>
            </div>
            <h1 className="text-2xl font-bold text-black m-6">Chọn danh mục</h1>
            <div className="flex justify-center">
                <section className="my-8 flex justify-center items-center">
                    <div className="flex flex-wrap gap-5">
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                className={`flex flex-col items-center justify-center w-32 h-32 rounded-lg shadow-sm border transition-all duration-200 cursor-pointer
                                    ${selectedCategory === category.name
                                        ? 'border-orange-500 bg-orange-50 shadow-md scale-105'
                                        : 'border-gray-200 bg-white hover:bg-gray-50 hover:border-orange-300'
                                    }`}
                                onClick={() => setSelectedCategory(category.name)}
                                aria-pressed={selectedCategory === category.name}
                            >
                                <span className="text-5xl mb-2">{category.icon}</span>
                                <span className={`text-sm font-semibold ${selectedCategory === category.name
                                    ? 'text-orange-700'
                                    : 'text-gray-800'
                                    }`}>
                                    {category.name}
                                </span>
                                <span className={`text-xs ${selectedCategory === category.name
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
