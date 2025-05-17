import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationTableProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationTable({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationTableProps) {
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (currentPage > 3) {
      pages.push(1);
      if (currentPage > 4) pages.push('...');
    }

    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className='flex flex-col md:flex-row justify-end items-center mt-6 px-4 py-4 bg-white rounded-xl shadow-sm border border-gray-100'>
      <div className='flex items-center space-x-3 mb-4 md:mb-0'>
        <Button
          variant='outline'
          size='icon'
          className='h-8 w-8 text-gray-500 hover:text-orange-600'
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft className='h-4 w-4' />
        </Button>

        <Button
          variant='outline'
          size='icon'
          className='h-8 w-8 text-gray-500 hover:text-orange-600'
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className='h-4 w-4' />
        </Button>

        <div className='flex items-center space-x-1'>
          {getPageNumbers().map((page, index) =>
            typeof page === 'number' ? (
              <Button
                key={index}
                variant={page === currentPage ? 'default' : 'outline'}
                size='sm'
                onClick={() => onPageChange(page)}
                className={`h-8 w-8 p-0 rounded-md ${
                  page === currentPage
                    ? 'bg-orange-500 text-white hover:bg-orange-600'
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-600'
                }`}
              >
                {page}
              </Button>
            ) : (
              <span key={index} className='text-gray-400 px-1'>
                ...
              </span>
            ),
          )}
        </div>

        <Button
          variant='outline'
          size='icon'
          className='h-8 w-8 text-gray-500 hover:text-orange-600'
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className='h-4 w-4' />
        </Button>

        <Button
          variant='outline'
          size='icon'
          className='h-8 w-8 text-gray-500 hover:text-orange-600'
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronsRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}
