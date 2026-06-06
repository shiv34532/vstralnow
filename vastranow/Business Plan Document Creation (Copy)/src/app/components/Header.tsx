import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  cartItemCount: number;
}

export default function Header({ cartItemCount }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white text-blue-900 sticky top-0 z-50 shadow-sm border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <span className="text-2xl font-serif tracking-wider text-blue-600 transition-all duration-300 group-hover:text-blue-700 group-hover:scale-105">VASTRA</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 font-sans">
            <Link to="/" className="relative hover:text-blue-600 transition-all duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">Home</Link>
            <Link to="/shop" className="relative hover:text-blue-600 transition-all duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">Shop All</Link>
            <Link to="/shop/mens-traditional" className="relative hover:text-blue-600 transition-all duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">Men</Link>
            <Link to="/shop/womens-traditional" className="relative hover:text-blue-600 transition-all duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">Women</Link>
            <Link to="/shop/kids" className="relative hover:text-blue-600 transition-all duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full">Kids</Link>
          </nav>

          {/* Cart Icon */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative hover:text-blue-600 transition-all duration-300 hover:scale-110 transform">
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden hover:text-blue-600 transition-all duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-2 border-t border-blue-100 animate-fade-in font-sans">
            <Link
              to="/"
              className="block py-2 hover:text-blue-600 transition-all duration-300 hover:translate-x-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="block py-2 hover:text-blue-600 transition-all duration-300 hover:translate-x-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop All
            </Link>
            <Link
              to="/shop/mens-traditional"
              className="block py-2 hover:text-blue-600 transition-all duration-300 hover:translate-x-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              Men
            </Link>
            <Link
              to="/shop/womens-traditional"
              className="block py-2 hover:text-blue-600 transition-all duration-300 hover:translate-x-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              Women
            </Link>
            <Link
              to="/shop/kids"
              className="block py-2 hover:text-blue-600 transition-all duration-300 hover:translate-x-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              Kids
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
