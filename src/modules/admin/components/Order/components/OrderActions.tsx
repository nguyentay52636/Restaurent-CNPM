import React from 'react';
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine } from "lucide-react";

interface OrderActionsProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    statusFilter: string;
    setStatusFilter: (value: string) => void;
}

export default function OrderActions({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
}: OrderActionsProps) {
    return (
        <>
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Đơn Hàng</h1>
                        <nav className="text-sm text-gray-500">
                            <span>Trang chủ</span> / <span>Đơn hàng</span>
                        </nav>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                    <Input
                        placeholder="Tìm kiếm"
                        value={searchTerm}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                        className="flex-1"
                    />
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Trạng thái" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">Tất cả</SelectItem>
                            <SelectItem value="New Order">Đơn mới</SelectItem>
                            <SelectItem value="Processed">Đã xử lý</SelectItem>
                            <SelectItem value="Canceled">Đã hủy</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input
                        type="text"
                        placeholder="10 Apr - 20 Apr"
                        className="w-[180px]"
                        disabled
                    />
                    <Button className="bg-[#3F4E4F] hover:bg-gray-600 text-white flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M20.53 8.47L14.53 2.47C14.389 2.329 14.199 2.25 14 2.25H8C5.582 2.25 4.25 3.582 4.25 6V18C4.25 20.418 5.582 21.75 8 21.75H17C19.418 21.75 20.75 20.418 20.75 18V9C20.75 8.801 20.671 8.61 20.53 8.47ZM14.75 4.811L18.189 8.25H17C15.423 8.25 14.75 7.577 14.75 6V4.811ZM17 20.25H8C6.423 20.25 5.75 19.577 5.75 18V6C5.75 4.423 6.423 3.75 8 3.75H13.25V6C13.25 8.418 14.582 9.75 17 9.75H19.25V18C19.25 19.577 18.577 20.25 17 20.25ZM13.53 14.47C13.823 14.763 13.823 15.238 13.53 15.531L11.53 17.531C11.461 17.6 11.3779 17.655 11.2859 17.693C11.1939 17.731 11.097 17.751 10.999 17.751C10.901 17.751 10.8039 17.731 10.7119 17.693C10.6199 17.655 10.537 17.6 10.468 17.531L8.46802 15.531C8.17502 15.238 8.17502 14.763 8.46802 14.47C8.76102 14.177 9.23605 14.177 9.52905 14.47L10.249 15.19V12C10.249 11.586 10.585 11.25 10.999 11.25C11.413 11.25 11.749 11.586 11.749 12V15.189L12.469 14.469C12.763 14.177 13.237 14.177 13.53 14.47Z"
                                fill="white"
                            />
                        </svg>
                        Xuất hoá đơn
                        <ArrowDownToLine className="ml-2" />
                    </Button>
                </div>
            </div>
        </>
    );
}
