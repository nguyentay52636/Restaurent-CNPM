import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationAccountProps {
    currentPage: number;
    totalPages: number;
    rowsPerPage: number;
    onPageChange: (page: number) => void;
}

export default function PaginationAccount({
    currentPage,
    totalPages,
    rowsPerPage,
    onPageChange,
}: PaginationAccountProps) {
    return (
        <div className="flex justify-between items-center mt-8 px-4 py-3 bg-white rounded-xl shadow-sm">
            {/* Rows per page */}
            <div className="text-base text-gray-700 font-medium">
                Hiển thị <span className="text-blue-600">{rowsPerPage}</span> dòng mỗi trang
            </div>

            {/* Pagination controls */}
            <div className="flex items-center space-x-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 rounded-full border-gray-300 bg-white px-5 py-2 text-gray-700 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600 shadow-sm transition-all duration-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Trang trước
                </Button>

                <span className="text-base font-semibold text-gray-800">
                    Trang {currentPage} / {totalPages}
                </span>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 rounded-full border-gray-300 bg-white px-5 py-2 text-gray-700 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600 shadow-sm transition-all duration-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200"
                >
                    Trang sau
                    <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
        </div>
    );
}