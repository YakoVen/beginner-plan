export interface Article {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  screenshots: string[];
  price: number;
  category: number;
  active: boolean;
  originalPrice?: number;
  oldPrice?: number;
  rating?: number;
  salesCount?: number;
  sales?: string;
  name?: string;
}
