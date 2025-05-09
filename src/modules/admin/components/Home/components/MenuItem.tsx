import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { MenuItem as MenuItemType } from './MenuData';
import { Pencil } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface MenuItemProps {
    item: MenuItemType;
    onAddToCart: (item: MenuItemType, selectedSize?: { name: string, price: number }) => void;
    onEdit?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, onAddToCart, onEdit }) => {
    const [selectedSize, setSelectedSize] = useState<{ name: string, price: number } | undefined>(
        item.availableSizes ? item.availableSizes[1] : undefined
    );

    const isDrink = item.category === 'Drink';

    const handleAddToCart = () => {
        onAddToCart(item, selectedSize);
    };

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <span className="text-orange-500 font-bold">
                        {isDrink && selectedSize
                            ? selectedSize.price.toLocaleString('vi-VN')
                            : item.price.toLocaleString('vi-VN')} đ
                    </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, index) => (
                        <svg
                            key={index}
                            className={`w-4 h-4 ${index < Math.floor(item.rating)
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                                }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                        {item.rating.toFixed(1)}
                    </span>
                </div>

                {isDrink && item.availableSizes && (
                    <div className="mb-3">
                        <p className="text-sm font-medium mb-1">Kích cỡ:</p>
                        <RadioGroup
                            value={selectedSize?.name}
                            onValueChange={(value) => {
                                const size = item.availableSizes?.find(s => s.name === value);
                                if (size) setSelectedSize(size);
                            }}
                            className="flex space-x-4"
                        >
                            {item.availableSizes.map((size) => (
                                <div className="flex items-center space-x-1" key={size.name}>
                                    <RadioGroupItem value={size.name} id={`size-${item.id}-${size.name}`} />
                                    <Label htmlFor={`size-${item.id}-${size.name}`} className="text-sm">
                                        {size.name}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                )}

                <div className="flex gap-2">
                    <Button
                        onClick={handleAddToCart}
                        className="flex-1 bg-orange-500 hover:bg-orange-600 cursor-pointer"
                    >
                        + Thêm vào giỏ hàng
                    </Button>
                    {onEdit && (
                        <Button
                            onClick={onEdit}
                            variant="outline"
                            className="border-orange-500 text-orange-500 hover:bg-orange-50"
                        >
                            <Pencil className="w-4 h-4" />
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default MenuItem; 