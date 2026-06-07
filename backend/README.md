# Vastra Backend API

A complete backend API for the Vastra e-commerce platform with PostgreSQL database and JWT authentication.

## 📋 Features

- **User Authentication**: JWT-based login/registration
- **Product Management**: Browse, search, filter by category
- **Shopping Cart**: Add/remove items, persistent storage
- **Orders**: Create orders, track status
- **Database**: PostgreSQL with structured schemas
- **API Routes**: RESTful endpoints with authentication

## 🛠️ Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcryptjs for password hashing
- **CORS**: Enabled for frontend integration

## 📦 Installation

### 1. Install Dependencies
```bash
cd backend
npm install
# or
pnpm install
```

### 2. Setup Environment Variables
```bash
cp .env.example .env
```

Edit `.env` with your database credentials:
```
DATABASE_URL=postgresql://vastra_user:vastra_password@localhost:5432/vastra_db
DB_HOST=localhost
DB_PORT=5432
DB_NAME=vastra_db
DB_USER=vastra_user
DB_PASSWORD=vastra_password
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
```

### 3. Create PostgreSQL Database

```bash
# Login to PostgreSQL
psql -U postgres

# Create database and user
CREATE DATABASE vastra_db;
CREATE USER vastra_user WITH PASSWORD 'vastra_password';
ALTER ROLE vastra_user SET client_encoding TO 'utf8';
ALTER ROLE vastra_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE vastra_user SET default_transaction_deferrable TO on;
ALTER ROLE vastra_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE vastra_db TO vastra_user;
\q
```

### 4. Setup Database Tables
```bash
npm run db:setup
```

### 5. Seed Sample Data
```bash
npm run db:seed
```

### 6. Start Development Server
```bash
npm run dev
```

Server will run at: `http://localhost:5000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires token)
- `PUT /api/auth/profile` - Update user profile (requires token)

### Products
- `GET /api/products` - Get all products (pagination)
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/featured` - Get featured products
- `GET /api/products/new-arrivals` - Get new arrivals
- `GET /api/products/search?q=query` - Search products

### Cart (Requires JWT Token)
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

### Orders (Requires JWT Token)
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order details

## 🗄️ Database Schema

### Users Table
- id (UUID)
- email (VARCHAR, unique)
- password_hash (VARCHAR)
- first_name, last_name (VARCHAR)
- phone (VARCHAR)
- created_at, updated_at (TIMESTAMP)

### Products Table
- id (UUID)
- name, description (VARCHAR/TEXT)
- category (VARCHAR)
- price, original_price (DECIMAL)
- image_url (TEXT)
- stock_quantity (INT)
- material (VARCHAR)
- featured, new_arrival (BOOLEAN)
- created_at, updated_at (TIMESTAMP)

### Related Tables
- **product_images**: Multiple images per product
- **product_sizes**: Available sizes (XS, S, M, L, XL, XXL)
- **product_colors**: Available colors with hex codes
- **cart_items**: User's shopping cart
- **orders**: Order records with status tracking
- **order_items**: Individual items in each order
- **reviews**: Product reviews and ratings
- **wishlist**: User's wishlist items

## 🔐 Authentication

### Login/Register Request
```json
{
  "email": "customer@vastra.com",
  "password": "password123",
  "firstName": "Raj",
  "lastName": "Kumar"
}
```

### Response (Token)
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "customer@vastra.com",
    "firstName": "Raj"
  }
}
```

### Using Token in Requests
Add to header:
```
Authorization: Bearer <token>
```

## 📝 Sample Requests

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

### Get All Products
```bash
curl http://localhost:5000/api/products
```

### Add to Cart (with token)
```bash
curl -X POST http://localhost:5000/api/cart \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "product-uuid",
    "quantity": 1,
    "size": "M",
    "color": "Black"
  }'
```

## 🚀 Production Deployment

1. Update `.env` with production database credentials
2. Change `JWT_SECRET` to a strong random value
3. Set `NODE_ENV=production`
4. Use a process manager like PM2:
   ```bash
   pm2 start src/index.js --name "vastra-api"
   ```
5. Setup reverse proxy (nginx) for SSL/TLS
6. Use environment variables for sensitive data

## 📖 Project Structure

```
backend/
├── src/
│   ├── index.js              # Main server file
│   ├── database/
│   │   ├── connection.js     # PostgreSQL connection
│   │   ├── setup.js          # Create tables
│   │   └── seed.js           # Sample data
│   ├── models/
│   │   └── index.js          # Database models
│   ├── controllers/
│   │   └── productController.js  # API logic
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   └── middleware/
│       └── auth.js           # JWT verification
├── package.json
├── .env.example
└── README.md
```

## ✅ Testing the API

Use Postman or VS Code REST Client extension to test endpoints. See sample `.http` file below:

```http
### Register
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "email": "test@vastra.com",
  "password": "test123",
  "firstName": "Test",
  "lastName": "User"
}

### Get All Products
GET http://localhost:5000/api/products

### Get Featured Products
GET http://localhost:5000/api/products/featured
```

## 🐛 Troubleshooting

**Database connection error?**
- Check PostgreSQL is running: `pg_isready`
- Verify credentials in `.env`
- Ensure database user has permissions

**JWT token expired?**
- Get new token by logging in again

**CORS errors?**
- Update `FRONTEND_URL` in `.env` to match your frontend URL

## 📞 Support

For issues or questions, please create an issue in the repository.
