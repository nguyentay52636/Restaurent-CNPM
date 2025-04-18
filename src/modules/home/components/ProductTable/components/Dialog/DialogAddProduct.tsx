import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';

interface ProductFormData {
    name: string;
    category: string;
    price: number;
    stock: number;
    status: boolean;
    image: string;
}

interface DialogAddProductProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    newProduct: ProductFormData;
    onNewProductChange: (product: ProductFormData) => void;
    onAddProduct: () => void;
}

const DialogAddProduct: React.FC<DialogAddProductProps> = ({
    isOpen,
    onOpenChange,
    newProduct,
    onNewProductChange,
    onAddProduct
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button className="bg-[#A27B5C] hover:bg-[#8c674b] text-white transition-colors">
                    + Add New Product
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                            id="name"
                            value={newProduct.name}
                            onChange={(e) => onNewProductChange({ ...newProduct, name: e.target.value })}
                            placeholder="Enter product name"
                            className="border-gray-300 focus:border-[#A27B5C] transition-colors"
                        />
                    </div>
                    <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                            value={newProduct.category}
                            onValueChange={(value) =>
                                onNewProductChange({ ...newProduct, category: value })
                            }
                        >
                            <SelectTrigger className="border-gray-300 focus:border-[#A27B5C]">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Coffee and Beverage">Coffee and Beverage</SelectItem>
                                <SelectItem value="Food and Snack">Food and Snack</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="price">Price</Label>
                        <Input
                            id="price"
                            type="number"
                            value={newProduct.price}
                            onChange={(e) => onNewProductChange({ ...newProduct, price: parseFloat(e.target.value) })}
                            placeholder="Enter price"
                            className="border-gray-300 focus:border-[#A27B5C] transition-colors"
                        />
                    </div>
                    <div>
                        <Label htmlFor="stock">Stock</Label>
                        <Input
                            id="stock"
                            type="number"
                            value={newProduct.stock}
                            onChange={(e) => onNewProductChange({ ...newProduct, stock: parseInt(e.target.value) })}
                            placeholder="Enter stock"
                            className="border-gray-300 focus:border-[#A27B5C] transition-colors"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch
                            checked={newProduct.status}
                            onCheckedChange={(checked) =>
                                onNewProductChange({ ...newProduct, status: checked })
                            }
                            className="data-[state=checked]:bg-[#A27B5C]"
                        />
                        <Label>Status</Label>
                    </div>
                    <Button
                        onClick={onAddProduct}
                        className="w-full bg-[#A27B5C] hover:bg-[#8c674b] text-white"
                    >
                        Add Product
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DialogAddProduct;
