export interface BookingData {
  date: string;    
  time: string;  
  people: number;
  name: string;
  phone: string;
  email: string;
  note?: string;
}

export const bookings: BookingData[] = [
  { date: '2025-05-14', time: '14:45', people: 4, name: 'Nguyễn Văn A', phone: '0123456789', email: 'a@example.com', note: 'Không ăn cay' },
  { date: '2025-05-14', time: '15:00', people: 2, name: 'Trần Thị B', phone: '0987654321', email: 'b@example.com', note: '' },
   { date: '2025-05-14', time: '16:00', people: 2, name: 'Trần Thị B', phone: '0987654321', email: 'b@example.com', note: '' },
];
