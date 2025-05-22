import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Search, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useReviews } from './useReviews';
import DialogFeedback from './DialogFeedback';

export default function FeedbackManager() {
    const { reviews, loading, error } = useReviews();
    const [searchTerm, setSearchTerm] = useState('');
    console.log('reviews', reviews);

    const filteredReviews = searchTerm
        ? reviews.filter(review =>
            (review.comment || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (review.user?.fullName || '').toLowerCase().includes(searchTerm.toLowerCase())
        )
        : reviews;

    if (loading) return <div className="flex justify-center items-center h-64">Loading reviews...</div>;

    if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

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
                            placeholder="Tìm kiếm phản hồi..."
                            className="pl-10 w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer" />
                    </div>

                    <Button variant="outline" size="icon" className="bg-orange-500 text-white hover:bg-orange-600 cursor-pointer hover:text-white">
                        <Bell className="w-6 h-6" />
                    </Button>
                </div>
            </div>

            <div className="grid gap-6">
                {filteredReviews.length > 0 ? (
                    filteredReviews.map((review) => {
                        const product = review.product;
                        console.log("product", product);
                        return (
                            <Card
                                key={review.id}
                                className="flex flex-col md:flex-row items-start bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden"
                            >
                                {product && (
                                    <div className="w-full md:w-48 h-48 flex-shrink-0">
                                        <img
                                            src={product.image || '/images/placeholder.png'}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => (e.currentTarget.src = '/images/placeholder.png')}
                                        />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <CardHeader>
                                        <CardTitle className="text-lg font-semibold text-gray-900">
                                            {review.user?.fullName || 'Unknown User'} - {product?.name || 'Sản phẩm không xác định'}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <p className="text-gray-700 leading-relaxed">
                                            {review.comment || 'Không có nội dung đánh giá.'}
                                        </p>
                                        <div className="mt-2 flex items-center">
                                            <span className="text-sm text-gray-600 mr-2">Đánh giá:</span>
                                            {[...Array(5)].map((_, index) => (
                                                <Star
                                                    key={index}
                                                    className={`w-5 h-5 ${index < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-sm text-gray-500 mt-2">
                                            Ngày tạo: {new Date(review.createdAt).toLocaleString('vi-VN', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                        <DialogFeedback
                                            feedback={review}
                                            users={{ [review.user?.id || 0]: review.user?.fullName || 'Unknown User' }}
                                            products={product ? [product] : []}
                                        />
                                    </CardContent>
                                </div>
                            </Card>
                        );
                    })
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        {searchTerm ? 'Không tìm thấy đánh giá phù hợp.' : 'Chưa có đánh giá nào.'}
                    </div>
                )}
            </div>
        </div>
    );
}