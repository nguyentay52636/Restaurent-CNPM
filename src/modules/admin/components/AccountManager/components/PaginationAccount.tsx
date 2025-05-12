import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PaginationAccountProps {
    currentPage: number;
    totalPages: number;
    rowsPerPage: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (rows: number) => void;
    totalItems: number;
}

export default function PaginationAccount({
    currentPage,
    totalPages,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    totalItems
}: PaginationAccountProps) {
    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;

        // Always show first page
        if (currentPage > 3) {
            pages.push(1);
            if (currentPage > 4) {
                pages.push('...');
            }
        }

        // Calculate range of pages to show around current page
        const startPage = Math.max(1, currentPage - 1);
        const endPage = Math.min(totalPages, currentPage + 1);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        // Always show last page
        if (currentPage < totalPages - 2) {
            if (currentPage < totalPages - 3) {
                pages.push('...');
            }
            pages.push(totalPages);
        }

        return pages;
    };

    // Calculate the range of items being displayed
    const startItem = (currentPage - 1) * rowsPerPage + 1;
    const endItem = Math.min(currentPage * rowsPerPage, totalItems);

    return (
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 px-4 py-4 bg-white rounded-xl shadow-sm border border-gray-100">
            {/* Rows per page selector */}
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <span className="text-sm text-gray-700">Hiển thị</span>
                <Select
                    value={rowsPerPage.toString()}
                    onValueChange={(value) => onRowsPerPageChange(Number(value))}
                >
                    <SelectTrigger className="w-[80px] h-8 text-sm">
                        <SelectValue placeholder={rowsPerPage} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                </Select>
                <span className="text-sm text-gray-700">dòng mỗi trang</span>
            </div>

            {/* Pagination controls */}
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    className="h-8 w-8 rounded-md border-gray-200 bg-white text-gray-500 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 disabled:bg-gray-50 disabled:text-gray-400"
                >
                    <ChevronsLeft className="h-4 w-4" />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="h-8 w-8 rounded-md border-gray-200 bg-white text-gray-500 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 disabled:bg-gray-50 disabled:text-gray-400"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* Page numbers */}
                <div className="flex items-center space-x-1">
                    {getPageNumbers().map((page, index) => (
                        typeof page === 'number' ? (
                            <Button
                                key={index}
                                variant={page === currentPage ? "default" : "outline"}
                                size="sm"
                                onClick={() => onPageChange(page)}
                                className={`h-8 w-8 p-0 rounded-md ${page === currentPage
                                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                                    : 'border-gray-200 bg-white text-gray-700 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600'
                                    }`}
                            >
                                {page}
                            </Button>
                        ) : (
                            <span key={index} className="text-gray-400 px-1">...</span>
                        )
                    ))}
                </div>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 rounded-md border-gray-200 bg-white text-gray-500 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 disabled:bg-gray-50 disabled:text-gray-400"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="h-8 w-8 rounded-md border-gray-200 bg-white text-gray-500 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600 disabled:bg-gray-50 disabled:text-gray-400"
                >
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>

            {/* Page info */}
            <div className="text-sm font-medium text-gray-700">
                Hiển thị <span className="text-orange-500 font-semibold">{startItem}-{endItem}</span> trên <span className="text-orange-500 font-semibold">{totalItems}</span> kết quả
            </div>
        </div>
    );
}