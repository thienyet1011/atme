export interface CategoryModel {
    id: number;
    title: string;
    alt: string;
    image: string,
    keywords?: string;
    description?: string;
    parent: number;
    children?: CategoryModel[];
}