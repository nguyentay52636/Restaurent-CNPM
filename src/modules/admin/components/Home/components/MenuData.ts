export interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  rating: number;
  imageUrl: string;
  category: string;
  availableSizes?: { name: string, price: number }[];
}

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Bánh mì nướng',
    price: 30.0,
    description: 'Củ dền, Khoai tây, Ớt chuông, Gia vị bánh mì',
    rating: 5.0,
    imageUrl: '/images/images_foot/foot_2.png',
    category: 'Food',
  },
  {
    id: 2,
    name: 'Gà rán Popeyes',
    price: 20.0,
    description: 'Gà rán giòn với gia vị đặc biệt, ăn kèm khoai tây chiên',
    rating: 4.0,
    imageUrl: '/images/images_foot/foot_1.png',
    category: 'Food',
  },
  {
    id: 3,
    name: 'Burger Bison',
    price: 50.0,
    description: 'Thịt bò Bison, phô mai, rau củ tươi, sốt đặc biệt',
    rating: 2.0,
    imageUrl: '/images/images_foot/foot_3.png',
    category: 'Food',
  },
  // Drink items with size options
  {
    id: 4,
    name: 'Trà Đào',
    price: 25.0, // Base price for default size (M)
    description: 'Trà đào thơm ngon, vị chua ngọt hài hòa',
    rating: 5.0,
    imageUrl: '/images/images_foot/foot_4.png',
    category: 'Drink',
    availableSizes: [
      { name: 'S', price: 20.0 },
      { name: 'M', price: 25.0 },
      { name: 'L', price: 30.0 }
    ]
  },
  {
    id: 5,
    name: 'Cà Phê Sữa',
    price: 20.0, // Base price for default size (M)
    description: 'Cà phê đậm đà, hòa quyện với sữa thơm béo',
    rating: 4.0,
    imageUrl: '/images/images_foot/foot_1.png',
    category: 'Drink',
    availableSizes: [
      { name: 'S', price: 15.0 },
      { name: 'M', price: 20.0 },
      { name: 'L', price: 25.0 }
    ]
  },
  {
    id: 6,
    name: 'Trà Matcha',
    price: 30.0, // Base price for default size (M)
    description: 'Trà xanh matcha Nhật Bản, thơm ngon bổ dưỡng',
    rating: 4.5,
    imageUrl: '/images/images_foot/foot_4.png',
    category: 'Drink',
    availableSizes: [
      { name: 'S', price: 25.0 },
      { name: 'M', price: 30.0 },
      { name: 'L', price: 35.0 }
    ]
  },
  {
    id: 7,
    name: 'Burger Bò',
    price: 45.0,
    description: 'Thịt bò 100%, phô mai, rau củ tươi, sốt đặc biệt',
    rating: 4.0,
    imageUrl: '/images/images_foot/foot_4.png',
    category: 'Food',
  },
  {
    id: 8,
    name: 'Mì Ý Sốt Bò',
    price: 55.0,
    description: 'Mì Ý với sốt bò băm thơm ngon, đậm đà',
    rating: 4.5,
    imageUrl: '/images/images_foot/foot_4.png',
    category: 'Food',
  },
  {
    id: 9,
    name: 'Sinh Tố Dâu',
    price: 35.0, // Base price for default size (M)
    description: 'Sinh tố dâu tươi ngon, thơm mát',
    rating: 4.5,
    imageUrl: '/images/images_foot/foot_4.png',
    category: 'Drink',
    availableSizes: [
      { name: 'S', price: 30.0 },
      { name: 'M', price: 35.0 },
      { name: 'L', price: 40.0 }
    ]
  },
  // Adding more drink items with size options
  {
    id: 10,
    name: 'Trà Sữa Trân Châu',
    price: 28.0, // Base price for default size (M)
    description: 'Trà sữa ngọt ngào với trân châu dẻo thơm',
    rating: 4.8,
    imageUrl: '/images/images_foot/foot_1.png',
    category: 'Drink',
    availableSizes: [
      { name: 'S', price: 22.0 },
      { name: 'M', price: 28.0 },
      { name: 'L', price: 34.0 }
    ]
  },
  {
    id: 11,
    name: 'Nước Cam Tươi',
    price: 32.0, // Base price for default size (M)
    description: 'Nước cam ép từ cam tươi, giàu vitamin C',
    rating: 4.3,
    imageUrl: '/images/images_foot/foot_2.png',
    category: 'Drink',
    availableSizes: [
      { name: 'S', price: 26.0 },
      { name: 'M', price: 32.0 },
      { name: 'L', price: 38.0 }
    ]
  },
  {
    id: 12,
    name: 'Latte Caramel',
    price: 38.0, // Base price for default size (M)
    description: 'Cà phê espresso với sữa và sốt caramel ngọt ngào',
    rating: 4.7,
    imageUrl: '/images/images_foot/foot_3.png',
    category: 'Drink',
    availableSizes: [
      { name: 'S', price: 33.0 },
      { name: 'M', price: 38.0 },
      { name: 'L', price: 43.0 }
    ]
  },
  {
    id: 13,
    name: 'Sữa Chua Dâu Tằm',
    price: 30.0, // Base price for default size (M)
    description: 'Sữa chua mát lạnh với dâu tằm tươi',
    rating: 4.6,
    imageUrl: '/images/images_foot/foot_4.png',
    category: 'Drink',
    availableSizes: [
      { name: 'S', price: 25.0 },
      { name: 'M', price: 30.0 },
      { name: 'L', price: 35.0 }
    ]
  },
  {
    id: 14,
    name: 'Smoothie Xoài',
    price: 35.0, // Base price for default size (M)
    description: 'Sinh tố xoài ngọt mát, thơm lừng',
    rating: 4.5,
    imageUrl: '/images/images_foot/foot_1.png',
    category: 'Drink',
    availableSizes: [
      { name: 'S', price: 30.0 },
      { name: 'M', price: 35.0 },
      { name: 'L', price: 40.0 }
    ]
  },
];