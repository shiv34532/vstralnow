import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Product } from './types';

interface ProductCardProps {
  product: Product;
}

const renderStars = (rating: number = 0) => {
  const fullStars = Math.round(rating);
  return Array.from({ length: 5 }).map((_, index) => (
    <Star
      key={index}
      className={`w-4 h-4 ${index < fullStars ? 'text-yellow-400' : 'text-gray-300'}`}
    />
  ));
};

export default function ProductCard({ product }: ProductCardProps) {
  const hasStock = product.stock == null || product.stock > 0;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 top-3 flex justify-between px-4">
          {product.newArrival && (
            <span className="rounded-full bg-[#D4AF37] px-3 py-1 text-xs font-semibold text-black">
              New
            </span>
          )}
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${hasStock ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'}`}>
            {hasStock ? 'In stock' : 'Out of stock'}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/70 px-3 py-2 text-white text-sm backdrop-blur-sm">
          {renderStars(product.rating)}
          <span className="font-medium">({product.reviews ?? 0})</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-slate-900 transition group-hover:text-[#D4AF37]">
          {product.name}
        </h3>
        <p className="mt-2 text-sm text-slate-500">{product.material}</p>
        <div className="mt-4 flex items-center justify-between gap-2">
          <p className="text-xl font-bold text-slate-900">₹{product.price}</p>
          <span className="text-sm text-slate-500">{product.category.replace('-', ' ')}</span>
        </div>
      </div>
    </Link>
  );
}
