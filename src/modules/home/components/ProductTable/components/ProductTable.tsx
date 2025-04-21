import React, { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Product, dataProducts } from './DataProducts';

export default function ProductTable() {
    const [products, setProducts] = useState<Product[]>(dataProducts);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [editProduct, setEditProduct] = useState<Product | null>(null);

    const rowsPerPage = 10;

    const filteredProducts = useMemo(() => {
        return products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    // Handlers
    const handleStatusToggle = (id: number) => {
        setProducts(
            products.map((product) =>
                product.id === id ? { ...product, status: !product.status } : product
            )
        );
    };

    const handleDelete = (id: number) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    const handleEdit = (product: Product) => {
        setEditProduct({ ...product });
    };

    const handleSaveEdit = () => {
        setProducts(
            products.map((product) =>
                product.id === editProduct?.id ? editProduct : product
            )
        );
        setEditProduct(null);
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="text-gray-500 font-semibold">Sản phẩm</TableHead>
                    <TableHead className="text-gray-500 font-semibold">Trạng thái</TableHead>
                    <TableHead className="text-gray-500 font-semibold">Mã sản phẩm</TableHead>
                    <TableHead className="text-gray-500 font-semibold">Số lượng</TableHead>
                    <TableHead className="text-gray-500 font-semibold">Giá</TableHead>
                    <TableHead className="text-gray-500 font-semibold">Thao tác</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {paginatedProducts.length > 0 ? (
                    paginatedProducts.map((product) => (
                        <TableRow key={product.id} className="hover:bg-gray-50">
                            <TableCell>
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-10 h-10 rounded-md"
                                    />
                                    <span className="font-medium">{product.name}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <span className="text-green-600 font-medium">
                                    {product.status ? 'Còn hàng' : 'Hết hàng'}
                                </span>
                            </TableCell>
                            <TableCell>{product.id}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell>{product.price.toLocaleString('vi-VN')}đ</TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-blue-600 border-blue-600"
                                        onClick={() => handleEdit(product)}
                                    >
                                        <Pencil className="h-4 w-4 mr-1" />
                                        Sửa
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-orange-600 border-orange-600"
                                        onClick={() => handleDelete(product.id)}
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
                        <TableCell colSpan={6} className="text-center text-gray-500">
                            Không tìm thấy sản phẩm nào
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}