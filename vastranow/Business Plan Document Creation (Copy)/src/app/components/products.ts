import { Product } from './types';

export const products: Product[] = [
  // Men's Traditional Wear
  {
    id: 'mt-1',
    name: 'Cotton Kurta',
    category: 'mens-traditional',
    price: 799,
    image: 'https://images.unsplash.com/photo-1622389089909-06e54b4b13d8?w=800',
    images: [
      'https://images.unsplash.com/photo-1622389089909-06e54b4b13d8?w=800',
      'https://images.unsplash.com/photo-1622389089884-80954b0f6917?w=800'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Cream', 'Black', 'Navy'],
    material: '100% Cotton',
    description: 'Classic cotton kurta perfect for casual and festive occasions. Comfortable breathable fabric with traditional design.',
    featured: true,
    newArrival: true
  },
  {
    id: 'mt-2',
    name: 'Silk Kurta Pajama Set',
    category: 'mens-traditional',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800',
    images: ['https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Maroon', 'Gold', 'Royal Blue'],
    material: 'Silk Blend',
    description: 'Premium silk kurta pajama set for weddings and special occasions.',
    featured: true
  },
  {
    id: 'mt-3',
    name: 'Nehru Jacket',
    category: 'mens-traditional',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800',
    images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Navy', 'Burgundy'],
    material: 'Cotton Silk',
    description: 'Elegant Nehru jacket with intricate detailing. Perfect layering piece for formal events.',
    newArrival: true
  },

  // Men's Office Wear
  {
    id: 'mo-1',
    name: 'Formal Shirt - White',
    category: 'mens-office',
    price: 599,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800',
    images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800'],
    sizes: ['38', '40', '42', '44', '46'],
    colors: ['White', 'Blue', 'Pink'],
    material: 'Cotton',
    description: 'Crisp formal shirt for office wear. Non-iron fabric for easy maintenance.'
  },
  {
    id: 'mo-2',
    name: 'Formal Trousers',
    category: 'mens-office',
    price: 899,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800',
    images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800'],
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Black', 'Navy', 'Grey'],
    material: 'Polyester Blend',
    description: 'Comfortable formal trousers with perfect fit. Wrinkle-resistant fabric.'
  },

  // Women's Traditional Wear
  {
    id: 'wt-1',
    name: 'Banarasi Saree',
    category: 'womens-traditional',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800',
      'https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=800'
    ],
    sizes: ['Free Size'],
    colors: ['Red', 'Green', 'Pink', 'Blue'],
    material: 'Silk Blend',
    description: 'Authentic Banarasi saree with traditional motifs and zari work. Perfect for weddings and festivals.',
    featured: true,
    newArrival: true
  },
  {
    id: 'wt-2',
    name: 'Anarkali Kurta Set',
    category: 'womens-traditional',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Teal', 'Maroon'],
    material: 'Georgette',
    description: 'Flowy Anarkali kurta with matching dupatta and churidar. Comfortable and elegant.',
    featured: true
  },
  {
    id: 'wt-3',
    name: 'Cotton Kurta',
    category: 'womens-traditional',
    price: 599,
    image: 'https://images.unsplash.com/photo-1583391733981-36c8f964c1e5?w=800',
    images: ['https://images.unsplash.com/photo-1583391733981-36c8f964c1e5?w=800'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Yellow', 'Pink'],
    material: 'Cotton',
    description: 'Comfortable everyday cotton kurta. Perfect for work and casual outings.'
  },

  // Women's Office Wear
  {
    id: 'wo-1',
    name: 'Formal Kurta Palazzo Set',
    category: 'womens-office',
    price: 999,
    image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800',
    images: ['https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Navy', 'Black', 'Grey'],
    material: 'Rayon',
    description: 'Professional kurta palazzo set for office wear. Comfortable all-day wear.',
    newArrival: true
  },
  {
    id: 'wo-2',
    name: 'Shirt Style Kurta',
    category: 'womens-office',
    price: 799,
    image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0f?w=800',
    images: ['https://images.unsplash.com/photo-1565084888279-aca607ecce0f?w=800'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Blue', 'Beige'],
    material: 'Cotton',
    description: 'Contemporary shirt-style kurta. Perfect blend of traditional and modern.'
  },

  // Kids Wear
  {
    id: 'k-1',
    name: 'Boys Kurta Pajama',
    category: 'kids',
    price: 499,
    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800',
    images: ['https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800'],
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    colors: ['White', 'Cream', 'Navy'],
    material: 'Cotton',
    description: 'Comfortable kurta pajama for boys. Perfect for festivals and family gatherings.',
    newArrival: true
  },
  {
    id: 'k-2',
    name: 'Girls Lehenga Choli',
    category: 'kids',
    price: 799,
    image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800',
    images: ['https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800'],
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    colors: ['Pink', 'Red', 'Blue'],
    material: 'Cotton Silk',
    description: 'Beautiful lehenga choli set for girls. Perfect for weddings and special occasions.'
  }
];

export const categories = [
  { id: 'mens-traditional', name: "Men's Traditional", image: 'https://images.unsplash.com/photo-1622389089909-06e54b4b13d8?w=800' },
  { id: 'mens-office', name: "Men's Office", image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800' },
  { id: 'womens-traditional', name: "Women's Traditional", image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800' },
  { id: 'womens-office', name: "Women's Office", image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800' },
  { id: 'kids', name: "Kids Wear", image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800' }
];
