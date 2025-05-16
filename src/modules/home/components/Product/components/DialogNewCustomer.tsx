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
import { DialogTrigger } from '@radix-ui/react-dialog';

interface DialogNewCustomerProps {
    open: boolean;
    onClose: () => void;
    onSubmit?: (customerData: {
        recipient: string;
        gender: string;
        city: string;
        phoneNumber: string;
        email: string;
        customerId: string;
        address: string;
    }) => void;
}

export default function DialogNewCustomer({ open, onClose, onSubmit }: DialogNewCustomerProps) {
    const [formData, setFormData] = useState({
        recipient: '',
        gender: '',
        city: '',
        phoneNumber: '',
        email: '',
        customerId: '',
        address: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(formData);
        }
        onClose();
    };

    return (
        <>
            <Dialog >
                <DialogTrigger>
                    <Button className='text-white hover:bg-orange-500 cursor-pointer'>
                        Khách hàng mới
                    </Button>
                </DialogTrigger>
                <DialogContent >
                    <DialogHeader>
                        <DialogTitle>Thêm Khách Hàng Mới</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-8 py-8">
                            <div>
                                <Label htmlFor="recipient">Họ và tên</Label>
                                <Input
                                    id="recipient"
                                    value={formData.recipient}
                                    onChange={handleChange}
                                    placeholder="Nhập họ và tên"
                                />
                            </div>
                            <div>
                                <Label htmlFor="gender">Giới tính</Label>
                                <Input
                                    id="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    placeholder="Nhập giới tính"
                                />
                            </div>
                            <div>
                                <Label htmlFor="city">Thành phố</Label>
                                <Input
                                    id="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Nhập thành phố"
                                />
                            </div>
                            <div>
                                <Label htmlFor="phoneNumber">Số điện thoại</Label>
                                <Input
                                    id="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="Nhập số điện thoại"
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">Địa chỉ email</Label>
                                <Input
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Nhập địa chỉ email"
                                />
                            </div>
                            <div className="">
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
                            <Button type="button" variant="outline" onClick={onClose} className='cursor-pointer'>
                                Hủy bỏ
                            </Button>
                            <Button className='text-white hover:bg-orange-500 cursor-pointer' type="submit">Thêm khách hàng</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}