import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pencil, Trash2 } from 'lucide-react';
import { Product } from './DataProducts';
import { Badge } from '@/components/ui/badge';

interface ProductTableProps {
    products: Product[];
    onStatusToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (product: Product) => void;
}

export default function ProductTable({ products, onStatusToggle, onDelete, onEdit }: ProductTableProps) {
    // Function to get category badge color
    const getCategoryBadgeColor = (category: string) => {
        switch (category.toLowerCase()) {
            case 'coffee':
                return 'bg-amber-100 text-amber-700';
            case 'tea':
                return 'bg-green-100 text-green-700';
            case 'food':
                return 'bg-orange-100 text-orange-700';
            case 'dessert':
                return 'bg-pink-100 text-pink-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-gray-500 font-semibold">Sản phẩm</TableHead>
                    <TableHead className="text-gray-500 font-semibold">Danh mục</TableHead>
                    <TableHead className="text-gray-500 font-semibold">Trạng thái</TableHead>
                    <TableHead className="text-gray-500 font-semibold">Mã sản phẩm</TableHead>
                    <TableHead className="text-gray-500 font-semibold">Số lượng</TableHead>
                    <TableHead className="text-gray-500 font-semibold">Giá</TableHead>
                    <TableHead className="text-gray-500 font-semibold">Thao tác</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.length > 0 ? (
                    products.map((product) => (
                        <TableRow key={product.id} className="hover:bg-gray-50">
                            <TableCell>
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-10 h-10 rounded-md object-cover"
                                        onError={(e) => {
                                            // Fallback image if the image fails to load
                                            (e.target as HTMLImageElement).src = '/images/placeholder.png';
                                        }}
                                    />
                                    <span className="font-medium">{product.name}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge className={`${getCategoryBadgeColor(product.category)} font-medium`}>
                                    {product.category}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge className={product.status ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                                    {product.status ? 'Còn hàng' : 'Hết hàng'}
                                </Badge>
                            </TableCell>
                            <TableCell>{product.id}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell>{product.price.toLocaleString('vi-VN')}đ</TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-blue-600 border-blue-600 hover:bg-blue-50 cursor-pointer"
                                        onClick={() => onEdit(product)}
                                    >
                                        <Pencil className="h-4 w-4 mr-1" />
                                        Sửa
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-orange-600 border-orange-600 hover:bg-orange-50 cursor-pointer"
                                        onClick={() => onDelete(product.id)}
                                    >
                                        <Trash2 className="h-4 w-4 mr-1" />
                                        Xóa
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={7} className="text-center text-gray-500">
                            Không tìm thấy sản phẩm nào
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}