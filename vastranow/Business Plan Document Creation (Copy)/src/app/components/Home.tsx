import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { products, categories } from './products';

export default function Home() {
  const featuredProducts = products.filter(p => p.featured);
  const newArrivals = products.filter(p => p.newArrival);

  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 flex items-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600"
            alt="Hero"
            className="w-full h-full object-cover animate-slow-zoom"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-5xl md:text-7xl font-serif mb-4 animate-fade-in-up">
            Tradition Meets
            <br />
            <span className="text-blue-200 animate-fade-in-up animation-delay-200">Modernity</span>
          </h1>
          <p className="text-xl mb-8 max-w-xl text-blue-100 animate-fade-in-up animation-delay-400">
            Discover premium Indian ethnic and contemporary wear for the entire family
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center bg-white text-blue-900 px-8 py-3 font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in-up animation-delay-600"
          >
            Shop Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-serif mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map(category => (
            <Link
              key={category.id}
              to={`/shop/${category.id}`}
              className="group relative overflow-hidden aspect-square"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
                <h3 className="text-white font-semibold text-lg text-center px-2">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif mb-8 text-center">Featured Collection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group bg-white overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
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
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-serif">New Arrivals</h2>
            <Link to="/shop" className="text-[#D4AF37] hover:underline flex items-center">
              View All
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map(product => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group bg-white overflow-hidden hover:shadow-lg transition-shadow border"
              >
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 bg-[#D4AF37] text-black px-3 py-1 text-xs font-bold">
                    NEW
                  </span>
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
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Star className="w-8 h-8 mx-auto mb-3 text-[#D4AF37]" />
              <h3 className="font-semibold mb-2">Premium Quality</h3>
              <p className="text-sm text-gray-400">Handpicked fabrics and craftsmanship</p>
            </div>
            <div>
              <svg className="w-8 h-8 mx-auto mb-3 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <h3 className="font-semibold mb-2">Free Shipping</h3>
              <p className="text-sm text-gray-400">On orders above ₹999</p>
            </div>
            <div>
              <svg className="w-8 h-8 mx-auto mb-3 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-semibold mb-2">Secure Payments</h3>
              <p className="text-sm text-gray-400">100% safe and encrypted</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
