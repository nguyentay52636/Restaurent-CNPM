export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: boolean;
    image: string;
}
export const dataProducts: Product[] = [
    { id: 1, name: 'RISTRETTO BIANCO', category: 'Coffee and Beverage', price: 5.00, stock: 120, status: true, image: '/images/images_products/coffee1.png' },
    { id: 2, name: 'ICED CREAMY LATTE', category: 'Coffee and Beverage', price: 5.00, stock: 120, status: true, image: '/images/images_products/coffee2.png' },
    { id: 3, name: 'CAPPUCINO', category: 'Coffee and Beverage', price: 5.00, stock: 120, status: true, image: '/images/images_products/coffee3.png' },
    { id: 4, name: 'MILK COFFEE WITH REGAL', category: 'Coffee and Beverage', price: 5.00, stock: 120, status: true, image: '/images/images_products/coffee4.png' },
   
    { id: 5, name: 'ORANGE JUICE', category: 'Coffee and Beverage', price: 5.00, stock: 120, status: true, image: '/images/images_products/coffee5.png' },
    { id: 5, name: 'ORANGE JUICE', category: 'Coffee and Beverage', price: 5.00, stock: 120, status: true, image: '/images/images_products/coffee5.png' },
    { id: 5, name: 'ORANGE JUICE', category: 'Coffee and Beverage', price: 5.00, stock: 120, status: true, image: '/images/images_products/coffee5.png' },
    { id: 5, name: 'ORANGE JUICE', category: 'Coffee and Beverage', price: 5.00, stock: 120, status: true, image: '/images/images_products/coffee5.png' },
    { id: 5, name: 'ORANGE JUICE', category: 'Coffee and Beverage', price: 5.00, stock: 120, status: true, image: '/images/images_products/coffee5.png' },
]