import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { addUserAPI } from '@/lib/apis/userApi';
import { toast } from 'sonner';
import { IUserDataType } from '@/lib/apis/types.';

interface DialogNewCustomerProps {
    open: boolean;
    onClose: () => void;
    onSubmit?: (customerData: IUserDataType) => void;
}

export default function DialogNewCustomer({ open, onClose, onSubmit }: DialogNewCustomerProps) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        roleId: 2,
        address: '',
        points: 0,
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            // Validate required fields
            if (!formData.fullName || !formData.email || !formData.phone) {
                toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
                return;
            }

            // Prepare customer data with default roleId 2 and points 0
            const customerData: IUserDataType = {
                fullName: formData.fullName,
                email: formData.email,
                password: '123456', // Default password for new customers
                phone: formData.phone,
                address: formData.address,
                roleId: 2, // Default roleId for customers
                points: 0 // Default points for new customers
            };

            // Call API to create new customer
            const response = await addUserAPI(customerData);

            if (response.data) {
                toast.success('Tạo tài khoản thành công ✅', {
                    description: 'Tài khoản người dùng mới đã được thêm',
                    duration: 3000,
                    position: 'top-center',
                    style: { background: '#4CAF50', color: 'white', border: 'none' },
                });

                if (onSubmit) {
                    onSubmit(response.data);
                }
                onClose();
                // Reset form
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    address: '',
                    roleId: 2,
                    points: 0,
                });
            }
        } catch (error: any) {
            console.error("Add user error:", error);
            toast.error('Lỗi khi tạo tài khoản ❌', {
                description: error?.response?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại.',
                duration: 3000,
                position: 'top-center',
                style: { background: '#F44336', color: 'white', border: 'none' },
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Thêm Khách Hàng Mới</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Họ và tên *</Label>
                            <Input
                                id="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Nhập họ và tên"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Số điện thoại *</Label>
                            <Input
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Nhập số điện thoại"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Địa chỉ email *</Label>
                            <Input
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Nhập địa chỉ email"
                                type="email"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Địa chỉ</Label>
                            <Input
                                id="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Nhập địa chỉ"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="cursor-pointer"
                            disabled={isLoading}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            className="bg-orange-500 hover:bg-orange-600 text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Đang xử lý...' : 'Thêm khách hàng'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}