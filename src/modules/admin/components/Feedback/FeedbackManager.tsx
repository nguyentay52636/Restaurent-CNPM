import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Search, Star } from 'lucide-react';
import DialogFeedback from './Components/DialogFeedback';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Feedback {
    id: number;
    user_id: number;
    product_id: number;
    rating: number;
    content: string;
    created_at: string;
    updated_at: string;
}

interface Users {
    [key: number]: string;
}

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: boolean;
    image: string;
}

const feedbackList: Feedback[] = [
    { id: 1, user_id: 1, product_id: 1, rating: 5, content: "Sản phẩm tuyệt vời, chất lượng vượt mong đợi!", created_at: "2025-04-01T10:00:00Z", updated_at: "2025-04-01T10:00:00Z" },
    { id: 2, user_id: 2, product_id: 1, rating: 4, content: "Hài lòng, nhưng giao hàng hơi chậm.", created_at: "2025-04-02T14:30:00Z", updated_at: "2025-04-02T14:30:00Z" },
    { id: 3, user_id: 3, product_id: 2, rating: 3, content: "Sản phẩm ổn, nhưng đóng gói không cẩn thận.", created_at: "2025-04-03T09:15:00Z", updated_at: "2025-04-03T09:15:00Z" },
    { id: 4, user_id: 4, product_id: 2, rating: 5, content: "Rất thích, sẽ mua lại lần sau!", created_at: "2025-04-04T16:20:00Z", updated_at: "2025-04-04T16:20:00Z" },
    { id: 5, user_id: 5, product_id: 3, rating: 2, content: "Chất lượng không như kỳ vọng, hơi thất vọng.", created_at: "2025-04-05T11:45:00Z", updated_at: "2025-04-05T11:45:00Z" },
    { id: 6, user_id: 1, product_id: 3, rating: 4, content: "Tốt, nhưng cần cải thiện hướng dẫn sử dụng.", created_at: "2025-04-06T08:10:00Z", updated_at: "2025-04-06T08:10:00Z" },
    { id: 7, user_id: 2, product_id: 1, rating: 5, content: "Tuyệt vời, đáng giá từng đồng!", created_at: "2025-04-07T13:25:00Z", updated_at: "2025-04-07T13:25:00Z" },
    { id: 8, user_id: 3, product_id: 2, rating: 4, content: "Sản phẩm đẹp, dùng tốt, giao hàng nhanh.", created_at: "2025-04-08T15:50:00Z", updated_at: "2025-04-08T15:50:00Z" },
    { id: 9, user_id: 4, product_id: 3, rating: 3, content: "Bình thường, không có gì nổi bật.", created_at: "2025-04-09T12:00:00Z", updated_at: "2025-04-09T12:00:00Z" },
    { id: 10, user_id: 5, product_id: 1, rating: 5, content: "Rất hài lòng, sẽ giới thiệu cho bạn bè!", created_at: "2025-04-10T17:30:00Z", updated_at: "2025-04-10T17:30:00Z" }
];

const users: Users = {
    1: "Nguyễn Văn A",
    2: "Trần Thị B",
    3: "Lê Văn C",
    4: "Phạm Thị D",
    5: "Hoàng Văn E"
};

export const Products: Product[] = [
    { id: 1, name: 'RISTRETTO BIANCO', category: 'Coffee and Beverage', price: 5.00, stock: 120, status: true, image: '/images/images_products/coffee1.png' },
    { id: 2, name: 'ICED CREAMY LATTE', category: 'Coffee and Beverage', price: 5.00, stock: 120, status: true, image: '/images/images_products/coffee2.png' },
    { id: 3, name: 'CAPPUCINO', category: 'Coffee and Beverage', price: 5.00, stock: 120, status: true, image: '/images/images_products/coffee3.png' },
    { id: 4, name: 'MILK COFFEE WITH REGAL', category: 'Coffee and Beverage', price: 5.00, stock: 120, status: true, image: '/images/images_products/coffee4.png' },
    { id: 5, name: 'ORANGE JUICE', category: 'Coffee and Beverage', price: 5.00, stock: 120, status: true, image: '/images/images_products/coffee5.png' },
];

export default function FeedbackManager() {
    return (
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between">
                <div className="">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800">Danh sách phản hồi khách hàng</h1>

                </div>
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
            </div>

            <div className="grid gap-6">
                {feedbackList.map((feedback) => {
                    const product = Products.find(p => p.id === feedback.product_id);
                    return (
                        <Card
                            key={feedback.id}
                            className="flex flex-col md:flex-row items-start bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden"
                        >
                            {product && (
                                <div className="w-full md:w-48 h-48 flex-shrink-0">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => (e.currentTarget.src = '/images/placeholder.png')}
                                    />
                                </div>
                            )}
                            <div className="flex-1">
                                <CardHeader>
                                    <CardTitle className="text-lg font-semibold text-gray-900">
                                        {users[feedback.user_id]} - {product?.name || 'Sản phẩm không xác định'}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-0">
                                    <p className="text-gray-700 leading-relaxed">{feedback.content}</p>
                                    <div className="mt-2 flex items-center">
                                        <span className="text-sm text-gray-600 mr-2">Đánh giá:</span>
                                        {[...Array(5)].map((_, index) => (
                                            <Star
                                                key={index}
                                                className={`w-5 h-5 ${index < feedback.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Ngày tạo: {new Date(feedback.created_at).toLocaleString('vi-VN', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                    <DialogFeedback feedback={feedback} users={users} products={Products} />
                                </CardContent>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}