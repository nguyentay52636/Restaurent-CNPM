import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Product } from '../DataProducts';

interface DialogEditProductProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    editProduct: Product | null;
    onEditProductChange: (product: Product) => void;
    onSaveEdit: () => void;
}

const DialogEditProduct: React.FC<DialogEditProductProps> = ({
    isOpen,
    onOpenChange,
    editProduct,
    onEditProductChange,
    onSaveEdit
}) => {
    if (!editProduct) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="edit-name">Product Name</Label>
                        <Input
                            id="edit-name"
                            value={editProduct.name}
                            onChange={(e) => onEditProductChange({ ...editProduct, name: e.target.value })}
                            placeholder="Enter product name"
                            className="border-gray-300 focus:border-[#A27B5C] transition-colors"
                        />
                    </div>
                    <div>
                        <Label htmlFor="edit-category">Category</Label>
                        <Select
                            value={editProduct.category}
                            onValueChange={(value) =>
                                onEditProductChange({ ...editProduct, category: value })
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
                        <Label htmlFor="edit-price">Price</Label>
                        <Input
                            id="edit-price"
                            type="number"
                            value={editProduct.price}
                            onChange={(e) => onEditProductChange({ ...editProduct, price: parseFloat(e.target.value) })}
                            placeholder="Enter price"
                            className="border-gray-300 focus:border-[#A27B5C] transition-colors"
                        />
                    </div>
                    <div>
                        <Label htmlFor="edit-stock">Stock</Label>
                        <Input
                            id="edit-stock"
                            type="number"
                            value={editProduct.stock}
                            onChange={(e) => onEditProductChange({ ...editProduct, stock: parseInt(e.target.value) })}
                            placeholder="Enter stock"
                            className="border-gray-300 focus:border-[#A27B5C] transition-colors"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Switch
                            checked={editProduct.status}
                            onCheckedChange={(checked) =>
                                onEditProductChange({ ...editProduct, status: checked })
                            }
                            className="data-[state=checked]:bg-[#A27B5C]"
                        />
                        <Label>Status</Label>
                    </div>
                    <Button
                        onClick={onSaveEdit}
                        className="w-full bg-[#A27B5C] hover:bg-[#8c674b] text-white"
                    >
                        Save Changes
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DialogEditProduct;
