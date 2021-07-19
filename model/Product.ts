export interface ProductModel {
    id: number;
    title: string;
    alt: string;
    image: string,
    price: number;
    discount: number;
    feature: boolean;
    categoryId: number;
    categoryAlt: string;
    showPrice: boolean;
    rating: number[];
    tags?: string[];
    keywords?: string;
    description?: string;
    parent: number;
    status: boolean;
    quantity: number;
    specifications: string;
}