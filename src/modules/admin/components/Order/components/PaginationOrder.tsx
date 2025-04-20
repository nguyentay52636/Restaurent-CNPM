import React from 'react'
import { Button } from "@/components/ui/button"

interface PaginationOrderProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function PaginationOrder({ currentPage, totalPages, onPageChange }: PaginationOrderProps) {
    return (
        <div className="flex justify-between items-center mt-6">
            <div>
                <span className="text-gray-600">Rows per page: 5</span>
            </div>
            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
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
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
