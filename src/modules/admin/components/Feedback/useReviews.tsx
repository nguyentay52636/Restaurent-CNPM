import { useState, useEffect } from 'react';
import axios from 'axios';
import { ProductType } from '@/lib/apis/types.';

interface User {
  id: number;
  fullName: string;
}

interface Order {
  id: number;
  productId: number;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  user: User;
  order: Order;
  product: ProductType;
  createdAt: string;
  updatedAt: string;
}

export const useReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/reviews');
      console.log('reviews', response.data);
      setReviews(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch reviews');
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Function to create a new review
  const createReview = async (reviewData: {
    userId: number;
    orderId: number;
    rating: number;
    content: string;
  }) => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/api/reviews', reviewData);
      setReviews([...reviews, response.data]);
      return response.data;
    } catch (err) {
      setError('Failed to create review');
      console.error('Error creating review:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Function to update a review
  const updateReview = async (
    id: number,
    reviewData: Partial<{
      userId: number;
      orderId: number;
      rating: number;
      content: string;
    }>
  ) => {
    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:3000/api/reviews/${id}`, reviewData);
      setReviews(
        reviews.map((review) => (review.id === id ? response.data : review))
      );
      return response.data;
    } catch (err) {
      setError('Failed to update review');
      console.error('Error updating review:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a review
  const deleteReview = async (id: number) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:3000/api/reviews/${id}`);
      setReviews(reviews.filter((review) => review.id !== id));
    } catch (err) {
      setError('Failed to delete review');
      console.error('Error deleting review:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    reviews,
    loading,
    error,
    fetchReviews,
    createReview,
    updateReview,
    deleteReview,
  };
};