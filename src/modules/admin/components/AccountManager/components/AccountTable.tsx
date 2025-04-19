import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Pencil, Trash2 } from "lucide-react"
import { Customer } from './AcountData'

interface AccountTableProps {
    customers: Customer[];
    onEdit: (customer: Customer) => void;
    onDelete: (id: number) => void;
}

export default function AccountTable({ customers, onEdit, onDelete }: AccountTableProps) {
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-gray-500 font-semibold">Name</TableHead>
                        <TableHead className="text-gray-500 font-semibold">Orders</TableHead>
                        <TableHead className="text-gray-500 font-semibold">Spent ($)</TableHead>
                        <TableHead className="text-gray-500 font-semibold">Gender</TableHead>
                        <TableHead className="text-gray-500 font-semibold">Address</TableHead>
                        <TableHead className="text-gray-500 font-semibold">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {customers.length > 0 ? (
                        customers.map((customer) => (
                            <TableRow key={customer.id} className="hover:bg-gray-50">
                                <TableCell>
                                    <div className="flex items-center space-x-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={`/${customer.image}`} alt={customer.name} />
                                            <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium">{customer.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{customer.orders}</TableCell>
                                <TableCell>${customer.spent.toLocaleString()}</TableCell>
                                <TableCell>{customer.gender}</TableCell>
                                <TableCell>{customer.address}</TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-green-600 border-green-600"
                                            onClick={() => onEdit(customer)}
                                        >
                                            <Pencil className="h-4 w-4 mr-1" />
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-orange-600 border-orange-600"
                                            onClick={() => onDelete(customer.id)}
                                        >
                                            <Trash2 className="h-4 w-4 mr-1" />
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center text-gray-500">
                                No customers found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}
