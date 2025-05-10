import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { ProductWithId } from '@/lib/apis/types.';
import { Pencil } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface MenuItemProps {
    item: ProductWithId;
    onAddToCart: (item: ProductWithId, selectedSize?: { name: string, price: number }) => void;
    onEdit?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, onAddToCart, onEdit }) => {
    const [selectedSize, setSelectedSize] = useState<{ name: string, price: number } | undefined>(
        item.availableSizes ? item.availableSizes[1] : undefined
    );

    const handleAddToCart = () => {
        onAddToCart(item, selectedSize);
    };

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
            />
            <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <span className="text-orange-500 font-bold">
                        {selectedSize
                            ? selectedSize.price.toLocaleString('vi-VN')
                            : item.price.toLocaleString('vi-VN')} đ
                    </span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{item.description}</p>

                {item.availableSizes && (
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