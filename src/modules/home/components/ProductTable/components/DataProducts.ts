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
    // Coffee
    { id: 1, name: 'RISTRETTO BIANCO', category: 'Coffee', price: 45000, stock: 120, status: true, image: 'https://placehold.co/200x200/A27B5C/FFF?text=Coffee' },
    { id: 2, name: 'ICED CREAMY LATTE', category: 'Coffee', price: 49000, stock: 85, status: true, image: 'https://placehold.co/200x200/A27B5C/FFF?text=Latte' },
    { id: 3, name: 'CAPPUCINO', category: 'Coffee', price: 42000, stock: 95, status: true, image: 'https://placehold.co/200x200/A27B5C/FFF?text=Cappucino' },
    { id: 4, name: 'MILK COFFEE WITH REGAL', category: 'Coffee', price: 55000, stock: 120, status: true, image: 'https://placehold.co/200x200/A27B5C/FFF?text=Milk+Coffee' },
    { id: 5, name: 'ESPRESSO', category: 'Coffee', price: 35000, stock: 100, status: true, image: 'https://placehold.co/200x200/A27B5C/FFF?text=Espresso' },
    { id: 6, name: 'AMERICANO', category: 'Coffee', price: 39000, stock: 75, status: true, image: 'https://placehold.co/200x200/A27B5C/FFF?text=Americano' },
    { id: 7, name: 'MOCHA', category: 'Coffee', price: 52000, stock: 60, status: true, image: 'https://placehold.co/200x200/A27B5C/FFF?text=Mocha' },
    { id: 8, name: 'VIETNAMESE COFFEE', category: 'Coffee', price: 30000, stock: 150, status: true, image: 'https://placehold.co/200x200/A27B5C/FFF?text=VN+Coffee' },
    
    // Tea
    { id: 9, name: 'PEACH TEA', category: 'Tea', price: 40000, stock: 80, status: true, image: 'https://placehold.co/200x200/4CAF50/FFF?text=Peach+Tea' },
    { id: 10, name: 'LEMON TEA', category: 'Tea', price: 38000, stock: 90, status: true, image: 'https://placehold.co/200x200/4CAF50/FFF?text=Lemon+Tea' },
    { id: 11, name: 'GREEN TEA', category: 'Tea', price: 35000, stock: 100, status: true, image: 'https://placehold.co/200x200/4CAF50/FFF?text=Green+Tea' },
    { id: 12, name: 'MILK TEA', category: 'Tea', price: 42000, stock: 85, status: true, image: 'https://placehold.co/200x200/4CAF50/FFF?text=Milk+Tea' },
    { id: 13, name: 'JASMINE TEA', category: 'Tea', price: 38000, stock: 70, status: false, image: 'https://placehold.co/200x200/4CAF50/FFF?text=Jasmine+Tea' },
    { id: 14, name: 'PASSION FRUIT TEA', category: 'Tea', price: 45000, stock: 65, status: true, image: 'https://placehold.co/200x200/4CAF50/FFF?text=Passion+Tea' },
    { id: 15, name: 'STRAWBERRY TEA', category: 'Tea', price: 45000, stock: 60, status: true, image: 'https://placehold.co/200x200/4CAF50/FFF?text=Strawberry+Tea' },
    
    // Food
    { id: 16, name: 'BEEF SANDWICH', category: 'Food', price: 65000, stock: 40, status: true, image: 'https://placehold.co/200x200/FF9800/FFF?text=Beef+Sandwich' },
    { id: 17, name: 'CHICKEN SANDWICH', category: 'Food', price: 60000, stock: 45, status: true, image: 'https://placehold.co/200x200/FF9800/FFF?text=Chicken+Sandwich' },
    { id: 18, name: 'TUNA SANDWICH', category: 'Food', price: 62000, stock: 35, status: true, image: 'https://placehold.co/200x200/FF9800/FFF?text=Tuna+Sandwich' },
    { id: 19, name: 'VEGETABLE SANDWICH', category: 'Food', price: 55000, stock: 30, status: false, image: 'https://placehold.co/200x200/FF9800/FFF?text=Veggie+Sandwich' },
    { id: 20, name: 'FRENCH FRIES', category: 'Food', price: 45000, stock: 60, status: true, image: 'https://placehold.co/200x200/FF9800/FFF?text=French+Fries' },
    { id: 21, name: 'CHICKEN SALAD', category: 'Food', price: 70000, stock: 25, status: true, image: 'https://placehold.co/200x200/FF9800/FFF?text=Chicken+Salad' },
    { id: 22, name: 'PASTA', category: 'Food', price: 85000, stock: 20, status: true, image: 'https://placehold.co/200x200/FF9800/FFF?text=Pasta' },
    
    // Dessert
    { id: 23, name: 'TIRAMISU', category: 'Dessert', price: 55000, stock: 30, status: true, image: 'https://placehold.co/200x200/E91E63/FFF?text=Tiramisu' },
    { id: 24, name: 'CHEESECAKE', category: 'Dessert', price: 60000, stock: 25, status: true, image: 'https://placehold.co/200x200/E91E63/FFF?text=Cheesecake' },
    { id: 25, name: 'CHOCOLATE CAKE', category: 'Dessert', price: 58000, stock: 28, status: true, image: 'https://placehold.co/200x200/E91E63/FFF?text=Chocolate+Cake' },
    { id: 26, name: 'CROISSANT', category: 'Dessert', price: 35000, stock: 40, status: false, image: 'https://placehold.co/200x200/E91E63/FFF?text=Croissant' },
    { id: 27, name: 'MACARON', category: 'Dessert', price: 25000, stock: 50, status: true, image: 'https://placehold.co/200x200/E91E63/FFF?text=Macaron' },
    { id: 28, name: 'CUPCAKE', category: 'Dessert', price: 30000, stock: 45, status: true, image: 'https://placehold.co/200x200/E91E63/FFF?text=Cupcake' },
    { id: 29, name: 'APPLE PIE', category: 'Dessert', price: 40000, stock: 35, status: true, image: 'https://placehold.co/200x200/E91E63/FFF?text=Apple+Pie' },
];