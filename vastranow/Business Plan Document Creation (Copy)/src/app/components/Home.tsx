import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { products as localProducts, categories } from './products';
import { Product } from './types';
import ProductCard from './ProductCard';
import ProductSlider from './ProductSlider';
import { productsAPI } from '../services/api';

export default function Home() {
  const [backendProducts, setBackendProducts] = useState<Product[] | null>(null);
  const featuredProducts = (backendProducts ?? localProducts).filter(p => p.featured);
  const newArrivals = (backendProducts ?? localProducts).filter(p => p.newArrival);
  const trendingProducts = (backendProducts ?? localProducts).slice(0, 8);

  useEffect(() => {
    productsAPI.getAll().then(setBackendProducts).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen font-sans">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-slate-900 to-black">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600"
            alt="Hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-blue-900/40 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6 text-white">
              <span className="inline-flex rounded-full bg-[#D4AF37]/20 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#F8E5B2]">
                Trending Collection
              </span>
              <h1 className="text-4xl font-serif tracking-tight text-white sm:text-5xl lg:text-6xl">
                Ethnic Style for Every Occasion
              </h1>
              <p className="max-w-2xl text-lg text-slate-200 sm:text-xl">
                Discover premium Indian ethnic and contemporary wear for the entire family with responsive layouts, polished product cards, and smooth shopping experiences.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 shadow-xl transition hover:bg-slate-100"
                >
                  Shop Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-3 text-sm font-semibold text-white transition hover:border-white"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
            <div className="rounded-[2rem] bg-white/10 p-6 ring-1 ring-white/10 backdrop-blur-xl sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white p-4 shadow-lg">
                  <h3 className="text-sm uppercase tracking-[0.25em] text-slate-500">New Launch</h3>
                  <p className="mt-4 text-2xl font-semibold">Latest seasonal dresses</p>
                </div>
                <div className="rounded-3xl bg-white p-4 shadow-lg">
                  <h3 className="text-sm uppercase tracking-[0.25em] text-slate-500">Best Seller</h3>
                  <p className="mt-4 text-2xl font-semibold">Kurta sets & styles</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-serif mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map(category => (
            <Link
              key={category.id}
              to={`/shop/${category.id}`}
              className="group relative overflow-hidden rounded-[2rem] bg-slate-100 shadow-lg transition hover:shadow-xl"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                <h3 className="text-lg font-semibold">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <ProductSlider
        title="Trending Now"
        description="A curated selection of the most loved outfits for this season."
        products={trendingProducts}
      />

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
            <div>
              <h2 className="text-3xl font-serif">Featured Collection</h2>
              <p className="text-slate-600">Handpicked styles with premium details and comfort for every family member.</p>
            </div>
            <Link to="/shop" className="text-[#D4AF37] hover:underline flex items-center">
              View all featured
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <ProductSlider
        title="New Arrivals"
        description="Fresh styles dropped for the season — ready to wear, ready to celebrate."
        products={newArrivals}
      />

      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3 text-center">
            <div>
              <Star className="mx-auto mb-4 h-8 w-8 text-[#D4AF37]" />
              <h3 className="text-xl font-semibold">Premium Quality</h3>
              <p className="mt-2 text-sm text-slate-300">Handpicked fabrics and craftsmanship for every design.</p>
            </div>
            <div>
              <Star className="mx-auto mb-4 h-8 w-8 text-[#D4AF37]" />
              <h3 className="text-xl font-semibold">Fast Delivery</h3>
              <p className="mt-2 text-sm text-slate-300">Integrated shipping partners for quick and reliable delivery.</p>
            </div>
            <div>
              <Star className="mx-auto mb-4 h-8 w-8 text-[#D4AF37]" />
              <h3 className="text-xl font-semibold">Secure Payments</h3>
              <p className="mt-2 text-sm text-slate-300">Multiple gateways supported for seamless checkout.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
