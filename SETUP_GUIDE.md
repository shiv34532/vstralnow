# 🚀 Vastra Project - Complete Setup Guide

## 📊 Project Architecture

```
vstralnow/
├── vastranow/
│   └── Business Plan Document Creation (Copy)/   [FRONTEND - React/Vite]
│       ├── src/
│       │   ├── main.tsx
│       │   ├── app/
│       │   │   ├── App.tsx (Router)
│       │   │   └── components/ (All UI components)
│       │   └── styles/
│       └── vite.config.ts
│
└── backend/                                       [BACKEND - Node.js/Express]
    ├── src/
    │   ├── index.js (Main server)
    │   ├── database/ (PostgreSQL setup & schema)
    │   ├── models/ (Data models)
    │   ├── controllers/ (API logic)
    │   ├── routes/ (API endpoints)
    │   └── middleware/ (Auth, error handling)
    └── package.json
```

## 🛠️ Complete Installation Steps

### Step 1: Install PostgreSQL

**On Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start
```

**On macOS (using Homebrew):**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**On Windows:**
Download from: https://www.postgresql.org/download/windows/

### Step 2: Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database and user
CREATE DATABASE vastra_db;
CREATE USER vastra_user WITH PASSWORD 'vastra_password';
ALTER ROLE vastra_user SET client_encoding TO 'utf8';
ALTER ROLE vastra_user SET default_transaction_isolation TO 'read committed';
GRANT ALL PRIVILEGES ON DATABASE vastra_db TO vastra_user;
\q
```

### Step 3: Setup Backend

```bash
cd /workspaces/vstralnow/backend

# Install dependencies
pnpm install

# Copy environment file
cp .env.example .env

# Setup database tables
pnpm run db:setup

# Seed sample data
pnpm run db:seed

# Start backend server
pnpm run dev
```

Backend will run at: `http://localhost:5000`

### Step 4: Connect Frontend to Backend

Update the frontend API configuration to connect to the backend:

**File**: `vastranow/Business Plan Document Creation (Copy)/src/app/components/Home.tsx`

Add API calls example:
```typescript
// API configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Fetch products from backend
const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    const products = await response.json();
    setProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

// Add to cart
const addToCart = async (productId, quantity, size, color) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ productId, quantity, size, color })
    });
    const cartItem = await response.json();
    // Update UI with cart item
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};
```

## 📡 API Integration Examples

### Authentication Flow

```typescript
// Login user
const login = async (email: string, password: string) => {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data.user;
};

// Get user profile
const getProfile = async () => {
  const response = await fetch('http://localhost:5000/api/auth/profile', {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  });
  return response.json();
};
```

### Product Management

```typescript
// Get all products
const products = await fetch('http://localhost:5000/api/products').then(r => r.json());

// Get featured products
const featured = await fetch('http://localhost:5000/api/products/featured').then(r => r.json());

// Search products
const results = await fetch(`http://localhost:5000/api/products/search?q=kurta`).then(r => r.json());

// Get products by category
const category = await fetch('http://localhost:5000/api/products/category/Men\'s%20Traditional').then(r => r.json());
```

### Shopping Cart

```typescript
// Add to cart
const addItem = async (productId: string, quantity: number, size: string, color: string) => {
  const response = await fetch('http://localhost:5000/api/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ productId, quantity, size, color })
  });
  return response.json();
};

// Get cart
const getCart = async () => {
  const response = await fetch('http://localhost:5000/api/cart', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};

// Update cart item
const updateCartItem = async (cartItemId: string, quantity: number) => {
  const response = await fetch(`http://localhost:5000/api/cart/${cartItemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ quantity })
  });
  return response.json();
};

// Remove from cart
const removeFromCart = async (cartItemId: string) => {
  const response = await fetch(`http://localhost:5000/api/cart/${cartItemId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};
```

### Orders

```typescript
// Create order
const createOrder = async (shippingAddress: string) => {
  const response = await fetch('http://localhost:5000/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ shippingAddress })
  });
  return response.json();
};

// Get user's orders
const getOrders = async () => {
  const response = await fetch('http://localhost:5000/api/orders', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};

// Get order details
const getOrderDetails = async (orderId: string) => {
  const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};
```

## 🔐 JWT Token Management

Store token in localStorage after login:
```typescript
localStorage.setItem('token', data.token);
```

Use token in all authenticated requests:
```typescript
headers: {
  'Authorization': `Bearer ${localStorage.getItem('token')}`
}
```

Clear token on logout:
```typescript
localStorage.removeItem('token');
```

## 📦 Sample Data

The backend comes pre-seeded with:
- 2 sample users (customer@vastra.com, admin@vastra.com)
- 5 sample products with multiple sizes and colors
- Sample cart items and orders

**Credentials:**
- Email: customer@vastra.com
- Password: password123

## 🧪 Testing the Integration

### 1. Start PostgreSQL
```bash
sudo service postgresql start
# or
brew services start postgresql@15
```

### 2. Start Backend
```bash
cd backend
pnpm run dev
```

### 3. Start Frontend
```bash
cd vastranow/Business\ Plan\ Document\ Creation\ \(Copy\)
pnpm run dev
```

### 4. Open Browser
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/api/health

## 📋 Database Schema Overview

### Users
```
id (UUID) | email | password_hash | first_name | last_name | phone | created_at | updated_at
```

### Products
```
id | name | description | category | price | original_price | image_url | stock_quantity | material | featured | new_arrival
```

### Product Variants
- **product_sizes**: Size options (XS to XXL)
- **product_colors**: Color variants with hex codes
- **product_images**: Multiple product images

### Shopping
- **cart_items**: User's shopping cart with product details
- **orders**: Order records with tracking
- **order_items**: Individual items in each order

### Social
- **reviews**: Product ratings and reviews
- **wishlist**: User's saved items

## 🚀 Next Steps

1. **Frontend API Integration**
   - Create a `src/services/api.ts` file for all API calls
   - Add JWT token management
   - Add error handling and loading states

2. **Environment Variables**
   - Add `VITE_API_URL=http://localhost:5000/api` to frontend `.env`

3. **Features to Implement**
   - User authentication UI (login/register pages)
   - Product listing with filters
   - Shopping cart UI
   - Checkout flow
   - Order tracking
   - User profile page

4. **Deployment Ready**
   - Use Docker for containerization
   - Deploy backend to AWS/DigitalOcean
   - Deploy frontend to Vercel/Netlify
   - Use environment variables for production

## 📞 Troubleshooting

**Backend won't start?**
- Check PostgreSQL is running: `psql -U postgres -c "SELECT 1"`
- Check `.env` file has correct database credentials
- Try restarting: `pnpm run db:setup` then `pnpm run db:seed`

**Frontend can't connect to backend?**
- Check backend is running: `curl http://localhost:5000/api/health`
- Check CORS is enabled (should be by default)
- Check frontend is using correct API URL

**Database errors?**
- Drop and recreate: `DROP DATABASE vastra_db;` then setup again
- Check database user permissions
- Verify PostgreSQL version compatibility (12+)

## 📖 Documentation Links

- [Express.js Docs](https://expressjs.com/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [React Router](https://reactrouter.com/)
- [JWT Auth](https://jwt.io/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Project Status**: ✅ Fully Integrated Backend with PostgreSQL Database
**Frontend**: Running on http://localhost:5173
**Backend**: Running on http://localhost:5000
