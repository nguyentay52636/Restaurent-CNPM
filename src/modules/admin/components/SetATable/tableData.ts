export interface Reservation {
  id: number;
  user_id: number;
  reservation_time: Date;
  status: string;
  payment_status: string;
  total_price: number;
  created_at: Date;
  updated_at: Date;
}

export const tableData: Reservation[] = [
  {
    id: 1,
    user_id: 1,
    reservation_time: new Date(),
    status: 'available',
    payment_status: 'unpaid',
    total_price: 100000,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    user_id: 2,
    reservation_time: new Date(),
    status: 'booked',
    payment_status: 'paid',
    total_price: 150000,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 3,
    user_id: 3,
    reservation_time: new Date(),
    status: 'available',
    payment_status: 'unpaid',
    total_price: 200000,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 4,
    user_id: 4,
    reservation_time: new Date(),
    status: 'booked',
    payment_status: 'paid',
    total_price: 300000,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 5,
    user_id: 5,
    reservation_time: new Date(),
    status: 'available',
    payment_status: 'unpaid',
    total_price: 250000,
    created_at: new Date(),
    updated_at: new Date(),
  },
];
