export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  images: string[];
  sizes: string[];
  colors: string[];
  material: string;
  description: string;
  featured?: boolean;
  newArrival?: boolean;
}

export interface CartItem extends Product {
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}
