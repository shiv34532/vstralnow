import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler, authMiddleware } from './middleware/auth.js';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 API Documentation:`);
  console.log(`   - Auth: POST /api/auth/register, POST /api/auth/login`);
  console.log(`   - Products: GET /api/products, GET /api/products/:id`);
  console.log(`   - Cart: GET/POST /api/cart, PUT/DELETE /api/cart/:id`);
  console.log(`   - Orders: POST/GET /api/orders, GET /api/orders/:id`);
});
