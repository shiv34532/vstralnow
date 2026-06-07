# 🏗️ Vastra Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                  │
│              http://localhost:5173                          │
├─────────────────────────────────────────────────────────────┤
│ • Home Component                                            │
│ • Product Listing & Search                                 │
│ • Shopping Cart                                            │
│ • Checkout Flow                                            │
│ • User Profile                                             │
│ • Order History                                            │
└───────────────────────┬─────────────────────────────────────┘
                        │ API Calls (JSON)
                        │ JWT Token in Headers
                        ▼
┌─────────────────────────────────────────────────────────────┐
│         BACKEND API (Express.js Server)                     │
│              http://localhost:5000                          │
├─────────────────────────────────────────────────────────────┤
│ Routes:                                                     │
│ ├─ /api/auth (register, login, profile)                   │
│ ├─ /api/products (list, search, category filter)          │
│ ├─ /api/cart (add, update, remove items)                  │
│ └─ /api/orders (create, list, track)                      │
│                                                             │
│ Middleware:                                                 │
│ ├─ CORS (allows frontend communication)                   │
│ ├─ JWT Auth (token verification)                          │
│ └─ Error Handling                                          │
└───────────────────────┬─────────────────────────────────────┘
                        │ SQL Queries
                        │ Connection Pool
                        ▼
┌─────────────────────────────────────────────────────────────┐
│          PostgreSQL Database (Port 5432)                    │
│                 vastra_db                                   │
├─────────────────────────────────────────────────────────────┤
│ Tables:                                                     │
│ ├─ users (authentication & profiles)                       │
│ ├─ products (catalog)                                      │
│ ├─ product_images (multiple images)                        │
│ ├─ product_sizes (XS to XXL)                              │
│ ├─ product_colors (color variants)                         │
│ ├─ cart_items (shopping cart)                              │
│ ├─ orders (order history)                                  │
│ ├─ order_items (items in each order)                       │
│ ├─ reviews (ratings & feedback)                            │
│ └─ wishlist (saved items)                                  │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow Example: Adding Product to Cart

```
User Clicks "Add to Cart"
        │
        ▼
┌──────────────────────────┐
│ Frontend Component       │
│ • Get product ID         │
│ • Get selected size      │
│ • Get selected color     │
│ • Get quantity           │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│ API Call                 │
│ POST /api/cart           │
│ Headers: Auth Token      │
│ Body: {productId,        │
│   quantity, size, color} │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│ Backend Route            │
│ cartRoutes.js            │
│ POST /cart               │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│ Middleware               │
│ • Verify JWT Token       │
│ • Extract user ID        │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│ Controller               │
│ addToCart()              │
│ • Validate product       │
│ • Check stock            │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│ Model                    │
│ Cart.addItem()           │
│ • Insert/Update          │
│   cart_items table       │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│ Database                 │
│ INSERT INTO cart_items   │
│ INSERT/UPDATE query      │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│ Response                 │
│ Return cart item details │
│ JSON response            │
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│ Frontend                 │
│ Update cart UI           │
│ Show success message     │
└──────────────────────────┘
```

## Authentication Flow

```
┌─────────────────────────────────────────────────────┐
│                 Login Process                       │
├─────────────────────────────────────────────────────┤
│                                                     │
│  1. User enters email & password                   │
│     ▼                                               │
│  2. Frontend sends POST /api/auth/login            │
│     ▼                                               │
│  3. Backend:                                        │
│     • Find user by email                           │
│     • Verify password with bcrypt                  │
│     ▼                                               │
│  4. Generate JWT token                             │
│     exp: 7 days                                     │
│     payload: { userId, email }                     │
│     ▼                                               │
│  5. Return token to frontend                       │
│     ▼                                               │
│  6. Frontend stores token in localStorage          │
│     ▼                                               │
│  7. Use token in Authorization header              │
│     Authorization: Bearer <token>                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Database Relationships

```
USERS (1) ──────────────── (Many) CART_ITEMS
  │id                                  │product_id
  │                                    │user_id
  ├──── (1:Many) ──── ORDERS
  │                     │order_id
  │                     │user_id
  │                     └──── ORDER_ITEMS
  │                            │product_id
  │
  ├──── (1:Many) ──── REVIEWS
  │                     │product_id
  │                     │user_id
  │
  └──── (1:Many) ──── WISHLIST
                        │product_id
                        │user_id

PRODUCTS (1) ──────────────── (Many) PRODUCT_IMAGES
       │                              
       ├──── (1:Many) ──── PRODUCT_SIZES
       │
       ├──── (1:Many) ──── PRODUCT_COLORS
       │
       ├──── (1:Many) ──── REVIEWS
       │
       └──── (1:Many) ──── CART_ITEMS
```

## API Request/Response Format

### Authentication Header
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Success Response
```json
{
  "message": "Success",
  "data": {
    "id": "uuid",
    "name": "Product Name",
    "price": 2499
  }
}
```

### Error Response
```json
{
  "error": "Product not found"
}
```

## Technologies Used

### Frontend
- React 18.3.1
- React Router 7.13.0
- TypeScript
- Vite 6.3.5
- Tailwind CSS 4.1.12
- Radix UI Components
- React Hook Form

### Backend
- Node.js (ES Modules)
- Express.js 4.18.2
- PostgreSQL 12+
- JWT (jsonwebtoken)
- bcryptjs (password hashing)
- CORS enabled

### Database
- PostgreSQL
- Connection Pooling (pg)
- UUID primary keys
- Timestamps for audit trail
- Indexes for performance

## Deployment Architecture (Production)

```
┌──────────────────────────────────────────────────────┐
│                    Internet Users                    │
└────────────────────┬─────────────────────────────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │  DNS & Load Balancer │
          └──────────┬───────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
   ┌─────────┐ ┌─────────┐ ┌─────────┐
   │Vercel   │ │Vercel   │ │Vercel   │
   │Frontend │ │Frontend │ │Frontend │
   │ CDN     │ │ CDN     │ │ CDN     │
   └────┬────┘ └────┬────┘ └────┬────┘
        │           │           │
        └───────────┼───────────┘
                    │
                    ▼
          ┌──────────────────────┐
          │  Backend API Proxy   │
          │  (API Gateway)       │
          └──────────┬───────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
   ┌─────────┐ ┌─────────┐ ┌─────────┐
   │Backend  │ │Backend  │ │Backend  │
   │Server 1 │ │Server 2 │ │Server 3 │
   │PM2      │ │PM2      │ │PM2      │
   └────┬────┘ └────┬────┘ └────┬────┘
        │           │           │
        └───────────┼───────────┘
                    │
                    ▼
        ┌──────────────────────────┐
        │   PostgreSQL Database    │
        │   (AWS RDS/Cloud SQL)    │
        │   (Master-Replica Setup) │
        └──────────────────────────┘
```

## Performance Considerations

1. **Database Indexing**
   - Indexed on: user_id, product_id, category, status
   - Improves query speed by 10-100x

2. **Connection Pooling**
   - Max 20 connections by default
   - Reuses connections for efficiency

3. **API Pagination**
   - Default 20 items per page
   - Prevents memory overload

4. **JWT Token Caching**
   - Token stored in localStorage
   - No need to fetch user on every page load

5. **Image Optimization**
   - Use CDN for product images
   - Lazy load images in frontend

## Security Features

✅ Password hashing with bcryptjs  
✅ JWT token-based authentication  
✅ CORS enabled for frontend domain only  
✅ SQL injection prevention (parameterized queries)  
✅ XSS protection (JSON responses)  
✅ HTTPS/SSL (when deployed)  
✅ Environment variables for secrets  

---

**Status**: Complete backend infrastructure with PostgreSQL database ready for production use.
