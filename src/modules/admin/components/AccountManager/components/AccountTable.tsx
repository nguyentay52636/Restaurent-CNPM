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
                        <TableHead className="text-gray-500 font-semibold cursor-pointer">Tên</TableHead>
                        <TableHead className="text-gray-500 font-semibold cursor-pointer">Số đơn hàng</TableHead>
                        <TableHead className="text-gray-500 font-semibold cursor-pointer">Chi tiêu (VND)</TableHead>
                        <TableHead className="text-gray-500 font-semibold cursor-pointer">Giới tính</TableHead>
                        <TableHead className="text-gray-500 font-semibold cursor-pointer">Địa chỉ</TableHead>
                        <TableHead className="text-gray-500 font-semibold cursor-pointer">Vai trò</TableHead>
                        <TableHead className="text-gray-500 font-semibold cursor-default">Thao tác</TableHead>
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
                                <TableCell>{customer.orders.toLocaleString('vi-VN')}</TableCell>
                                <TableCell>{customer.spent.toLocaleString('vi-VN')} ₫</TableCell>
                                <TableCell>{customer.gender === 'Male' ? 'Nam' : 'Nữ'}</TableCell>
                                <TableCell>{customer.address}</TableCell>
                                <TableCell>
                                    {customer.roles_id.map(role => (
                                        <span key={role.id} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1">
                                            {role.name}
                                        </span>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-green-600 border-green-600 hover:bg-green-50"
                                            onClick={() => onEdit(customer)}
                                        >
                                            <Pencil className="h-4 w-4 mr-1" />
                                            Sửa
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-orange-600 border-orange-600 hover:bg-orange-50"
                                            onClick={() => onDelete(customer.id)}
                                        >
                                            <Trash2 className="h-4 w-4 mr-1" />
                                            Xóa
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center text-gray-500">
                                Không tìm thấy khách hàng
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}
