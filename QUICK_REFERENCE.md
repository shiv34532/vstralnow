# 📚 Vastra Backend - Quick Reference Guide

## 🚀 Quick Start (5 minutes)

### Prerequisites
- PostgreSQL installed and running
- Node.js 16+ installed
- pnpm package manager

### 1. Setup Backend
```bash
cd /workspaces/vstralnow/backend
pnpm install
cp .env.example .env
pnpm run db:setup
pnpm run db:seed
pnpm run dev
```

### 2. Start Frontend (Already Running)
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### 3. Test Credentials
```
Email: customer@vastra.com
Password: password123
```

---

## 📡 API Endpoints Cheat Sheet

### Authentication
```bash
# Register
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}

# Login
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

# Get Profile (Needs Token)
GET /api/auth/profile
Authorization: Bearer <token>

# Update Profile (Needs Token)
PUT /api/auth/profile
{
  "firstName": "Jane",
  "lastName": "Smith",
  "phone": "1234567890"
}
```

### Products
```bash
# Get All Products
GET /api/products?limit=20&offset=0

# Get Product by ID
GET /api/products/{id}

# Get Featured Products
GET /api/products/featured

# Get New Arrivals
GET /api/products/new-arrivals

# Get by Category
GET /api/products/category/Men's%20Traditional

# Search Products
GET /api/products/search?q=kurta
```

### Shopping Cart (Requires Auth)
```bash
# Get Cart
GET /api/cart
Authorization: Bearer <token>

# Add to Cart
POST /api/cart
Authorization: Bearer <token>
{
  "productId": "product-uuid",
  "quantity": 1,
  "size": "M",
  "color": "Black"
}

# Update Cart Item
PUT /api/cart/{cartItemId}
Authorization: Bearer <token>
{
  "quantity": 2
}

# Remove from Cart
DELETE /api/cart/{cartItemId}
Authorization: Bearer <token>

# Clear Cart
DELETE /api/cart
Authorization: Bearer <token>
```

### Orders (Requires Auth)
```bash
# Create Order
POST /api/orders
Authorization: Bearer <token>
{
  "shippingAddress": "123 Main St, City, State 12345"
}

# Get User's Orders
GET /api/orders?limit=20&offset=0
Authorization: Bearer <token>

# Get Order Details
GET /api/orders/{orderId}
Authorization: Bearer <token>
```

---

## 🔧 Database Schema Quick Reference

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  image_url TEXT,
  stock_quantity INT,
  material VARCHAR(100),
  featured BOOLEAN DEFAULT false,
  new_arrival BOOLEAN DEFAULT false
);
```

### Cart Items Table
```sql
CREATE TABLE cart_items (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INT NOT NULL,
  size VARCHAR(50),
  color VARCHAR(50),
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  shipping_address TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  payment_status VARCHAR(50) DEFAULT 'unpaid',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🧪 Test with cURL

### Register & Get Token
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

### Get All Products
```bash
curl http://localhost:5000/api/products
```

### Add to Cart (with token)
```bash
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token_here>" \
  -d '{
    "productId": "product-uuid",
    "quantity": 1,
    "size": "M",
    "color": "Black"
  }'
```

---

## 📝 Frontend Integration Example

### Using the API Service

```typescript
import { authAPI, productsAPI, cartAPI } from './services/api';

// Login
const loginUser = async () => {
  try {
    const result = await authAPI.login('user@example.com', 'password123');
    console.log('User logged in:', result.user);
  } catch (error) {
    console.error('Login failed:', error.message);
  }
};

// Get Products
const loadProducts = async () => {
  try {
    const products = await productsAPI.getAll();
    setProducts(products);
  } catch (error) {
    console.error('Failed to load products:', error.message);
  }
};

// Add to Cart
const handleAddToCart = async (productId, quantity, size, color) => {
  try {
    const cartItem = await cartAPI.addItem(productId, quantity, size, color);
    console.log('Added to cart:', cartItem);
  } catch (error) {
    console.error('Failed to add to cart:', error.message);
  }
};
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot connect to database" | Check PostgreSQL is running, verify .env credentials |
| "JWT token invalid" | Token expired or incorrect secret, login again |
| "CORS error" | Check FRONTEND_URL in .env matches your frontend URL |
| "Port 5000 already in use" | Kill process: `lsof -i :5000` then `kill -9 <PID>` |
| "Module not found" | Run `pnpm install` again in backend directory |
| "Database doesn't exist" | Run `pnpm run db:setup` again |

---

## 📊 Environment Variables (.env)

```env
# Database
DATABASE_URL=postgresql://vastra_user:vastra_password@localhost:5432/vastra_db
DB_HOST=localhost
DB_PORT=5432
DB_NAME=vastra_db
DB_USER=vastra_user
DB_PASSWORD=vastra_password

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d

# API
API_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173
```

---

## 🎯 Sample Product Categories

- Men's Traditional
- Men's Office
- Men's Casual
- Men's Travel Wear
- Women's Traditional
- Women's Office
- Women's Casual
- Women's Travel Wear
- Kids' Traditional
- Kids' Casual
- Kids' Party Wear

---

## 📦 File Structure

```
backend/
├── src/
│   ├── index.js                    # Entry point
│   ├── database/
│   │   ├── connection.js           # DB connection
│   │   ├── setup.js                # Create tables
│   │   └── seed.js                 # Sample data
│   ├── models/
│   │   └── index.js                # DB models
│   ├── controllers/
│   │   ├── authController.js       # Auth logic
│   │   └── productController.js    # Product/Cart/Order logic
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   └── middleware/
│       └── auth.js                 # JWT verification
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 🎓 Learn More

- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [JWT Introduction](https://jwt.io/introduction)
- [React Documentation](https://react.dev/)

---

## ✅ Checklist for Integration

- [ ] Backend is running (`pnpm run dev`)
- [ ] Database is set up (`pnpm run db:setup`)
- [ ] Sample data is seeded (`pnpm run db:seed`)
- [ ] Frontend can connect to backend API
- [ ] Authentication is working (login/register)
- [ ] Products are loading from database
- [ ] Cart operations are functional
- [ ] Orders can be created
- [ ] JWT tokens are being used correctly

---

**Last Updated**: 2026-06-07  
**Status**: ✅ Ready for Development & Testing
