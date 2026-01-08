export type Animal = 'dog' | 'cat';
export type Size = 'PP' | 'P' | 'M' | 'G' | 'GG';
export type Gender = 'male' | 'female' | 'unisex';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: Animal;
  imageId: string;
  sizes: Size[];
  genders?: Gender[];
  isBestSeller?: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  size: Size;
  gender?: Gender;
}
