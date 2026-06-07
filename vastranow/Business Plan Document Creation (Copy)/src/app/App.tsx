import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Shop from './components/Shop';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Auth from './components/Auth';
import Account from './components/Account';
import Admin from './components/Admin';
import { CartItem } from './components/types';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(item =>
        item.id === product.id &&
        item.selectedSize === product.selectedSize &&
        item.selectedColor === product.selectedColor
      );

      if (existing) {
        return prev.map(item =>
          item.id === product.id &&
          item.selectedSize === product.selectedSize &&
          item.selectedColor === product.selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, size: string, color: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(prev => prev.filter(item =>
        !(item.id === id && item.selectedSize === size && item.selectedColor === color)
      ));
    } else {
      setCartItems(prev => prev.map(item =>
        item.id === id && item.selectedSize === size && item.selectedColor === color
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const removeFromCart = (id: string, size: string, color: string) => {
    setCartItems(prev => prev.filter(item =>
      !(item.id === id && item.selectedSize === size && item.selectedColor === color)
    ));
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <Header cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:category" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
            <Route path="/cart" element={
              <Cart
                items={cartItems}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            } />
            <Route path="/auth" element={<Auth />} />
            <Route path="/account" element={<Account />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}