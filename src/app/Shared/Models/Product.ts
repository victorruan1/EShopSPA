export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  category?: string;
  subCategory?: string;
  variation?: string;
  variationValue?: string;
  active?: boolean;
}
