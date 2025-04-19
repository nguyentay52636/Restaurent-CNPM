import React, { useState } from 'react';
import { Customer, dataCustomers } from './components/AcountData';

import AccountActions from './components/AccountActions';
import AccountTable from './components/AccountTable';
import PaginationAccount from './components/PaginationAccount';

// Define the Customer interface based on the table in the image

export default function AccountManager() {
    const [customers, setCustomers] = useState<Customer[]>(dataCustomers);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10);
    const totalPages = Math.ceil(customers.length / rowsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Handlers for Edit and Delete
    const handleEdit = (customer: Customer) => {
        // Placeholder for edit functionality (e.g., open a modal with customer data)
        console.log('Edit customer:', customer);
    };

    const handleDelete = (id: number) => {
        setCustomers(customers.filter((customer) => customer.id !== id));
    };

    return (
        <div className="p-6 bg-white!">
            <AccountActions />
            <div className="">
                <AccountTable
                    customers={customers}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
            <PaginationAccount
                currentPage={currentPage}
                totalPages={totalPages}
                rowsPerPage={rowsPerPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
}