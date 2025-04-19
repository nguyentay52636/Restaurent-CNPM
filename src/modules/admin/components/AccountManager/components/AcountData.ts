export interface Customer {
    id: number;
    name: string;
    orders: number;
    spent: number;
    gender: string;
    address: string;
    image: string;
}

// Sample customer data (based on the image, with unique IDs)
export const dataCustomers: Customer[] = [
    { id: 1, name: 'Addie Minstra', orders: 250, spent: 3500, gender: 'Male', address: '2603 Jadewood Drive', image: 'images/images-users/user-1.png' },
    { id: 2, name: 'Manuel Labor', orders: 300, spent: 4800, gender: 'Male', address: '3799 Glendale Avenue', image: 'images/images-users/user-2.png' },
    { id: 3, name: 'Jack Amanda', orders: 260, spent: 2800, gender: 'Male', address: '8270 Wildwood Street', image: 'images/images-users/user-3.png' },
    { id: 4, name: 'Stuwn Clowd', orders: 450, spent: 3800, gender: 'Male', address: '5056 Lindgren Village', image: 'images/images-users/user-4.png' },
    { id: 5, name: 'Addie Minstra', orders: 250, spent: 3500, gender: 'Male', address: '2603 Jadewood Drive', image: 'images/images-users/user-1.png' },
    { id: 6, name: 'Manuel Labor', orders: 300, spent: 4800, gender: 'Male', address: '3799 Glendale Avenue', image: 'images/images-users/user-2.png' },
    { id: 7, name: 'Jack Amanda', orders: 260, spent: 2800, gender: 'Male', address: '8270 Wildwood Street', image: 'images/images-users/user-3.png' },
    { id: 8, name: 'Stuwn Clowd', orders: 450, spent: 3800, gender: 'Male', address: '5056 Lindgren Village', image: 'images/images-users/user-4.png' },
];
