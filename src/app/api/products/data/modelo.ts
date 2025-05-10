export interface Product {
    id: number;
    name: string;
    imageUrl?: string | null;
    price: number;
    createdAt: Date;
}

export interface createProduct {
    name: string;
    imageUrl?: string | null;
    price: number;
}