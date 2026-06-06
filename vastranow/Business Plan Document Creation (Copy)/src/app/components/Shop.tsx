import { Link, useParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Filter, X } from 'lucide-react';
import { products, categories } from './products';

export default function Shop() {
  const { category } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (selectedSizes.length > 0) {
      filtered = filtered.filter(p =>
        p.sizes.some(size => selectedSizes.includes(size))
      );
    }

    if (selectedColors.length > 0) {
      filtered = filtered.filter(p =>
        p.colors.some(color => selectedColors.includes(color))
      );
    }

    return filtered;
  }, [selectedCategory, priceRange, selectedSizes, selectedColors]);

  const allSizes = Array.from(new Set(products.flatMap(p => p.sizes)));
  const allColors = Array.from(new Set(products.flatMap(p => p.colors)));

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 5000]);
    setSelectedSizes([]);
    setSelectedColors([]);
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`block w-full text-left px-3 py-2 rounded ${
              selectedCategory === 'all'
                ? 'bg-black text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            All Products
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`block w-full text-left px-3 py-2 rounded ${
                selectedCategory === cat.id
                  ? 'bg-black text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full"
          />
          <p className="text-sm text-gray-600">
            ₹0 - ₹{priceRange[1]}
          </p>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="font-semibold mb-3">Sizes</h3>
        <div className="flex flex-wrap gap-2">
          {allSizes.map(size => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-3 py-1 border rounded ${
                selectedSizes.includes(size)
                  ? 'bg-black text-white border-black'
                  : 'border-gray-300 hover:border-black'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="font-semibold mb-3">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {allColors.map(color => (
            <button
              key={color}
              onClick={() => toggleColor(color)}
              className={`px-3 py-1 border rounded text-sm ${
                selectedColors.includes(color)
                  ? 'bg-black text-white border-black'
                  : 'border-gray-300 hover:border-black'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={clearFilters}
        className="w-full py-2 border border-gray-300 hover:bg-gray-100 rounded"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif mb-2">
          {selectedCategory === 'all'
            ? 'All Products'
            : categories.find(c => c.id === selectedCategory)?.name}
        </h1>
        <p className="text-gray-600">{filteredProducts.length} products found</p>
      </div>

      <div className="flex gap-8">
        {/* Desktop Filters */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-20">
            <FilterPanel />
          </div>
        </aside>

        {/* Mobile Filter Button */}
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="lg:hidden fixed bottom-4 right-4 bg-black text-white px-4 py-3 rounded-full shadow-lg z-40 flex items-center"
        >
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </button>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setMobileFilterOpen(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Filters</h2>
                <button onClick={() => setMobileFilterOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <FilterPanel />
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              <button
                onClick={clearFilters}
                className="mt-4 text-[#D4AF37] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group bg-white border overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-[3/4] overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.newArrival && (
                      <span className="absolute top-2 left-2 bg-[#D4AF37] text-black px-3 py-1 text-xs font-bold">
                        NEW
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1 group-hover:text-[#D4AF37] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{product.material}</p>
                    <p className="font-bold text-lg">₹{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
