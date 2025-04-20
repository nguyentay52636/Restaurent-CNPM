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
            <Button className='text-white hover:bg-orange-500 cursor-pointer'>
                Khách hàng mới
            </Button>
            <Dialog open={open} onOpenChange={onClose}>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Customer</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-3 gap-4 py-4">
                            <div>
                                <Label htmlFor="recipient">Recipient</Label>
                                <Input
                                    id="recipient"
                                    value={formData.recipient}
                                    onChange={handleChange}
                                    placeholder="Enter Name"
                                // readOnly // Uncomment to make read-only
                                />
                            </div>
                            <div>
                                <Label htmlFor="gender">Gender</Label>
                                <Input
                                    id="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    placeholder="Enter Gender"
                                // readOnly
                                />
                            </div>
                            <div>
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Enter City"
                                // readOnly
                                />
                            </div>
                            <div>
                                <Label htmlFor="phoneNumber">Phone Number</Label>
                                <Input
                                    id="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="Enter Phone Number"
                                // readOnly
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter Email Address"
                                // readOnly
                                />
                            </div>
                            <div>
                                <Label htmlFor="customerId">Customer ID</Label>
                                <Input
                                    id="customerId"
                                    value={formData.customerId}
                                    onChange={handleChange}
                                    placeholder="Enter Customer ID"
                                // readOnly
                                />
                            </div>
                            <div className="col-span-3">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Enter Address"
                                // readOnly
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button type="submit">Add Customer</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog></>
    );
}