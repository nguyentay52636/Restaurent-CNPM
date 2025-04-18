import { Button } from '@/components/ui/button'
import React from 'react'

interface PaginationBookingProps {
    currentPage: number;
    totalPages: number;
    rowsPerPage: number;
    onPageChange: (page: number) => void;
}

export default function PaginationProduct({
    currentPage,
    totalPages,
    rowsPerPage,
    onPageChange
}: PaginationBookingProps) {
    return (
        <div className="flex justify-between items-center mt-6">
            <div>
                <span className="text-gray-600">
                    Rows per page: {rowsPerPage}
                </span>
            </div>
            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="border-gray-300 hover:border-[#A27B5C]"
                >
                    Previous
                </Button>
                <span className="text-gray-600">
                    {currentPage} of {totalPages}
                </span>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="border-gray-300 hover:border-[#A27B5C]"
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
