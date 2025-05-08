import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const MAX_VISIBLE_PAGES = 2;

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= MAX_VISIBLE_PAGES + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        start = 2;
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
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
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="outline"
        className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm hover:bg-orange-500 hover:text-white"
      >
        Trước
      </Button>

      {getPageNumbers().map((page, index) =>
        typeof page === 'number' ? (
          <Button
            key={index}
            onClick={() => onPageChange(page)}
            variant={page === currentPage ? 'default' : 'outline'}
            className={`px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm min-w-[28px] sm:min-w-[36px] ${
              page === currentPage ? 'bg-orange-500 text-white' : 'hover:bg-orange-100'
            }`}
          >
            {page}
          </Button>
        ) : (
          <span
            key={index}
            className="px-2 py-1 text-gray-500 text-xs sm:text-sm"
          >
            ...
          </span>
        )
      )}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="outline"
        className="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm hover:bg-orange-500 hover:text-white"
      >
        Sau
      </Button>
    </div>
  );
}
