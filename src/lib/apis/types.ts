export interface ProductType {
    name: string;
    description: string;
    price: number;
    image: string;
    categoryId: number;
    status: string;
}

export interface ProductWithId extends ProductType {
    id: number;
    createdAt: string;
    updatedAt: string;
    availableSizes?: { name: string; price: number }[];
}

export interface Category {
    id: number;
    name: string;
} 