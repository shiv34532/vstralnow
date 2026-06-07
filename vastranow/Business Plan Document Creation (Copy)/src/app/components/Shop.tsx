import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import { products as localProducts, categories } from './products';
import ProductCard from './ProductCard';
import { Product } from './types';
import { productsAPI } from '../services/api';

export default function Shop() {
  const { category } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [backendProducts, setBackendProducts] = useState<Product[] | null>(null);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        const data = selectedCategory === 'all'
          ? await productsAPI.getAll()
          : await productsAPI.getByCategory(selectedCategory);
        setBackendProducts(data);
      } catch {
        setBackendProducts(null);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const products = backendProducts ?? localProducts;

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (selectedSizes.length > 0) {
      filtered = filtered.filter(p => p.sizes.some(size => selectedSizes.includes(size)));
    }

    if (selectedColors.length > 0) {
      filtered = filtered.filter(p => p.colors.some(color => selectedColors.includes(color)));
    }

    return filtered;
  }, [products, selectedCategory, priceRange, selectedSizes, selectedColors]);

  const allSizes = Array.from(new Set(products.flatMap(p => p.sizes)));
  const allColors = Array.from(new Set(products.flatMap(p => p.colors)));

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => (prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]));
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev => (prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]));
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 5000]);
    setSelectedSizes([]);
    setSelectedColors([]);
  };

  const FilterPanel = () => (
    <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`block w-full text-left px-3 py-2 rounded ${
              selectedCategory === 'all' ? 'bg-black text-white' : 'hover:bg-slate-100'
            }`}
          >
            All Products
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`block w-full text-left px-3 py-2 rounded ${
                selectedCategory === cat.id ? 'bg-black text-white' : 'hover:bg-slate-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={priceRange[1]}
            onChange={e => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full"
          />
          <p className="text-sm text-slate-500">₹0 - ₹{priceRange[1]}</p>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Sizes</h3>
        <div className="flex flex-wrap gap-2">
          {allSizes.map(size => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`rounded-full border px-3 py-1 text-sm ${
                selectedSizes.includes(size)
                  ? 'border-black bg-black text-white'
                  : 'border-slate-300 text-slate-700 hover:border-black'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {allColors.map(color => (
            <button
              key={color}
              onClick={() => toggleColor(color)}
              className={`rounded-full border px-3 py-1 text-sm ${
                selectedColors.includes(color)
                  ? 'border-black bg-black text-white'
                  : 'border-slate-300 text-slate-700 hover:border-black'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={clearFilters}
        className="w-full rounded-2xl border border-slate-300 bg-slate-50 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif mb-2">
          {selectedCategory === 'all'
            ? 'All Products'
            : categories.find(c => c.id === selectedCategory)?.name}
        </h1>
        <p className="text-slate-600">{filteredProducts.length} products found</p>
      </div>

      <div className="flex gap-8">
        <aside className="hidden lg:block w-80 flex-shrink-0">
          <div className="sticky top-24">
            <FilterPanel />
          </div>
        </aside>

        <button
          onClick={() => setMobileFilterOpen(true)}
          className="lg:hidden fixed bottom-4 right-4 z-40 inline-flex items-center rounded-full bg-black px-4 py-3 text-sm font-semibold text-white shadow-xl"
        >
          <Filter className="mr-2 h-5 w-5" />
          Filters
        </button>

        {mobileFilterOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileFilterOpen(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Filters</h2>
                <button onClick={() => setMobileFilterOpen(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <FilterPanel />
            </div>
          </div>
        )}

        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
              <p className="text-lg text-slate-600">No products found matching your criteria.</p>
              <button
                onClick={clearFilters}
                className="mt-6 rounded-2xl bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-black transition hover:bg-yellow-300"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
