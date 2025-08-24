import { ReactNode } from "react";

export interface article{
    originalPrice: ReactNode;
    salesCount: any;
    oldPrice: any;
    rating: string;
    sales: string;
    name: string;
    id:string,
    title:string,
    disc:string,
    thumbnail:string,
    screenshots:string[],
    price:number,
    category: number,
    active:boolean
}