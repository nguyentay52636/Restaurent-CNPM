// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import {
//   CalendarIcon,
//   ClockIcon,
//   UserIcon,
//   MailIcon,
//   PhoneIcon,
//   InfoIcon,
// } from 'lucide-react';
// import {
//   Select,
//   SelectItem,
//   SelectContent,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';

// // 📌 Dữ liệu mặc định
// const initialBookingData = {
//   date: '',
//   time: '',
//   people: 1,
//   name: '',
//   phone: '',
//   email: '',
//   note: '',
//   options: [],
// };

// const BookingPage = () => {
//   const [bookingData, setBookingData] = useState(initialBookingData);
//   const [error, setError] = useState('');

//   // 📌 Hàm kiểm tra hợp lệ
//   const validateForm = () => {
//     const { name, phone, email, date, time } = bookingData;
//     const phoneRegex = /^0\d{9}$/;
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!name || !phone || !email || !date || !time) {
//       setError('Vui lòng điền đầy đủ thông tin bắt buộc.');
//       return false;
//     }

//     if (!phoneRegex.test(phone)) {
//       setError('Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0.');
//       return false;
//     }

//     if (!emailRegex.test(email)) {
//       setError('Email không hợp lệ.');
//       return false;
//     }

//     setError('');
//     return true;
//   };

//   // 📌 Hàm xác nhận
//   const handleConfirm = () => {
//     if (validateForm()) {
//       alert('Đặt bàn thành công!');
//       // Gửi dữ liệu tới server hoặc xử lý tiếp
//     }
//   };

//   // 📌 Hàm huỷ bỏ
//   const handleCancel = () => {
//     setBookingData(initialBookingData);
//     setError('');
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
//       <h2 className="text-2xl font-bold mb-4">SGU Restaurant</h2>
//       <p className="text-sm text-gray-600 mb-2">
//         📍 273 An Dương Vương, Phường 9, Quận 5, Thành phố Hồ Chí Minh
//       </p>
//       <p className="text-orange-600 font-semibold mb-4">📞 02466645656</p>

//       {error && (
//         <div className="mb-4 text-red-600 font-medium border border-red-300 p-2 rounded">
//           ⚠ {error}
//         </div>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {/* các input giữ nguyên như trước */}
//         {/* ... giữ nguyên các input date, time, people, name, phone, email ... */}
//         <div>
//           <label className="font-medium">Thời gian dùng bữa *</label>
//           <div className="flex items-center gap-2">
//             <CalendarIcon className="h-5 w-5" />
//             <Input
//               type="date"
//               value={bookingData.date}
//               onChange={(e) =>
//                 setBookingData({ ...bookingData, date: e.target.value })
//               }
//             />
//           </div>
//         </div>

//         <div>
//           <label className="font-medium invisible sm:visible">Thời gian *</label>
//           <div className="flex items-center gap-2">
//             <ClockIcon className="h-5 w-5" />
//             <Input
//               type="time"
//               value={bookingData.time}
//               onChange={(e) =>
//                 setBookingData({ ...bookingData, time: e.target.value })
//               }
//             />
//           </div>
//         </div>

//         <div>
//           <label className="font-medium">Số lượng người *</label>
//           <div className="flex items-center gap-2">
//             <UserIcon className="h-5 w-5" />
//             <Select
//               value={bookingData.people.toString()}
//               onValueChange={(value) =>
//                 setBookingData({ ...bookingData, people: +value })
//               }
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Chọn số người" />
//               </SelectTrigger>
//               <SelectContent>
//                 {[...Array(20)].map((_, i) => (
//                   <SelectItem key={i} value={(i + 1).toString()}>
//                     {i + 1}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         <div>
//           <label className="font-medium">Họ tên *</label>
//           <div className="flex items-center gap-2">
//             <InfoIcon className="h-5 w-5" />
//             <Input
//               placeholder="Nhập họ tên"
//               value={bookingData.name}
//               onChange={(e) =>
//                 setBookingData({ ...bookingData, name: e.target.value })
//               }
//             />
//           </div>
//         </div>

//         <div>
//           <label className="font-medium">Số điện thoại *</label>
//           <div className="flex items-center gap-2">
//             <PhoneIcon className="h-5 w-5" />
//             <Input
//               placeholder="Nhập số điện thoại"
//               value={bookingData.phone}
//               onChange={(e) =>
//                 setBookingData({ ...bookingData, phone: e.target.value })
//               }
//             />
//           </div>
//         </div>

//         <div>
//           <label className="font-medium">Email *</label>
//           <div className="flex items-center gap-2">
//             <MailIcon className="h-5 w-5" />
//             <Input
//               placeholder="Nhập email"
//               value={bookingData.email}
//               onChange={(e) =>
//                 setBookingData({ ...bookingData, email: e.target.value })
//               }
//             />
//           </div>
//         </div>
//       </div>

//       <div className="mt-4">
//         <label className="font-medium">Ghi chú</label>
//         <Textarea
//           placeholder="Nhập ghi chú"
//           value={bookingData.note}
//           onChange={(e) =>
//             setBookingData({ ...bookingData, note: e.target.value })
//           }
//         />
//       </div>

//       <div className="flex justify-end gap-4 mt-6">
//         <Button variant="ghost" onClick={handleCancel}>
//           Huỷ bỏ
//         </Button>
//         <Button className="bg-orange-500 text-white hover:bg-orange-600" onClick={handleConfirm}>
//           Xác nhận
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default BookingPage;

// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import {
//   CalendarIcon,
//   ClockIcon,
//   UserIcon,
//   MailIcon,
//   PhoneIcon,
//   InfoIcon,
// } from 'lucide-react';
// import {
//   Select,
//   SelectItem,
//   SelectContent,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';

// // 📌 Dữ liệu mặc định
// const initialBookingData = {
//   date: '',
//   time: '',
//   people: 1,
//   name: '',
//   phone: '',
//   email: '',
//   note: '',
//   options: [],
// };

// const BookingPage = () => {
//   const [bookingData, setBookingData] = useState(initialBookingData);
//   const [error, setError] = useState('');

//   // 📌 Hàm kiểm tra hợp lệ
//   const validateForm = () => {
//     const { name, phone, email, date, time } = bookingData;
//     const phoneRegex = /^0\d{9}$/;
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!name || !phone || !email || !date || !time) {
//       setError('Vui lòng điền đầy đủ thông tin bắt buộc.');
//       return false;
//     }

//     if (!phoneRegex.test(phone)) {
//       setError('Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0.');
//       return false;
//     }

//     if (!emailRegex.test(email)) {
//       setError('Email không hợp lệ.');
//       return false;
//     }

//     setError('');
//     return true;
//   };

//   // 📌 Hàm xác nhận
//   const handleConfirm = () => {
//     if (validateForm()) {
//       alert('Đặt bàn thành công!');
//     }
//   };

//   // 📌 Hàm huỷ bỏ
//   const handleCancel = () => {
//     setBookingData(initialBookingData);
//     setError('');
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-8 px-4 sm:px-6 py-6 bg-white rounded-lg shadow">
//       <h2 className="text-2xl font-bold mb-2 text-center">SGU Restaurant</h2>
//       <p className="text-sm text-gray-600 mb-1 text-center">
//         📍 273 An Dương Vương, Phường 9, Quận 5, TP.HCM
//       </p>
//       <p className="text-orange-600 font-semibold mb-4 text-center">📞 02466645656</p>

//       {error && (
//         <div className="mb-4 text-red-600 font-medium border border-red-300 p-2 rounded">
//           ⚠ {error}
//         </div>
//       )}

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         {/* Ngày */}
//         <div className="flex flex-col">
//           <label className="font-medium mb-1">Ngày dùng bữa *</label>
//           <div className="flex items-center gap-2">
//             <CalendarIcon className="h-5 w-5 shrink-0" />
//             <Input
//               type="date"
//               className="flex-1"
//               value={bookingData.date}
//               onChange={(e) =>
//                 setBookingData({ ...bookingData, date: e.target.value })
//               }
//             />
//           </div>
//         </div>

//         {/* Giờ */}
//         <div className="flex flex-col">
//           <label className="font-medium mb-1">Thời gian *</label>
//           <div className="flex items-center gap-2">
//             <ClockIcon className="h-5 w-5 shrink-0" />
//             <Input
//               type="time"
//               className="flex-1"
//               value={bookingData.time}
//               onChange={(e) =>
//                 setBookingData({ ...bookingData, time: e.target.value })
//               }
//             />
//           </div>
//         </div>

//         {/* Số người */}
//         <div className="flex flex-col">
//           <label className="font-medium mb-1">Số lượng người *</label>
//           <div className="flex items-center gap-2">
//             <UserIcon className="h-5 w-5 shrink-0" />
//             <Select
//               value={bookingData.people.toString()}
//               onValueChange={(value) =>
//                 setBookingData({ ...bookingData, people: +value })
//               }
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Chọn số người" />
//               </SelectTrigger>
//               <SelectContent>
//                 {[...Array(20)].map((_, i) => (
//                   <SelectItem key={i} value={(i + 1).toString()}>
//                     {i + 1}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         {/* Họ tên */}
//         <div className="flex flex-col">
//           <label className="font-medium mb-1">Họ tên *</label>
//           <div className="flex items-center gap-2">
//             <InfoIcon className="h-5 w-5 shrink-0" />
//             <Input
//               placeholder="Nhập họ tên"
//               className="flex-1"
//               value={bookingData.name}
//               onChange={(e) =>
//                 setBookingData({ ...bookingData, name: e.target.value })
//               }
//             />
//           </div>
//         </div>

//         {/* SĐT */}
//         <div className="flex flex-col">
//           <label className="font-medium mb-1">Số điện thoại *</label>
//           <div className="flex items-center gap-2">
//             <PhoneIcon className="h-5 w-5 shrink-0" />
//             <Input
//               placeholder="Nhập số điện thoại"
//               className="flex-1"
//               value={bookingData.phone}
//               onChange={(e) =>
//                 setBookingData({ ...bookingData, phone: e.target.value })
//               }
//             />
//           </div>
//         </div>

//         {/* Email */}
//         <div className="flex flex-col">
//           <label className="font-medium mb-1">Email *</label>
//           <div className="flex items-center gap-2">
//             <MailIcon className="h-5 w-5 shrink-0" />
//             <Input
//               placeholder="Nhập email"
//               className="flex-1"
//               value={bookingData.email}
//               onChange={(e) =>
//                 setBookingData({ ...bookingData, email: e.target.value })
//               }
//             />
//           </div>
//         </div>
//       </div>

//       {/* Ghi chú */}
//       <div className="mt-4">
//         <label className="font-medium mb-1 block">Ghi chú</label>
//         <Textarea
//           placeholder="Nhập ghi chú"
//           value={bookingData.note}
//           onChange={(e) =>
//             setBookingData({ ...bookingData, note: e.target.value })
//           }
//         />
//       </div>

//       {/* Nút */}
//       <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
//         <Button variant="ghost" onClick={handleCancel}>
//           Huỷ bỏ
//         </Button>
//         <Button className="bg-orange-500 text-white hover:bg-orange-600" onClick={handleConfirm}>
//           Xác nhận
//         </Button>
//       </div>
//     </div>
//   );
// };

import React, { useState } from 'react';
import { bookings } from './booking';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  MailIcon,
  PhoneIcon,
  InfoIcon,
} from 'lucide-react';
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const allSlots = [
  '14:45', '15:00', '15:15', '15:30', '15:45', '16:00',
  '16:15', '16:30', '16:45', '17:00', '17:15', '17:30',
  '17:45', '18:00', '18:15', '18:30', '18:45', '19:00',
  '19:15', '19:30', '19:45', '20:00'
];

export const BookingPage: React.FC = () => {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState({
    date: selectedDate,
    time: '',
    people: 1,
    name: '',
    phone: '',
    email: '',
    note: '',
  });

  // Tính các khung giờ trống
  const bookedToday = bookings.filter(b => b.date === selectedDate).map(b => b.time);
  const freeSlots = allSlots.filter(slot => !bookedToday.includes(slot));

  const handleSlotClick = (time: string) => {
    setSelectedTime(time);
    setBookingData({ ...bookingData, date: selectedDate, time });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    setSelectedTime(null);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">SGU Restaurant - Đặt bàn</h2>
       <p className="text-sm text-gray-600 mb-2">
         📍 273 An Dương Vương, Phường 9, Quận 5, Thành phố Hồ Chí Minh
       </p>
       <p className="text-orange-600 font-semibold mb-4">📞 02466645656</p>
      <div className="mb-6">
        <label className="font-medium mr-2">Chọn ngày:</label>
        <Input type="date" value={selectedDate} onChange={handleDateChange} />
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {freeSlots.map(slot => (
          <Button key={slot} variant="outline" onClick={() => handleSlotClick(slot)}>
            {slot}
          </Button>
        ))}
        {freeSlots.length === 0 && <p>Hết chỗ trống cho ngày này.</p>}
      </div>

      {selectedTime && (
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Đặt bàn lúc {selectedTime} ngày {selectedDate}</h3>
          {/* Reuse form from BookingPage */}
          {/* ... phần form giống code cũ, bỏ đi input date/time và set giá trị sẵn ... */}

          {/* Ví dụ chỉ hiển thị form rút gọn */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Số lượng người *</label>
              <div className="flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                <Select
                  value={bookingData.people.toString()}
                  onValueChange={v => setBookingData({ ...bookingData, people: +v })}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn số người" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(20)].map((_, i) => (
                      <SelectItem key={i} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <label className="font-medium">Họ tên *</label>
              <div className="flex items-center gap-2">
                <InfoIcon className="h-5 w-5" />
                <Input
                  placeholder="Nhập họ tên"
                  value={bookingData.name}
                  onChange={e => setBookingData({ ...bookingData, name: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="font-medium">Số điện thoại *</label>
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-5 w-5" />
                <Input
                  placeholder="Nhập số điện thoại"
                  value={bookingData.phone}
                  onChange={e => setBookingData({ ...bookingData, phone: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="font-medium">Email *</label>
              <div className="flex items-center gap-2">
                <MailIcon className="h-5 w-5" />
                <Input
                  placeholder="Nhập email"
                  value={bookingData.email}
                  onChange={e => setBookingData({ ...bookingData, email: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="font-medium">Ghi chú</label>
            <Textarea
              placeholder="Nhập ghi chú"
              value={bookingData.note}
              onChange={e => setBookingData({ ...bookingData, note: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button variant="ghost" onClick={() => setSelectedTime(null)}>
              Huỷ bỏ
            </Button>
            <Button className="bg-orange-500 text-white hover:bg-orange-600">
              Xác nhận
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};


export default BookingPage;
