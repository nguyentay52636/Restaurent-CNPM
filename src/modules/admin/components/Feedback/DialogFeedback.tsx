import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    quantity: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}

interface User {
    id: number;
    fullName: string;
    // ...other fields if needed
}

interface Order {
    id: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}

interface Review {
    id: number;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
    user: User;
    order: Order | null;
    product: Product | null;
}

interface Users {
    [key: number]: string;
}

interface DialogFeedbackProps {
    feedback: Review;
    users: Users;
    products: Product[];
}

export default function DialogFeedback({ feedback, users, products }: DialogFeedbackProps) {
    // Lấy product trực tiếp từ feedback.product
    const product = feedback.product;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="mt-4 cursor-pointer hover:bg-opacity-90 transition-colors"
                    style={{ backgroundColor: '#F67F20', color: '#fff' }}
                >
                    Xem chi tiết
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-white rounded-lg shadow-xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-800">
                        Chi tiết phản hồi
                    </DialogTitle>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                    {/* Hình ảnh sản phẩm */}
                    {product && (
                        <div className="flex justify-center">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-40 h-40 object-cover rounded-lg shadow-md"
                                onError={(e) => (e.currentTarget.src = '/images/placeholder.png')}
                            />
                        </div>
                    )}
                    {/* Thông tin phản hồi */}
                    <div className="space-y-2">
                        <p className="text-gray-700">
                            <span className="font-semibold">Khách hàng:</span> {feedback.user?.fullName || 'Không xác định'}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold">Sản phẩm:</span> {product?.name || 'Không xác định'}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold">Nội dung:</span> {feedback.comment}
                        </p>
                        <div className="flex items-center">
                            <span className="font-semibold text-gray-700 mr-2">Đánh giá:</span>
                            {[...Array(5)].map((_, index) => (
                                <Star
                                    key={index}
                                    className={`w-5 h-5 ${index < feedback.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                />
                            ))}
                        </div>
                        <p className="text-gray-700">
                            <span className="font-semibold">Ngày tạo:</span>{' '}
                            {new Date(feedback.createdAt).toLocaleString('vi-VN', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </p>
                        <p className="text-gray-700">
                            <span className="font-semibold">Ngày cập nhật:</span>{' '}
                            {new Date(feedback.updatedAt).toLocaleString('vi-VN', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}