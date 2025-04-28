import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Funnel, Plus } from 'lucide-react';
import React, { useState } from 'react';
import { DialogAddAccount } from './Dialog/DialogAddAccount';

export default function AccountActions() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <div className='mb-6'>
        <div className='flex justify-between items-center mb-2'>
          <div>
            <h1 className='text-3xl font-bold text-gray-800'>Products</h1>
            <nav className='text-sm text-gray-500'>
              <span>Trang chủ</span> / <span>Tài khoản</span> / <span>Danh sách tài khoản</span>
            </nav>
          </div>
        </div>
        <div className='flex items-center space-x-3'>
          <Input
            placeholder='Search'
            className='flex-1 border-gray-300 focus:border-[#A27B5C] transition-colors'
            value={searchQuery}
            onChange={handleSearch}
          />
          <Button
            variant='outline'
            className='cursor-pointer flex items-center border-gray-300 text-gray-600 hover:border-[#A27B5C]'
          >
            <Funnel className='h-4 w-4 mr-2' /> Lọc
          </Button>
          <Button
            className='cursor-pointer bg-[#A27B5C] text-white flex items-center hover:bg-[#8B6B4F]'
            onClick={handleOpenDialog}
          >
            <Plus className='h-4 w-4 mr-2' /> Thêm người dùng
          </Button>
        </div>
      </div>
      <DialogAddAccount open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
}
