import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const MAX_VISIBLE_PAGES = 5;

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= MAX_VISIBLE_PAGES) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(2, currentPage - 2);
      let end = Math.min(totalPages - 1, currentPage + 2);

      if (currentPage <= 3) {
        start = 2;
        end = 5;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 4;
        end = totalPages - 1;
      }

      pages.push(1);
      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center mt-6 gap-1 sm:gap-2 flex-wrap text-sm sm:text-base">
      {/* First Page */}
      <Button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        variant="outline"
        size="icon"
        className="h-8 w-8 p-0"
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>

      {/* Previous Page */}
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="outline"
        size="icon"
        className="h-8 w-8 p-0"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Numbered Pages */}
      {getPageNumbers().map((page, index) =>
        typeof page === 'number' ? (
          <Button
            key={index}
            onClick={() => onPageChange(page)}
            variant={page === currentPage ? 'default' : 'outline'}
            size="icon"
            className={`h-8 w-8 p-0 ${
              page === currentPage ? 'bg-orange-500 hover:bg-orange-600 text-white' : ''
            }`}
          >
            {page}
          </Button>
        ) : (
          <span
            key={index}
            className="px-2 py-1 text-gray-500 text-xs sm:text-sm flex items-center"
          >
            ...
          </span>
        )
      )}

      {/* Next Page */}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="outline"
        size="icon"
        className="h-8 w-8 p-0"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Last Page */}
      <Button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        variant="outline"
        size="icon"
        className="h-8 w-8 p-0"
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
