export type Animal = 'dog' | 'cat';
export type Size = 'PP' | 'P' | 'M' | 'G' | 'GG' | '00' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12';
export type Gender = 'male' | 'female' | 'unisex';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: Animal;
  imageId: string;
  sizes: Size[];
  price: number;
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
