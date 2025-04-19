import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Funnel, Pencil, Plus, Trash2 } from 'lucide-react';
import { Customer, dataCustomers } from './components/AcountData';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import AccountActions from './components/AccountActions';
import AccountTable from './components/AccountTable';

// Define the Customer interface based on the table in the image

export default function AccountManager() {
    const [customers, setCustomers] = useState<Customer[]>(dataCustomers);
    const [isAddOpen, setIsAddOpen] = useState(false);

    // Handlers for Edit and Delete
    const handleEdit = (customer: Customer) => {
        // Placeholder for edit functionality (e.g., open a modal with customer data)
        console.log('Edit customer:', customer);
    };

    const handleDelete = (id: number) => {
        setCustomers(customers.filter((customer) => customer.id !== id));
    };

    return (
        <div className="p-6">
            <AccountActions />
            <AccountTable
                customers={customers}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
}