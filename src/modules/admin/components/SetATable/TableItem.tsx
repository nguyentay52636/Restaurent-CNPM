import { Button } from '@/components/ui/button';
import { Reservation } from './tableData';
import { Calendar, Clock, CreditCard, DollarSign, FileText, XCircle } from 'lucide-react';
import { useState } from 'react';
import TableDetailDialog from './TableDetailDialog';

export default function TableItem({ tableData }: { tableData: Reservation }) {
  const [openTalbeDeltail, setOpenTableDetail] = useState(false);

  return (
    <div
      className={`p-5 rounded-2xl shadow-lg w-full border transition-all duration-300 hover:shadow-xl ${
        tableData.status === 'available' ? 'bg-orange-100' : 'bg-orange-200'
      }`}
    >
      {/* Header */}
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-xl font-bold text-gray-800'>Bàn số {tableData.id}</h3>
        <span
          className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 ${
            tableData.status === 'available'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              tableData.status === 'available' ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
          {tableData.status === 'available' ? 'Trống' : 'Đã đặt'}
        </span>
      </div>

      {/* Info Grid */}
      <div className='bg-white/60 rounded-xl p-4 space-y-3'>
        <div className='flex items-center gap-3 text-gray-700'>
          <Calendar className='w-5 h-5 text-gray-500' />
          <div className='flex flex-col'>
            <span className='text-sm text-gray-500'>Thời gian đặt</span>
            <span className='font-medium'>{tableData.reservation_time.toLocaleString()}</span>
          </div>
        </div>

        <div className='flex items-center gap-3 text-gray-700'>
          <CreditCard className='w-5 h-5 text-gray-500' />
          <div className='flex flex-col'>
            <span className='text-sm text-gray-500'>Trạng thái thanh toán</span>
            <span
              className={`font-medium ${
                tableData.payment_status === 'paid' ? 'text-green-600' : 'text-orange-600'
              }`}
            >
              {tableData.payment_status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
            </span>
          </div>
        </div>

        <div className='flex items-center gap-3 text-gray-700'>
          <DollarSign className='w-5 h-5 text-gray-500' />
          <div className='flex flex-col'>
            <span className='text-sm text-gray-500'>Tổng tiền</span>
            <span className='font-semibold text-gray-900'>
              {tableData.total_price.toLocaleString()}đ
            </span>
          </div>
        </div>
      </div>

      {/* Timestamps */}
      <div className='mt-4 p-3 bg-gray-50 rounded-lg space-y-1.5'>
        <div className='flex items-center gap-2 text-xs text-gray-500'>
          <Clock className='w-4 h-4' />
          <span>Tạo: {tableData.created_at.toLocaleString()}</span>
        </div>
        <div className='flex items-center gap-2 text-xs text-gray-500'>
          <Clock className='w-4 h-4' />
          <span>Cập nhật: {tableData.updated_at.toLocaleString()}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='mt-4 flex gap-2'>
        <Button
          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
            tableData.status === 'available'
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-gray-400 text-white cursor-not-allowed'
          }`}
          disabled={tableData.status !== 'available'}
        >
          {tableData.status === 'available' ? 'Đặt bàn' : 'Đã được đặt'}
        </Button>
        {tableData.status === 'booked' && (
          <>
            <Button
              onClick={() => setOpenTableDetail(true)}
              className='flex-1 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2'
            >
              <FileText className='w-4 h-4' />
              Chi tiết
            </Button>
            <Button className='flex-1 px-4 py-2 rounded-lg bg-destructive hover:bg-red-700 text-white text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2'>
              <XCircle className='w-4 h-4' />
              Huỷ
            </Button>
            <TableDetailDialog
              onCloes={() => setOpenTableDetail(false)}
              open={openTalbeDeltail}
              tableData={tableData}
            />
          </>
        )}
      </div>
    </div>
  );
}
