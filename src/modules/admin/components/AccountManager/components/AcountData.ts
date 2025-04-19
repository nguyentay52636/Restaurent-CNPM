// Define the Role interface
export interface Role {
    id: number;
    name: string;
}

// Update the Customer interface to include roles_id as an array of Role objects
export interface Customer {
    id: number;
    name: string;
    orders: number;
    spent: number;
    gender: string;
    address: string;
    roles_id: Role[]; // Array of roles
    image: string;
}

// Define the roles based on the types you mentioned
export const dataRoles: Role[] = [
    { id: 1, name: 'Nhân viên bán hàng' }, // Sales Staff
    { id: 2, name: 'Nhân viên quản lý' },  // Manager
    { id: 3, name: 'Bếp' },               // Kitchen Staff
    { id: 4, name: 'Khách hàng' },        // Customer
];

// Updated customer data with unique IDs and assigned roles
export const dataCustomers: Customer[] = [
    {
        id: 1,
        name: 'Addie Minstra',
        orders: 250,
        spent: 3500,
        gender: 'Male',
        address: '2603 Jadewood Drive',
        roles_id: [{ id: 4, name: 'Khách hàng' }], // Customer
        image: 'images/images-users/user-1.png',
    },
    {
        id: 2,
        name: 'Manuel Labor',
        orders: 300,
        spent: 4800,
        gender: 'Male',
        address: '3799 Glendale Avenue',
        roles_id: [{ id: 4, name: 'Khách hàng' }], // Customer
        image: 'images/images-users/user-2.png',
    },
    {
        id: 3,
        name: 'Jack Amanda',
        orders: 260,
        spent: 2800,
        gender: 'Male',
        address: '8270 Wildwood Street',
        roles_id: [{ id: 4, name: 'Khách hàng' }], // Customer
        image: 'images/images-users/user-3.png',
    },
    {
        id: 4,
        name: 'Stuwn Clowd',
        orders: 450,
        spent: 3800,
        gender: 'Male',
        address: '5056 Lindgren Village',
        roles_id: [{ id: 4, name: 'Khách hàng' }], // Customer
        image: 'images/images-users/user-4.png',
    },
    {
        id: 5,
        name: 'Emma Davis',
        orders: 0,
        spent: 0,
        gender: 'Female',
        address: '202 Birch Ln',
        roles_id: [{ id: 1, name: 'Nhân viên bán hàng' }], // Sales Staff
        image: 'images/images-users/user-5.png',
    },
    {
        id: 6,
        name: 'Michael Wilson',
        orders: 0,
        spent: 0,
        gender: 'Male',
        address: '303 Cedar Dr',
        roles_id: [{ id: 1, name: 'Nhân viên bán hàng' }], // Sales Staff
        image: 'images/images-users/user-6.png',
    },
    {
        id: 7,
        name: 'Sarah Miller',
        orders: 0,
        spent: 0,
        gender: 'Female',
        address: '404 Maple Ave',
        roles_id: [{ id: 2, name: 'Nhân viên quản lý' }], // Manager
        image: 'images/images-users/user-7.png',
    },
    {
        id: 8,
        name: 'David Lee',
        orders: 0,
        spent: 0,
        gender: 'Male',
        address: '505 Willow St',
        roles_id: [{ id: 2, name: 'Nhân viên quản lý' }], // Manager
        image: 'images/images-users/user-8.png',
    },
    {
        id: 9,
        name: 'Laura Adams',
        orders: 0,
        spent: 0,
        gender: 'Female',
        address: '606 Spruce Rd',
        roles_id: [{ id: 3, name: 'Bếp' }], // Kitchen Staff
        image: 'images/images-users/user-9.png',
    },
    {
        id: 10,
        name: 'Chris Evans',
        orders: 0,
        spent: 0,
        gender: 'Male',
        address: '707 Ash Blvd',
        roles_id: [{ id: 3, name: 'Bếp' }], // Kitchen Staff
        image: 'images/images-users/user-10.png',
    },
];