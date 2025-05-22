import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { ProductWithId } from '@/lib/apis/types.';
import { Pencil } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import axios from 'axios';
import { toast } from 'sonner';

interface MenuItemProps {
  item: ProductWithId;
  onAddToCart: (item: ProductWithId, selectedSize?: { name: string; price: number }) => void;
  onEdit?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, onAddToCart, onEdit }) => {
  const [selectedSize, setSelectedSize] = useState<{ name: string; price: number } | undefined>(
    item.availableSizes ? item.availableSizes[1] : undefined,
  );
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(item, selectedSize);
  };

  const currentUser = localStorage.getItem('currentUser');
  const userId = currentUser ? JSON.parse(currentUser).id : null;
  console.log('currentUser', currentUser);
  console.log('userId', userId);
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:3000/api/reviews', {
        productId: item.id,
        userId,
        rating: reviewRating,
        comment: reviewComment,
      });
      setIsReviewOpen(false);
      setReviewComment('');
      setReviewRating(5);
    } catch (err) {
      alert('Gửi đánh giá thất bại!');
    } finally {
      setLoading(false);
      toast.success('Gửi đánh giá thành công!');
      21;
    }
  };

  return (
    <Card className='overflow-hidden hover:shadow-lg transition-shadow'>
      <img src={item.image} alt={item.name} className='w-full h-48 object-cover' />
      <CardContent className='p-4'>
        <div className='flex justify-between items-center mb-2'>
          <CardTitle className='text-lg'>{item.name}</CardTitle>
          <span className='text-orange-500 font-bold'>
            {selectedSize
              ? selectedSize.price.toLocaleString('vi-VN')
              : item.price.toLocaleString('vi-VN')}{' '}
            đ
          </span>
        </div>
        <p className='text-gray-600 text-sm mb-2'>{item.description}</p>

        {item.availableSizes && (
          <div className='mb-3'>
            <p className='text-sm font-medium mb-1'>Kích cỡ:</p>
            <RadioGroup
              value={selectedSize?.name}
              onValueChange={(value) => {
                const size = item.availableSizes?.find((s) => s.name === value);
                if (size) setSelectedSize(size);
              }}
              className='flex space-x-4'
            >
              {item.availableSizes.map((size) => (
                <div className='flex items-center space-x-1' key={size.name}>
                  <RadioGroupItem value={size.name} id={`size-${item.id}-${size.name}`} />
                  <Label htmlFor={`size-${item.id}-${size.name}`} className='text-sm'>
                    {size.name}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        <div className='flex gap-2'>
          <Button
            onClick={handleAddToCart}
            className='flex-1 bg-orange-500 hover:bg-orange-600 cursor-pointer'
          >
            + Thêm vào giỏ hàng
          </Button>
          <Button
            onClick={() => setIsReviewOpen(true)}
            variant='outline'
            className='flex-1 border-orange-500 text-orange-500 hover:bg-orange-50'
          >
            Đánh giá
          </Button>
          {onEdit && (
            <Button
              onClick={onEdit}
              variant='outline'
              className='border-orange-500 text-orange-500 hover:bg-orange-50'
            >
              <Pencil className='w-4 h-4' />
            </Button>
          )}
        </div>
      </CardContent>
      {/* Dialog đánh giá */}
      <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Đánh giá sản phẩm</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleReviewSubmit}>
            <div className='mb-4'>
              <label className='block mb-1'>Nội dung</label>
              <textarea
                className='w-full border rounded p-2'
                required
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label className='block mb-1'>Số sao</label>
              <input
                type='number'
                min={1}
                max={5}
                className='w-16 border rounded p-1'
                required
                value={reviewRating}
                onChange={(e) => setReviewRating(Number(e.target.value))}
              />
            </div>
            <DialogFooter>
              <Button type='submit' className='bg-orange-500 text-white' disabled={loading}>
                {loading ? 'Đang gửi...' : 'Gửi đánh giá'}
              </Button>
              <Button type='button' variant='outline' onClick={() => setIsReviewOpen(false)}>
                Hủy
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default MenuItem;
