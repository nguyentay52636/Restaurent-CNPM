import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Pencil, Trash2, Loader2, Eye } from 'lucide-react';
import { ProductType } from '@/lib/apis/types.';
import { Badge } from '@/components/ui/badge';
import DialogConfirmDelete from './Dialog/DialogConfirmDelete';
import DialogViewProduct from './Dialog/DialogviewProduct';
import { toast } from 'sonner';
import DialogViewProduct from '@/redux/home/components/ProductTable/components/Dialog/DialogviewProduct';

interface ProductWithId extends ProductType {
  id: number;
}

interface ProductTableProps {
  products: ProductWithId[];
  onStatusToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (product: ProductWithId) => void;
  isLoading?: boolean;
}

const getFullImageUrl = (path: string) => {
    if (!path) return '';
    if (/^https?:\/\//.test(path)) return path;
    // Lấy base url từ biến môi trường, loại bỏ /api nếu có
    const apiUrl = import.meta.env.VITE_API_URL as string;
    const baseUrl = apiUrl.replace(/\/api\/?$/, '');
    return `${baseUrl}${path}`;
};

export default function ProductTable({ products, onStatusToggle, onDelete, onEdit, isLoading = false }: ProductTableProps) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<ProductWithId | null>(null);
    const [productToView, setProductToView] = useState<ProductWithId | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (product: ProductWithId) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    setIsDeleting(true);
    try {
      await onDelete(productToDelete.id);
      toast.success('Xóa sản phẩm thành công ✅', {
        description: `Sản phẩm "${productToDelete.name}" đã được xóa khỏi danh sách`,
        duration: 3000,
        position: 'top-center',
        style: { background: '#4CAF50', color: 'white', border: 'none' },
      });
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    } catch (error: any) {
      toast.error('Lỗi khi xóa sản phẩm ❌', {
        description: error?.response?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại.',
        duration: 3000,
        position: 'top-center',
        style: { background: '#F44336', color: 'white', border: 'none' },
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleViewClick = (product: ProductWithId) => {
    setProductToView(product);
    setViewDialogOpen(true);
  };

  // Function to get category badge color
  const getCategoryBadgeColor = (categoryId: number) => {
    switch (categoryId) {
      case 6:
        return 'bg-amber-100 text-amber-700';
      case 7:
        return 'bg-green-100 text-green-700';
      case 8:
        return 'bg-orange-100 text-orange-700';
      case 9:
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Function to get category name
  const getCategoryName = (categoryId: number) => {
    switch (categoryId) {
      case 6:
        return 'Cà phê';
      case 7:
        return 'Trà';
      case 8:
        return 'Đồ ăn';
      case 9:
        return 'Tráng miệng';
      default:
        return 'Khác';
    }
  };

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-gray-500 font-semibold">Sản phẩm</TableHead>
                        <TableHead className="text-gray-500 font-semibold">Danh mục</TableHead>
                        <TableHead className="text-gray-500 font-semibold">Trạng thái</TableHead>
                        <TableHead className="text-gray-500 font-semibold">Mã sản phẩm</TableHead>
                        <TableHead className="text-gray-500 font-semibold">Giá</TableHead>
                        <TableHead className="text-gray-500 font-semibold">Thao tác</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-8">
                                <div className="flex items-center justify-center space-x-2">
                                    <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
                                    <span className="text-gray-500">Đang tải dữ liệu...</span>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : products.length > 0 ? (
                        products.map((product) => (
                            <TableRow key={product.id} className="hover:bg-gray-50">
                                <TableCell>
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={getFullImageUrl(product.image)}
                                            alt={product.name}
                                            className="w-10 h-10 rounded-md object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://placehold.co/200x200/F5F5F5/CCCCCC?text=No+Image';
                                            }}
                                        />
                                        <span className="font-medium">{product.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge className={`${getCategoryBadgeColor(product.categoryId)} font-medium`}>
                                        {getCategoryName(product.categoryId)}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge className={product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                                        {product.status === 'active' ? 'Còn hàng' : 'Hết hàng'}
                                    </Badge>
                                </TableCell>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.price.toLocaleString('vi-VN')}đ</TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-green-600 border-green-600 hover:bg-green-50 cursor-pointer"
                                            onClick={() => handleViewClick(product)}
                                            disabled={isLoading}
                                        >
                                            <Eye className="h-4 w-4 mr-1" />
                                            Xem
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-blue-600 border-blue-600 hover:bg-blue-50 cursor-pointer"
                                            onClick={() => onEdit(product)}
                                            disabled={isLoading}
                                        >
                                            <Pencil className="h-4 w-4 mr-1" />
                                            Sửa
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-orange-600 border-orange-600 hover:bg-orange-50 cursor-pointer"
                                            onClick={() => handleDeleteClick(product)}
                                            disabled={isLoading}
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
                            <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                                Không tìm thấy sản phẩm nào
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

      <DialogConfirmDelete
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        productName={productToDelete?.name}
      />

      <DialogViewProduct
        isOpen={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        product={productToView}
      />
    </>
  );
}
