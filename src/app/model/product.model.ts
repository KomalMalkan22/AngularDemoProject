export interface Product{
    id: number;
    name: string;
    price: number;
    description: string;
    category: string;
    condition: string;
    available: boolean;
    releaseDate: Date;
    isDeleted: boolean;
    createdDate: Date;
    updatedDate: Date;
}