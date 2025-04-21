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
                    <DialogTitle>Chỉnh Sửa Sản Phẩm</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="edit-name">Tên Sản Phẩm</Label>
                        <Input
                            id="edit-name"
                            value={editProduct.name}
                            onChange={(e) => onEditProductChange({ ...editProduct, name: e.target.value })}
                            placeholder="Nhập tên sản phẩm"
                            className="border-gray-300 focus:border-[#F67F20] transition-colors"
                        />
                    </div>
                    <div>
                        <Label htmlFor="edit-category">Danh Mục</Label>
                        <Select
                            value={editProduct.category}
                            onValueChange={(value) =>
                                onEditProductChange({ ...editProduct, category: value })
                            }
                        >
                            <SelectTrigger className="border-gray-300 focus:border-[#F67F20]">
                                <SelectValue placeholder="Chọn danh mục" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Coffee and Beverage">Cà Phê và Đồ Uống</SelectItem>
                                <SelectItem value="Food and Snack">Đồ Ăn và Đồ Ăn Nhẹ</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="edit-price">Giá</Label>
                        <Input
                            id="edit-price"
                            type="number"
                            value={editProduct.price}
                            onChange={(e) => onEditProductChange({ ...editProduct, price: parseFloat(e.target.value) })}
                            placeholder="Nhập giá"
                            className="border-gray-300 focus:border-[#A27B5C] transition-colors"
                        />
                    </div>
                    <div>
                        <Label htmlFor="edit-stock">Số Lượng</Label>
                        <Input
                            id="edit-stock"
                            type="number"
                            value={editProduct.stock}
                            onChange={(e) => onEditProductChange({ ...editProduct, stock: parseInt(e.target.value) })}
                            placeholder="Nhập số lượng"
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
                        <Label>Trạng Thái</Label>
                    </div>
                    <Button
                        onClick={onSaveEdit}
                        className="w-full bg-[#A27B5C] hover:bg-[#8c674b] text-white"
                    >
                        Lưu Thay Đổi
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DialogEditProduct;
